const {Router} = require("express");
const router = Router();
const { login } = require("../middlewares/jwtToken");

const {
    logout_get,
    signup_get,
    login_get,  
    login_post, 
    signup_post,
    forgot_password
} = require('../controllers/authController')
const Controller = require('../controllers/otp');


router.get('/signup',login,signup_get)
router.post('/signup',login,signup_post)
router.get('/login',login, login_get)
router.post('/login',login_post)
router.get('/logout',logout_get)
router.get('/forgotPassword',forgot_password)



router.get('/verify',Controller.verify_get)
router.post('/verify',Controller.verify_post)
router.post('/otpVerify/:mobile',Controller.otpVerifyPost)

// router.post('/change',Controller.otp_sendForPassword)
// router.post('/otp',Controller.otp_verifyForPassword)







module.exports=router
