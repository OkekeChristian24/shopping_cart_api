const { pool } = require('../../config/database');

module.exports = {
    createProduct: (data, callBack) => {
        pool.query(
            'INSERT INTO products(name, description, category, price, qty_available) VALUES(?, ?, ?, ?, ?)',
            [
                data.name,
                data.description,
                data.category,
                data.price,
                qty_available
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProductById: (productId, callBack) => {
        pool.query(
            'SELECT id, name, description, category, price, qty_available FROM products WHERE id = ?',
            [productId],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateProduct: (productId, data, callBack) => {
        pool.query(
            'UPDATE products SET name = ?, description = ?, category = ?, price = ?, qty_available = ? WHERE id = ?',
            [
                data.name,
                data.description,
                data.category,
                data.price,
                data.qty_available,
                productId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateProductQty: (productId, data, callBack) => {
        pool.query(
            'UPDATE products SET qty_available = ? WHERE id = ?',
            [
                data.qty_available,
                productId
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteProduct: (productId, callBack) => {
        pool.query(
            'DELETE * FROM products WHERE id = ?'
        );
    }

};