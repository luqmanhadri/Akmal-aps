const mongoose = require("mongoose")
// const { Sequelize } = require(".");

const AnnouncementSchema = new mongoose.Schema({

    announcementTitle: {
        type: String,
        required: true
    },

    announcementBody: {
        type: String,
        required: true
    },

    date : {
        type: Date,
        required: true
    }
    
}, {timestamps: true});

module.exports =  mongoose.model("Announcements", AnnouncementSchema)

// module.exports = (sequelize, DataTypes) => {

//     const Announcement = sequelize.define("Announcement", {

//         announcementBody: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
        
//     });

//     return Announcement;
// } 