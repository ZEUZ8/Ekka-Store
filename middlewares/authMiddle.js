const jwt = require('jsonwebtoken');
const { findById, findOne } = require('../models/User');
const User = require('../models/User');
const Cart = require('../models/cart');
const Admin = require('../models/Admin');
const userAddres = require('../models/userAddress');
require('dotenv').config();


//checking the admin token for the next process
const adminChek = (req,res,next)=>{
    const Token =  req.cookies.admin;
    if(Token){
        jwt.verify(Token,process.env.adminKey,async(err,decodedToken)=>{
            if(err){
                res.locals.admin = null
                res.redirect('/admin_login')
            }else{
                let admin = await Admin.findById(decodedToken.id)
                res.locals.user = admin;
                next()
            }
        })
    }else{
        res.locals.admin = null;
        res.redirect('/admin_login')
    }
}


const checking = (req,res,next)=>{
    const Token =  req.cookies.jwt;
    if(Token){
        jwt.verify(Token,process.env.userKey,async(err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                next()
            }else{
                let user = await User.findById(decodedToken.id)
                if(user.block){
                    console.log("entered to the block  function ")
                    res.locals.user = user;
                    next()
                }
                else{
                    console.log("the functio souold call afer the call becaome to the ener the fuction")
                    res.render('user/blockedPage')
                }
               
            }
        })
      
    }else{
        res.locals.user = null;
        res.redirect('/login')
    }
}


//checking the current user and validating the user for the nex proccess
const userCheck = (req,res,next)=>{
    console.log(req.params)
    const Token =  req.cookies.jwt;
    if(Token){
        console.log(Token)
        jwt.verify(Token,process.env.userKey,async(err,decodedToken)=>{
            console.log(process.env.userKey)
            if(err){
                res.redirect('/login')
                res.locals.user = null;
            }else{
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                const {id} = decodedToken
                res.locals.user = user;
                next()
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}





module.exports = {checking,adminChek,userCheck,}