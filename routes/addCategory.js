const {Router} = require("express");
const router = Router();
const {adminChek} = require('../middlewares/authMiddle')


const {
    add_catogories_get,
    add_catogories_post,
    admin_category,
    Create_admin_coupon,
    coupons,
    create_coupon,
    coupon_active,
    coupon_disable,
    coupne_remove
} = require('../controllers/addCategory')

//categories
router.get('/admin/add_categoies',adminChek,add_catogories_get)

router.post('/creat_category',adminChek,add_catogories_post)//the fecth method that i used in the ejs file

router.get('/admin/category',adminChek,admin_category)


//coupons
router.get('/adminCoupons',adminChek,coupons)

router.get('/createCoupon',adminChek,Create_admin_coupon)

router.post('/createCoupon',adminChek,create_coupon)

router.get('/Active/:id',adminChek,coupon_active)

router.get('/Disable/:id',adminChek,coupon_disable)

router.delete("/remove/:id",adminChek,coupne_remove)
// router.get('/editCoupon/:id',adminChek)




module.exports=router