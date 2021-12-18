const router = require('express').Router();

// Import cart controllers
const {
    getCartDetails,
    deleteCart
} = require('./carts.controller');

router.get('/:id', getCartDetails);
router.delete('/:id', deleteCart);

module.exports = router;
