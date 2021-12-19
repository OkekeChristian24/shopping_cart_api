// Import cart controllers
const {
    getCartDetails,
    deleteCart
} = require('./carts.controller');

const router = require('express').Router();

const { checkToken } = require('../../authorizations/tokenAuth');

router.get('/:id', checkToken, getCartDetails);
router.delete('/:id', checkToken, deleteCart);

module.exports = router;
