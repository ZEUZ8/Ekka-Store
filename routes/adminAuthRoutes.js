const {Router} = require("express");
const router = Router();
const { adminLogin } = require("../middlewares/jwtToken");


const {
    admin_login_get,
    admin_login_post,
    adminlogout,
    admin
} = require('../controllers/adminAuthController');
const { adminChek } = require("../middlewares/authMiddle");


router.get('/admin',adminChek,admin)
router.get('/admin_login',adminLogin,admin_login_get)
router.post('/admin_login',admin_login_post)
router.get('/admin/admin_logout',adminlogout)





module.exports=router
