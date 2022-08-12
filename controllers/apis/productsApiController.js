const fs = require('fs');
const path = require('path');
const db = require('../../database/models');

const { validationResult } = require("express-validator");

module.exports = {
    list: (req, res) => {
        db.Product.findAll({
            include: [
                {association: "brand"},
                // {association: "reviews"},
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
                product['checkerMen'] = checkerMen;
                product.checkerWomen = checkerWomen;
                product.checkerKids = checkerKids;
                product.detail = "http://localhost:3000/api/products/"+product.id;
            });
            let avaiable = [];
            let unavaiable = [];
            products.forEach((product) => {
                let avaiableChecker = false;
                product.product_sizes.forEach((product_size) => {
                    if (product_size.stock > 0){
                        avaiableChecker = true;
                    }
                });
                if (avaiableChecker){
                    avaiable.push(product);
                }
                if (!avaiableChecker){
                    unavaiable.push(product);
                }
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
                products: products,
                avaiable: avaiable,
                unavaiable: unavaiable
            });
        });
    },
    listBySizeRange: (req, res) => {
        db.Product.findAll({
            include: [
                {association: "brand"},
                // {association: "reviews"},
                {association: "product_sizes"}
            ]
        })
        .then(products => {
            let counterMen = 0;
            let counterWomen = 0;
            let counterKids = 0;
            let productsMen = [];
            let productsWomen = [];
            let productsKids = [];
            products.forEach(product => {
                let checkerMen = false;
                let checkerWomen = false;
                let checkerKids = false;
                product.product_sizes.forEach(product_size => {
                    if (!checkerMen && product_size.size > 7.0 && product_size.stock > 0){
                        counterMen += 1;
                        productsMen.push(product);
                        checkerMen = true;
                    }
                    if (!checkerWomen && product_size.size > 4.0 && product_size.size < 10.0 && product_size.stock > 0){
                        counterWomen += 1;
                        productsWomen.push(product);
                        checkerWomen = true;
                    }
                    if (!checkerKids && product_size.size < 7.0 && product_size.stock > 0){
                        counterKids += 1;
                        productsKids.push(product);
                        checkerKids = true;
                    }
                });
            });
            return res.json({
                count: products.length,
                countBySizeRange: {
                    men: counterMen,
                    women: counterWomen,
                    kids: counterKids
                },
                productsMen: productsMen,
                productsWomen: productsWomen,
                productsKids: productsKids,
            });
        });
    },
    detail: (req, res) => {
        let otherColorwaves = [];
        let promiseProduct = db.Product.findByPk(req.params.id, {
            include: [
                {association: "brand"},
                {association: "product_sizes"},
                // {association: "reviews"}
            ]
        });
        let promiseOtherColorwaves = db.Product.findAll({include: [{association: "brand"}, {association: "product_sizes"}]});
        Promise.all([promiseProduct, promiseOtherColorwaves])
        .then(([product, colorwaves]) => {
            colorwaves.forEach(colorwave => {
                if ((colorwave.name == product.name) && (colorwave.id != product.id)){
                    otherColorwaves.push({id: colorwave.id, colorwave: colorwave.colorwave});
                }
            });
            let checkerMen = false;
            let checkerWomen = false;
            let checkerKids = false;
            product.product_sizes.forEach(product_size => {
                if (!checkerMen && product_size.size > 7.0 && product_size.stock > 0){
                    checkerMen = true;
                }
                if (!checkerWomen && product_size.size > 4.0 && product_size.size < 10.0 && product_size.stock > 0){
                    checkerWomen = true;
                }
                if (!checkerKids && product_size.size < 7.0 && product_size.stock > 0){
                    checkerKids = true;
                }
            });
            let recomended = colorwaves.filter(element => element.id != req.params.id && (product.brand.name == element.brand.name || product.colorwave == element.colorwave));
            product.hasStock = {
                men: checkerMen,
                women: checkerWomen,
                kids: checkerKids
            }
            return res.json({product: product, colorwaves: otherColorwaves, recomended: recomended});
        });
    },
    create: (req, res) => {
        let errors = validationResult(req);
        console.log("REQ.PICTURES", req.body.product_pictures);
        console.log("BODY", req.body);
        console.log(req.body.product_pictures);
        console.log("REQ.FILES", req.files);

        if (!errors.isEmpty() || !req.files || req.files.length < 1){
            console.log("req.files: "+req.files);
            return res.json({
                errors: errors.mapped(),
                old: req.body,
                status: 400
            });
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
                    id_brand: brand[0].id,
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
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 3.5,
                        stock: req.body.size_35
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 4.0,
                        stock: req.body.size_40
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 4.5,
                        stock: req.body.size_45
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 5.0,
                        stock: req.body.size_50
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 5.5,
                        stock: req.body.size_55
                    });
                    return created;
                }).then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 6.0,
                        stock: req.body.size_60
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 6.5,
                        stock: req.body.size_65
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 7.0,
                        stock: req.body.size_70
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 7.5,
                        stock: req.body.size_75
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 8.0,
                        stock: req.body.size_80
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 8.5,
                        stock: req.body.size_85
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 9.0,
                        stock: req.body.size_90
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 9.5,
                        stock: req.body.size_95
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 10.0,
                        stock: req.body.size_100
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 10.5,
                        stock: req.body.size_105
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 11.0,
                        stock: req.body.size_110
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 11.5,
                        stock: req.body.size_115
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 12.0,
                        stock: req.body.size_120
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 12.5,
                        stock: req.body.size_125
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 13.0,
                        stock: req.body.size_130
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 13.5,
                        stock: req.body.size_135
                    });
                    return created;
                }).then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 14.0,
                        stock: req.body.size_140
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 14.5,
                        stock: req.body.size_145
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 15.0,
                        stock: req.body.size_150
                    });
                    return created;
                })
                .then(created => {
                    db.Product_Size.create({
                        product: created.id,
                        size: 15.5,
                        stock: req.body.size_155
                    });
                    return created;
                })
                .then(created => {
                    return res.json({
                        product: created,
                        status: 200
                    });
                });
            });
        }
    },
    editPut: (req, res) => {

        let errors = validationResult(req);
        db.Product.findByPk(req.params.id, {indlude: [{association: "brand"}, {association: "product_sizes"}]})
        .then(product => {
            if (!errors.isEmpty()){
                // res.render("products/editProduct", { errors: errors.mapped(), old: req.body, product: resultProduct, sizeArray: resultProduct_Size });
                return res.json({
                    errors: errors.mapped(),
                    old: req.body,
                    product: product,
                });
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
                            id_brand: brand[0].id,
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

                        let updatedProduct = result;

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
                            )
                            .then(updated => {
                                updatedProduct = updated;
                            });
                        }
                        // CHEQUEAR CODIGO DE EDIT PUT
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
                        Promise.all([promise30, promise35, promise40, promise45, promise50, promise55, promise60, promise65, promise70,
                            promise75, promise80, promise85, promise90, promise95, promise100, promise105, promise110, promise115,
                            promise120, promise125, promise130, promise135, promise140, promise145, promise150, promise155])
                        .then(([result30, result35, result40, result45, result50, result55, result60, result65, result70,
                            result75, result80, result85, result90, result100, result105, result110, result115, result120,
                            result125, result130, result135, result140, result145, result150, result155]) => {
                                // return res.redirect("/products/"+edited_id);
                                db.Product.findByPk(req.params.id, {
                                    include: [
                                        {association: "brand"},
                                        // {association: "reviews"},
                                        {association: "product_sizes"}
                                    ]
                                })
                                .then(product => {
                                    return res.json({
                                        product: product,
                                        rowsUpdated: updatedProduct
                                    });
                                });
                            });
                    });
                });
            }
        });
    },
    deleteDelete: (req, res) => {
        db.Product.destroy({
            where: {id: req.params.id}
        })
        .then(result => {return res.json({result: result})});
    },
    reviews: (req, res) => {
        db.Review.findAll({
            where: {id_product: req.params.id}
        })
        .then(result => {
            result.reverse();
            return res.json({reviews: result, productId: req.params.id});
        });
    },
    addReview: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.json({
                errors: errors.mapped(),
                status: 200
            });
        }
        else{
            db.Review.create({
                stars: req.body.stars,
                stars: req.body.stars,
                text: req.body.text,
                id_product: idProduct
            })
            .then(review => {
                return res.json({
                    review: review,
                    status: 400
                });
            });
        }
    },
    addToCart: (req, res) => {
        let redirectId = req.params.id;
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
                return res.json({
                    product: product,
                    status: "has to login"
                });
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
                        return res.json({
                            product: product,
                            status: "no stock"
                        });
                    }else{
                        db.Product_Cart.count({
                            where: {
                                user_id: req.session.user_id,
                                product_id: req.params.id,
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
                                            bought: 0
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
                        .then(x => {return res.json({
                            product: product,
                            status: "added"
                        })});
                    }
                });
            }
        });
    }
}