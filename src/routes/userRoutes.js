const express = require('express');
const router = express.Router();
const UserContoller = require('../controllers/userController.js');

router.get('/', UserContoller.getAllUsers);
router.get('/:id', UserContoller.getUserById);
router.post('/', UserContoller.createUser);
router.patch('/:id', UserContoller.updateUser);
router.delete('/:id', UserContoller.deleteUser);

module.exports = router;
