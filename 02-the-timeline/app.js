const express = require('express');
const app = express();
const PORT = 3000;

// Set EJS as the template view engine
app.set('view engine', 'ejs');

// Simulated database data provided by the assignment guidelines
const timelineData = [
    { 
        name: "Michael Choi",
        createdAt: "15-01-2013",
        message: "This is my message. This is my message. This is my message. This is my message. This is my message."
    },
    { 
        name: "Michael Choi",
        createdAt: "23-01-2013",
        message: "This is my message. This is my message. This is my message. This is my message. This is my message."
    },
    { 
        name: "Cory Whiteland",
        createdAt: "15-01-2013",
        message: "This is my message. This is my message. This is my message. This is my message. This is my message."
    },
    { 
        name: "Cory Whiteland",
        createdAt: "01-01-2013",
        message: "This is my message. This is my message. This is my message. This is my message. This is my message."
    }
];

// Helper function to convert "DD-MM-YYYY" into a standard JS Date object for accurate sorting
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(year, month - 1, day);
};

// Main entry route
app.get('/', (req, res) => {
    // Logic: Sort posts in descending order so that the most recent messages appear on top
    const sortedPosts = [...timelineData].sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt));
    
    // Render the EJS file and inject the sorted posts
    res.render('timeline', { posts: sortedPosts });
});

// Start the Application
app.listen(PORT, () => {
    console.log(`🚀 Timeline server is up and running perfectly on http://localhost:${PORT}`);
});