const fs = require('fs');
const path = require('path');

const productsJSON = fs.readFileSync('./data/products.json', {encoding: 'utf-8'})
const products = JSON.parse(productsJSON);


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
    create: (req, res) => {
        // let newShoe = {
        //     brand_name: 
        //     category:
        //     colorwave:
        //     discount:
        //     id:
        //     main_picture:
        //     name:
        //     release_year:
        //     price_original:
        //     shoe_condition:
        //     story:
        //     size:
        // }
    }
}

module.exports = controller;