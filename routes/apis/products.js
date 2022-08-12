const express = require('express');
const router = express.Router();
const path = require('path');

const productMiddlewares = require('../../middlewares/productMiddlewares');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb) => {cb(null, path.join(__dirname, "../../public/img/products/"))},
    filename: (req,file,cb) => {
        console.log(req.body.product_pictures);
        let newFilename = Date.now()+"-image-product"+path.extname(file.originalname);
        cb(null, newFilename);
    }
})
const uploadFile = multer({storage});

const productsApiController = require('../../controllers/apis/productsApiController');

router.get('/', productsApiController.list);
router.get('/by-size-range', productsApiController.listBySizeRange);
router.post('/create', uploadFile.array("product_pictures"), productMiddlewares.validateManageProduct, productsApiController.create);
router.get('/:id', productsApiController.detail);
router.post('/:id', productsApiController.addToCart);
router.get('/:id/reviews', productsApiController.reviews);
router.get('/:id/adding-review', productMiddlewares.validateReviewForm, productsApiController.addReview);
router.put('/:id/edit', uploadFile.array("product_pictures"),  productMiddlewares.validateManageProduct, productsApiController.editPut);
router.delete('/:id/delete', productsApiController.deleteDelete);

module.exports = router;