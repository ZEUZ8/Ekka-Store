const jwt = require("jsonwebtoken");
const upload = require("../middlewares/multer");
const Acategory = require("../models/category");
const adminChek = require("../middlewares/authMiddle");
const Coupon = require("../models/coupon");
const moment = require('moment');

//handle errors for the backend
const handleCategoryError = (err) => {
  console.log(err.message, err.code);
  const errors = { Discription: " ", Category: " " };

  if (err.code === 11000) {
    errors.Category = "it's already declared try another name";
    return errors;
  }
  if (err.message.includes("categorie validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const add_catogories_post = async (req, res) => {
  const { Category, Discription } = req.body;
  console.log(Category, Discription);
  try {
    const category = await Acategory.create({ Discription, Category });
    res.status(200).json(category);
  } catch (err) {
    const errors = handleCategoryError(err);
    res.status(400).send({ errors });
  }
};

const add_catogories_get = (req, res) => {
  res.render("admin/addCategories");
};

const admin_category = async (req, res) => {
  const data = await Acategory.find({});
  res.render("admin/category", { data });
};
;



//coupon
const Create_admin_coupon = async(req,res)=>{
  res.render('admin/createCoupon')
}

// const edit_coupon = async (req,res)=>{
//   const id = req.params.id
//   const coupon = await Coupon.findOne({_id:id})
//   res.render("admin/createCoupon",{coupon})
// }

const coupons = async(req,res)=>{
  const coupons = await Coupon.find({}).sort( { createdAt : -1} )
  res.render('admin/coupons',{coupons,})
}

const create_coupon = async(req,res)=>{
  const {couponCode,couponTitle,startDate,status,endDate,couponQuantity,couponType,couponDiscount} = req.body.data
  console.log(status)
  if(await Coupon.findOne({couponCode:couponCode})){
    res.json({status:false})
  }else{
  const creart = await Coupon.create({couponCode:couponCode,startDate:startDate,endDate:endDate,discount:couponDiscount,couponTitle:couponTitle,qunatity:couponQuantity,discountType:couponType,couponStatus:status})
  console.log("coupon created")
  }
}

const coupon_active = async(req,res)=>{
  const id = req.params.id
  const update = await Coupon.updateOne({_id:id},{couponStatus:true})
  console.log(update)
  res.redirect('/adminCoupons')
}

const coupon_disable = async(req,res)=>{
  const id = req.params.id
  console.log(id)
  const update = await  Coupon.updateOne({_id:id},{couponStatus:false})
  console.log(update)
  res.redirect('/adminCoupons')

}

const coupne_remove = async(req,res)=>{
  console.log("remove funcion called")
  const id = req.params.id
  const update = await Coupon.deleteOne({_id:id})
  res.json({result:true})
}




module.exports = {
  add_catogories_post,
  admin_category,
  add_catogories_get,
  Create_admin_coupon,
  coupons,
  create_coupon,
  coupon_active,
  coupon_disable,
  coupne_remove
};
