// Import cart services
const {
    getCartById
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
            if(results.length !== 1){
                return res.status(204).json({
                    success: 0,
                    message: 'Invalid response'
                });
            }
            getCartItems(cartId, (itemErr, itemResults) => {
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
                const cartDetails = results[0].items = itemResults;
                return res.status(200).json({
                    success: 1,
                    data: cartDetails
                });
            });
        });
    },
    deleteCart: (req, res) => {
        const cartId = req.params.id;
        deleteAllItemsOfACart(cartId, (err, results) => {
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
                message: 'Cart deleted successfully'
            });
        });
    }
};