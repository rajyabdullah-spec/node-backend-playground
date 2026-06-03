require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

// Set Up view engine
app.set('view engine', 'ejs');

// Run Isolated Database Connection Configuration
require('./config/mongoose');

// Middlewares
app.use(morgan('dev')); 
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 

// Routing Pipeline
const timelineRoutes = require('./routes/timelineRoutes');
app.use('/', timelineRoutes);

// Server Execution
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 MVC Server running on http://localhost:${PORT}`);
});