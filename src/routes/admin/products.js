const express = require('express');
const router = express.Router();
const createUploadMiddleware = require('../../app/middlewares/upload-image');

const productController = require('../../app/controllers/admin/ProductController');

// GET /admin/products/create
router.get('/create', productController.create);
// POST /admin/products/store
router.post('/store', createUploadMiddleware('products').fields([{
    name: 'images',
    maxCount: 7
}]), productController.store);
// GET /admin/products/:id/edit
router.get('/:id/edit', productController.edit);
// PUT /admin/products/:id
router.put('/:id/update', createUploadMiddleware('products').fields([{
    name: 'images',
    maxCount: 7
}]), productController.update);
// DELETE /admin/products/:id
router.delete('/:id', productController.delete);
// DELETE /admin/handle-form-actions
router.post('/handle-form-actions', productController.handleFormActions);
// GET /admin/products
router.get('/', productController.index);

module.exports = router;
