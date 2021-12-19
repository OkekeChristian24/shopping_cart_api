const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const host = process.env.HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const dbOptions = {
    connectionLimit : 10,
    host            : host,
    user            : user,
    password        : password,
    database        : database
};

const pool  = mysql.createPool(dbOptions);

module.exports = {
    pool
};
