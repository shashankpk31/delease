const mongoose = require("mongoose");
const OrderType = mongoose.model(
  "OrderType",
  new mongoose.Schema({
    OrderBasePrice: {
      type: Number
    },
    OrderAdditionalPrice1Kg:{
      type: Number
    },
    OrderAdditionalPrice1Kg:{
      type: Number
    },
    OrderState: {
      type: String
    },
    OrderDistrict: {
      type: String
    },
    Pincode:[{
      type: String
    }] 
  }, { timestamps: true })
);
module.exports = OrderType;