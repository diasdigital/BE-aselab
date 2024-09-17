const express = require('express');
const router = express.Router();

const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const refreshTokenController = require('../controllers/auth/refreshTokenController');
const logoutController = require('../controllers/auth/logoutController');

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/refresh', refreshTokenController);
router.get('/logout', logoutController);

module.exports = router;
