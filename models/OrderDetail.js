const mongoose = require("mongoose");
const OrderDetail = mongoose.model(
    "OrderDetail",
    new mongoose.Schema({
        OrderWeight:{
            type: Number
        },
        OrderDistance: {
            type: Number
        },
        items:[
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Item"
            }
        ],
        pickupPincode:{
            type: Number
        },
        dropPincode:{
            type: Number
        },
        orderAmount:{
            type:Number
        },
        orderStatus:{
            type:String
        }
    },
    { timestamps: true })
);
module.exports = OrderDetail;