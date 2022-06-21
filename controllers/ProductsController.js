const fs = require('fs');
const path = require('path');

const { validationResult } = require("express-validator");

const productsJSON = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
const products = JSON.parse(productsJSON);

const reviewsJSON = fs.readFileSync('./data/reviews.json', {encoding: 'utf-8'});
const reviews = JSON.parse(reviewsJSON);

const controller = {
	productDetail: (req, res) => {
		let product = products.find(item => {
			return item.id == req.params.id;
		});
        let sizeArray = product.size;
        sizeArray = sizeArray.sort( (a,b) => {return a-b});
        let recomendedProducts = products.filter(element => element.id != req.params.id);
        let colorwaveArray = [];
        products.forEach(element => {
            if ((element.name == product.name) && (element.id != product.id)){
                colorwaveArray.push(element.colorwave);
            }
        });

        productReviews = reviews.filter(review => review.id == product.id);
        productReviews.reverse();

		return res.render('products/productDetail', {product: product, sizeArray: sizeArray, colorwaveArray: colorwaveArray, productReviews: productReviews, recomendedProducts: recomendedProducts});
	},
    cart: (req, res) => {
        return res.render('products/cart', {products: products});
    },
    manageProduct: (req, res) => {
        return res.render('products/manageProduct');
    },
    create: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty() || !req.file){
            res.render("products/manageProduct", { errors: errors.mapped(), old: req.body });
        }else{
            let aux = path.parse(req.file.filename);

            let discountInt = parseInt(req.body.discount);
            let price_originalInt = parseInt(req.body.price_original);
            let price_finalInt = (100-discountInt) * price_originalInt / 100;

            let newShoe = {
                brand_name: req.body.brand_name,
                category: req.body.category,
                colorwave: req.body.colorwave,
                discount: req.body.discount,
                id: Date.now(),
                main_picture: req.file.filename,
                name: req.body.name,
                whole_name: req.body.name+" '"+req.body.colorwave+"'",
                release_year: req.body.release_year,
                price_original: req.body.price_original,
                price_final: JSON.stringify(price_finalInt),
                shoe_condition: req.body.shoe_condition,
                story: req.body.story,
                size: req.body.size,
                stock: req.body.stock
            }
            products.push(newShoe);
            productsStringified = JSON.stringify(products, null, '\t');
            fs.writeFileSync("./data/products.json", productsStringified);

            return res.redirect('/products/'+newShoe.id);
        }
    },
    editGet: (req, res) => {
        let product = products.find(item => {
			return item.id == req.params.id;
		});
        console.log(product);
        let sizeArray = product.size;

        return res.render('products/editProduct', {product: product, sizeArray: sizeArray});
    },
    editPut: (req, res) => {
        let product = products.find(item => {
			return item.id == req.params.id;
		});
        let sizeArray = product.size;

        let errors = validationResult(req);

        if (!errors.isEmpty()){
            res.render("products/editProduct", { errors: errors.mapped(), old: req.body, product: product, sizeArray: sizeArray });
        }else{
            let discountInt = parseInt(req.body.discount);
            let price_originalInt = parseInt(req.body.price_original);
            let price_finalInt = (100-discountInt) * price_originalInt / 100;

            let editedShoe = {
                brand_name: req.body.brand_name,
                category: req.body.category,
                colorwave: req.body.colorwave,
                discount: req.body.discount,
                id: product.id,
                name: req.body.name,
                whole_name: req.body.name+" '"+req.body.colorwave+"'",
                release_year: req.body.release_year,
                price_original: req.body.price_original,
                price_final: JSON.stringify(price_finalInt),
                shoe_condition: req.body.shoe_condition,
                story: req.body.story,
                size: req.body.size,
                stock: req.body.stock
            }
            if (req.file){
                editedShoe.main_picture = req.file.filename;
            }else{
                editedShoe.main_picture = product.main_picture;
            };
            
            products.forEach( (product, index) => {
                if (product.id == req.params.id){
                    products[index] = editedShoe;
                }
            });

            productsStringified = JSON.stringify(products, null, '\t');
            fs.writeFileSync("./data/products.json", productsStringified);

            return res.redirect("/products/"+editedShoe.id);
        }
    },
    deleteGet: (req, res) => {
        let product = products.find(item => {
			return item.id == req.params.id;
		});
        return res.render("products/deleteProduct", {product: product});
    },
    deleteDelete: (req, res) => {
        let productsAfterDelete = [];
        products.forEach( product => {
            console.log(product.id == req.params.id);
            if (product.id != req.params.id){
                productsAfterDelete.push(product);
            }
        });

        productsStringified = JSON.stringify(productsAfterDelete);
        console.log(productsStringified);
        fs.writeFileSync("./data/products.json", productsStringified);

        return res.redirect("/products/");
    },
    productList: (req, res) => {
        return res.render("products/productList", {products: products});
    },
    addReview: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            res.redirect('/products/'+req.params.id);
        }
        else{
            let newReview = {
                id: req.params.id,
                stars: req.body.stars,
                text: req.body.text
            }
            console.log("body: ", req.body);
            console.log(newReview);

            reviews.push(newReview);
            reviewsStringified = JSON.stringify(reviews, null, '\t');
            fs.writeFileSync("./data/reviews.json", reviewsStringified);

            return res.redirect('/products/'+ newReview.id);
        }
    }
}

module.exports = controller;