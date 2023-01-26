const express = require("express");
const router = express.Router();
const nodeCron = require("node-cron");
const fitnessModel=require("../models/fitnessData.js");

async function runWeekly(){
console.log("Running Scheduled Job")
router.post("/", async (req, res, next) => {
    const fitnessData = new fitnessModel(req.body);
    await fitnessData.save();
    res.json(fitnessData);
  });
}


//const job = nodeCron.schedule("0 0 * * 0", runWeekly);







