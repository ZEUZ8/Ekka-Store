const mongoose =require("mongoose");
const {isEmail} = require("validator")
const bcrypt =  require('bcrypt')

//creating a schema for tha emial and password 
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        lowercase:true,
    },
    name:{
        type:String,
        required:[true,"please enter your name"],
        lowercase:true,
        minlength:[4,"enter atleast 4 charecter"]
    },
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
    mobile:{
        type:Number,
        required:[true,"enter your phone number"],
        minlength:[10,"please check your number again"],
      
    },
    block:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
}
)


// fire a function and hashing the password before saving it
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})


//for login 
userSchema.statics.login = async function(email,password){
    const user  =  await User.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password,user.password) 
        if(user.block){
            if(auth){
                return user;
            }
            throw Error('incorect password')
        }
        else{
            throw Error('you are blocked by the admin')
        }
    }
    throw Error('incorect email')
}


//exporting the module
const User = mongoose.model('user',userSchema)


module.exports = User;
