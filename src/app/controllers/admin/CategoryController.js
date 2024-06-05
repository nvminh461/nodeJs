const Category = require('../../../models/Category');
const {handleErrors} = require('../../helpers/handel-errors');

class CategoryController {

    // GET /admin/categories
    index(req, res) {
        let sort = {
            sort: req.query._sort || 'id',
            order: req.query.order || 'desc',
        };
        Category.getAll('', (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.render(
                    'admin/category/category',
                    {
                        categories: data,
                        layout: 'admin',
                        entity: 'categories',
                        title: 'Category',
                        path: '/admin/categories',
                        active: 'category',
                    });
            }
        }, sort);
    }

    // GET /admin/categories/create
    create(req, res) {
        res.render(
            'admin/category/form',
            {
                layout: 'admin',
                title: 'Category',
                action: 'create',
                entity: 'categories',
                active: 'add-category',
            });
    }

    // POST /admin/categories/store
    store(req, res) {
        const category = new Category({
            category_name: req.body.category_name,
            description: req.body.description,
        });
        Category.create(category, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.redirect('/admin/categories');
            }
        });
    }

    // GET /admin/categories/:id/edit
    edit(req, res) {
        Category.findById(req.params.id, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.render(
                    'admin/category/form',
                    {
                        category: data,
                        layout: 'admin',
                        title: 'Category',
                        action: 'edit',
                        entity: 'categories',
                        active: 'category',
                    });
            }
        });
    }

    // PUT /admin/categories/:id/update
    update(req, res) {
        const category = new Category({
            category_name: req.body.category_name,
            description: req.body.description,
        });
        Category.updateById(req.params.id, category, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.redirect('/admin/categories');
            }
        });
    }

    // DELETE /admin/categories/:id
    delete(req, res) {
        Category.remove(req.params.id, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.redirect('/admin/categories');
            }
        });
    }

    // POST /admin/categories/handle-form-actions
    handleFormActions(req, res) {
        switch (req.body.action) {
            case 'delete':
                Category.removeByIds(req.body.categoryIds, (err, data) => {
                    if (err) {
                        handleErrors(err, res);
                    } else {
                        res.redirect('/admin/categories');
                    }
                });
                break;
            default:
                res.json({message: 'Action is invalid'});
                break;
        }
    }
}

module.exports = new CategoryController();
