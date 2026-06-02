require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 

const app = express();

app.set('view engine', 'ejs');
app.use(morgan('dev')); 
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 


const timelineRoutes = require('./routes/timelineRoutes');
app.use('/', timelineRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    
   
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`🚀 MVC Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });