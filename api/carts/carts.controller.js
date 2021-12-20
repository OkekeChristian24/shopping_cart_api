// Import cart services
const {
    getCartById,
    deleteCart
} = require('./carts.service');

// Import cart item services
const {
    getCartItems,
    deleteAllItemsOfACart
} = require('../cartItems/cartItems.service');
module.exports = {
    getCartDetails: (req, res) => {
        const cartId = req.params.id;
        getCartById(cartId, (err, results) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    success: 0,
                    message: 'Query error'
                });
            }
            if(!results){
                console.log(results);
                return res.status(502).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            if(results.length === 0){
                return res.status(200).json({
                    success: 0,
                    message: 'No such cart'
                });
            }
            if(results.length > 1){
                return res.status(204).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            if(results.length === 1){
                getCartItems(cartId, (itemErr, itemResults) => {
                    if(itemErr){
                        console.log(itemErr);
                        return res.status(400).json({
                            success: 0,
                            message: 'Query error'
                        });
                    }
                    if(!itemResults){
                        console.log(itemResults);
                        return res.status(502).json({
                            success: 0,
                            message: 'Invalid response'
                        });
                    }

                    results[0].items = itemResults;
                    return res.status(200).json({
                        success: 1,
                        data: results[0]
                    });
                });
            }
        });
    },
    deleteCart: (req, res) => {
        const cartId = req.params.id;
        // Check if the cart exist
        getCartById(cartId, (err, results) => {
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
                    message: 'No cart of such'
                });
            }
            if(results.length > 1){
                return res.status(204).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }

            if(results.length === 1){
                deleteCart(cartId, (delErr, delResults) => {
                    if(delErr){
                        console.log(err);
                        return res.status(400).json({
                            success: 0,
                            message: '1-Query error'
                        });
                    }
                    if(!delResults){
                        return res.status(502).json({
                            success: 0,
                            message: 'Invalid response'
                        });
                    }
                    deleteAllItemsOfACart(cartId, (itemErr, itemResults) => {
                        if(itemErr){
                            console.log(itemErr);
                            return res.status(400).json({
                                success: 0,
                                message: '2-Query error'
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
                            message: 'Cart deleted successfully'
                        });
                    });
                });
            }
        });
    }
};