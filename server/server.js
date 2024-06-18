const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

const authRoutes = require('./routes/authRoutes');

app.use('/apis/auth',authRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})