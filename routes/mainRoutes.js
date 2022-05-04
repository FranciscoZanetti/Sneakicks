const express = require('express');
const router = express.Router();

const mainController = require('../controllers/MainController');

router.get('/', mainController.index);

router.get('/login/', mainController.login);

router.get('/register/', mainController.register);

router.get('/product/', mainController.productDetail);

router.get('/cart/', mainController.cart);

router.get('/manageProduct', mainController.manageProduct);

module.exports = router;