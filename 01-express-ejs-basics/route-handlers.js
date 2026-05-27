const express = require('express');
const app = express();
const PORT = 3000;

// Approach 1: Chaining multiple handlers via nextHandler() for the same path
app.get('/one', (request, response, nextHandler) => {
    response.type('text/plain');
    response.write('Hello ');
    nextHandler(); 
});

app.get('/one', (request, response, nextHandler) => {
    response.status(200).end('World!'); 
});

// Approach 2: Multiple route handlers passed inside a single route method
app.get('/two',
    (request, response, nextHandler) => {
        response.type('text/plain');
        response.write('Hello ');
        nextHandler(); 
    },
    (request, response, nextHandler) => {
        response.status(200).end('Moon!'); 
    }
);

app.listen(PORT, () => {
    console.log(`🚀 Route Handlers Server running on port ${PORT}`);
});