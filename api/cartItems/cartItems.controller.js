// Import cart items services
const {
    createCartItem,
    getCartItems,
    updateCartItemQty,
    deleteCartItem,
} = require('./cartItems.service');

// Import carts services
const {
    createCart,
    getCartByUserId,
    updateCart,
    deleteCart
} = require('../carts/carts.service');

module.exports = {
    addItemToCart: (req, res) => {
        // Check for the cart
        const userId = req.params.id;
        getCartByUserId(userId, (err, cart) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!cart){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }

            if(cart.length == 0){ // Create a new cart if there's no cart for the user
                const cartData = {
                    user_id: userId,
                    total_quantity: req.body.quantity,
                    total_price: req.body.item_price
                };

                // Create a new cart
                createCart(cartData, (err, results) => {
                    if(err){
                        return res.status(400).json({
                            success: 0,
                            message: 'Query error'
                        });
                    }
                    if(!results){
                        return res.status(502).json({
                            success: 0,
                            message: 'Invalid response'
                        });
                    }
                    // Add the item to the newly created cart
                    const cartItemData = {
                        cart_id: results.insertId,
                        product_id: req.body.product_id,
                        quantity: req.body.quantity,
                        item_price: req.body.item_price
                    };
                    createCartItem(cartItemData, (itemErr, itemResults) => {
                        if(itemErr){
                            return res.status(400).json({
                                success: 0,
                                message: 'Query error'
                            });
                        }
                        if(!itemResults){
                            return res.status(502).json({
                                success: 0,
                                message: 'Invalid response'
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: 'Item added to cart'
                        });
                    });
                });
            }else if(cart.length == 1){ // There's a cart for the user

                // Check if the item is already in the cart
                const itemParams = {
                    cart_id: cart.id,
                    product_id: req.body.product_id
                };
                getItemFromCart(itemParams, (err, cartItem) => {
                    if(err){
                        return res.status(400).json({
                            success: 0,
                            message: 'Query error'
                        });
                    }
                    if(!cartItem){
                        return res.status(502).json({
                            success: 0,
                            message: 'Invalid response'
                        });
                    }

                    if(cartItem.length == 0){ // Add a new item to the cart if the item is not there
                        const cartItemData = {
                            cart_id: cart.id,
                            product_id: req.body.product_id,
                            quantity: req.body.quantity,
                            item_price: req.body.item_price
                        };
                        createCartItem(cartItemData, (itemErr, itemResults) => {
                            if(itemErr){
                                return res.status(400).json({
                                    success: 0,
                                    message: 'Query error'
                                });
                            }
                            if(!itemResults){
                                return res.status(502).json({
                                    success: 0,
                                    message: 'Invalid response'
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: 'Item added to cart'
                            });
                        });
                    }else if(cartItem.length == 1){ // The item is already in the cart
                        // Done nothing! There is an endpoint to update an item in the cart already
                        return res.status(200).json({
                            success: 1,
                            message: 'Item already in cart'
                        });
                    }else{
                        if(!itemResults){
                            return res.status(502).json({
                                success: 0,
                                message: 'Invalid response'
                            });
                        }
                    }
                    
                });
                   
            }else{
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }

            
            
                
        });
    },
    updateCartItem: (req, res) => {
        const cartItemId = req.params.id;
        const cartId = req.body.cart_id;
        const newItemQty = req.body.new_item_qty;
        const newTotalQty = req.body.new_total_qty;
        const newTotalPrice = req.body.new_total_price;
        updateCartItemQty(cartItemId, newItemQty, (err, results) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!results){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }

            const newCartData = {
                quantity: newTotalQty,
                price: newTotalPrice
            };

            updateCart(cartId, newCartData, (cartErr, cartResults) => {
                if(cartErr){
                    return res.status(400).json({
                        success: 0,
                        message: 'Query error'
                    });
                }
                if(!cartResults){
                    return res.status(502).json({
                        success: 0,
                        message: 'Invalid response'
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: 'Cart updated successfully'
                });
            });
        });
    },
    removeItemFromCart: (req, res) => {
        const cartItemId = req.params.id;
        deleteCartItem(cartItemId, (err, results) => {
            if(err){
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!results){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }

            return res.status(200).json({
                success: 1,
                message: 'Cart item deleted successfully'
            });
        });    
    }
};