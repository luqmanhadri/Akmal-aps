const express = require("express");
const { db } = require("../models/wellnessData.js");
const router = express.Router();
const wellnessDataModel = require("../models/wellnessData.js");
const WellnessMood = require('../models/wellnessMood.js');

//fetch data

router.get("/", async (req, res, next) => {
  const wellDataList = await wellnessDataModel.find({});
  res.json(wellDataList);
});

//Call latest data from db
router.get("/date/:id", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({userId :req.params.id})
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(wellDataList);
});
 
//Get Sleep Data

router.get("/sleep/:id", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({userId :req.params.id})
    .sort({ createdAt: -1 })
    .limit(7);
  res.json(wellDataList);
});

//Get Check Form Today
router.get("/form/:id", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({userId :req.params.id})
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

router.post('/mood/:id', async (req, res) => {
  try {
    const newWellnessMood = new WellnessMood(req.body);
    await newWellnessMood.save();
    res.json({ message: 'Wellness mood saved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
