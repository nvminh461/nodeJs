const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/auth/LoginController');
const registerController = require('../app/controllers/auth/RegisterController');
const authMiddleware = require('../app/middlewares/auth');

router.get('/login', authMiddleware.isAuth, loginController.login);
router.post('/login', loginController.postLogin);

router.get('/register', authMiddleware.isAuth, registerController.register);
router.post('/register', registerController.postRegister);

router.get('/logout', loginController.logout);

module.exports = router;
