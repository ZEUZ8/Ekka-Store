const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    bannerId:{
        type:Number,
    },
    titleName:{
        type:String,
    },
    title:{
        type:String,
    },
    link:{
        type:String,
    },
    discription:{
        type:String
    },
    image:{
        type:Array
    }
},
{
    timestamps:true
});

const Banner = mongoose.model("banner", bannerSchema);

module.exports = Banner;
