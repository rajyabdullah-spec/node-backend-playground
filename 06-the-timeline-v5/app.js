require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware'); // 👥 Importing the global identity middleware

const app = express();

app.set('view engine', 'ejs');

require('./config/mongoose');

app.use(morgan('dev')); 
app.use(express.static('public')); 

// 🚨 CRITICAL PARSING MIDDLEWARES
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); // 🍪 Parses cookies to easily read req.cookies.jwt

// 👥 GLOBAL TRACKER: Executed on every request to pass user object directly to all EJS templates
app.use(checkUser); 

// Main Routing Architecture Pipelines
const timelineRoutes = require('./routes/timelineRoutes');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes'); 

app.use('/', timelineRoutes); // Legacy MVC Routes
app.use('/', apiRoutes);      // 🚀 Modern RESTful API v4 Routes
app.use('/', authRoutes);     // 🛡️ Secure User Authentication & JWT Entry Routes

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});