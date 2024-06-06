const User = require('../../../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

class RegisterController {
    // [GET] /register
    register(req, res) {
        res.render('auth/register', {layout: 'auth'});
    }

    // [POST] /register
    async postRegister(req, res) {
        const {username, email, password} = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password_hash
        });
        User.create(newUser, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            } else {
                res.redirect('/login');
            }
        });
    }
}

module.exports = new RegisterController();
