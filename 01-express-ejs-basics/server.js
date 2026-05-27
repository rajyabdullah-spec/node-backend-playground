
const express = require('express');


const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    res.send('<h1>Welcome all to the Magic World of Express.js! 🚀</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page: Aspiring Front-End & Back-End Developer! 💻</h1>');
});


app.listen(PORT, () => {
    console.log(`🚀 Express server is running perfectly on http://localhost:${PORT}`);
});