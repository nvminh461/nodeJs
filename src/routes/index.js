const meRouter = require('./me');
const courseRouter = require('./course');

function routes(app) {

    app.use('/me', meRouter);

    app.use('/courses', courseRouter);

    // app.use(function (req, res, next) {
    //     res.status(404).render('error/_404');
    // });
}

module.exports = routes;
