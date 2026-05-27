const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

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