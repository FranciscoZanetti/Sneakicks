const fs = require('fs');
const path = require('path');
const db = require('../../database/models');
const op = db.Sequelize.Op;

const { validationResult } = require("express-validator");

const Users = db.User

const controller = {
    listAll: (req, res) => {
        Users.findAll()
            .then(users => {
                const formattedUsers=[];

                users.forEach(user => {
                    let formattedUser = {
                        id: user.id,
                        name: user.first_name + " " + user.last_name,
                        email: user.email,
                        detail: `localhost:3000/api/users/${user.id}`
                    }
                    formattedUsers.push(formattedUser)
                })

                let response = {
                    count: users.length,
                    users: formattedUsers
                }
                res.json(response);
            })
    },
    listOne: (req, res) => {
        Users.findByPk(req.params.id)
        .then(user => {
            let userPublicInfo = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                image: `/img/users/${user.image}`,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }

            res.json(userPublicInfo);

            }
        )
    }

}

module.exports = controller;