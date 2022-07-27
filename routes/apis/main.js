const express = require('express');
const router = express.Router();
const path = require('path');

const mainApiController = require('../../controllers/apis/mainApiController');

router.get('/', mainApiController.index);

router.get('/cart', mainApiController.cart);