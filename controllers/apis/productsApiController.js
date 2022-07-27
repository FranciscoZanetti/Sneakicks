const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const { validationResult } = require("express-validator");

module.exports = {
    list: (req, res) => {
        db.Product.findAll({
            include: [
                {association: "brand"},
                {association: "reviews"},
                {association: "product_sizes"}
            ]
        })
        .then(products => {
            let counterBasketball = 0;
            let counterLifestyle = 0;
            let counterOther = 0;
            let counterMen = 0;
            let counterWomen = 0;
            let counterKids = 0;
            products.forEach(product => {
                if (product.category == "basketball"){
                    counterBasketball += 1;
                }
                if (product.category == "lifestyle"){
                    counterLifestyle += 1;
                }
                if (product.category != "basketball" && product.category != "lifestyle"){
                    counterOther += 1;
                }
                let checkerMen = false;
                let checkerWomen = false;
                let checkerKids = false;
                product.product_sizes.forEach(product_size => {
                    if (!checkerMen && product_size.size > 7.0 && product_size.stock > 0){
                        counterMen += 1;
                        checkerMen = true;
                    }
                    if (!checkerWomen && product_size.size > 4.0 && product_size.size < 10.0 && product_size.stock > 0){
                        counterWomen += 1;
                        checkerWomen = true;
                    }
                    if (!checkerKids && product_size.size < 7.0 && product_size.stock > 0){
                        counterKids += 1;
                        checkerKids = true;
                    }
                });
                // let i = 0;
                // while (i < product.product_sizes.length){
                //     if (!checkerMen && product.product_sizes[i].size > 7.0 && product.product_sizes[i].stock > 0){
                //         counterMen += 1;
                //         checkerMen = true;
                //     }
                //     if (!checkerWomen && product.product_sizes[i].size > 4.0 && product.product_sizes[i].size < 10.0 && product.product_sizes[i].stock > 0){
                //         counterWomen += 1;
                //         checkerWomen = true;
                //     }
                //     if (!checkerKids && product.product_sizes[i].size < 7.0 && product.product_sizes[i].stock > 0){
                //         counterKids += 1;
                //         checkerKids = true;
                //     }
                //     i++;
                // }
                product.detail = "http://localhost:3000/api/products/"+product.id;
            });
            return res.json({
                count: products.length,
                countByCategory: {
                    basketball: counterBasketball,
                    lifestyle: counterLifestyle,
                    other: counterOther
                },
                countBySizeRange: {
                    men: counterMen,
                    women: counterWomen,
                    kids: counterKids
                },
                products
            });
        });
    },
    detail: (req, res) => {
        let otherColorwaves = [];
        let promiseProduct = db.Product.findByPk(req.params.id, {
            include: [
                {association: "brand"}, {association: "product_sizes"}, {association: "reviews"}
            ]
        });
        let promiseOtherColorwaves = db.Product.findAll();
        Promise.all([promiseProduct, promiseOtherColorwaves])
        .then(([product, colorwaves]) => {
            colorwaves.forEach(colorwave => {
                if ((colorwave.name == product.name) && (colorwave.id != product.id)){
                    otherColorwaves.push(colorwave.colorwave);
                }
            });
            product.reviews.reverse();
            let checkerMen = false;
            let checkerWomen = false;
            let checkerKids = false;
            product.product_sizes.forEach(product_size => {
                if (!checkerMen && product_size.size > 7.0 && product_size.stock > 0){
                    counterMen += 1;
                    checkerMen = true;
                }
                if (!checkerWomen && product_size.size > 4.0 && product_size.size < 10.0 && product_size.stock > 0){
                    counterWomen += 1;
                    checkerWomen = true;
                }
                if (!checkerKids && product_size.size < 7.0 && product_size.stock > 0){
                    counterKids += 1;
                    checkerKids = true;
                }
            });
            product.hasStock = {
                men: checkerMen,
                women: checkerWomen,
                kids: checkerKids
            }
            return res.json(product);
        });
    }
}