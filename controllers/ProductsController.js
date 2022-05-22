const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");

const productsJSON = fs.readFileSync('./data/products.json', {encoding: 'utf-8'})
const products = JSON.parse(productsJSON);


const controller = {
    index: (req, res) => {
        return res.render('products/productList', {products: products});
    },
	productDetail: (req, res) => {
		let product = products.find(item => {
			return item.id == req.params.id;
		});
        let sizeArray = product.size;
        let recomendedProducts = products.filter(element => element.id != req.params.id);
        let colorwaveArray = [];
        products.forEach(element => {
            if ((element.name == product.name) && (element.id != product.id)){
                colorwaveArray.push(element.colorwave);
            }
        });
		return res.render('products/productDetail', {product: product, sizeArray: sizeArray, colorwaveArray: colorwaveArray, recomendedProducts: recomendedProducts});
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
            // console.log(errors.mapped());
            res.render("products/manageProduct", { errors: errors.mapped(), old: req.body });
        }else{
            let aux = path.parse(req.file.filename);
            // console.log(aux);
            let splitArray = aux.name.split("-");

            let discountInt = parseInt(req.body.discount);
            let price_originalInt = parseInt(req.body.price_original);
            let price_finalInt = (100-discountInt) * price_originalInt / 100;

            let newShoe = {
                brand_name: req.body.brand_name,
                category: req.body.category,
                colorwave: req.body.colorwave,
                discount: req.body.discount,
                id: splitArray[0],
                main_picture: req.file.filename,
                name: req.body.name,
                whole_name: req.body.name+" '"+req.body.colorwave+"'",
                release_year: req.body.release_year,
                price_original: req.body.price_original,
                price_final: JSON.stringify(price_finalInt),
                shoe_condition: req.body.shoe_condition,
                story: req.body.story,
                size: req.body.size,
            }
            // console.log(newShoe);
            products.push(newShoe);
            productsStringified = JSON.stringify(products);
            fs.writeFileSync("./data/products.json", productsStringified);

            return res.redirect('/products/'+newShoe.id);
        }
    },
    editGet: (req, res) => {
        let product = products.find(item => {
			return item.id == req.params.id;
		});
        let sizeArray = product.size;

        return res.render('products/editProduct', {product: product, sizeArray: sizeArray});
    },
    editPut: (req, res) => {
        let product = products.find(item => {
			return item.id == req.body.id;
		});

        console.log(product);

        let errors = validationResult(req);
        if (!errors.isEmpty()){
            res.render("products/editProducts", { errors: errors.mapped(), old: req.body });
        }else{
            let discountInt = parseInt(req.body.discount);
            let price_originalInt = parseInt(req.body.price_original);
            let price_finalInt = (100-discountInt) * price_originalInt / 100;

            let editedShoe = {
                brand_name: req.body.brand_name,
                category: req.body.category,
                colorwave: req.body.colorwave,
                discount: req.body.discount,
                // id: splitArray[0],
                // main_picture: req.file.filename,
                name: req.body.name,
                whole_name: req.body.name+" '"+req.body.colorwave+"'",
                release_year: req.body.release_year,
                price_original: req.body.price_original,
                price_final: JSON.stringify(price_finalInt),
                shoe_condition: req.body.shoe_condition,
                story: req.body.story,
                size: req.body.size,
            }
            if (req.file){
                let aux = path.parse(req.file.filename);
                let splitArray = aux.name.split("-");
                editedShoe.id = splitArray[0];
                editedShoe.main_picture = req.file.filename;
            }else{
                editedShoe.id = product.id;
                editedShoe.main_picture = product.main_picture;
            };
            products.forEach( product => {
                if (product.id == req.params.id){
                    product == editedShoe;
                }
            });
            productsStringified = JSON.stringify(products);
            fs.writeFileSync("./data/products.json", productsStringified);

            return res.redirect("/products/"+editedShoe);
        }
    },
    deleteGet: (req, res) => {
        let product = products.find(item => {
			return item.id == req.params.id;
		});
        return res.render("products/deleteProduct", {product: product});
    },
    deleteDelete: (req, res) => {
        let product = products.find(item => {
			return item.id == req.params.id;
		});
        let indexDelete = products.indexOf(product);
        if (indexDelete > -1){
            products.splice(indexDelete, 1);
        }
        productsStringified = JSON.stringify(products);
        fs.writeFileSync("./data/products.json", productsStringified);

        return res.redirect("/");
    }
}

module.exports = controller;