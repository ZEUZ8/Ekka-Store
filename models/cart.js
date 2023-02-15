const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required:true
    },
    quantity: {
      type: Number,
      required: true,

    },
    price:{
      type:Number,
      required:true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  couponDiscount:{
    type:Number,
  },
  usedCoupon:{
    type:String
  },
  grandTotal:{
    type:Number,
  }
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart
