const { pool } = require('../../config/database');

module.exports = {
    registerUser: (data, callBack) => {
        pool.query(
            'INSERT INTO users(first_name, last_name, email, password) VALUES(?, ?, ?, ?)',
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            'SELECT id, first_name, last_name, email FROM users',
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            'SELECT id, first_name, last_name, email, password FROM users WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
        
    },
    updateUser: (id, data, callBack) => {
        pool.query(
            'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?',
            [
                data.first_name,
                data.last_name,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUserEmail: (id, data, callBack) => {
        pool.query(
            'UPDATE users SET email = ? WHERE id = ?',
            [
                data.email,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUserPassword: (id, data, callBack) => {
        pool.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [
                data.password,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser: (id, callBack) => {
        pool.query(
            'DELETE FROM users WHERE id = ?',
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};