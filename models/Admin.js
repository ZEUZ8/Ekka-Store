const mongoose =require("mongoose");
const {isEmail} = require("validator")
const bcrypt =  require('bcrypt')

//creating a schema for tha emial and password 
const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required : [true,"please add a email "],
        unique : true,
        lowercase : true,
        validate : [isEmail,"enter a valid emial"]
    },
    password:{
        type:String,
        required : [true,'enter your password'],
        minlength : [6,"minimum lenght is 6 "]
    },
})

// fire a function and hashing the password before saving it
adminSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})


adminSchema.statics.adminlogin = async function(email,password){
    const user  =  await Admin.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password,user.password) 
        if(auth){
            return user;
        }
        throw Error('incorect password')
    }
    throw Error('incorect email')
}


const Admin = mongoose.model('admin',adminSchema)

module.exports = Admin;