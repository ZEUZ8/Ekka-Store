const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const Acategory = require("../models/category");
const Banner = require('../models/banner')

//handle errors for the backend
const productError = (err) => {
  console.log(err.message);
  let errors = {
    name: "",
    color: "",
    quantity: "",
    variant: "",
    price: "",
    vendor: "",
    category: "",
    image: "",
  };

  if (err.message.includes("Prodect validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

let add_product_get = async (req, res) => {
  const data = await Acategory.find({});
  res.render("admin/add-product", { data });
};

let add_product_post = async (req, res) => {
  const { name, color, quantity, variant, price, vendor, category } = req.body;
  const result = req.files;
  const image = result.map((val) => val.filename);
  try {
    const product = await Product.create({
      name,
      color,
      quantity,
      variant,
      price,
      vendor,
      category,
      image,
    });
    if (product) {
      res.redirect("/admin/products");
    } else {
      console.log("error");
    }
  } catch (err) {
    const errors = productError(err);
    res.status(400).json(errors);
  }
};

//===========================admin products ===========================================

let admin_products = async (req, res) => {
  const product = await Product.find({});
  res.render("admin/products", { product });
};

//=====================admin product details=========================
//showin with respons of te edit and showin data
let admin_prodect_editpage = async (req, res) => {
  let id = req.params.id;

  let details = await Product.findOne({ _id: id });
  let category = await Acategory.find({});
  res.render("admin/product-details", { details, category });
};

let admin_update_prodect = async (req, res) => {
  let id = req.params.id;
  const { name, category, color, quantity, price, vendor } = req.body;
  const result = req.files;
  const image = result.map((val) => val.filename);
  const findingForUpdate = await Product.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        category: category,
        color: color,
        quantity: quantity,
        price: price,
        vendor: vendor,
        image: image,
      },
    }
  );
  if (findingForUpdate) {
    res.redirect("/admin/products");
  } else {
    res.redirect("/admin/product_details");
  }
};

//making the delete boolean tru
let admin_prduct_delete = async (req, res) => {
  let id = req.params.id;
  const deltData = await Product.findOne({ _id: id });
  const upadte = await Product.updateOne({ _id: id }, { delete: false });
  res.redirect("/admin/products");
};
//;making the delte boolean false
let admin_prduct_undelete = async (req, res) => {
  let id = req.params.id;
  const deltData = await Product.findOne({ _id: id });
  const upadte = await Product.updateOne({ _id: id }, { delete: true });
  res.redirect("/admin/products");
};

let single_product_showing = async (req, res) => {
  let id = req.params.id;
  const data = await Product.findOne({ _id: id });
  const product = await Product.find({ delete: { $ne: false } });
  if (data) {
    res.render("user/singleProduct", { data, product });
  } else {
    res.redirect("/");
  }
};



const products_page = async(req,res)=>{
  const category = await Acategory.find({});
  const data = await Product.find({ delete: { $ne: false } }).limit(8);
  const banner = await Banner.find({})
  console.log("this tis the id ")
  res.render('user/products',{data,category})
}


module.exports = {
  add_product_get,
  add_product_post,
  admin_products,
  admin_prodect_editpage,
  admin_prduct_delete,
  admin_prduct_undelete,
  single_product_showing,
  admin_update_prodect,
  products_page,
};
