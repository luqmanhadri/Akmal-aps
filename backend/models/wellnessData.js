const mongoose = require("mongoose");

const WellnessSchema = new mongoose.Schema(
  {
    wellnessmood: {
      type: Boolean,
    },
    sleepData: {
      type: String,
    },
    trainingInput: {
      type: Number,
    },
    inBedStart: {
      type: String,
    },
    inBedEnd: {
      type: String,
    },
    stressInput: {
      type: Number,
    },
    fatigueInput: {
      type: Number,
    },
    injuryInput: {
      type: Number,
    },
    injuryPart: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wellness", WellnessSchema);
