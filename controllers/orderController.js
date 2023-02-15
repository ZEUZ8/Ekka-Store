const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/User");
const userAddres = require("../models/userAddress");
const Order = require("../models/orders");
const Coupon = require("../models/coupon");
const paypal = require('@paypal/checkout-server-sdk')

const envirolment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const paypalCliend = new paypal.core.PayPalHttpClient(
  new envirolment(process.env.paypalClientId, process.env.paypalSecret)
);


const createorder=async(req,res)=>{
    const request = new paypal.orders.OrdersCreateRequest();
  
    console.log("////////");
    console.log(req.body.items[0].amount);
    const balance = req.body.items[0].amount;
  
    console.log(balance,"jj");
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: balance,
  
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: balance,
              },
            },
          },
        },
      ],
    });
    try {
      console.log(",,,,,,,");
      const order = await paypalCliend.execute(request);
      console.log(".........");
      console.log(order);
      console.log(order.result.id);
      res.json({ id: order.result.id });
    } catch (error) {
      res.redirect("/errorpage")
    }
};

const paypalOrder = async(req,res)=>{
    const {addresId,method} = req.query
    console.log(method)
    console.log(addresId,"   checking the id for the test")
    const {id} = res.locals.user;
    const userCart = await Cart.findOne({ user: id });
    const user_addres = await userAddres.findOne({ user_id: id });
    const orderId = Math.floor(1000 + Math.random() * 9000);
    if(!userCart){
        res.json({Nocart:true})
    }else{
     if(userCart.usedCoupon){
        try{
          console.log("user")
          console.log("testing for the try 9898980090909090");
          const order = await Order.create({
            userId: id,
            deliveryAddress: addresId,
            products: userCart.items,
            payment_method: "Paypal",
            payment_status: "paid",
            orderId:orderId,
            total:userCart.total,
            usedCoupon:userCart.usedCoupon,
            couponDiscount:userCart.discountPrice,
            grandTotal:userCart.grantTotal,
            finalPrice : userCart.grandTotal,

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
        console.log("usr")
        console.log("testing for the try block-------------");
        try{
          const order = await Order.create({
            userId: id,
            deliveryAddress: addresId,
            products: userCart.items,
            payment_method: "Paypal",
            payment_status: "paid",
            orderId:orderId,
            total: userCart.total,
            finalPrice : userCart.total,

          })
          for(i=0;i<userCart.items.length;i++){
            const id = userCart.items[i].product
            const quantity = userCart.items[i].quantity
            const update =  await Product.updateOne({_id:id},{$inc:{quantity:-quantity}})
          }
          const emptyCart = await Cart.deleteOne({ user: id });
          const find = await Cart.findOne({user:id})
          res.json({complete:true})
        }catch(err){
          console.log(err)
          res.json({error:true})
        }
       
        // res.render('user/checkout-complete')
      }
    }
}



module.exports={
    createorder,
    paypalOrder,
}