// ************ Require's ************
const express = require('express');
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb) => {cb(null, path.join(__dirname, "../public/img/products"))},
    filename: (req,file,cb) => {
        let newFilename = Date.now()+"-image"+path.extname(file.originalname);
        cb(null, newFilename);
    }
})
const uploadFile = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 


router.get('/create', productsController.manageProduct);

router.post('/create', uploadFile.single("main_picture"), productsController.create);

router.get('/:id', productsController.productDetail);

module.exports = router;
