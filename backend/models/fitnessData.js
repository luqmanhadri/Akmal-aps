const mongoose = require("mongoose");

const FitnessSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    athleteName: {
      type: String,
      required: true,
    },
    weeklyactivities: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fitness", FitnessSchema);