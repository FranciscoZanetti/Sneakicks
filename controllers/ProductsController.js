const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const fetch = require("node-fetch");

const { validationResult } = require("express-validator");
const { response } = require('express');

const productsJSON = fs.readFileSync('./data/products.json', {encoding: 'utf-8'});
const products = JSON.parse(productsJSON);

const reviewsJSON = fs.readFileSync('./data/reviews.json', {encoding: 'utf-8'});
const reviews = JSON.parse(reviewsJSON);

const controller = {
	productDetail: (req, res) => {
        // let colorwavesArray = [];

        // let promiseProduct = db.Product.findByPk(req.params.id, {include: {association: "brand"}});
        // let promiseProduct_Size = db.Product_Size.findAll({
        //     where: {
        //         product: req.params.id
        //     }
        // });
        // let promiseReview = db.Review.findAll({
        //     where: {
        //         id_product: req.params.id
        //     }
        // });
        // let promiseColorwaves = db.Product.findAll({include: {association: "brand"}});
        // Promise.all([promiseProduct, promiseProduct_Size, promiseReview, promiseColorwaves])
        //     .then(([resultProduct, resultProduct_Size, resultReview, resultColorwaves]) => {
        //         resultColorwaves.forEach(result => {
        //             if ((result.name == resultProduct.name) && (result.id != resultProduct.id)){
        //                 colorwavesArray.push(result.colorwave);
        //             }
        //         });
        //         let recomendedProducts = resultColorwaves.filter(element => element.id != req.params.id);
        //         resultReview.reverse();

        //         return res.render('products/productDetail', {product: resultProduct, sizeArray: resultProduct_Size, colorwaveArray: colorwavesArray, productReviews: resultReview, recomendedProducts: recomendedProducts});
        //     });
        
        let promiseResult = fetch("http://localhost:3000/api/products/"+req.params.id).then(response => response.json());
        let promiseReviews = fetch("http://localhost:3000/api/products/"+req.params.id+"/reviews").then(response => response.json());
        Promise.all([promiseResult, promiseReviews])
        .then(([resultProduct, resultReviews]) => {
            console.log(resultReviews);
            return res.render('products/productDetail', {result: resultProduct, reviews: resultReviews.reviews});
        });
    },
    addToCart: (req, res) => {
        let redirectId = req.params.id;
        let errors = validationResult(req);
        console.log(req.session);
        if (!req.session.user_id || req.session.user_id == undefined){
            // Window.alert("Inicia sesión para agregar al carrito");
            console.log("\nInicia sesión para agregar al carrito\n");
            return res.redirect('/products/'+redirectId);
        }else{
            // console.log(req.body);
            // console.log(req.params.id);
            // // let parsedSize = parseFloat(req.body.size);
            // console.log(req.body.size);
            // db.Product_Size.findOne({
            //     where: {
            //         product: req.params.id,
            //         size: req.body.size
            //     }
            // })
            // .then(result => {
            //     console.log(result);
            //     if (result.stock == 0){
            //         // Window.alert("Sin stock de este talle!");
            //         console.log("Sin stock de este talle!");
            //         return res.redirect('/products/'+redirectId);
            //     }else{
            //         db.Product_Cart.count({
            //             where: {
            //                 user_id: req.session.user_id,
            //                 product_id: req.params.id,
            //                 bought: 0
            //             }
            //         })
            //         .then(count => {
            //             if (count > 0){
            //                 db.Product_Cart.increment(
            //                     'units',
            //                     {
            //                         by: 1,
            //                         where: {
            //                             user_id: req.session.user_id,
            //                             product_id: req.params.id,
            //                             bought: 0
            //                         }
            //                     }
            //                 );
            //             }else{
            //                 db.Product_Cart.create({
            //                     units: 1,
            //                     size: req.body.size,
            //                     bought: 0,
            //                     user_id: req.session.user_id,
            //                     product_id: req.params.id,
            //                 });
            //             }
            //             return count;
            //         })
            //         .then(x => {return res.redirect('/products/'+redirectId)});
            //     }
            // });

            if (!errors.isEmpty()){
                return res.redirect("/products/"+redirectId);
            }else{
                let promiseProduct = db.Product.findByPk(req.params.id, {
                    include: [
                        {association: "brand"},
                        // {association: "reviews"},
                        {association: "product_sizes"}
                    ]
                });
                let promiseRecomended = db.Product.findAll(
                    {
                        include: [
                            {association: "brand"},
                            // {association: "reviews"},
                            {association: "product_sizes"}
                        ]
                    });
                Promise.all([promiseProduct, promiseRecomended])
                .then(([product, recomended]) => {
                    console.log(req.session);
                    if (!req.session.user_id || req.session.user_id == undefined){
                        // Window.alert("Inicia sesión para agregar al carrito");
                        console.log("\nInicia sesión para agregar al carrito\n");
                        return res.redirect("/products/"+redirectId);
                    }
                    else{
                        console.log(req.body);
                        console.log(req.params.id);
                        // let parsedSize = parseFloat(req.body.size);
                        console.log(req.body.size);
                        db.Product_Size.findOne({
                            where: {
                                product: req.params.id,
                                size: req.body.size
                            }
                        })
                        .then(result => {
                            console.log(result);
                            if (result.stock == 0){
                                // Window.alert("Sin stock de este talle!");
                                console.log("Sin stock de este talle!");
                                return res.redirect("/products/"+redirectId);
                            }else{
                                db.Product_Cart.count({
                                    where: {
                                        user_id: req.session.user_id,
                                        product_id: req.params.id,
                                        size: req.body.size,
                                        bought: 0
                                    }
                                })
                                .then(count => {
                                    if (count > 0){
                                        db.Product_Cart.increment(
                                            'units',
                                            {
                                                by: 1,
                                                where: {
                                                    user_id: req.session.user_id,
                                                    product_id: req.params.id,
                                                    bought: 0,
                                                    size: req.body.size
                                                }
                                            }
                                        );
                                    }else{
                                        db.Product_Cart.create({
                                            units: 1,
                                            size: req.body.size,
                                            bought: 0,
                                            user_id: req.session.user_id,
                                            product_id: req.params.id,
                                        });
                                    }
                                    return count;
                                })
                                .then(x => {return res.redirect("/products/"+redirectId);});
                            }
                        });
                    }
                });
            }

        }
    },
    removeFromCart: (req, res) => {
        db.Product_Cart.destroy({
            where: {id: req.params.id}
        })
        .then(x => {return res.redirect('/cart')});
    },
    manageProduct: (req, res) => {
        if (req.session.category == 'admin') {
            return res.render('products/manageProduct');
        } else {
            return res.status(401).send('No tiene permisos para realizar esa acción')
        }
    },
    create: (req, res) => {
        let errors = validationResult(req);
        console.log(req.files);

        if (!errors.isEmpty() || !req.files || req.files.length < 1){
            res.render("products/manageProduct", { errors: errors.mapped(), old: req.body });
            console.log("req.files: "+req.files);
        }else{
            let mainPic = req.files[0].filename;
            let pic1;
            let pic2;
            let pic3;
            let pic4;
            if (req.files[1]){
                pic1 = req.files[1].filename;
            }else{
                pic1 = null;
            }
            if (req.files[2]){
                pic2 = req.files[2].filename;
            }else{
                pic2 = null;
            }
            if (req.files[3]){
                pic3 = req.files[3].filename;
            }else{
                pic3 = null;
            }
            if (req.files[4]){
                pic4 = req.files[4].filename;
            }else{
                pic4 = null;
            }
            db.Brand.findOrCreate(
                {
                    where: {
                        name: req.body.brand_name
                    },
                    defaults: {
                        name: req.body.brand_name
                    }
                }
            )
            .then(brand => {
                db.Product.create({
                    id_brand: brand.id,
                    category: req.body.category,
                    colorwave: req.body.colorwave,
                    discount: req.body.discount,
                    name: req.body.name,
                    whole_name: req.body.name+" '"+req.body.colorwave+"'",
                    release_year: req.body.release_year,
                    price_original: req.body.price_original,
                    price_final: (100 - req.body.discount) * req.body.price_original / 100,
                    shoe_condition: req.body.shoe_condition,
                    story: req.body.story,
                    main_picture: mainPic,
                    picture1: pic1,
                    picture2: pic2,
                    picture3: pic3,
                    picture4: pic4
                })
                .then( created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 3.0,
                        stock: req.body.size_30
                    });
                    return created.id;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 3.5,
                        stock: req.body.size_35
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 4.0,
                        stock: req.body.size_40
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 4.5,
                        stock: req.body.size_45
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 5.0,
                        stock: req.body.size_50
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 5.5,
                        stock: req.body.size_55
                    });
                    return id_created;
                }).then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 6.0,
                        stock: req.body.size_60
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 6.5,
                        stock: req.body.size_65
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 7.0,
                        stock: req.body.size_70
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 7.5,
                        stock: req.body.size_75
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 8.0,
                        stock: req.body.size_80
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 8.5,
                        stock: req.body.size_85
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 9.0,
                        stock: req.body.size_90
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 9.5,
                        stock: req.body.size_95
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 10.0,
                        stock: req.body.size_100
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 10.5,
                        stock: req.body.size_105
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 11.0,
                        stock: req.body.size_110
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 11.5,
                        stock: req.body.size_115
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 12.0,
                        stock: req.body.size_120
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 12.5,
                        stock: req.body.size_125
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 13.0,
                        stock: req.body.size_130
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 13.5,
                        stock: req.body.size_135
                    });
                    return id_created;
                }).then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 14.0,
                        stock: req.body.size_140
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 14.5,
                        stock: req.body.size_145
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 15.0,
                        stock: req.body.size_150
                    });
                    return id_created;
                })
                .then(id_created => {
                    db.Product_Size.create({
                        product: id_created,
                        size: 15.5,
                        stock: req.body.size_155
                    });
                    return id_created;
                })
                .then(id_created => {
                    return res.redirect('/products/'+id_created);
                });
            });
        }
    },
    editGet: (req, res) => {
        // let promiseProduct = db.Product.findByPk(req.params.id, {include: {association: "brand"}});
        // let promiseProduct_Size = db.Product_Size.findAll({
        //     where: {
        //         product: req.params.id
        //     }
        // });
        // Promise.all([promiseProduct, promiseProduct_Size])
        //     .then(([resultProduct, resultProduct_Size]) => {
        //         console.log(resultProduct_Size);
        //         return res.render('products/editProduct', {product: resultProduct, sizeArray: resultProduct_Size});
        //     });
        fetch("http://localhost:3000/api/products/"+req.params.id)
        .then(response => response.json())
        .then(result => {
            return res.render('products/editProduct', {product: result.product});
        });
    },
    editPut: (req, res) => {

        let promiseProduct = db.Product.findByPk(req.params.id, {indlude: {association: "brand"}});
        let promiseProduct_Size = db.Product_Size.findAll({
            where: {
                product: req.params.id
            }
        });
        let errors = validationResult(req);
        Promise.all([promiseProduct, promiseProduct_Size])
            .then(([resultProduct, resultProduct_Size]) => {
                if (!errors.isEmpty()){
                    res.render("products/editProduct", { errors: errors.mapped(), old: req.body, product: resultProduct, sizeArray: resultProduct_Size });
                }else{
                    let edited_id = req.params.id;
                    db.Brand.findOrCreate(
                        {
                            where: {
                                name: req.body.brand_name
                            },
                            defaults: {
                                name: req.body.brand_name
                            }
                        }
                    )
                    .then(brand => {
                        db.Product.update(
                            {
                                id_brand: brand.id,
                                category: req.body.category,
                                colorwave: req.body.colorwave,
                                discount: req.body.discount,
                                name: req.body.name,
                                whole_name: req.body.name+" '"+req.body.colorwave+"'",
                                release_year: req.body.release_year,
                                price_original: req.body.price_original,
                                price_final: (100 - req.body.discount) * req.body.price_original / 100,
                                shoe_condition: req.body.shoe_condition,
                                story: req.body.story
                            },
                            {
                                where: {id: edited_id}
                            }
                        )
                        .then(result => {

                            if (req.files && req.files.length >=1){
                                let mainPic = req.files[0].filename;
                                let pic1;
                                let pic2;
                                let pic3;
                                let pic4;
                                if (req.files[1]){
                                    pic1 = req.files[1].filename;
                                }else{
                                    pic1 = null;
                                }
                                if (req.files[2]){
                                    pic2 = req.files[2].filename;
                                }else{
                                    pic2 = null;
                                }
                                if (req.files[3]){
                                    pic3 = req.files[3].filename;
                                }else{
                                    pic3 = null;
                                }
                                if (req.files[4]){
                                    pic4 = req.files[4].filename;
                                }else{
                                    pic4 = null;
                                }
                                db.Product.update(
                                    {
                                        main_picture: mainPic,
                                        picture1: pic1,
                                        picture2: pic2,
                                        picture3: pic3,
                                        picture4: pic4
                                    },
                                    {
                                        where: {id: edited_id}
                                    }
                                );
                            }
                            // CHEQUEAR CODIGO DE EDIT PUT
                        });
                    
                        let promise30 = db.Product_Size.update(
                            {
                                stock: req.body.size_30,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 3.0
                                }
                            }
                        );
                        let promise35 = db.Product_Size.update(
                            {
                                stock: req.body.size_35,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 3.5
                                }
                            }
                        );
                        let promise40 = db.Product_Size.update(
                            {
                                stock: req.body.size_40,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 4.0
                                }
                            }
                        );
                        let promise45 = db.Product_Size.update(
                            {
                                stock: req.body.size_45,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 4.5
                                }
                            }
                        );
                        let promise50 = db.Product_Size.update(
                            {
                                stock: req.body.size_50,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 5.0
                                }
                            }
                        );
                        let promise55 = db.Product_Size.update(
                            {
                                stock: req.body.size_55,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 5.5
                                }
                            }
                        );
                        let promise60 = db.Product_Size.update(
                            {
                                stock: req.body.size_60,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 6.0
                                }
                            }
                        );
                        let promise65 = db.Product_Size.update(
                            {
                                stock: req.body.size_65,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 6.5
                                }
                            }
                        );
                        let promise70 = db.Product_Size.update(
                            {
                                stock: req.body.size_70,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 7.0
                                }
                            }
                        );
                        let promise75 = db.Product_Size.update(
                            {
                                stock: req.body.size_75,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 7.5
                                }
                            }
                        );
                        let promise80 = db.Product_Size.update(
                            {
                                stock: req.body.size_80,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 8.0
                                }
                            }
                        );
                        let promise85 = db.Product_Size.update(
                            {
                                stock: req.body.size_35,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 8.5
                                }
                            }
                        );
                        let promise90 = db.Product_Size.update(
                            {
                                stock: req.body.size_90,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 9.0
                                }
                            }
                        );
                        let promise95 = db.Product_Size.update(
                            {
                                stock: req.body.size_95,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 9.5
                                }
                            }
                        );
                        let promise100 = db.Product_Size.update(
                            {
                                stock: req.body.size_100,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 10.0
                                }
                            }
                        );
                        let promise105 = db.Product_Size.update(
                            {
                                stock: req.body.size_105,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 10.5
                                }
                            }
                        );
                        let promise110 = db.Product_Size.update(
                            {
                                stock: req.body.size_110,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 11.0
                                }
                            }
                        );
                        let promise115 = db.Product_Size.update(
                            {
                                stock: req.body.size_115,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 11.5
                                }
                            }
                        );
                        let promise120 = db.Product_Size.update(
                            {
                                stock: req.body.size_120,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 12.0
                                }
                            }
                        );
                        let promise125 = db.Product_Size.update(
                            {
                                stock: req.body.size_125,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 12.5
                                }
                            }
                        );
                        let promise130 = db.Product_Size.update(
                            {
                                stock: req.body.size_130,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 13.0
                                }
                            }
                        );
                        let promise135 = db.Product_Size.update(
                            {
                                stock: req.body.size_135,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 13.5
                                }
                            }
                        );
                        let promise140 = db.Product_Size.update(
                            {
                                stock: req.body.size_140,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 14.0
                                }
                            }
                        );
                        let promise145 = db.Product_Size.update(
                            {
                                stock: req.body.size_145,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 14.5
                                }
                            }
                        );
                        let promise150 = db.Product_Size.update(
                            {
                                stock: req.body.size_150,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 15.0
                                }
                            }
                        );
                        let promise155 = db.Product_Size.update(
                            {
                                stock: req.body.size_155,
                            },
                            {
                                where: {
                                    product: edited_id,
                                    size: 15.5
                                }
                            }
                        );
                    });
                        
                        Promise.all([promise30, promise35, promise40, promise45, promise50, promise55, promise60, promise65, promise70,
                        promise75, promise80, promise85, promise90, promise100, promise105, promise110, promise115, promise120,
                        promise125, promise130, promise135, promise140, promise145, promise150, promise155])
                            .then(([result30, result35, result40, result45, result50, result55, result60, result65, result70,
                                result75, result80, result85, result90, result100, result105, result110, result115, result120,
                                result125, result130, result135, result140, result145, result150, result155]) => {
                                    return res.redirect("/products/"+edited_id);
                                });
                }
            });
    },
    deleteGet: (req, res) => {
        // db.Product.findByPk(req.params.id)
        //     .then(result => {return res.render("products/deleteProduct", {product: result})});
        return res.render("products/deleteProduct", {productId: req.params.id});
    },
    deleteDelete: (req, res) => {
        db.Product.destroy({
            where: {id: req.params.id}
        })
        .then(result => {return res.redirect("/products/")});
    },
    productList: (req, res) => {
        // db.Product.findAll({include: {association: "brand"}})
        // .then(results => {return res.render("products/productList", {products: results})});
        if (req.query){
            if (req.query.sizerange){
                fetch("http://localhost:3000/api/products/by-size-range")
                .then(response => response.json())
                .then(result => {
                    if (req.query.sizerange == "men"){
                        return res.render("products/productList", {results: {productsMen: result.productsMen}});
                    }
                    if (req.query.sizerange == "women"){
                        return res.render("products/productList", {results: {productsWomen: result.productsWomen}});
                    }
                    if (req.query.sizerange == "kids"){
                        return res.render("products/productList", {results: {productsKids: result.productsKids}});
                    }
                    else{
                        fetch("http://localhost:3000/api/products")
                        .then(response => response.json())
                        .then(results => {
                            return res.render("products/productList", {results: {avaiable: results.avaiable, unavaiable: results.unavaiable}});
                        })
                    }
                })
            }else{
                fetch("http://localhost:3000/api/products")
                .then(response => response.json())
                .then(results => {
                    return res.render("products/productList", {results: {avaiable: results.avaiable, unavaiable: results.unavaiable}});
                })
            }

        }else{
            fetch("http://localhost:3000/api/products")
            .then(response => response.json())
            .then(results => {
                return res.render("products/productList", {results: {avaiable: results.avaiable, unavaiable: results.unavaiable}});
            })
        }

        // fetch("http://localhost:3000/api/products/by-size-range")
        // .then(response => response.json())
        // .then(result => {
        //     if (req.query){
        //         if (req.query.sizerange == "men"){
        //             return res.render("products/productList", {result: result.productsMen});
        //         }
        //         if (req.query.sizerange == "women"){
        //             return res.render("products/productList", {result: result.productsWomen});
        //         }
        //         if (req.query.sizerange == "kids"){
        //             return res.render("products/productList", {result: result.productsKids});
        //         }
        //         else{
        //             return res.render("products/productList", {result: {avaiable: results.avaiable, unavaiable: results.unavaiable}});
        //         }
        //     }
        //     else{
        //         return res.render("products/productList", {result: {avaiable: results.avaiable, unavaiable: results.unavaiable}});
        //     }
        // });
    },
    // listBySizeRange: (req, res) => {
    //     fetch("http://localhost:3000/api/products/by-size-range")
    //     .then(response => response.json())
    //     .then(result => {
    //         console.log(result);
    //         if (req.query){
    //             if (req.query.sizerange == "men"){
    //                 return res.render("products/productList", {result: result});
    //             }
    //         }
    //     });
    // },
    addReview: (req, res) => {
        let errors = validationResult(req);
        let idProduct = req.params.id;
        if (!errors.isEmpty()){
            res.redirect('/products/'+idProduct);
        }
        else{
            db.Review.create({
                stars: req.body.stars,
                stars: req.body.stars,
                text: req.body.text,
                id_product: idProduct
            })
                .then(result => {
                    return res.redirect('/products/'+ idProduct);
                });
        }
    }
}

module.exports = controller;