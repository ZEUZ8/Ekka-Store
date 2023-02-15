const Admin = require("../models/Admin")
const User = require('../models/User')
const Cart = require("../models/cart")
const Order = require('../models/orders')
const userAddres = require('../models/userAddress')
const Banner = require('../models/banner')
const { find } = require("../models/User")



let admin_custormers_get = async(req,res)=>{
    const users = await User.find({})
    const userCart = await Cart.find({})
    const order = await User.aggregate([
        {$lookup:
            {from:"orders",localField:"_id",foreignField:"userId",as:"oreders"},
        },
        {$unwind:{path:'$oreders'}},
        {
            $group:{
                _id:"$oreders.userId",
                order_count:{$sum:1},
                grandtotal:{$sum:'$oreders.finalPrice'}
            }
        }
    ])
    console.log(order,'this the arrqy')
    res.render('admin/custormers',{order,users,userCart})
}

//blocking and unblocking 
let custormer_block = async(req,res)=>{
    const id = req.params.id
    const status = await User.updateOne({_id:id},{$set:{block:true}})
    if(status){
        res.redirect('/admin/admin_custormers')
    }
    else{
        res.redirect('/admin/admin_custormers')
    }
}

let custormer_unblock = async(req,res)=>{
    const id = req.params.id
    const status = await User.updateOne({_id:id},{$set:{block:false}})
    if(status){
        res.redirect('/admin/admin_custormers')
    }
    else{
        res.redirect('/admin/admin_custormers')
    }
}


const show_order = async(req,res)=>{
    const orders = await Order.find({}).populate([{path:"userId"},{path:"deliveryAddress"},{path:"products._id"}]).sort( { createdAt : -1} )
    console.log(orders)
    res.render('admin/orders',{orders})
}


const order_details =  async(req,res)=>{
    const {id} = req.query
    console.log(id)
    const order = await Order.findOne({orderId:id}).populate([{path:"userId"},{path:"products.product"}])
    console.log(order)
    const addressId = await Order.findOne({orderId:id})
    const address = await userAddres.aggregate([{$unwind:{path:'$addreses'}},{$match:{'addreses._id':addressId.deliveryAddress}}])
    res.render('admin/orderDetails',{order,address})
}



const payment_status_change = async(req,res)=>{
    const {data,orderId} = req.query
    try{
    const update = await Order.updateOne({orderId:orderId},{payment_status:data})
    res.json({update:true})
    }catch(err){
        console.log(err)
    }
}

const order_status_changing = async(req,res)=>{
    const {data,orderId} = req.query
    console.log(data,'this is only for the test')
    try{
    const update = await Order.updateOne({orderId:orderId},{orderStatus:data})
    res.json({update:true})
    }catch(err){
        console.log(err)
    }
}


const yearly_report = async(req,res)=>{
    console.log("function called and entered")
    try{
        const report = await Order.aggregate([
            {
                $match:{
                    orderStatus:{$eq:'delivered'}
                },
            },
            {
                $group:{
                    _id:{
                        year: {$year:"$createdAt"}
                    },
                    total:{$sum:"$finalPrice"},
                    items:{$sum:{$size:"$products"}},
                    count:{$sum:1}
                },
            },
            {$sort:{createAt:-1}}
        ])
        res.render('admin/yearlyReport',{report})
        console.log(report)
    }catch(err){
        console.log(err)
    }
}



const month_report = async(req,res)=>{
    console.log("i am in the ")
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "Septemper",
        "October",
        "November",
        "December",
    ];
    try{
        const month = await Order.aggregate([
            {
                $match:{
                    orderStatus:{$eq:"delivered"}
                },
            },
            {
                $group:{
                    _id:{
                        month:{$month:"$createdAt"},
                    },
                    total:{$sum:"$finalPrice"},
                    items:{$sum:{$size:"$products"}},
                    count:{$sum:1}
                }
            },
            { $sort: { createdAt: -1 } },
        ])
        const sales = month.map((el) => {
            let newRep = { ...el };
            newRep._id.month = months[newRep._id.month - 1];
        
            return newRep;
          });
        console.log("completed without an error")
        res.render('admin/monthlyReport',{sales})
    }catch(err){
        console.log(err)
    }
}

const dialy_report = async(req,res)=>{
    try{
        const report = await Order.aggregate([
            {
                $match:{
                    orderStatus:{$eq:'delivered'}
                },
            },
            {
                $group:{
                    _id:{
                        year: { $year: "$createdAt" },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: "$createdAt" }

                    },
                    total:{$sum:"$finalPrice"},
                    items:{$sum:{$size:"$products"}},
                    count:{$sum:1}
                },
            },
            {$sort:{createAt:-1}}
        ])
        res.render('admin/dailyreport',{report})
        console.log(report)
    }catch(err){
        console.log(err)
    }
}

const chart = async(req,res)=>{
    console.log("this is the test function and the ")
    try{
        console.log("try block fucntion")
        const report = await Order.aggregate([
            {
                $group:{
                    _id:{date:{$dateToString:{format:'%Y-%m-%d',date:'$createdAt'}}},
                    count:{$sum:1},
                    total:{$sum:'$finalPrice'}
                },
            },
            {$sort:{'_id.date':1}}
        ])

        console.log(report,'   this the at eh eroor')
        const dailySale = [];
        const dailyprofit = [];
        const date = [];
        for(i=0;i<report.length;i++){
            dailySale.push(report[i].total)
            dailyprofit.push(report[i].total*12/100)
            date.push(report[i]._id.date)
        }
        console.log(dailyprofit,dailySale,date)
        res.json({status:true,dailyprofit,dailySale,date})
    }catch(err){
        console.log(err)
        console.log("err catched in the block")
    }
}



const admin_banner = async(req,res)=>{
    console.log("showing he banner page ")
    const data = await Banner.find({})
    res.render('admin/banner',{data})
}

const adminAddBanner = async(req,res)=>{
    const Id = req.params.id
    console.log(Id)
    const data = await Banner.findOne({_id:Id})
    res.render('admin/addBanner',{data})
}


const bannerUpload = async(req,res)=>{
    console.log("this is the tes onw ")
    const Id = req.params.id
    const { titlename, title, discription, link } = req.body;
    const result = req.files;
    const image = result.map((val) => val.filename);
    try{
        const findingForUpdate = await Banner.updateOne(
            {
                _id:Id
            },
           {$set:
            {
                bannerId:1,
                titleName: titlename,
                title: title,
           
                discription: discription,
        
                link: link,

                image: image,
              },
            }
          );
          console.log(findingForUpdate)
        res.redirect("/banner");
    }catch(err){
        console.log(err)
    }
}




module.exports = {
    custormer_block,
    custormer_unblock,
    admin_custormers_get,
    show_order,
    order_details,
    payment_status_change,
    order_status_changing,
    yearly_report,
    month_report,
    dialy_report,
    chart,
    admin_banner,
    adminAddBanner,
    bannerUpload
}
