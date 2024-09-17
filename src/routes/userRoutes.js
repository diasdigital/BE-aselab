const express = require('express');
const router = express.Router();
const UserContoller = require('../controllers/userController.js');

// router.get('/', UserContoller.getAllUsers);
router.get('/', UserContoller.getUserLoggedIn);
// router.get('/:user_id', UserContoller.getUserById);
router.patch('/', UserContoller.updateUser);

module.exports = router;
