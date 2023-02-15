const jwt = require('jsonwebtoken')
const User = require("../models/User")
const Admin = require("../models/Admin")




const maxAge = 1 * 24 * 60 * 60;


//creatin token  for the admin 

const adminToken = (id) =>{
    return jwt.sign({ id },process.env.adminKey,{
        expiresIn : maxAge
    })
}

//creating token for the user

const createToken = (id) =>{
    return jwt.sign({ id },process.env.userKey,{
        expiresIn : maxAge
    })
}



const login = (req,res,next)=>{
    const usertoken = req.cookies.jwt
    if(usertoken){
        jwt.verify(usertoken,process.env.userKey,async(err,payload)=>{
            if(err){
                next()
            }
            else{
                let user = await User.findById(payload.id)
                res.redirect("/")
            }
        })
    }
    else{
        next()
    }
}



const adminLogin =  (req,res,next)=>{
    const admintoken = req.cookies.admin
    if(admintoken){
        jwt.verify(admintoken,process.env.adminKey,async(err,payload)=>{
            if(err){
                next()
            }
            else{
                let user = await User.findById(payload.id)
                res.redirect("/admin")
            }
            
        })
    }
    else{
        next()
    }
}

module.exports={createToken,adminToken,login,adminLogin}