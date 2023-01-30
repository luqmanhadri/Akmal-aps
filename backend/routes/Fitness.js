const express = require("express");
const router = express.Router();
//const nodeCron = require("node-cron");
const FitnessSchema = require("../models/fitnessData.js");

const stravaTokenSchema = require("../models/stravaToken.js");

// async function runWeekly(){
// console.log("Running Scheduled Job")
// router.post("/123", async (req, res, next) => {
//     const fitnessData = new fitnessModel(req.body);
//     await fitnessData.save();
//     res.json(fitnessData);
//   });
// }

router.get("/getfitness", async (req, res, next) => {
  clientid = req.body.id;
  const fitnessData = await FitnessSchema.findOne({ clientid })
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(fitnessData);
});

// router.patch("/data", async (req, res, next) => {

//   // const userid = req.body.userid;
//   // const name = req.body.athleteName;
//   // const activity = req.body.weeklyactivities;

//   try {
//     const { userid, name, activity} = req.body;
//     const fitness = await FitnessSchema.findOneAndUpdate(
//       { userid: userid },
//       {
//         $set: {
//           userid: `${userid}`,
//           athleteName: `${name}`,
//           weeklyactivities: `${activity}`,
//         }
//       },
//       {
//         upsert: true,
//         new: true
//       }
//     );

//     res.status(201).json(fitness);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/data", async (req, res, next) => {
//   const data = new FitnessSchema(req.body);
//   await data
//     .save()
//     .then((result) => {
//       res.status(201).json(data);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

router.patch("/patchdata/:id", async (req, res, next) => {
  // if (req.params.id === req.user.id) {
  try {
    const updatedFitness = await FitnessSchema.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: req.body,
      },
      { upsert: true, new: true }
    );
    res.json(updatedFitness);
  } catch (err) {
    next(err);
  }
  // }
  // else {
  //   return next(res.json("You can update only your account!"));
  // }
});

router.post("/token", async (req, res, next) => {
  const userid = req.body.userid;
  const token = req.body.accessToken;
  const refresh = req.body.refreshToken;
  const expired = req.body.expires_at;
  const stravaToken = await stravaTokenSchema
    .findByIdAndUpdate(
      userid,
      {
        $set: {
          userid: `${userid}`,
          refreshToken: `${refresh}`,
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
      next(err);
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
