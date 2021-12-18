const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api/user', require('./api/users/users.router'));
app.use('/api/product', require('./api/products/products.router'));
app.use('/api/cart', require('./api/carts/carts.router'));
app.use('/api/cartitem', require('./api/cartItems/cartItems.router'));


app.listen(process.env.PORT || 5000, console.log(`Server running on port ${process.env.PORT}`));
