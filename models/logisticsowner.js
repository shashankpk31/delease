const mongoose = require("mongoose");
const LogisticOwner = mongoose.model(
    "LogisticOwner",
    new mongoose.Schema({
        logisticsOwnerName: {
            type: String,
        },
        logisticsOwnerEmail: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: "Email address is required",
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        logisticsOwnerContact: {
            type: String,
        },
        logisticsOwnerAddress: {
            type: String,
        },
        logisticsOwnerState: {
            type: String,
        },
        logisticsOwnerDistrict: {
            type: String,
        },
        logisticsOwnerAadhar: {
            type: String,
        } ,
        logisticsOwnerUpiId: {
            type: String,
        },
    }, { timestamps: true })
);
module.exports = LogisticOwner;
