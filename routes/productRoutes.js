// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

const productMiddlewares = require('../middlewares/productMiddlewares');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb) => {cb(null, path.join(__dirname, "../public/img/products/"))},
    filename: (req,file,cb) => {
        let newFilename = Date.now()+"-image-product"+path.extname(file.originalname);
        cb(null, newFilename);
    }
})
const uploadFile = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.productList); 

router.get('/create', productsController.manageProduct);

router.post('/create', uploadFile.array("product_pictures"),  productMiddlewares.validateManageProduct, productsController.create);

router.get('/:id', productsController.productDetail);

router.post('/:id',productMiddlewares.validateAddToCart, productsController.addToCart);

router.put('/:id/edit', uploadFile.array("product_pictures"),  productMiddlewares.validateManageProduct, productsController.editPut);

router.get('/:id/edit', productsController.editGet);

router.delete('/:id/delete', productsController.deleteDelete);

router.delete('/:id/remove-from-cart', productsController.removeFromCart);

router.get('/:id/delete', productsController.deleteGet);

router.post('/:id/adding-review', productMiddlewares.validateReviewForm, productsController.addReview);

module.exports = router;
