const fs = require('fs');
const path = require('path');
const db = require('../../database/models');
const op = db.Sequelize.Op;

const { validationResult } = require("express-validator");
const { Sequelize } = require('../../database/models');

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
    }
}