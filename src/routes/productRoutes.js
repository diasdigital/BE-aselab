const express = require('express');
const router = express.Router();
const ProductContoller = require('../controllers/productController.js');

router.get('/', ProductContoller.getAllProducts);
router.get('/:id', ProductContoller.getProductById);
router.post('/', ProductContoller.createProduct);
router.patch('/:id', ProductContoller.updateProduct);
router.delete('/:id', ProductContoller.deleteProduct);

module.exports = router;
