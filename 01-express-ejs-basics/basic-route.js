const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (request, response, nextHandler) => {
    response.status(200).send('Hello Matrix Master coders from ExpressJS');
});

app.listen(PORT, () => {
    console.log(`🚀 Basic Route Server running on port ${PORT}`);
});