const express = require('express');
const router = express.Router();
const path = require('path');

const productMiddlewares = require('../../middlewares/productMiddlewares');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb) => {cb(null, path.join(__dirname, "../../public/img/products/"))},
    filename: (req,file,cb) => {
        let newFilename = Date.now()+"-image-product"+path.extname(file.originalname);
        cb(null, newFilename);
    }
})
const uploadFile = multer({storage});

const productsApiController = require('../../controllers/apis/productsApiController');

router.get('/', productsApiController.list);
router.get('/:id', productsApiController.detail);

module.exports = router;