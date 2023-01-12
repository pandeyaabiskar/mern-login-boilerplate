const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const cookieParser = require('cookie-parser');
const app = express();
const { requireAuth } = require('./middleware/authMiddleware');
// Import and configure dotenv
require('dotenv').config()


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection

//const dbURI = 'mongodb://localhost:27017/mern-login'
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DBURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/burgers', requireAuth, (req, res) => res.render('burgers'));
app.use(authRoutes)