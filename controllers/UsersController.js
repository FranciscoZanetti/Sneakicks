const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const fetch = require("node-fetch");

const { validationResult } = require("express-validator");
const session = require('express-session');

const Users = db.User

const setSessionData = async (email, req) => {
    return await Users.findOne({
        where: { email }
    }).then(response => {
        return response.toJSON()
    }).then(response => {
        let user = response;
        req.session.user_id = user.id;
        req.session.email = req.body.email;
        req.session.first_name = (req.body.first_name ? req.body.first_name : user.first_name);
        req.session.last_name = (req.body.last_name ? req.body.last_name : user.last_name);
        req.session.category = user.category;
        req.session.image = (req.file ? req.file.filename : user.image);
        req.session.save();
    })
}

const controller = {
    login: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("users/login", { errors: errors, old: req.body });

        } else {
            setSessionData(req.body.email, req);

            return res.redirect('/');
        }
    },
    renderLogin: (req, res) => {
        console.log(req.session.user_id);
        if (req.session.user_id) {
            res.redirect(`${req.session.user_id}/profile`)
        }
        return res.render('users/login', { user_info: req.session });
    },
    register: (req, res) => {
        if (req.session.user_id) {
            res.redirect(`${req.session.user_id}/profile`)
        }
        return res.render('users/register');
    },
    create: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty() || !req.file) {
            console.log(errors)
            res.render("users/register", { errors: errors, old: req.body });
        } else {
            Users.create(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    category: "user",
                    image: req.file.filename,
                }
            )
                .then(function () {
                    setSessionData(req.body.email, req);

                })
                .then(function () {
                    res.redirect('/');
                })
                .catch(error => res.send(error))
        }
    },
    profile: (req, res) => {
        if (typeof req.session.user_id == 'undefined') {
            return res.status(401).send("401 - Debe ingresar al sitio para poder ver su perfil")
        }

        if (req.params.id == req.session.user_id) {
            return res.render('users/profile');
        } else {
            return res.status(401).send('401 - El perfil de usuario al que intenta acceder es privado')
        }
    },
    update: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("users/edit", { errors: errors.mapped(), old: req.body });
        } else {
            Users.update(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    password: (req.body.password ? bcrypt.hashSync(req.body.password, 10) : req.session.password),
                    category: "user",
                    image: (req.file ? req.file.filename : req.session.image),
                }, {
                    where : { id : req.session.user_id }
                }
            ).then(() => {
                req.session.destroy();
            })
            
            return res.redirect('/');
        }
    },
    edit: (req, res) => {
        if (typeof req.session.user_id == 'undefined') {
            return res.status(401).send("401 - Debe ingresar al sitio para poder editar su perfil")
        } else if (req.session.user_id != req.params.id) {
            return res.status(401).send("401 - No tiene permisos para editar este perfil perfil")
        }

        return res.render('users/edit', { session : req.session });
    },
    signout: (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = controller;