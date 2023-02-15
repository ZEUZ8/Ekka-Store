const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter a product name"]
    },
    color:{
        type:String,
        required:t=[true,'Enter a color']
    },
    quantity:{
        type:Number,
        required:[true,'Enter the quantity']
    },
    variant:{
        type:String,
        required:[true,'Enter the variant']
    },
    price:{
        type:Number,
        required:[true,"enter the price"]
    },
    vendor:{
        type:String,
        required:[true,'please enter the vendor']
    },
    category:{
        type:String,
        required:[true,'please select the category']
    },
    image:{
        type:Array,
        required:[true,'cannot upload without images']
    },
    delete:{
        type:Boolean,
        default:true
    }
    
})

const Product = mongoose.model('product',productschema)

module.exports = Product;