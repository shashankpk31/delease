const mongoose = require("mongoose");
const Logistic = mongoose.model(
    "Logistic",
    new mongoose.Schema({
        logisticsName: {
            type: String
        },
        logisticsEmail: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        logisticsContact: {
            type: String,
            length: 10
        },
        logisticsAddress: {
            type: String
        },
        logisticsState: {
            type: String
        },
        logisticsDistrict: {
            type: String
        },
        logisticsPassword: {
            type: String,
        },
        accountStatus: {
            type: String,
            default: "Active"
        },
        role: {
            type: String,
            default:"logistic"
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order"
            }
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LogisticOwner"
        },
        orderType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderType"
        }
    }, { timestamps: true })
);
module.exports = Logistic;