require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

require('./config/mongoose');

app.use(morgan('dev')); 
app.use(express.static('public')); 

// 🚨 CRITICAL API MIDDLEWARES: Placed on top to parse raw JSON payloads from Postman
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Main Routing Architecture Pipelines
const timelineRoutes = require('./routes/timelineRoutes');
const apiRoutes = require('./routes/apiRoutes');

app.use('/', timelineRoutes); // Legacy MVC Routes
app.use('/', apiRoutes);      // 🚀 Modern RESTful API v4 Routes


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});