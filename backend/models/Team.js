const mongoose = require("mongoose")
// const { Sequelize } = require(".");

const TeamSchema = new mongoose.Schema({

    name : {
        type: String,
        required : true
    },

    coach: {
        type: [{
            id: {
                type: String,
                required: true
              },
              name: {
                type: String,
                required: true
              },
          }],
        default: [],
    },

    manager: {
        type: [{
            id: {
                type: String,
                required: true
              },
              name: {
                type: String,
                required: true
              },
          }],
        default: [],
    },

    players: {
        type: [{
            userId: String,
        }],
        default: [],
    },

    achievement: {
        type: [{
            year: {
                type: Number,
                required: true
              },
              achievement: {
                type: String,
              },
          }],
        default: [],
    },

    logoUrl : {
        type : String,
    }


}, { timestamps: true });

module.exports = mongoose.model("Team", TeamSchema)