const { pool } = require('../../config/database');

module.exports = {
    createCartItem: (data, callBack) => {
        pool.query(
            'INSERT INTO cart_items(cart_id, product_id, quantity) VALUES(?, ?, ?)',
            [
                data.cart_id,
                data.product_id,
                data.quantity
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCartItem: (cartId, callBack) => {
        'SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, p.id, p.name, p.description, p.category, p.price FROM cart_items ci WHERE ci.cart_id = ? INNER JOIN products p ON ci.product_id = p.id',
        [cartId],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        }
    },
    updateCartItemQty: (cartItemId, quantity, callBack) => {
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
    },
    deleteCartItem: (cartItemId, callBack) => {
        'DELETE * FROM cart_items WHERE id = ?',
        [cartItemId],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            console.log(results);
            return callBack(null, results);
        }
    }
};
