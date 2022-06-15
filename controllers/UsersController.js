const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const { validationResult } = require("express-validator");

const usersJSON = fs.readFileSync('./data/users.json', {encoding: 'utf-8'})
const users = JSON.parse(usersJSON);

const controller = {
    login: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()){
            console.log(errors)
            res.render("users/login", { errors: errors.mapped(), old: req.body });

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
        return res.render('users/login');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    create: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty() || !req.file){
            console.log(errors)
            res.render("users/register", { errors: errors.mapped(), old: req.body });
        } else {
            let aux = path.parse(req.file.filename);

            let encryptedPassword = bcrypt.hashSync(req.body.password, 10);

            let newUser = {
                id: Date.now(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: encryptedPassword,
                category: "user",
                image: req.file.filename,
            }

            console.log(newUser);

            users.push(newUser);
            usersStringified = JSON.stringify(users, null, '\t');
            fs.writeFileSync("./data/users.json", usersStringified);

            return res.redirect('/');
        }
    },
    profile: (req, res) => {
        let user = users.find(item => {
			return item.id == req.params.id;
		});

        return res.render('users/profile', {user: user});
    },
    update: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty() || !req.file){
            console.log(errors)
            res.render("users/update/", { errors: errors.mapped(), old: req.body });
        } else {
            let encryptedPassword = bcrypt.hashSync(req.body.password, 10);

            let newUser = {
                id: Date.now(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: encryptedPassword,
                category: "user",
                image: req.file.filename,
            }

            console.log(newUser);

            users.push(newUser);
            usersStringified = JSON.stringify(users, null, '\t');
            fs.writeFileSync("./data/users.json", usersStringified);

            return res.redirect('/');
        }
    },
    edit: (req, res) => {
        let user = users.find(item => {
			return item.id == req.params.id;
		});

        

        return res.render('users/edit', {user: user});
    },
}

module.exports = controller;