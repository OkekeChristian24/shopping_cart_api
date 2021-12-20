// Import users services
const {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    updateUserEmail,
    updateUserPassword,
    deleteUser
} = require('./users.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    registerUser: (req, res) => {

        // Check if user email is already registered
        getUserByEmail(req.body.email, (err, results) => {
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

            // Check if email is registered
            if(results.length !== 0){
                return res.status(200).json({
                    success: 0,
                    message: 'Email is already registered. Use another email'
                });
            }

            // Register the user
            const data = req.body;
            const salt = genSaltSync(10);
            data.password = hashSync(data.password, salt);
            
            createUser(data, (err, results) => {
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
                    message: 'Registration successful'
                });
            });
        });
    },
    loginUser: (req, res) => {
        const data = req.body;
        getUserByEmail(data.email, (err, results) => {
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
            if(results.length === 0){
                return res.status(200).json({
                    success: 0,
                    message: 'Email not registered'
                });
            }
            if(results.length !== 1){
                return res.status(200).json({
                    success: 0,
                    message: 'Oops... Something went wrong'
                });
            }

            const isCorrect = compareSync(data.password, results[0].password);
            if (isCorrect) {
                results[0].password = undefined;
                const jsontoken = sign({ result: results[0]}, process.env.LOGIN_SECRET, {
                    expiresIn: '24h'
                });
                return res.status(200).json({
                    success: 1,
                    message: 'Login successful',
                    token: jsontoken
                });
            } else {
                return res.status(200).json({
                    success: 0,
                    message: 'Password is incorrect'
                });
            }
        });
    },
    getUserById: (req, res) => {},
    updateUser: (req, res) => {
        const userId = req.params.id;
        const data = req.body;
        updateUser(userId, data, (err, results) => {
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
                message: 'User updated successfully'
            });

        });
    },
    updateUserEmail: (req, res) => {
        const userId = req.params.id;
        const data = req.body;
        updateUserEmail(userId, data, (err, results) => {
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
                message: 'Email updated successfully'
            });
        });
    },
    updateUserPassword: (req, res) => {
        const userId = req.params.id;
        const data = req.body;
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
            
        updateUserPassword(userId, data, (err, results) => {
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
                message: 'Password updated successfully'
            });
        });
    },
    deleteUser: (req, res) => {
        const userId = req.params.id;
        deleteUser(userId, (err, results) => {
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
                message: 'Account deleted successfully'
            });
        });
    },
};