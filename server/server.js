const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT;

const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001'],
    credentials:true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const noteRoutes = require('./routes/noteRoutes');
const solutionRoutes = require('./routes/solutionRoutes');

app.use('/apis/auth', authRoutes);
app.use('/apis/problem',problemRoutes);
app.use('/apis/note',noteRoutes);
app.use('/apis/solution',solutionRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})