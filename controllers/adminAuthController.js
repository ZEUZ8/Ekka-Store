const Admin = require("../models/Admin");
const Order = require('../models/orders')
const jwt = require("jsonwebtoken");
const User = require('../models/User')

//fuction for validation
const hadleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.message === "incorect email") {
    errors.email = "email not registered";
    return errors;
  }

  if (err.message === "incorect password") {
    errors.password = "wrong password";
  }
  if (err.message.includes("admin validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//creating a token an returnin it for to send throgh cookie
const maxAge = 1 * 24 * 60 * 60;
const adminToken = (id) => {
  return jwt.sign({ id }, process.env.adminKey, {
    expiresIn: maxAge,
  });
};

//for admin login ======
const admin_login_get = (req, res) => {
  console.log("admin login router got ")
  res.render("admin/admin-login");
};




const admin = async(req, res) => {
  const orders = await Order.find({}).populate([{path:"userId"},{path:"deliveryAddress"},{path:"products._id"}]).sort( { createdAt : -1} ).limit(6)

  const count = await User.find({}).count()
  const best = await Order.find({orderStatus : 'delivered'}).populate('userId').sort({finalPrice:-1}).limit(5)
    try{
      const soldprodut = await Order.aggregate([
        {
          $match:{
            orderStatus:{$eq:"delivered"}
          },
        },
        {
          $group:{
            _id:{
              year: {$year:"$createdAt"}
            },
            total:{$sum:"$finalPrice"},
            items:{$sum:{$size:"$products"}},
          },
        },
      ])
      console.log(soldprodut)
      res.render("admin/home",{
        orders,
        best,
        soldprodut,
        count,
      });
      console.log("entered to teh functin")
    }catch(err){
      console.log(err)
    }
};




const admin_login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password + "pass");
  try {
    const user = await Admin.adminlogin(email, password);
    console.log(user);
    const Token = adminToken(user._id);
    res.cookie("admin", Token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = hadleErrors(err);
    res.status(400).json({ errors });
  }
};


const adminlogout = (req, res) => {
  res.cookie("admin", " ", { expiresIn: 1 });
  res.redirect("/admin");
};

module.exports = {
  adminlogout,
  admin_login_post,
  admin_login_get,
  admin,
};
