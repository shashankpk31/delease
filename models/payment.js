const mongoose = require("mongoose");
const Payment = mongoose.model(
    "Payment",
    new mongoose.Schema({
        pay_amount:{
            type:String
        },
        payment_mode:{
            type:String
        },
        payment_proof:{
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true })
);
module.exports = Payment;