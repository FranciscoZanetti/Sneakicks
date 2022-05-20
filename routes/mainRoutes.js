const express = require('express');
const router = express.Router();


const mainController = require('../controllers/MainController');

router.get('/', mainController.index);

router.get('/login/', mainController.login);

router.get('/register/', mainController.register);

router.get('/cart/', mainController.cart);


module.exports = router;