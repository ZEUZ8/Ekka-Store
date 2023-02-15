const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/User');
const userCart = require('../models/cart')
const Wishlist = require("../models/wishlist")
const {ObjectId} = require("mongodb");
require('dotenv').config();



const user_cart_get = async(req,res)=>{
    const {id} = res.locals.user
    const userCart = await Cart.findOne({user:id}).populate("items.product")
    res.render('user/cart',{userCart})
}



const add_to_cart = async (req, res) => {
    console.log("product reahced from the wishlist")
    const itemId = req.params.id
    // const {price,quantity} = req.body.data
    const {id} = res.locals.user

    const data = await Product.findOne({_id:itemId})
    const product = await Product.find({delete:{$ne:false}})

    if(await Cart.findOne({user:id})){
        if(await Cart.findOne({user:id,"items.product":itemId})){       
            const add = await Cart.updateOne({user:id,"items.product":itemId},{$inc:{"items.$.quantity":1,"items.$.price":data.price,total:data.price}})   
            const dlt = await Wishlist.updateOne({userId:id,"products.productId": itemId },{$pull:{'products':{productId: itemId}}})  
            res.render('user/singleProduct',{data,product})
        }
        else{
            console.log("user in the secons stage")
            const add = await Cart.updateOne({user:id},{$push:{items:{product:itemId,quantity:1,price:data.price}},$inc:{total:data.price}})
            const dlt = await Wishlist.updateOne({userId:id,"products.productId": itemId },{$pull:{'products':{productId: itemId}}})  
            res.render('user/singleProduct',{data,product})
            console.log("data shared and sended to the client")
        }
    }
    else{
        console.log("user finded")
        const add = await Cart.create({user:id,items:[{product:itemId,quantity:1,price:data.price}],total:data.price})
        const dlt = await Wishlist.updateOne({userId:id,"products.productId": itemId },{$pull:{'products':{productId: itemId}}})  
        res.render('user/singleProduct',{data,product})
    }
}   
 


const delete_cart_item = async(req,res)=>{
    console.log("dete function")
    const itemId = req.params.id
    const {id} =res.locals.user
    const delt = await Cart.updateOne({user:id},{$pull:{"items":{"product":itemId}}}) 
    const adding = await Cart.findOne({user:id})
    const sum = adding.items.reduce((acc,curr)=>{
        return acc+=curr.price
    },0) 
    const delted = await Cart.updateOne({user:id},{total:sum}) 
    res.redirect('/cart')
}




const quantitychange = async(req,res)=>{
    const {count,userId,productId} = req.query
    try{
        const cart = await Cart.findOne({user:userId})
        const product = await Product.findById({_id:productId})
        let product_price = product.price
        // productPrice = product.price

        if(count == 1){
            const index = cart.items.findIndex((prdt)=> prdt.product == productId)
            if(cart.items[index].quantity >= product.quantity){
                res.json({ stock:true })
            }
            else{
                var upadateCart = await Cart.findOneAndUpdate({user:userId,"items.product":productId},{
                    $inc:{
                        "items.$.price":product_price,
                        "items.$.quantity":count,
                        total:product_price
                    }
                })
                let index = upadateCart.items.findIndex((object)=> object.product == req.query.productId)
                let newcart = await Cart.findOne({ user:userId });
                let qty = newcart.items[index].quantity;
                let totalprice = newcart.total;
                let price = newcart.items[index].price;
                res.json({qty,price,totalprice})
                }
        }
        else{
            const index = cart.items.findIndex((prdt)=> prdt.product == productId)
            if(cart.items[index].quantity < 2){
                res.json({delete:true})
            }
            else{
                var upadateCart = await Cart.findOneAndUpdate({user:userId,"items.product":productId},{
                    $inc:{
                        "items.$.price": -product_price,
                        "items.$.quantity": count,
                        total:-product_price
                    }
                })
                let index = upadateCart.items.findIndex((object)=> object.product == req.query.productId)
                let newcart = await Cart.findOne({ user:userId });
                let qty = newcart.items[index].quantity;
                let totalprice = newcart.total;
                let price = newcart.items[index].price;
                res.json({qty,price,totalprice})   

            }
            
        }   
    }
    catch(err){
        console.log(err)
    }
}


const paypal_place_order = async(req,res)=>{
     if(userCart.usedCoupon){
        try{
          console.log("user")
          console.log("testing for the try block1111111111");
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
            grandTotal:userCart.grantTotal
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
        console.log("testing for the try block222222222222");
        try{
          const order = await Order.create({
            userId: id,
            deliveryAddress: addresId,
            products: userCart.items,
            payment_method: "Paypal",
            payment_status: "paid",
            orderId:orderId,
            total: userCart.total,
          })
          for(i=0;i<userCart.items.length;i++){
            const id = userCart.items[i].product
            const quantity = userCart.items[i].quantity
            const update =  await Product.updateOne({_id:id},{$inc:{quantity:-quantity}})
          }
          res.json({complete:true})
        }catch(err){
          console.log(err)
          res.json({error:true})
        }
        const emptyCart = await Cart.deleteOne({ user: id });
        const find = await Cart.findOne({user:id})
        // res.render('user/checkout-complete')
      }
}



module.exports = {
    user_cart_get,
    add_to_cart,
    delete_cart_item,
    quantitychange,
    paypal_place_order,

}