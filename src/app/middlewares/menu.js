const menus = require('../../config/menu/menu');

module.exports = function menuMiddleware(req, res, next) {
    res.locals.menus = menus;
    next();
};
