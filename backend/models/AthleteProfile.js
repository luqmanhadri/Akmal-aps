const mongoose = require("mongoose")
// const { Sequelize } = require(".");

const AthleteProfileSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },

    img: {
        type: String,
      },

    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    birthday: {
        type: String,
        required: true,
    },
        
    height: {
        type: String,
        required: true,
    },
        
    sport: {
        type: String,
        required: true,
    },
        
    contact: {
        type: String,
        required: true,
    },

    comment: {
        type: [String],
        default: [],
    },

    
}, {timestamps: true});

module.exports =  mongoose.model("Profile", AthleteProfileSchema)

// module.exports = (sequelize, DataTypes) => {

//     const Profile = sequelize.define("Profile", {

//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
        
//         age: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         birthday: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         height: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         sport: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         contact: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     });

//     Profile.associate = (models) => {
//         Profile.hasMany(models.Inventory)

//         Profile.hasMany(models.Comment)
//     }

//     return Profile;
// } 