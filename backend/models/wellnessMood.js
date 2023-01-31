const mongoose = require("mongoose")

    const MoodSchema = new mongoose.Schema({

        userId: {
            type: String,
            required: true,
        },
        
        wellnessmood: {
            type: String,
            required: true,
            
        },
        injuryInput: {
            type: Number,
            required: true,
            
        },

        
    }, {timestamps: true})

    module.exports =  mongoose.model("Mood", MoodSchema)