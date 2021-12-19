// Import cart item controllers
const {
    addItemToCart,
    updateCartItem,
    removeItemFromCart
} = require('./cartItems.controller');

const {
    validateCreateItem,
    validateQtyEdit
} = require('../../validations/cartItemValidation');

const router = require('express').Router();

const { checkToken } = require('../../authorizations/tokenAuth');

// These routes manage the individual cart items
// There is no read-route for the cart item. The cart route read all details for the cart
// including the cart items
router.post('/:id', checkToken, validateCreateItem, addItemToCart);
router.put('/:id', checkToken, validateQtyEdit, updateCartItem);
router.delete('/:id', checkToken, removeItemFromCart);

module.exports = router;
