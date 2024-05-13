const express = require('express');
const router = express.Router();

const customerController = require('../app/controllers/CustomerController');

router.get('/stored/courses', customerController.storedCourses);

module.exports = router;
