const mongoose = require("mongoose");

const coupenUsage = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  usages: [{
      coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coupon",
      },
      usage:{
        type:Number,
        required:true,
        default:false
      },
      discountedPrice:{
        type:Number,
      }
    }],
});

const CouponUsage = mongoose.model("couponUsage",coupenUsage)

module.exports = CouponUsage

