const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
