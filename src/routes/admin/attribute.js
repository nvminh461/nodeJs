const express = require('express');
const router = express.Router();

const attributeController = require('../../app/controllers/admin/AttributeController');

// GET /admin/attributes/create
router.get('/create', attributeController.create);
// POST /admin/attributes/store
router.post('/store', attributeController.store);
// GET /admin/attributes/:id/edit
router.get('/:id/edit', attributeController.edit);
// PUT /admin/attributes/:id
router.put('/:id/update', attributeController.update);
// DELETE /admin/attributes/:id
router.delete('/:id', attributeController.delete);
// DELETE /admin/handle-form-actions
router.post('/handle-form-actions', attributeController.handleFormActions);
// GET /admin/attributes
router.get('/', attributeController.index);

module.exports = router;
