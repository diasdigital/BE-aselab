const express = require('express');
const router = express.Router();
const ProductContoller = require('../controllers/productController.js');

router.get('/', ProductContoller.getAllProducts);
router.get('/:product_id', ProductContoller.getProductByUser);
router.post('/', ProductContoller.createProduct);
router.patch('/:product_id', ProductContoller.updateProduct);

module.exports = router;
