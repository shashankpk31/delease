const mongoose = require("mongoose");
const Item = mongoose.model(
    "Item",
    new mongoose.Schema({
        itemName:{
            type:String
        },
        itemPhoto: {
            data: Buffer,
            contentType: String,
        },
        itemWeight:{
            type:Number
        },
        itemValue:{
            type:Number
        },
    },
    { timestamps: true })
);
module.exports = Item;