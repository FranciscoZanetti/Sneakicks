const path = require("path");
const fs = require("fs");
const { check } = require("express-validator");

const productsJSON = fs.readFileSync('./data/products.json', {encoding: 'utf-8'})
const products = JSON.parse(productsJSON);

const productMiddlewares = {
    validateManageProduct: [
        check("name").notEmpty().withMessage("Este campo es obligatorio"),
        check("colorwave").notEmpty().withMessage("Este campo es obligatorio"),
        check("brand_name").notEmpty().withMessage("Este campo es obligatorio"),
        check("category").notEmpty().withMessage("Este campo es obligatorio"),
        check("price_original")
            .notEmpty().withMessage("Este campo es obligatorio").bail()
            .isInt().withMessage("El precio debe ser un número entero, no usamos centavos"),
        check("discount").isInt().withMessage("El porcentaje debe ser un entero"),
        check("release_year")
            .isInt().withMessage("Debe ser un año válido"),
        check("story").notEmpty().withMessage("Este campo es obligatorio"),
    ],
    validateReviewForm: [
        check("stars").notEmpty().withMessage("Debes agregar un puntaje de estrellas"),
        check("text").notEmpty().withMessage("Este campo es obligatorio")
    ],
    validateAddToCart: [
        check("size").notEmpty().withMessage("SIN STOCK")
    ]
}

module.exports = productMiddlewares;