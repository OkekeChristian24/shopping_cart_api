// Import product controllers
const {
    createProduct,
    getProductById,
    updateProduct,
    updateProductQty,
    deleteProduct
} = require('./products.controller');
const router = require('express').Router();


router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.put('/qty/:id', updateProductQty);
router.delete('/:id', deleteProduct);


module.exports = router;
