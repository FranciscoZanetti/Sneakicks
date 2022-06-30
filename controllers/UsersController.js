const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const { validationResult } = require("express-validator");
const session = require('express-session');

const usersJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8' })
const users = JSON.parse(usersJSON);

const controller = {
    login: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("users/login", { errors: errors, old: req.body });

        } else {

            let user = users.find(user => {
                if (user.email == req.body.email) {
                    return user
                }
            })

            req.session.email = user.email;
            req.session.first_name = user.first_name
            req.session.last_name = user.last_name
            req.session.user_id = user.id
            req.session.image = user.image

            console.log(req.session)

            return res.redirect('/');
        }
    },
    renderLogin: (req, res) => {
        console.log(req.session);
        return res.render('users/login', {user_info : req.session});
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    create: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty() || !req.file) {
            console.log(errors)
            res.render("users/register", { errors: errors, old: req.body });
        } else {
            let aux = path.parse(req.file.filename);

            let encryptedPassword = bcrypt.hashSync(req.body.password, 10);

            let editedUser = {
                id: Date.now(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: encryptedPassword,
                category: "user",
                image: req.file.filename,
            }

            users.push(editedUser);
            usersStringified = JSON.stringify(users, null, '\t');
            fs.writeFileSync("./data/users.json", usersStringified);

            req.session.email = editedUser.email;
            req.session.first_name = editedUser.first_name
            req.session.last_name = editedUser.last_name
            req.session.user_id = editedUser.id
            req.session.image = editedUser.image

            return res.redirect('/');
        }
    },
    profile: (req, res) => {
        if (typeof req.session.user_id == 'undefined') {
            console.log(req.session)
            return res.send("401 - Debe ingresar al sitio para poder ver su perfil")
        }

        if (req.params.id == req.session.user_id) {
            return res.render('users/profile');
        } else {
            return res.send('401 - El perfil de usuario al que intenta acceder es privado')
        }
    },
    update: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors)
            console.log(req.body)
            return res.render("users/edit", { errors: errors.mapped(), old: req.body });
        } else {

            let editedUser = {
                id: req.session.user_id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: (req.body.password ? bcrypt.hashSync(req.body.password, 10) : req.session.password),
                category: "user",
                image: (req.file ? req.file.filename : req.session.image),
            }

            users.forEach( (user, index) => {
                if (user.id == req.session.user_id){
                    users[index] = editedUser;  
                }
            });

            usersStringified = JSON.stringify(users, null, '\t');
            fs.writeFileSync("./data/users.json", usersStringified);

            req.session.email = editedUser.email;
            req.session.first_name = editedUser.first_name
            req.session.last_name = editedUser.last_name
            req.session.image = editedUser.image

            return res.redirect('/');
        }
    },
    edit: (req, res) => {
        return res.render('users/edit');
    },
    signout: (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = controller;