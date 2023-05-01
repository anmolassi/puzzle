//building schema
const mongoose = require("mongoose");
const gameProgressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    level:{
        type:Number,
    },
    start_time:{
        type:Date,
    },
    end_time:{
        type:Date,
    },
    submissions:{
        type:Number,
    }
});

const gameProgress = mongoose.model("gameProgress", gameProgressSchema);

module.exports = gameProgress;
