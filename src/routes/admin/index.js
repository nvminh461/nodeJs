const express = require('express');
const router = express.Router();

const categoriesRouter = require('./categories');
const productsRouter = require('./products');
const Attribute = require('./attribute');

router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/attributes', Attribute);
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
