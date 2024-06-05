const Product = require('../../../models/Product');
const Category = require('../../../models/Category');
const {handleErrors} = require('../../helpers/handel-errors');

class ProductController {

    // GET /admin/products
    index(req, res) {
        Product.getAll(req.query.name, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.render(
                    'admin/product/product',
                    {
                        products: data,
                        layout: 'admin',
                        title: 'Product',
                        entity: 'products',
                        path: '/admin/products',
                        active: 'product',
                    });
            }
        }, req.query.sort);
    }

    // GET /admin/products/create
    create(req, res) {
        Category.getAllIdAndName((err, data) => {
            console.log(data)
            if (err) {
                handleErrors(err, res);
            } else {
                res.render(
                    'admin/product/form',
                    {
                        layout: 'admin',
                        title: 'Product',
                        action: 'create',
                        entity: 'products',
                        categories: data,
                        active: 'add-product',
                    });
            }
        });
    }

    // POST /admin/products/store
    store(req, res) {
        const imagePaths = JSON.stringify(req.files['images'].map(file => file.path.replace('/var/www/html/nodeJs/src/public', '')));
        const product = new Product({
            product_name: req.body.product_name,
            description: req.body.description,
            price: req.body.price,
            image: imagePaths,
            category_id: req.body.category_id,
        });
        Product.create(product, (err, data) => {
            if (err) {
                console.log(err)
                handleErrors(err, res);
            } else {
                res.redirect('/admin/products');
            }
        });
    }

    // GET /admin/products/:id/edit
    edit(req, res) {
        Product.findById(req.params.id, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                Category.getAllIdAndName((err, categories) => {
                    if (err) {
                        handleErrors(err, res);
                    } else {
                        res.render(
                            'admin/product/form',
                            {
                                layout: 'admin',
                                title: 'Product',
                                action: 'edit',
                                entity: 'products',
                                product: data,
                                categories: categories,
                                active: 'product',
                            });
                    }
                });
            }
        });
    }

    // PUT /admin/products/:id
    update(req, res) {
        const imagePaths = JSON.stringify(req.files['images'].map(file => file.path.replace('/var/www/html/nodeJs/src/public', '')));
        const product = new Product({
            product_name: req.body.product_name,
            description: req.body.description,
            price: req.body.price,
            image: imagePaths,
            category_id: req.body.category_id,
        });
        Product.updateById(req.params.id, product, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.redirect('/admin/products');
            }
        });
    }

    // DELETE /admin/categories/:id
    delete(req, res) {
        Product.remove(req.params.id, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.redirect('/admin/products');
            }
        });
    }

    // POST /admin/categories/handle-form-actions
    handleFormActions(req, res) {
        switch (req.body.action) {
            case 'delete':
                Product.removeByIds(req.body.productIds, (err, data) => {
                    if (err) {
                        handleErrors(err, res);
                    } else {
                        res.redirect('/admin/products');
                    }
                });
                break;
            default:
                res.json({message: 'Action is invalid'});
                break;
        }
    }
}

module.exports = new ProductController();
