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
    home: (req, res) => {
        fetch("http://localhost:3000/api/products/")
        .then(response => response.json())
        .then(list => {
            let bargains = [];
            let used = [];
            let newones = [];
            let today = new Date();
            let year = String(today.getFullYear());
            let unreleased = [];
            list.products.forEach(product => {
                if (product.discount > 0)
                    bargains.push(product);
                if (product.shoe_condition == "used")
                    used.push(product);
                if (product.shoe_condition == "new_no_def")
                    newones.push(product);
                if (product.release_year > year){
                    unreleased.push(product);
                }
            });
            list.bargains = bargains;
            list.used = used;
            list.newones = newones;
            list.unreleased = unreleased;
            return res.json({
                list
            });
        });
    },
    cart: (req, res) => {
        if (req.session.user_id && req.session.user_id != undefined) {
            console.log("\n"+req.session.user_id+"\n");
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
                    console.log("\n"+ resultsProduct_Cart +"\n");
                    console.log("\n"+ resultsShipping +"\n");
                    if (resultsProduct_Cart && resultsProduct_Cart != undefined && resultsProduct_Cart.length > 0) {
                        let ammount = 0;
                        resultsProduct_Cart.forEach(item => {
                            ammount += item.product.price_final * item.units;
                        });
                        console.log(resultsProduct_Cart);
                        console.log("\nHOLA\n");
                        return res.json({
                            cart: {
                                products: resultsProduct_Cart,
                                ammount: ammount,
                                shippings: resultsShipping
                            },
                            status: 200
                        });
                        // return res.render('products/cart', { productsCart: resultsProduct_Cart, ammount: ammount, shippings: resultsShipping });
                    }else{
                        return res.json({
                            cart: {
                                products: [],
                                ammount: 0,
                                shippings: resultsShipping
                            },
                            status: 200
                        });
                    }
                });
        } else {
            // Window.alert("Inicia sesión para acceder al carrito");
            console.log("Inicia sesión para acceder al carrito");
            // return res.redirect("users/login");
            return res.json({
                status: 400
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
    },
    shippings: (req, res) => {
        db.Shipping.findAll()
        .then(results => {
            return res.json(results);
        });
    },
    // checkout: (req, res) => {
    //     if (typeof req.session.user_id != "undefined"){

    //         db.User.findByPk(req.session.user_id)
    //         .then(user => {
    //             db.Order.create({
    //                 charges: req.body.charges,
    //                 total_ammount: req.body.total_ammount,
    //                 id_shipping: req.body.id_shipping,
    //                 id_user: req.session.user_id,
    //                 user_fullname: user.first_name + " " + user.last_name
    //             })
    //             .then(orderCreated => {
    //                 db.Product_Cart.destroy({
    //                     where: {user_id: req.session.user_id}
    //                 })
    //                 .then(x => {
    //                     db.Product_Size.findAll({
    //                         where
    //                     })
    //                 })
    //             })
    //         })



    //     }
    // }



    // logedInChecker: (req, res) => {
    //     if (req.session.user_id){
    //         db.User.findByPk(req.session.user_id)
    //         .then(result => {
    //             return res.json()
    //         })
    //     }
    // }
    // FALTA TEMA DE ACTUALIZAR CARRITO (EJEMPLO UNIDADES);
}