const jwt = require('jsonwebtoken');
require('dotenv').config({path: '/config/config.env'});

const checkToken = (req, res, next) => {
    const bearer = req.headers['authorization'];

    if (bearer) {
        const bearerToken = bearer.split(" ");
        const token = bearerToken[1];
        jwt.verify(token, process.env.LOGIN_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Invalid token...'
                });
            }else {
                req.user = decoded;
                next();
            }
        });
    }else {
        return res.json({
            success: 0,
            message: 'Access denied. Not authorised'
        });
    }
};

module.exports = {
    checkToken
};