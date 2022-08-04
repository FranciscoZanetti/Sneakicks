const fs = require('fs');
const path = require('path');
const db = require('../../database/models');
const op = db.Sequelize.Op;

const { validationResult } = require("express-validator");
const { Sequelize } = require('../../database/models');

const fetch = require("node-fetch");
// import fetch from 'node-fetch';

module.exports = {
    brands: (req, res) => {

        db.Brand.findAll({
            include: {association: "products"}
        })
        .then(brands => {
            brands.forEach(brand => {
                let counter = 0;
                for (let product of brand.products){
                    if (product.id_brand == brand.id){
                        counter += 1;
                    }
                }
                brand.count = counter;
            });
            return res.json({brands: brands});
        })

        // let promiseBrands = db.Brand.findAll({
        //     include: {association: "products"}
        // });
        // let promiseCountData = db.Brand.findAll({
        //     attributes: {
        //         include: ["id", "name", [Sequelize.fn("COUNT", Sequelize.col("products.id")), "productCount"]]
        //     },
        //     include: {
        //         model: "products",
        //         attributes: ["id"]
        //     },
        //     group: ["brand.id", "brand.name"]
        // });
        // Promise.all([promiseBrands, promiseCountData])
        // .then(([brands, countdata]) => {
            
        // })

        // async function buildApi(){
        //     let brands = await db.Brand.findAll({
        //         include: {association: "products"}
        //     });
        //     await console.log(brands);
        //     for (let brand of brands){
        //         let counter = 0;
        //         await brand.products.forEach(product => {
        //             if (product.id_brand == brand.id){
        //                 counter += 1;
        //             }
        //         });
        //         brand.count = counter;
        //     }
        //     console.log(brands);
        //     return brands;
        // }

        // let brands = buildApi();
        // console.log(brands);
        // return res.json({brands: brands});
    },
    search: (req, res) => {
        db.Product.findAll(
            {
                where: {
                    [op.or]: [
                        {whole_name: { [op.like]:  "%" + req.query.keyword + "%"}},
                        {"$brand.name$": { [op.like]:  "%" + req.query.keyword + "%"}}
                    ]
                }
            },
            {
                include: [
                    {association: "brand"},
                    {association: "product_sizes"},
                    {association: "reviews"}
                ]
            }
        )
        .then(products => {return res.json({products: products})});
    },
    home: (req, res) => {
        fetch("http://localhost:3000/api/products/")
        .then(response => response.json())
        .then(list => {
            let bargains = [];
            let used = [];
            let newones = [];
            list.products.forEach(product => {
                if (product.discount > 0)
                    bargains.push(product);
                if (product.shoe_condition == "used")
                    used.push(product);
                if (product.shoe_condition == "new_no_def")
                    newones.push(product);
            });
            list.bargains = bargains;
            list.used = used;
            list.new = newones;
            return res.json({
                list
            });
        });
    },
    cart: (req, res) => {
        if (req.session.user_id && req.session.user_id != undefined) {
            let promiseProduct_Cart = db.Product_Cart.findAll({
                where: {
                    user_id: req.session.user_id,
                    bought: 0
                },
                include: { association: "product" }
            });
            let promiseShipping = db.Shipping.findAll();
            Promise.all([promiseProduct_Cart, promiseShipping])
                .then(([resultsProduct_Cart, resultsShipping]) => {
                    if (resultsProduct_Cart && resultsProduct_Cart != undefined && resultsProduct_Cart.length > 0) {
                        let ammount = 0;
                        resultsProduct_Cart.forEach(item => {
                            ammount += item.product.price_final * item.units;
                        });
                        console.log(resultsProduct_Cart);
                        // return res.render('products/cart', { productsCart: resultsProduct_Cart, ammount: ammount, shippings: resultsShipping });
                    }
                    // else {
                    //     return res.render('products/cart');
                    // }
                    return res.json({
                        cart: {
                            products: resultsProduct_Cart,
                            ammount: ammount,
                            shippings: resultsShipping
                        },
                        status: "success"
                    });
                });
        } else {
            // Window.alert("Inicia sesión para acceder al carrito");
            console.log("Inicia sesión para acceder al carrito");
            // return res.redirect("users/login");
            return res.json({
                status: "denied"
            });
        }
    },
    cartDelete: (req, res) => {
        if (req.session.user_id && req.session.user_id != undefined) {
            db.Product_Cart.destroy({
                where: {
                    user_id: req.session.user_id,
                    bought: 0
                },
                include: { association: "product" }
            })
            .then((deleted) => {
                return res.json({
                    cart: {
                        rowsDeleted: deleted
                    },
                    status: "success"
                });
            });
        } else {
            // Window.alert("Inicia sesión para acceder al carrito");
            console.log("Inicia sesión para acceder al carrito");
            // return res.redirect("users/login");
            return res.json({
                status: "denied"
            });
        }
    }
    // FALTA TEMA DE ACTUALIZAR CARRITO (EJEMPLO UNIDADES);
}