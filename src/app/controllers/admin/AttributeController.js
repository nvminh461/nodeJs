const Attribute = require('../../../models/Attribute');
const Category = require('../../../models/Category');
const {handleErrors} = require('../../helpers/handel-errors');

class AttributeController {

    // GET /admin/products
    index(req, res) {
        Category.getAllIdAndName((err, data) => {
            let sort = {
                sort: req.query._sort || 'id',
                order: req.query.order || 'desc',
            };
            Attribute.getAll(req.query.name, (err, attributes) => {
                if (err) {
                    handleErrors(err, res);
                } else {
                    res.render(
                        'admin/attribute/attribute',
                        {
                            attributes: attributes,
                            layout: 'admin',
                            title: 'Catalog attributes',
                            entity: 'attributes',
                            path: '/admin/attributes',
                            active: 'attribute',
                            categories: data,
                        });
                }
            }, sort);
        });
    }

    // GET /admin/products/create
    create(req, res) {
        Category.getAllIdAndName((err, data) => {
            console.log(data)
            if (err) {
                handleErrors(err, res);
            } else {
                res.render(
                    'admin/attribute/form',
                    {
                        layout: 'admin',
                        title: 'Catalog attributes',
                        action: 'create',
                        entity: 'attributes',
                        categories: data,
                        active: 'add-attribute',
                    });
            }
        });
    }

    // POST /admin/products/store
    store(req, res) {
        const attribute = new Attribute({
            attribute_name: req.body.attribute_name,
            attribute_detail: req.body.attribute_detail,
            category_id: req.body.category_id,
        });
        Attribute.create(attribute, (err, data) => {
            if (err) {
                console.log(err)
                handleErrors(err, res);
            } else {
                res.redirect('/admin/attributes');
            }
        });
    }

    // GET /admin/products/edit/:id
    edit(req, res) {
        Category.getAllIdAndName((err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                Attribute.findById(req.params.id, (err, attribute) => {
                    if (err) {
                        handleErrors(err, res);
                    } else {
                        res.render(
                            'admin/attribute/form',
                            {
                                attribute: attribute,
                                layout: 'admin',
                                title: 'Catalog attributes',
                                action: 'edit',
                                entity: 'attributes',
                                categories: data,
                                active: 'attribute',
                            });
                    }
                });
            }
        });
    }

    // PUT /admin/products/:id
    update(req, res) {
        const attribute = new Attribute({
            attribute_name: req.body.attribute_name,
            attribute_detail: req.body.attribute_detail,
            category_id: req.body.category_id,
        });
        Attribute.updateById(req.params.id, attribute, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.redirect('/admin/attributes');
            }
        });
    }

    // DELETE /admin/products/:id
    delete(req, res) {
        Attribute.remove(req.params.id, (err, data) => {
            if (err) {
                handleErrors(err, res);
            } else {
                res.redirect('/admin/attributes');
            }
        });
    }

    // DELETE /admin/handle-form-actions
    handleFormActions(req, res) {
        if (req.body.action === 'delete') {
            Attribute.removeByIds(req.body.attributeIds, (err, data) => {
                if (err) {
                    handleErrors(err, res);
                } else {
                    res.redirect('/admin/attributes');
                }
            });
        } else {
            res.redirect('/admin/attributes');
        }
    }
}

module.exports = new AttributeController();
