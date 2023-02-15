const {Router} = require("express");
const router = Router();
const upload = require('../middlewares/multer')
const controller = require('../controllers/cusmtomers');
const { adminChek } = require("../middlewares/authMiddle");

//customers router 
router.get('/admin/admin_custormers',adminChek,controller.admin_custormers_get)

router.get('/admin/admin_custormer_block/:id',adminChek,controller.custormer_block)

router.get('/admin/admin_custormer_unblock/:id',adminChek,controller.custormer_unblock)

router.get('/orders',adminChek,controller.show_order)

router.get('/orderDetails',adminChek,controller.order_details)

router.put('/paymentStatus',adminChek,controller.payment_status_change)

router.put('/orderStatus',adminChek,controller.order_status_changing)

// router.get('/graph',adminChek,controller.first_graph)

router.get('/yearlyreport',adminChek,controller.yearly_report)

router.get('/monthlyreport',adminChek,controller.month_report)

router.get('/dailyreport',adminChek,controller.dialy_report)

router.get('/chart',adminChek,controller.chart)

router.get('/banner',adminChek,controller.admin_banner)

router.get('/addBanner/:id',adminChek,controller.adminAddBanner)

router.post('/banner/:id',adminChek,upload.array('image',1),controller.bannerUpload)

module.exports=router

