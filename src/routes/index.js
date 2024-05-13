const meRouter = require('./customer');
const courseRouter = require('./course');
const Course = require("../models/Course");
const handleErrors = require("../app/helpers/handel-errors");

function routes(app) {

    app.use('/customer', meRouter);

    app.use('/courses', courseRouter);

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

    //route error 404
    // app.use(function (req, res, next) {
    //     res.status(404).render('error/_404');
    // });
}

module.exports = routes;
