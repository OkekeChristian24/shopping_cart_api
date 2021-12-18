const router = require('express').Router();

// Import cart item controllers
const {
    addItemToCart,
    updateCartItem,
    removeItemFromCart
} = require('./cartItems.controller');

// These routes manage the individual cart items
// There is no read-route for the cart item. The cart route read all details for the cart
// including the cart items
router.post('/:id', addItemToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeItemFromCart);

module.exports = router;
