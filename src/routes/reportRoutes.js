const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

router.get('/', reportController.getReport);

module.exports = router;
