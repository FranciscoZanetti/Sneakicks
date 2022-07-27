const express = require('express');
const router = express.Router();
const path = require('path');

const userMiddlewares = require('../../middlewares/UserMiddlewares');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname, "../../public/img/users/")) },
    filename: (req, file, cb) => {
        let newFilename = Date.now() + "-image-user" + path.extname(file.originalname);
        cb(null, newFilename);
    }
})
const uploadFile = multer({ storage });

const usersApiController = require('../../controllers/apis/usersApiController');