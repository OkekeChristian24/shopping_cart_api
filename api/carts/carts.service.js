const { pool } = require('../../config/database');

module.exports = {
    createCart: (data, callBack) => {
        pool.query(
            'INSERT INTO carts(user_id, total_quantity, total_price) VALUES(?, ?, ?)',
            [
                data.user_id,
                data.total_quantity,
                data.total_price
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCartById: (cartId, callBack) => {
        pool.query(
            'SELECT id, user_id, total_quantity, total_price FROM carts WHERE id = ? ',
            [cartId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCartByUserId: (userId, callBack) => {
        pool.query(
            'SELECT id, user_id, total_quantity, total_price FROM carts WHERE user_id = ? ',
            [userId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    decreaseCartData: (cartId, data, callBack) => {
        pool.query(
            'UPDATE carts SET total_quantity = GREATEST(total_quantity - ?, 0), total_price = GREATEST(total_price - ?, 0) WHERE id = ?',
            [
                data.quantity,
                data.price,
                cartId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    increaseCartData: (cartId, data, callBack) => {
        pool.query(
            'UPDATE carts SET total_quantity = total_quantity + ?, total_price = total_price + ? WHERE id = ?',
            [
                data.quantity,
                data.price,
                cartId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateCart: (cartId, data, callBack) => {
        pool.query(
            'UPDATE carts SET total_quantity =  ?, total_price = ? WHERE id = ?',
            [
                data.quantity,
                data.price,
                cartId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteCart: (cartId, callBack) => {
        pool.query(
            'DELETE FROM carts WHERE id = ?',
            [cartId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};
