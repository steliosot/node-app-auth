// Imports
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser'); 
const postRoute = require('./routes/posts');

mongoose.connect(process.env.DB_CONNECTOR, () => {
    console.log('Connected to MongoDB');
});
app.use(express.json());
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(3000, () => {
    console.log('Server is running...')
});