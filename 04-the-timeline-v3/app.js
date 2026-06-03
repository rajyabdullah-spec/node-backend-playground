require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

require('./config/mongoose');

app.use(morgan('dev')); 
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 


const timelineRoutes = require('./routes/timelineRoutes');
app.use('/', timelineRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 MVC Server running smoothly on http://localhost:${PORT}`);
});