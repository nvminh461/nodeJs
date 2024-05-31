const express = require('express');
const router = express.Router();

const categoryController = require('../../app/controllers/admin/CategoryController');

router.get('/', categoryController.index);

module.exports = router;
