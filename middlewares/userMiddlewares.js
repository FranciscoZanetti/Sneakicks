const path = require("path");
const fs = require("fs");
const { check } = require("express-validator");
const db = require('../database/models');

const usersJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8' })
const users = JSON.parse(usersJSON);
const bcrypt = require('bcryptjs');
const Users = db.User;


const userMiddlewares = {
    validateCreateUser: [
        check("first_name").notEmpty().withMessage("* Este campo es obligatorio"),
        check("last_name").notEmpty().withMessage("* Este campo es obligatorio"),
        check("email")
            .notEmpty().withMessage("* Este campo es obligatorio")
            .isEmail().withMessage("* Ingrese un email valido")
            .custom(value => {
                return Users.findOne({
                    where: { email: value }
                }).then(user => {
                    if (user) {
                        return Promise.reject('* Ya existe un usuario con ese correo');
                    }
                });
            }),
        check("password")
            .notEmpty().withMessage("* Este campo es obligatorio")
    ],
    validateUpdateUser: [
        check("first_name")
            .notEmpty().withMessage("* Este campo es obligatorio"),
        check("last_name")
            .notEmpty().withMessage("* Este campo es obligatorio"),
        check("password")
            .notEmpty().withMessage("* Este campo es obligatorio")
    ],
    validateLoginUser: [
        check("email")
            .notEmpty().withMessage("* Este campo es obligatorio")
            .isEmail().withMessage("* Ingrese un email valido")
            .custom(value => {
                return Users.findOne({
                    where: { email: value }
                }).then(user => {
                    if (!user) {
                        return Promise.reject("* Usuario no registrado");
                    }
                });
            }),
        check("password")
            .notEmpty().withMessage("* Este campo es obligatorio")
            .custom((value, { req }) => {
                return Users.findOne({
                    where: { email: req.body.email }
                }).then(user => {
                    if (user) {
                        if (!bcrypt.compareSync(value, user.password)) {
                            return Promise.reject(new Error('* Contraseña incorrecta'))
                        } else {
                            return Promise.resolve();
                        }
                    }
                })
            }
            )
    ]
}

module.exports = userMiddlewares;