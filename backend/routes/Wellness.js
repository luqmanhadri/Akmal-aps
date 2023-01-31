const express = require("express");
const { db } = require("../models/wellnessData.js");
const router = express.Router();
const wellnessDataModel = require("../models/wellnessData.js");
const WellnessMood = require("../models/wellnessMood.js");

//fetch data

router.get("/", async (req, res, next) => {
  const wellDataList = await wellnessDataModel.find({});
  res.json(wellDataList);
});

//Call latest data from db
router.get("/date/:id", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({ userId: req.params.id })
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(wellDataList);
});

//Get Sleep Data

router.get("/sleep/:id", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({ userId: req.params.id })
    .sort({ createdAt: -1 })
    .limit(7);
  res.json(wellDataList);
});

//Get Check Form Today
router.get("/form/:id", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({ userId: req.params.id })
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(wellDataList);
});
// post event to db

router.post("/", async (req, res, next) => {
  const wellnessData = new wellnessDataModel(req.body);
  await wellnessData.save();
  res.json(wellnessData);
});

// post athlete Mood to DB

router.patch("/mood/:id", async (req, res) => {
  try {
    const newWellnessMood = await WellnessMood.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $set: req.body,
      },
      { upsert: true, new: true }
    );
    res.json(newWellnessMood);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// get mood
router.get("/getmood/:id", async (req, res, next) => {
  const newWellnessMood = await WellnessMood.findOne({ userId: req.params.id })
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(newWellnessMood);
});
module.exports = router;
