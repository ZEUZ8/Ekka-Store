const mongoose =require("mongoose");

const categorySchema = new mongoose.Schema({
    Category:{
        type:String,
        unique : true,
        required:[true,'Enter a category name'],
 
    },
    Discription:{
        type:String,
        required:[true,'discription must not be blank'],
    },
})




const Acategory = mongoose.model('categorie',categorySchema)

module.exports = Acategory;