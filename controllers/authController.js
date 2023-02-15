const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require('../models/orders')
// const {sendotp,verifyotp}= require('../config/otp')
const Cart = require('../models/cart')

//for the user validation
const hadleErrors = (err) => {
  console.log(err.message, err.code);
  const errors = {
    email: "",
    password: "",
    name: "",
    username: "",
    mobile: "",
  };

  if (err.message === "incorect email") {
    errors.email = "email not registered";
    return errors;
  }

  if (err.message === "incorect password") {
    errors.password = "wrong password";
    return errors;
  }
  if (err.message === "you are blocked by the admin") {
    errors.email = "your account were blocked";
    return errors;
  }

  if (err.code === 11000) {
    errors.email = "the email is already taken";
    return errors;
  }


  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};


//creating a token an returnin it for to send throgh cookie
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.userKey, {
    expiresIn: maxAge,
  });
};


//routes for the signup and login
const signup_get = (req, res) => {
  res.render("user/signup");
};


const signup_post = async (req, res) => {
  const { email, password, name, username, mobile } = req.body;
  console.log(email,password,name,username,mobile)
  try {
    const user = await User.create({ email, password, name, username, mobile });
    const Token = createToken(user._id);
    res.cookie("jwt", Token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = hadleErrors(err);
    console.log(err
      )
    res.status(400).json({ errors });
  }
};



const login_get = (req, res) => {
  res.render("user/login");
};


const login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.login(email, password);
    console.log(user);
    const Token = createToken(user._id);
    res.cookie("jwt", Token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = hadleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout_get = async(req, res) => {
  res.cookie("jwt", "", { expiresIn: 1 });
  res.redirect("/");
};

//for validatin the number
const verify_get = (req, res) => {
  res.render("user/mobile");
};

const verify_post = (req, res) => {
  const { number } = req.body;
  res.render("user/otp");
};


const forgot_password = (req,res) =>{
  res.render('user/forgotPass')
}


module.exports = {
  verify_get,
  verify_post,
  logout_get,
  signup_get,
  login_get,
  login_post,
  forgot_password,
  signup_post
};
