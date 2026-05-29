const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 

const app = express();
app.use(express.static('public'));

const timelineRoutes = require('./routes/timelineRoutes');

app.set('view engine', 'ejs');
app.use(morgan('dev')); 
app.use(express.static('public')); 


app.use(express.urlencoded({ extended: true })); 


app.use('/', timelineRoutes);


const dbURI = 'mongodb://raji_user:R1a2j3y4_rajy@ac-2wsjman-shard-00-00.7wx0pe3.mongodb.net:27017,ac-2wsjman-shard-00-01.7wx0pe3.mongodb.net:27017,ac-2wsjman-shard-00-02.7wx0pe3.mongodb.net:27017/?ssl=true&replicaSet=atlas-pul6fr-shard-0&authSource=admin&appName=Cluster0'; 

mongoose.connect(dbURI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    
   
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`🚀 MVC Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });