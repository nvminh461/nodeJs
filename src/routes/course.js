const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/handle-form-actions', courseController.handleFormActions);
router.get('/:id/edit', courseController.edit);
router.put('/:id/update', courseController.update);
router.delete('/:id', courseController.delete);
router.get('/:slug', courseController.show);
router.get('/', courseController.index);

module.exports = router;
