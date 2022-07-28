const express = require('express');
const router = express.Router();
const path = require('path');

const mainApiController = require('../../controllers/apis/mainApiController');

router.get('/brands', mainApiController.brands);

// router.get('/cart', mainApiController.cart);

module.exports = router;