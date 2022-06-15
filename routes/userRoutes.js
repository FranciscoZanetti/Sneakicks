const express = require('express');
const router = express.Router();
const path = require('path');

const userMiddlewares = require('../middlewares/UserMiddlewares');

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname, "../public/img/users/")) },
    filename: (req, file, cb) => {
        let newFilename = Date.now() + "-image-user" + path.extname(file.originalname);
        cb(null, newFilename);
    }
})
const uploadFile = multer({ storage });

const usersController = require('../controllers/UsersController');

router.get('/login', usersController.renderLogin);

router.post('/login', userMiddlewares.validateLoginUser, usersController.login);

router.get('/register', usersController.register);

router.post('/register', uploadFile.single("user_image"), userMiddlewares.validateCreateUser, usersController.create);

router.get('/:id/profile', usersController.profile);

router.get('/:id/edit/', usersController.edit)

router.post('/:id/edit/', userMiddlewares.validateUpdateUser, usersController.update)

module.exports = router;