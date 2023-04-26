const User = require('../models/User');
const handleErrors = require('../utils/handleErrors');
const jwt = require('jsonwebtoken');

const returnSignupPage = (req, res) => {
    res.render('signup')
}

const returnLoginPage = (req, res) => {
    res.render('login')
}

const createUser = async (req, res) => {
    try {
        //User created and password hashed
        const user = await User.create(req.body)
        //Generate token for the user
        const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
        res.cookie("jwt", token);
        res.json({
            user : user.
            _id
        })
    } catch (err) {
        console.log(err)
        const errors = handleErrors(err);
        res.json({errors})
    }
}

const loginUser = (req, res) => {
    //Code
}

const logoutUser = (req, res) => {
    
}

module.exports = {
    returnSignupPage,
    returnLoginPage,
    createUser,
    loginUser,
    logoutUser
}