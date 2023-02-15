const mongoose = require('mongoose');

const user_address = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    addreses:[{
        addres1:{
            type:String,
            required:[true,"please enter your address"]
    
        },
        addres2:{
            type:String,
            urequired:[true,"please enter your address"]
        },
        city:{
            type:String,
            required:[true,"enter your city"]
        },
        country:{
            type:String,
            required:[true,"enter your country "]
        },
        pincode:{
            type:Number,
            required:[true,"please enter your pincode"]
        },
        mobile:{
            uniqe:true,
            type:Number,
            required:[true,"please enter youu mobile"],
            minlength:10
        }
    }]
})

const userAddres = mongoose.model("userAddres",user_address)

module.exports= userAddres