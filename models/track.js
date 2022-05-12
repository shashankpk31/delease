const mongoose = require("mongoose");
const Track = mongoose.model(
    "Track",
    new mongoose.Schema({
        Order:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
        Status:[{
            type:String
        }],
        Location:[{
            type:String
        }]
    },
    { timestamps: true })
);
module.exports = Track;