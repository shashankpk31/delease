const mongoose = require("mongoose");
const Feedback = mongoose.model(
    "Feedback",
    new mongoose.Schema({
        Order:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
        description:{
            type:String
        },
        rating:{
            type:Number
        }
    },
    { timestamps: true })
);
module.exports = Feedback;