const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const productsJSON = fs.readFileSync('./data/products.json', {encoding: 'utf-8'})
const products = JSON.parse(productsJSON);

const controller = {
    index: (req, res) => {
        console.log(req.session)
        return res.render('index', {products: products});
    },
    cart: (req, res) => {
        return res.render('products/cart', {products: products});
    },
    manageProduct: (req, res) => {
        return res.render('products/manageProduct');
    },
}

module.exports = controller;