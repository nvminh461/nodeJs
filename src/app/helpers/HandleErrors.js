const HandleErrors = function (HandleErrors) {
};

HandleErrors.handleErrors500 = (err, res) => {
    res.status(500).render(
        'error/_500'
    );
}


module.exports = HandleErrors
