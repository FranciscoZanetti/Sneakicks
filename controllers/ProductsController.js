const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        console.log(products);
        return res.render('products/productList', {products: products});
    },
    login: (req, res) => {
        return res.render('users/login');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    productDetail: (req, res) => {
        return res.render('products/productDetail', {productos: productos});
    },
    productList: (req, res) => {
        return res.render('products/productList', {productos: productos});
    },
    cart: (req, res) => {
        return res.render('products/cart', {productos: productos});
    },
    manageProduct: (req, res) => {
        return res.render('products/manageProduct');
    },
}

module.exports = controller;