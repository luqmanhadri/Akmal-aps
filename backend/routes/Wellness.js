const express = require("express");
const { db } = require("../models/wellnessData.js");
const router = express.Router();
const wellnessDataModel = require("../models/wellnessData.js");

//fetch data

router.get("/", async (req, res, next) => {
  const wellDataList = await wellnessDataModel.find({});
  res.json(wellDataList);
});

//Call latest data from db
router.get("/date", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(wellDataList);
});
 
//Get Sleep Data

router.get("/sleep", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(7);
  res.json(wellDataList);
});

//Get Check Form Today
router.get("/form", async (req, res, next) => {
  const wellDataList = await wellnessDataModel
    .find({})
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

module.exports = router;
