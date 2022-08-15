const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const fetch = require("node-fetch");

const controller = {
    index: (req, res) => {
        // console.log(bcrypt.hashSync('qwerty'));
        // console.log(req.session)
        // db.Product.findAll()
        //     .then(results => { return res.render('index', { products: results }) });
        fetch("http://localhost:3000/api/main/")
        .then(response => response.json())
        .then(result => {return res.render('index', { result: result.list })});
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
                            console.log(ammount);
                        });
                        console.log(resultsProduct_Cart);
                        return res.render('products/cart', { productsCart: resultsProduct_Cart, ammount: ammount, shippings: resultsShipping });
                    } else {
                        let ammount = 0;
                        return res.render('products/cart', {productsCart: [], ammount: "", ammount: ammount, shippings: resultsShipping});
                    }
                });
        } else {
            // Window.alert("Inicia sesión para acceder al carrito");
            console.log("Inicia sesión para acceder al carrito");
            return res.redirect("users/login");
        }
    },
    manageProduct: (req, res) => {
        return res.render('products/manageProduct');
    },
}

module.exports = controller;