const {Router} = require("express");
const router = Router();
const {userCheck,checking } = require("../middlewares/authMiddle");


const {
    user,
    user_profile_get,
    user_profile_post,
    user_checkout,
    place_order,
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
    user_block_page,
    cancel_order,
    test
} = require('../controllers/userController');



router.get('/',userCheck,user)

router.get('/userBlock',user_block_page)

router.get('/profile',checking,user_profile_get)

router.post('/profile',checking,user_profile_post)


router.get('/checkout',checking,payment_page)

router.get('/payment/:id',checking,user_checkout)

router.get('/placeOrder',checking,place_order)//placing the ordser

router.get('/complete',checking,checkout_complete)//showing complete page after the order placed




router.post('/address/:id',checking,addrespage_post)

router.get("/wishlist",checking,show_wishlist)

router.post('/wishlist/:id',checking,create_wishlist)

router.delete('/wishlist/:id',checking,delete_wishlist)

router.delete('/clearWishlist',checking,clear_wishlist)


router.post('/coupon',checking,user_coupon)

router.get('/trackOrder',checking,track_order)

router.get('/order',checking,single_order_details)

router.put('/order/:id',checking,cancel_order)

router.get('/test',checking,test)


const Controller = require('../controllers/orderController')

router.post('/create-order',checking,Controller.createorder)

router.get('/paypalOrder',checking,Controller.paypalOrder)


module.exports =  router;