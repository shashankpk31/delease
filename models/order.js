const mongoose = require("mongoose");
const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        customer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        logistic:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Logistic"
        },
        OrderDetail:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetail"
        },
        Track:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track"
        },
        Payment:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        },
        Feedback:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback"
        }
    },
    { timestamps: true })
);
module.exports = Order;