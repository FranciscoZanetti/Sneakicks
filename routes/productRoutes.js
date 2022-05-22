// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

const middlewares = require('../middlewares/middlewares');

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

router.post('/create', middlewares.validateManageProduct, uploadFile.single("main_picture"), productsController.create);

router.get('/:id', productsController.productDetail);

router.get('/:id/edit', productsController.editGet);

router.put('/:id/edit', productsController.editPut);

router.get('/:id/delete', productsController.deleteGet);

router.delete('/:id/delete', productsController.deleteDelete);

router.post(':id/adding-review', middlewares.validateReviewForm, productsController.addReview);

module.exports = router;
