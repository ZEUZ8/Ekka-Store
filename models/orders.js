const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        deliveryAddress:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'userAddres'
        },
        products:[{
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product',
            },
            quantity:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            }
        }],
        total: {
            type: Number,
            required: true
        },
        payment_method:{
            type:String
        },
        payment_status:{
            type:String
        },
        orderStatus:{
            type:String,
            default:'pending'
        },
        usedCoupon:{
            type:String
        },
        discountPrice:{
            type:Number
        },
        grantTotal:{
            type:Number
        },
        orderId:{
            type:Number
        },
        status:{
            type:String
        },finalPrice:{
            type:Number
        }
    },
    {
        timestamps:true
    }
);


const Order = mongoose.model("order",orderSchema)

module.exports = Order