const express = require('express');
const morgan = require('morgan');

// Initialize the Express application
const app = express();
const PORT = 3000;

// 1. Register the EJS view template engine
app.set('view engine', 'ejs');

// 2. Setup Built-in & Third-Party Middlewares
app.use(express.static('public')); // Makes the "public" folder accessible to the browser
app.use(morgan('dev'));            // Professional HTTP request logger middleware

// 3. Application Route Handlers
app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat Bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    // Renders index.ejs and passes the blogs array and dynamic title
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog' });
});

// 4. Catch-All Middleware for handling 404 Pages (Must be at the very bottom)
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});

// 5. Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is flying high on http://localhost:${PORT}`);
});