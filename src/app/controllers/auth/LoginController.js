const User = require('../../../models/User');
const bcrypt = require('bcrypt');
const handleErrors = require('../../../app/helpers/handel-errors');
require('dotenv').config();

class LoginController {
    // [GET] /login
    login(req, res) {
        res.render('auth/login', {layout: 'auth'});
    }

    // [POST] /login
    async postLogin(req, res) {
        const {email, password} = req.body;
        User.findByEmail(email, async (err, user) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).render(
                        'auth/login',
                        {
                            layout: 'auth',
                            message: `Not found User with email ${email}.`
                        }
                    );
                } else {
                    handleErrors.handleErrors500(err, res);
                }
            } else {
                const passwordIsValid = await bcrypt.compare(password, user.password_hash);
                if (!passwordIsValid) {
                    res.status(401).render(
                        'auth/login',
                        {
                            layout: 'auth',
                            message: "Invalid Password!"
                        });
                } else {
                    req.session.user = user;
                    req.session.loggedin = true;
                    res.redirect('/admin');
                }
            }
        });
    }

    // [GET] /logout
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not log out User"
                });
            } else {
                res.redirect('/login');
            }
        });
    }
}

module.exports = new LoginController();
