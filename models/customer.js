const mongoose = require("mongoose");
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    customerName: {
      type: String,
      required:true
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    customerAddress: {
      type: String,
      required:[true, 'Your Address cannot be blank.']
    },
    customerNumber: {
      type: String,
      minlength: [10, 'Phone number must be at least 10 characters.'],
      maxlength: [10, 'Phone number must be at least 10 characters.'],
      required: [true, 'Your Phone number cannot be blank.']
    },
    customerGender: {
      type: String,
      required:[true, 'Choose your gender plz.']
    },
    customerPassword: {
      type: String,
      required:[true, 'Your Password cannot be blank.']
    },
    accountStatus:{
      type: String,
      default:"Active"
    },
    customerpic:{
      data: Buffer,
      contentType: String
    },
    orders:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ],
    role:{
      type: String,
      default:"customer"
    } 
  }, { timestamps: true })
);
module.exports = Customer;

