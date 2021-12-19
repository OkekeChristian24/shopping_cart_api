// Import product controllers
const {
    createProduct,
    getProductById,
    updateProduct,
    updateProductQty,
    deleteProduct
} = require('./products.controller');
const router = require('express').Router();

const {
    validateCreateProduct,
    validateProductEdit,
    validateQtyEdit
} = require('../../validations/productValidation');

router.post('/', validateCreateProduct, createProduct);
router.get('/:id', getProductById);
router.put('/:id', validateProductEdit, updateProduct);
router.put('/qty/:id', validateQtyEdit, updateProductQty);
router.delete('/:id', deleteProduct);


module.exports = router;
