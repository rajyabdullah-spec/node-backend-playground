const express = require('express');
const app = express();
const PORT = 3000;

// Create a modular router instance (The Mini-Application)
const miniapp = express.Router();

// Define a route inside the mini-application
miniapp.get('/home', (request, response, next) => {
    // Read the exact full URL from the request object
    const url = request.originalUrl;
    response.status(200).send(`You are visiting /home from ${url}`);
});

// Mount the modular mini-application onto multiple distinct parent paths
app.use('/first', miniapp);
app.use('/second', miniapp);

app.listen(PORT, () => {
    console.log(`🚀 Modular Router Server running perfectly on port ${PORT}`);
});