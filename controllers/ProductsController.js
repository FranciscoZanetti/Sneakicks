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
        let aux = path.parse(req.file.filename);
        console.log(aux);
        let splitArray = aux.name.split("-");

        let newShoe = {
            brand_name: req.body.brand_name,
            category: req.body.category,
            colorwave: req.body.colorwave,
            discount: req.body.discount,
            id: splitArray[0],
            main_picture: req.file.filename,
            name: req.body.name,
            release_year: req.body.release_year,
            price_original: req.body.price_original,
            shoe_condition: req.body.shoe_condition,
            story: req.body.story,
            size: req.body.size,
        }
        console.log(newShoe);
        products.push(newShoe);
        productsStringified = JSON.stringify(products);
        fs.writeFileSync("./data/products.json", productsStringified);

        return res.redirect('/');
    }
}

module.exports = controller;