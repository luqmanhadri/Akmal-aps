const mongoose = require("mongoose")
// const { Sequelize } = require(".");

const AccountSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
    },

    imgUrl: {
        type: String,
      },

    name: {
        type: String,
        
    },

    age: {
        type: Number,
        
    },

    birthday: {
        type: String,
        
    },
        
    height: {
        type: String,
        
    },

    weight: {
        type: String,
        
    },

    gender : {
        type: String,
    },

    state : {
        type: String,
    },
        
    sport: {
        type: String,
        
    },

    position: {
        type: String,
        
    },
        
    email: {
        type: String,
        
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
    

    comment: {
        type: [{
              comment: {
                type: String,
              },
              userId: {
                type: String,
              },
              role: {
                type: String,
              }
          }],
        default: [],
    },

    approved : {
        type: Boolean,
        required : true,
    }

    
    
}, {timestamps: true});

module.exports =  mongoose.model("Account", AccountSchema)


// module.exports = (sequelize, DataTypes) => {

//     const Account = sequelize.define("Account", {

//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
        
//         role: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         refresh_token : {
//             type: DataTypes.TEXT,
            
//         },

//         profile_image : {
//             // type: DataTypes.ARRAY(DataTypes.TEXT),
//             // defaultValue: [],
//             type: DataTypes.STRING,
//         },

//         tryArray: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             get() {
//                 return this.getDataValue('tryArray').split(';')
//             },
//             set(val) {
//                this.setDataValue('tryArray',val.join(';'));
//             },
//         },

        
//     });

//     Account.associate = (models) => {
//         Account.hasOne(models.Profile)

//         Account.hasMany(models.Inventory)

//         // Account.hasMany(models.Comment)
//     }

//     return Account;
// } 