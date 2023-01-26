const mongoose = require("mongoose")
// const { Sequelize } = require(".");

const InventorySchema = new mongoose.Schema({

    item_name: {
        type: String,
    required: true,
    },
    
    item_amount: {
        type: Number,
    required: true,
    },

    item_cost: {
        type: String,
    required: true,
    },

    unavailable_dates : {
        type : [Date], 
    },

    store : {
        type : String,
        // required : true
    }
    
}, {timestamps: true });

module.exports =  mongoose.model("Inventory", InventorySchema)


// module.exports = (sequelize, DataTypes) => {

//     const Inventory = sequelize.define("Inventory", {

//         item_name: {
//             type: String,
//         required: true,
//         },
        
//         item_amount: {
//             type: String,
//         required: true,
//         },

//         item_cost: {
//             type: String,
//         required: true,
//         },

        
//     })

//     return Inventory;
// } 