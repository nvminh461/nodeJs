const loggedIn = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect('/login');
    }
};

const isAuth = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user;
        res.redirect('/admin');
    } else {
        next();
    }
}
module.exports = {
    loggedIn,
    isAuth
};
