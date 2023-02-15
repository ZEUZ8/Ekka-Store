const mongoose = require("mongoose");

const coupon = new mongoose.Schema({
  couponCode:{
    type:String,
  },
  startDate: {
    type: Date,
  },
  endDate:{
    type:Date
  },
  couponStatus: {
    type: Boolean,
  },
  discount: {
    type: String,
  },
  couponTitle:{
    type:String,
  },
  discountType:{
    type:String
  },
  qunatity:{
    type:Number
  },
  used:{
    type:Number,
    default:0
  },
},
{
  timestamps:true
}
);

const Coupon = mongoose.model("coupon",coupon)

module.exports = Coupon

