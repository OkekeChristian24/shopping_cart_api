const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});

const app = express();



app.listen(process.env.PORT || 5000, console.log(`Server running on port ${process.env.PORT}`));
