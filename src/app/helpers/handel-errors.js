const HandelErrors = function (HandleErrors) {
};

HandelErrors.handleErrors500 = (err, res) => {
    res.status(500).render(
        'error/_500',
        {error: err.message}
    );
}

HandelErrors.handleErrors404 = (req, res, next) => {
    res.status(404).render(
        'error/_404',
        {error: 'Page not found'}
    );
}

module.exports = HandelErrors
