const express = require('express');
const router = express.Router();

const categoriesRouter = require('./categories');
const productsRouter = require('./products');

router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.get('/', (req, res) => {
    res.render(
        'admin/dashboard',
        {
            layout: 'admin',
            title: 'Dashboard',
            active: 'dashboard',
        });
});

module.exports = router;
