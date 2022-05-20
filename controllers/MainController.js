const fs = require('fs');
const path = require('path');

const productsJSON = fs.readFileSync('./data/products.json', {encoding: 'utf-8'})
const products = JSON.parse(productsJSON);

const controller = {
    index: (req, res) => {
        return res.render('index', {products: products});
    },
    login: (req, res) => {
        return res.render('users/login');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    cart: (req, res) => {
        return res.render('products/cart', {products: products});
    },
    manageProduct: (req, res) => {
        return res.render('products/manageProduct');
    },
}

module.exports = controller;