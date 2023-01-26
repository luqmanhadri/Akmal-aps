// const mongoose = require("mongoose")
// const { Sequelize } = require(".");

// const AccountSchema = new mongoose.Schema({

//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },

//     password: {
//         type: String,
//         required: true,
//     },

//     role: {
//         type: String,
//         required: true,
//     },
    
// }, {timestamps: true});

// module.exports =  mongoose.model("Account", AccountSchema)

// module.exports = (sequelize, DataTypes) => {

//     const Comment = sequelize.define("Comment", {

//         commentBody: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

        
//     });

//     Comment.associate = (models) => {
//         Account.hasOne(models.Profile)

//         Account.hasMany(models.Inventory)

//         Account.hasMany(models.Comment)
//     }

//     return Comment;
// } 