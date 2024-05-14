const SortMiddleware = function (req, res, next) {
    res.locals._sort = {
        enabled: false,
        order: 'default',
    };

    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals._sort, {
            enabled: true,
            sort: req.query._sort,
            order: req.query.order,
        });
    }

    next();
};

module.exports = SortMiddleware;
