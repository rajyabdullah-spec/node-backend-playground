require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/mongoose');
const feedRoutes = require('./routes/feedRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

connectDB();

app.use('/', feedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running seamlessly on port ${PORT}`);
});