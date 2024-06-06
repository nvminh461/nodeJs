const express = require('express');
const router = express.Router();

const categoryController = require('../../app/controllers/admin/CategoryController');

router.get('/create', categoryController.create);
router.post('/store', categoryController.store);
router.post('/handle-form-actions', categoryController.handleFormActions);
router.get('/:id/edit', categoryController.edit);
router.put('/:id/update', categoryController.update);
router.delete('/:id', categoryController.delete);
router.get('/', categoryController.index);

module.exports = router;
