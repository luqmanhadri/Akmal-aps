const mongoose = require("mongoose");

const stravaTokenSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    expires_at: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stravaToken", stravaTokenSchema);
