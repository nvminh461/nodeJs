const meRouter = require('./customer');
const courseRouter = require('./course');
const Course = require("../models/Course");
const handleErrors = require("../app/helpers/handel-errors");
const authRouter = require('./auth');
const adminRouter = require('./admin');
const authMiddleware = require('../app/middlewares/auth');

function routes(app) {

    app.use('/customer', meRouter);

    app.use('/courses', courseRouter);

    app.use(authRouter);

    app.use('/admin', authMiddleware.loggedIn, adminRouter);

    //default route home page
    app.get('/', (req, res) => {
        Course.getAll('', (err, data) => {
            if (err) {
                handleErrors.handleErrors500(err, res);
            } else {
                res.render('courses/course', {
                    courses: data
                });
            }
        });
    });
}

module.exports = routes;
