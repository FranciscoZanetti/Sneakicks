const express = require('express');
const router = express.Router();
const path = require('path');

const mainApiController = require('../../controllers/apis/mainApiController');

router.get('/', mainApiController.home);
router.get('/brands', mainApiController.brands);
router.get('/cart', mainApiController.cart);
router.delete('/cart', mainApiController.cartDelete);
//FALTA RUTA DE SEARCH (USA QUERY STRING);



module.exports = router;