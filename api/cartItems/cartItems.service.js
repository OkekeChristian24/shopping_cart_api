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
            'SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, p.id, p.name, p.description, p.category, p.price FROM cart_items ci WHERE ci.cart_id = ? INNER JOIN products p ON ci.product_id = p.id',
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
            'SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, p.id, p.name, p.description, p.category, p.price FROM cart_items ci WHERE ci.cart_id = ? AND ci.product_id = ? INNER JOIN products p ON ci.product_id = p.id',
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
