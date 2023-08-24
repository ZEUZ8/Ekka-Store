const Cart = require("../models/cart");
const Acategory = require("../models/category");
const Product = require("../models/product");
const User = require("../models/User");
const { token } = require("morgan");
const userAddres = require("../models/userAddress");
const Order = require("../models/orders");
const Wishlist = require("../models/wishlist");
const Coupon = require("../models/coupon");
const CouponUsage = require("../models/couponUsage");
const Banner = require('../models/banner')



const user_block_page = (req,res)=>{
  res.render('user/blockedPage')
}



const user = async (req, res) => {
 try{
  const category = await Acategory.find({});
  const data = await Product.find({ delete: { $ne: false } }).limit(8);
  const banner = await Banner.find({})
  res.render("user/home", { data, category ,banner});
 }
 catch(err){
  console.log(err)
 }
};

const user_profile_get = async (req, res) => {
 try{
  const { id } = res.locals.user;
  const Id = req.params.body;
  const useraddres = await userAddres.findOne({ user_id: id });
  res.render("user/userProfile", { useraddres });
 }
 catch(err){
  console.log(err)
 }
};

const user_profile_post = async (req, res) => {
  const { name, email, username, password, mobile } = req.body;
  const { id } = res.locals.user;
  try {
    const update = await User.updateMany(
      { _id: id },
      {
        name: name,
        email: email,
        username: username,
        password: password,
        mobile: mobile,
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect("/profile");
};

const profile_address_get = (req, res) => {
  res.render("user/profileAddress");
};

const user_checkout = async (req, res) => {
  const addressId = req.params.id;
  const { id } = res.locals.user;
  try{
    const user_address = await userAddres.findOne({"addreses._id": addressId},{"addreses.$":1})
    const userCart = await Cart.findOne({ user: id });
    const coupon = await CouponUsage.findOne({userId:id})
    res.render("user/checkout", { user_address, userCart ,coupon,addressId, paypalclientid:process.env.paypalClientId});
  }
  catch(err){
    console.log(err)
  }
};


const payment_page = async (req, res) => {
  const { id } = res.locals.user;
  try{
    const useraddress = await userAddres.findOne({ user_id: id });
    const userCart = await Cart.findOne({ user: id });
    res.render("user/payment", { useraddress, userCart});
  }
  catch(err){
    console.log(err)
  }
};

const checkout_complete = (req, res) => {
  res.render("user/checkout-complete");
};

// for the place orer page and the count
const place_order = async (req, res) => {
  const {addresId,method} = req.query
  const {id} = res.locals.user;
  const userCart = await Cart.findOne({ user: id });
  const user_addres = await userAddres.findOne({ user_id: id });
  const orderId = Math.floor(1000 + Math.random() * 9000);
  if(!userCart){
    res.json({Nocart:true})
  }else{
    if(method == "COD"){
      if(userCart.usedCoupon){
        try{
          const order = await Order.create({
            userId: id,
            deliveryAddress: addresId,
            products: userCart.items,
            payment_method: "COD",
            payment_status: "pending",
            orderId:orderId,
            total:userCart.total,
            usedCoupon:userCart.usedCoupon,
            couponDiscount:userCart.discountPrice,
            grandTotal:userCart.grantTotal,
            finalPrice : userCart.grandTotal
          })
          for(i=0;i<userCart.items.length;i++){
            const id = userCart.items[i].product
            const quantity = userCart.items[i].quantity
            const update =  await Product.updateOne({_id:id},{$inc:{quantity:-quantity}})
          }
          const emptyCart = await Cart.deleteOne({ user: id });
    
          const find = await Cart.findOne({user:id})
          // res.render('user/checkout-complete')
          res.json({complete:true})
        }catch(err){
          console.log(err)
          res.json({error:true})
        }
      }
      else{
        try{
          const order = await Order.create({
            userId: id,
            deliveryAddress: addresId,
            products: userCart.items,
            payment_method: "COD",
            payment_status: "pending",
            orderId:orderId,
            finalPrice : userCart.total,
            total: userCart.total,
          })
          for(i=0;i<userCart.items.length;i++){
            const id = userCart.items[i].product
            const quantity = userCart.items[i].quantity
            const update =  await Product.updateOne({_id:id},{$inc:{quantity:-quantity}})
          }
          const emptyCart = await Cart.deleteOne({ user: id });
          const find = await Cart.findOne({user:id})
          // res.render('user/checkout-complete')
          res.json({complete:true})
        }catch(err){
          console.log(err)
          res.json({error:true})
        }
      }
    }else{
      if(userCart.usedCoupon){
        const price = userCart.grandTotal
        res.json({paypal:true,complete:false,price})
      }else{
        const price = userCart.total
        res.json({paypal:true,complete:false,price})

      }
    }
  }
   
};






// //for the user validation
// const hadleErrors = (err) => {
//     console.log(err.message, err.code);
//     const errors = {
//         addres1: " ",
//         addres2: " ",
//       city: " ",
//       country: " ",
//       pincode: " ",
//       mobile:" "
//     };

//     if (err.code === 11000) {
//       errors.email = "this number is taken try anethor one";
//       return errors;
//     }
//     if (err.message.includes("userAddres validation failed")) {
//       Object.values(err.errors).forEach(({ properties }) => {
//         errors[properties.path] = properties.message;
//       });
//     }
//     return errors;
//   };

//creatin a useraddres
const addrespage_post = async (req, res) => {
  const { address1, address2, city, country, pincode, mobile } = req.body;
  const userId = req.params.id;
  const addres = await userAddres.findOne({ user_id: userId });
  try {
    if (await userAddres.findOne({ user_id: userId })) {
      const push = await userAddres.updateOne(
        { user_id: userId },
        {
          $push: {
            addreses: {
              addres1: address1,
              addres2: address2,
              city: city,
              country: country,
              pincode: pincode,
              mobile: mobile,
            },
          },
        }
      );
      res.redirect("/checkout");
    } else {
      const add = await userAddres.create({
        user_id: userId,
        addreses: [
          {
            addres1: address1,
            addres2: address2,
            city: city,
            country: country,
            pincode: pincode,
            mobile: mobile,
          },
        ],
      });
      res.redirect("/checkout");
    }
  } catch (err) {
    const errors = hadleErrors(err);
    // res.status(400).json({errors});
  }
};

// const create_wishlist = async(req,res)=>{
//     const {id} = res.locals.user
//     const itemId = req.params.id
//     const wishlist = await Wishlist.create({userId:id,productId:itemId})
// }

const show_wishlist = async (req, res) => {
  res.locals.discountValue = 50
  const { id } = res.locals.user;
  const pooo = await Wishlist.findOne({ userId: id }).populate(
    "products.productId"
  );
//   let pooo = wishlist.products
  res.render("user/wishlist", {pooo});
};



const create_wishlist = async (req, res) => {
  const { id } = res.locals.user;
  const itemId = req.params.id;
  if (await Wishlist.findOne({ userId: id })) {
    if (await Wishlist.findOne({ userId: id, "products.productId": itemId })) {
        res.json({ item: true });
    }
    else{
        const pushing = await Wishlist.updateMany({userId:id},{$push:{products:{productId:itemId}}})
        res.json({item:false})
    }
  } else {
    const add = await Wishlist.create({
      userId: id,
      products: [{ productId: itemId }],
    });
    res.json({item:false})
  }
};


const delete_wishlist = async(req,res)=>{
    const {id} = res.locals.user;
    const itemId = req.params.id;
    const dlt = await Wishlist.updateOne({userId:id,"products.productId": itemId },{$pull:{'products':{productId: itemId}}})  
    res.json({result:true})
}

const clear_wishlist = async(req,res)=>{
    const {id} = res.locals.user;
    const dlt = await Wishlist.updateOne({userId:id},{products:[]})
    res.json({last:true})
}

const update_address = async(req,res)=>{
  const userId = req.query.userId
  const {address1,address2,city,country,pincode,mobile,id} = req.body
  try{
    const update = await userAddres.updateOne(
      {user_id:userId,'addreses._id':id},
      {
        $set:{
          'addreses.$.addres1':address1,
          'addreses.$.address2':address2,
          'addreses.$.city':city,
          'addreses.$.country':country,
          'addreses.$.pincode':pincode,
          'addreses.$.mobile':mobile
        }
      }
      )
    res.json({result:true})
  }catch(err){
    console.log(err)
    res.json({result:false})
  }
}


const user_coupon = async(req,res)=>{
  const {coupan} = req.body.data
  const {id} = res.locals.user
  const cart = await Cart.findOne({user:id})
  const coupons = await Coupon.findOne({couponCode:coupan})
  if(coupons){
    if(await Order.findOne({userId:id,usedCoupon:coupan})){
      
      res.json({unique:true})
     }else{
      if(cart.total<coupons.minrate){
        const minrate = coupons.minrate
        res.json({minrate})
      }else{
        const start = Date.now()
        if( start =>coupons.startDate && start <= coupons.endDate){
          if(coupons.discountType == 'fixed'){
            const result = (cart.total - coupons.discount)
            const couponUpdate = await Cart.updateOne({user:id},{usedCoupon:coupan,couponDiscount:coupons.couponDiscount,grandTotal:result})
            res.json({coupan:true})
          }else{
            const result = (cart.total - coupons.discount*cart.total/100)
            const couponUpdate = await Cart.updateOne({user:id},{usedCoupon:coupan,couponDiscount:coupons.couponDiscount,grandTotal:result})
            res.json({coupan:true})
          }
        }
        else{
          res.json({timeError:true})
        }
      }
    
     }
  }else{
    res.json({couponError:true})
  }
}





const track_order = async(req,res)=>{
  const {id} = res.locals.user
  const orders = await Order.find({userId:id}).sort({updatedAt:-1})
  res.render('user/trackOrder',({orders}))
}


const single_order_details = async(req,res)=>{
  const id = req.query.id
  const order = await Order.findOne({orderId:id}).populate("products.product")
  const addressId = await Order.findOne({orderId:id})
  const address = await userAddres.aggregate([{$unwind:{path:'$addreses'}},{$match:{'addreses._id':addressId.deliveryAddress}}])
  res.render('user/orderDetails',{order,address})
}

const cancel_order = async(req,res)=>{
  const orderId = req.params.id
  const order = await Order.findOne({orderId:orderId})
  try{
    const deleteorder = await Order.updateOne({orderId:orderId},{$set:{payment_status:"refunded",orderStatus:"cancelled"}})
    for(i=0;i<order.products.length;i++){
      const id = order.products[i].product
      const quantity = order.products[i].quantity
      const update =  await Product.updateOne({_id:id},{$inc:{quantity:+quantity}})
    }
    res.json({cancel:true})
  }
  catch(err){
    console.log(err)
  }
}



const search =async(req,res)=>{
  const value = req.params.id
  try{
    const regex = new RegExp(`^${value}`,"i")
    const result = await Product.find({$or:[{name:{$regex:regex}},{vendor:{$regex:regex}},{category:{$regex:regex}}]})
    if(result.length>0){
      res.json({result})
    }else{
      res.json({dataError:true})
    }
  }catch(err){
    console.log(err)
  }
}




const test = (req,res)=>{
  res.render('user/checkout-complete')
}


//for the error page
const errorpage = (req, res) => {
  res.render("user/404page");
};


module.exports = {
  user_block_page,
  user_profile_get,
  user,
  user_profile_post,
  profile_address_get,
  user_checkout,
  place_order,
  errorpage,
  addrespage_post,
  payment_page,
  checkout_complete,
  show_wishlist,
  create_wishlist,
  delete_wishlist,
  clear_wishlist,
  user_coupon,
  track_order,
  single_order_details,
  cancel_order,
  test,
  search,
  update_address
};
