const express = require("express");
const router = express.Router();
// const nodeCron = require("node-cron");
const fitnessModel=require("../models/fitnessData.js");

const stravaTokenSchema = require("../models/stravaToken.js");

// async function runWeekly(){
// console.log("Running Scheduled Job")
// router.post("/", async (req, res, next) => {
//     const fitnessData = new fitnessModel(req.body);
//     await fitnessData.save();
//     res.json(fitnessData);
//   });
// }

router.get("/getfitness", async (req, res, next) => {
  clientid = req.body.id;
  const fitnessData = await fitnessModel
    .findOne({ clientid })
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(stravaToken);
});

let db;

// router.post("/token", async (req, res, next) => {
//   const token = req.body;
//   const stravaToken = await stravaTokenSchema
//     .create(token)
//     .then((result) => {
//       res.status(201).json(stravaToken);
//     })
//     .catch((err) => {
//       res.status(500).json({ err: "Could not create new document" });
//     });
// });

router.post("/data", async (req, res, next) => {
  const data = new fitnessModel(req.body);
  await data
    .save()
    .then((result) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not post Data" });
    });
});

router.post("/token", async (req, res, next) => {
  const userid = req.body.userid;
  const token = req.body.accessToken;
  const expired = req.body.expires_at;
  const stravaToken = await stravaTokenSchema
    .findByIdAndUpdate(
      userid,
      {
        $set: {
          accessToken: `${token}`,
          expires_at: `${expired}`,
        },
      },
      {
        upsert: true,
      }
    )
    .then((result) => {
      res.status(201).json(stravaToken);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create new document" });
    });
});

router.get("/get/:id", async (req, res, next) => {
  clientid = req.body.id;
  const stravaToken = await stravaTokenSchema
    .findOne({ userid: clientid })
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(stravaToken);
});

//const job = nodeCron.schedule("0 0 * * 0", runWeekly);
module.exports = router;







