const mongoose = require("mongoose");
const Notification = mongoose.model(
    "Notification",
    new mongoose.Schema({
        NotTitle:{
            type:String
        },
        NotPhoto:{
            type:String
        },
        NotBody:{
            type:Number
        },
    },
    { timestamps: true })
);
module.exports = Notification;