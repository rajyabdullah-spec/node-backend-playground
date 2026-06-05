const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully (Version 3 Isolated Config)!');
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });