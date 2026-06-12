const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully for Challenge 2!');
    })
    .catch((err) => {
        console.error('❌ Database connection error:', err);
    });