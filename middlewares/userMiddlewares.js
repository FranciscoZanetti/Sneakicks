const path = require("path");
const fs = require("fs");
const { check } = require("express-validator");

const usersJSON = fs.readFileSync('./data/users.json', {encoding: 'utf-8'})
const users = JSON.parse(usersJSON);

const userMiddlewares = {
    validateCreateUser: [
        check("first_name").notEmpty().withMessage("* Este campo es obligatorio"),
        check("last_name").notEmpty().withMessage("* Este campo es obligatorio"),
        check("email")
        .notEmpty().withMessage("* Este campo es obligatorio")
        .isEmail().withMessage("* Ingrese un email valido"),
        check("password")
        .notEmpty().withMessage("* Este campo es obligatorio")
    ],
    validateUpdateUser: [
        check("first_name").notEmpty().withMessage("* Este campo es obligatorio"),
        check("last_name").notEmpty().withMessage("* Este campo es obligatorio"),
        check("email")
        .notEmpty().withMessage("* Este campo es obligatorio")
        .isEmail().withMessage("* Ingrese un email valido"),
        check("password")
        .notEmpty().withMessage("* Este campo es obligatorio")
    ],
    validateLoginUser: [
        check("email")
        .notEmpty().withMessage("* Este campo es obligatorio")
        .isEmail().withMessage("* Ingrese un email registrado"),
        check("password")
        .notEmpty().withMessage("* Este campo es obligatorio")
    ],
}

module.exports = userMiddlewares;