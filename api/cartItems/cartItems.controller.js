const { validationResult } = require('express-validator');

// Import cart items services
const {
    createCartItem,
    getCartItems,
    getItemFromCart,
    getCartItemById,
    increaseCartItemQty,
    decreaseCartItemQty,
    updateCartItemQty,
    deleteCartItem,
} = require('./cartItems.service');

// Import carts services
const {
    createCart,
    getCartByUserId,
    increaseCartData,
    decreaseCartData,
    updateCart,
    deleteCart
} = require('../carts/carts.service');

// Import products services
const { getProductById } = require('../products/products.service');

module.exports = {
    addItemToCart: (req, res) => {
        // Validate incoming data
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            return res.status(400).json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }
        // Check for the cart
        const userId = req.params.id;
        getCartByUserId(userId, (err, cart) => {
            if(err){
                console.log(err);
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
                    total_price: req.body.item_price * req.body.quantity
                };

                // Create a new cart
                createCart(cartData, (err, results) => {
                    if(err){
                        console.log(err);
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

                    const cartId = results.insertId;
                    // Get product price
                    getProductById(req.body.product_id, (getErr, getResults) => {
                        if(getErr){
                            console.log(getErr);
                            return res.status(400).json({
                                success: 0,
                                message: 'Query error'
                            });
                        }
                        if(!getResults){
                            return res.status(502).json({
                                success: 0,
                                message: 'Invalid response'
                            });
                        }

                        if(getResults.length === 0){
                            return res.status(200).json({
                                success: 0,
                                message: 'Product does not exist'
                            });
                        }

                        if(getResults.length === 1){

                            // Add the item to the newly created cart
                            const cartItemData = {
                                cart_id: cartId,
                                product_id: req.body.product_id,
                                quantity: req.body.quantity,
                                item_price: getResults[0].price
                            };

                            createCartItem(cartItemData, (itemErr, itemResults) => {
                                if(itemErr){
                                    console.log(itemErr);
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
                        }
                        if(getResults.length > 1){
                            return res.status(400).json({
                                success: 0,
                                message: 'Invalid response'
                            });
                        }

                    });
                
                    
                });
            }else if(cart.length == 1){ // There's a cart for the user

                // Check if the item is already in the cart
                const cartId = cart[0].id;
                const itemParams = {
                    cart_id: cartId,
                    product_id: req.body.product_id
                };
                getItemFromCart(itemParams, (err, cartItem) => {
                    if(err){
                        console.log(err);
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

                    if(cartItem.length === 0){ // Add a new item to the cart if the item is not there
                        
                        // Get product price
                        getProductById(req.body.product_id, (getErr, getResults) => {
                            if(getErr){
                                console.log(getErr);
                                return res.status(400).json({
                                    success: 0,
                                    message: 'Query error'
                                });
                            }
                            if(!getResults){
                                return res.status(502).json({
                                    success: 0,
                                    message: 'Invalid response'
                                });
                            }
    
                            if(getResults.length === 0){
                                return res.status(200).json({
                                    success: 0,
                                    message: 'Product does not exist'
                                });
                            }

                            // Create new cart item
                            const cartItemData = {
                                cart_id: cartId,
                                product_id: req.body.product_id,
                                quantity: req.body.quantity,
                                item_price: req.body.item_price
                            };
                            createCartItem(cartItemData, (itemErr, itemResults) => {
                                if(itemErr){
                                    console.log(itemErr);
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
    
                                // Update cart total quantity and total price
                                const updateData = {
                                    quantity: cartItemData.quantity,
                                    price: cartItemData.item_price * cartItemData.quantity
                                };
                                increaseCartData(cartId, updateData, (updateErr, updateResults) => {
                                    if(updateErr){
                                        console.log(updateErr);
                                        return res.status(400).json({
                                            success: 0,
                                            message: 'Query error'
                                        });
                                    }
                                    if(!updateResults){
                                        console.log(updateResults);
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

                        });
                        
                    }
                    if(cartItem.length > 0){ // The item is already in the cart
                        // Do nothing! There is an endpoint to update an item in the cart already
                        return res.status(200).json({
                            success: 1,
                            message: 'Item already in cart'
                        });
                    }
                    // console.log("Cart item: ", cartItem);
                    // console.log("Cart length: ", cartItem.length);
                    // return res.status(502).json({
                    //     success: 0,
                    //     message: 'Invalid response'
                    // });
                
                    
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
        // Validate incoming data
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            return res.status(400).json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }

        const cartItemId = req.params.id;
        const cartId = req.body.cart_id;
        const newItemQty = req.body.new_item_qty;
        const newTotalQty = req.body.new_total_qty;
        const newTotalPrice = req.body.new_total_price;
        updateCartItemQty(cartItemId, newItemQty, (err, results) => {
            if(err){
                console.log(err);
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
                    console.log(cartErr);
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
    increaseCartItem: (req, res) => {
        // Validate incoming data
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            return res.status(400).json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }

        const cartItemId = req.params.id;
        const quantity = req.body.quantity;
        getCartItemById(cartItemId, (err, results) => {
            if(err){
                console.log(err);
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
            if(results.length === 0){
                return res.status(200).json({
                    success: 0,
                    message: 'No cart item of such'
                });
            }
            if(results.length > 1){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }

            if(results.length === 1){
                const itemPrice = results[0].price;
                const cartId = results[0].cart_id;
                const mainPrice = quantity * itemPrice;
                
                increaseCartItemQty(cartItemId, quantity, (incErr, incResults) => {
                    if(incErr){
                        console.log(err);
                        return res.status(400).json({
                            success: 0,
                            message: 'Query error'
                        });
                    }
                    if(!incResults){
                        return res.status(502).json({
                            success: 0,
                            message: 'Invalid response'
                        });
                    }
    
                    // Update the cart data
                    const incData = {
                        quantity: quantity,
                        price: mainPrice
                    };
                    increaseCartData(cartId, incData, (cartErr, cartResults) => {
                        if(cartErr){
                            console.log(err);
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
                            message: 'Cart item increased'
                        });
                    });
                });
            }
        });
    },
    decreaseCartItem: (req, res) => {
        // Validate incoming data
        const errorsArr = [];
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            const errors = Object.values(validationErrors.mapped());
            errors.forEach(eachError => {
                errorsArr.push(eachError.msg);
            });
            return res.status(400).json({
                success: 0,
                isDataValid: 0,
                message: errorsArr
            });
        }

        const cartItemId = req.params.id;
        const quantity = req.body.quantity;
        getCartItemById(cartItemId, (err, results) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    success: 0,
                    message: '1-Query error'
                });
            }
            if(!results){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            if(results.length === 0){
                return res.status(200).json({
                    success: 0,
                    message: 'No cart item of such'
                });
            }
            if(results.length > 1){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }

            if(results.length === 1){
                const price = results[0].price;
                const cartId = results[0].cart_id;
                const mainPrice = price * quantity;
                decreaseCartItemQty(cartItemId, quantity, (decErr, decResults) => {
                    if(decErr){
                        console.log(err);
                        return res.status(400).json({
                            success: 0,
                            message: '2-Query error'
                        });
                    }
                    if(!decResults){
                        return res.status(502).json({
                            success: 0,
                            message: 'Invalid response'
                        });
                    }
                    
                    // Update the cart data
                    const incData = {
                        quantity: quantity,
                        price: mainPrice
                    };
                    decreaseCartData(cartId, incData, (cartErr, cartResults) => {
                        if(cartErr){
                            console.log(cartErr);
                            return res.status(400).json({
                                success: 0,
                                message: '3-Query error'
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
                            message: 'Cart item decreased'
                        });
                    });
                });
            }

        });
    },
    removeItemFromCart: (req, res) => {
        const cartItemId = req.params.id;
        getCartItemById(cartItemId, (err, results) => {
            if(err){
                console.log(err);
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

            if(results.length === 0){
                return res.status(200).json({
                    success: 0,
                    message: 'No cart item of such'
                });
            }
            if(results.length > 1){
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }

            if(results.length === 1){
                const itemQty = results[0].quantity;
                const itemPrice = results[0].price;
                const cartId = results[0].cart_id;
                const mainPrice = itemQty * itemPrice;
                
                deleteCartItem(cartItemId, (delErr, delResults) => {
                    if(delErr){
                        console.log(delErr);
                        return res.status(400).json({
                            success: 0,
                            message: 'Query error'
                        });
                    }
                    if(!delResults){
                        return res.status(502).json({
                            success: 0,
                            message: 'Invalid response'
                        });
                    }
        
                    // Update the cart data
                    const dataDecrease = {
                        quantity: itemQty,
                        price: mainPrice
                    };
                    decreaseCartData(cartId, dataDecrease, (decErr, decResults) => {
                        if(decErr){
                            console.log(decErr);
                            return res.status(400).json({
                                success: 0,
                                message: 'Query error'
                            });
                        }
                        if(!decResults){
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
                });    
            }

        });
    }
};