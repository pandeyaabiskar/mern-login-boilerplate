const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const cookieParser = require('cookie-parser');
const app = express();
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())
app.use(checkUser)

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    console.log("Database connected successfully!")
    app.listen(process.env.PORT);
    console.log(`Server started at port ${process.env.PORT}`)
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/burgers', requireAuth, (req, res) => res.render('burgers'));
app.use(authRoutes)