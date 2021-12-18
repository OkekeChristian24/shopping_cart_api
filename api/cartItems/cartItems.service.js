const { pool } = require('../../config/database');

module.exports = {
    createCartItem: (data, callBack) => {
        pool.query(
            'INSERT INTO cart_items(cart_id, product_id, quantity, item_price) VALUES(?, ?, ?, ?)',
            [
                data.cart_id,
                data.product_id,
                data.quantity,
                data.item_price
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCartItems: (cartId, callBack) => {
        pool.query(
            'SELECT cart_items.id, cart_items.cart_id, cart_items.product_id, cart_items.quantity, products.id, products.name, products.description, products.category, products.price FROM cart_items INNER JOIN products ON cart_items.product_id = products.id WHERE cart_items.cart_id = ?',
            [cartId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getItemFromCart: (data, callBack) => {
        pool.query(
            'SELECT cart_items.id, cart_items.cart_id, cart_items.product_id, cart_items.quantity, products.id, products.name, products.description, products.category, products.price FROM cart_items INNER JOIN products ON cart_items.product_id = products.id WHERE cart_items.cart_id = ? AND cart_items.product_id = ?',
            [
                data.cart_id,
                data.product_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateCartItemQty: (cartItemId, quantity, callBack) => {
        pool.query(
            'UPDATE cart_items SET quantity = ? WHERE id = ?',
            [
                quantity,
                cartItemId
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },
    deleteCartItem: (cartItemId, callBack) => {
        pool.query(
            'DELETE * FROM cart_items WHERE id = ?',
            [cartItemId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },
    deleteAllItemsOfACart: (cartId, callBack) => {
        pool.query(
            'DELETE * FROM cart_items WHERE cart_id = ?',
            [cartId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    }
};
