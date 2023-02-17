const {Router} = require("express");
const router = Router();
const upload = require('../middlewares/multer')
const { userCheck, checking, adminChek } = require("../middlewares/authMiddle");


const {
    add_product_get,
    add_product_post,
    admin_products,
    admin_prodect_editpage,
    admin_update_prodect,
    admin_prduct_delete,
    single_product_showing,
    admin_prduct_undelete,
    products_page,
    brandSelect,
    category_filter
} = require('../controllers/product')

//==============================for adding products========================
router.get('/add_product',adminChek,add_product_get)

router.post('/add_product',adminChek,upload.array('image',3),add_product_post)

router.post('/brand',adminChek,brandSelect)

router.get('/admin/products',adminChek,admin_products)

router.get('/admin/admin_product_edit/:id',adminChek,admin_prodect_editpage)

router.post('/admin/admin_update_product/:id',adminChek,upload.array('image',3) ,admin_update_prodect)

router.get('/admin/admin_product_delete/:id',adminChek,admin_prduct_delete)

router.get('/admin/admin_product_undelete/:id',adminChek,admin_prduct_undelete)



//=============showing the user single  product details ==========================
const {
    user_cart_get,
    add_to_cart,
    delete_cart_item,quantitychange,
    
} = require('../controllers/cartController');


router.get('/product/:id',userCheck,single_product_showing)

router.get('/cart',checking,user_cart_get)

router.post('/cart/:id',checking,add_to_cart)

router.get('/delete-item/:id',checking,delete_cart_item)

router.patch("/cart",checking,quantitychange)

router.get('/shop',checking,products_page)

router.post('/products',checking,category_filter)


module.exports= router;