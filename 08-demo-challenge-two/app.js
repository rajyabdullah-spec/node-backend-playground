require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Set View Template Context Layouts
app.set('view engine', 'ejs');

// Invoke Secure Mongoose Local Connection
require('./config/mongoose');

// Standard Payload Decoders Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static File Management Distribution (For CSS file)
app.use(express.static('public'));

// Trigger Routing Pipeline Layouts
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Challenge 2 Welcome App is strictly active on port ${PORT}`);
});