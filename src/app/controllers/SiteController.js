class SiteController {

    // [GET] /
    index(req, res) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        console.log(req.body.search);
        return res.send('search success');
    }
}

module.exports = new SiteController();
