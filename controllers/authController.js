const User = require("../models/User");
const handleErrors = require("../utils/handleErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const returnSignupPage = (req, res) => {
  res.render("signup");
};

const returnLoginPage = (req, res) => {
  res.render("login");
};

const createUser = async (req, res) => {
  try {
    //User created and password hashed
    const user = await User.create(req.body);
    //Generate token for the user
    const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true
    });
    res.json({
      user: user._id,
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

const loginUser = async (req, res) => {
  try {
    //Code
    const { email, password } = req.body;
    //Search for user in DB
    const user = await User.findOne({ email });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        //Generate token for the user
        const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });
        res.json({
          user: user._id,
        });
      } else {
        throw Error("incorrect password");
      }
    } else {
      throw Error("incorrect email");
    }
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect('/')
};

module.exports = {
  returnSignupPage,
  returnLoginPage,
  createUser,
  loginUser,
  logoutUser,
};
