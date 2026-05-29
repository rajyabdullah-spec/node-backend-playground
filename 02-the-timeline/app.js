const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const timelineData = [
    { 
        name: "Raji Al-Abdullah",
        createdAt: "29-05-2026",
        message: "Proud to finally deploy the first version of my backend playground! Building this timeline and managing data flows has been an incredible learning experience."
    },
    { 
        name: "Wesam Shujaa",
        createdAt: "28-05-2026",
        message: "Welcome back everyone! I am looking forward to seeing your clean MVC implementations and database connections for this second milestone."
    },
    { 
        name: "Omid Yazdabadi",
        createdAt: "27-05-2026",
        message: "Just finished refactoring my route handlers into controllers. The separation of concerns makes the timeline code so much cleaner now."
    },
    { 
        name: "Saragrotti",
        createdAt: "26-05-2026",
        message: "Testing the cloud connection with MongoDB Atlas. It is amazing how our dynamic sorting algorithm keeps everything in strict chronological order."
    },
    { 
        name: "Nina Fa",
        createdAt: "25-05-2026",
        message: "The dark theme layout with EJS partials looks completely seamless. Loving how the details and edit views perfectly match the main feed style."
    }
];

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(year, month - 1, day);
};

app.get('/', (req, res) => {
    const sortedPosts = [...timelineData].sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt));
    
    res.render('timeline', { posts: sortedPosts });
});

app.listen(PORT, () => {
    console.log(`🚀 Timeline server is up and running perfectly on http://localhost:${PORT}`);
});