const path = require("path");
const fs = require("fs");
const { check } = require("express-validator");

const usersJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8' })
const users = JSON.parse(usersJSON);
const bcrypt = require('bcryptjs');

const userMiddlewares = {
    validateCreateUser: [
        check("first_name").notEmpty().withMessage("* Este campo es obligatorio"),
        check("last_name").notEmpty().withMessage("* Este campo es obligatorio"),
        check("email")
            .notEmpty().withMessage("* Este campo es obligatorio")
            .isEmail().withMessage("* Ingrese un email valido")
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    let user = users.find(user => {
                        return user.email == req.body.email;
                    })
                
                    if (user) {
                        reject(new Error('* Ya existe un usuario con ese correo'))
                    }

                    resolve(true)
                })
            })
            .withMessage("* Ya existe un usuario con ese correo"),
        check("password")
            .notEmpty().withMessage("* Este campo es obligatorio")
    ],
    validateUpdateUser: [
        check("first_name")
            .notEmpty().withMessage("* Este campo es obligatorio"),
        check("last_name")
            .notEmpty().withMessage("* Este campo es obligatorio"),
        check("email")
            .notEmpty().withMessage("* Este campo es obligatorio")
            .isEmail().withMessage("* Ingrese un email valido"),
        check("password")
            .notEmpty().withMessage("* Este campo es obligatorio")
    ],
    validateLoginUser: [
        check("email")
            .notEmpty().withMessage("* Este campo es obligatorio")
            .isEmail().withMessage("* Ingrese un email valido")
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    let user = users.find(user => {
                        return user.email == req.body.email;
                    })
                
                    if (!user) {
                        reject(new Error('Usuario no registrado'))
                    }

                    resolve(true)
                })
            })
            .withMessage("* Usuario no registrado"),
        check("password")
            .notEmpty().withMessage("* Este campo es obligatorio")
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    let user = users.find(user => {
                        return user.email == req.body.email;
                    })
                
                    if (!bcrypt.compareSync(req.body.password, user.password)) {
                        reject(new Error('* Contraseña incorrecta'))
                    }

                    resolve(true)
                })
            })
            .withMessage("* Contraseña incorrecta"),
    ]
}

module.exports = userMiddlewares;