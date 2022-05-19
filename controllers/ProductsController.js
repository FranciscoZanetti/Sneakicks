const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    index: (req, res) => {
        return res.render('products/productList', {products: products});
    },
	productDetail: (req, res) => {
		let product = products.find(item => {
			return item.id == req.params.id;
		})
		return res.render('products/productDetail', {product: product, products: products})
	},
    cart: (req, res) => {
        return res.render('products/cart', {products: products});
    },
    manageProduct: (req, res) => {
        return res.render('products/manageProduct');
    },
}

module.exports = controller;