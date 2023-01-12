const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const {jwt:token} = req.cookies;
  if(token){
  const isValid =jwt.verify(token,process.env.TOKEN_SECRET)
  if(isValid){
    next()
  }
  else{
    res.redirect('/login');
  }
}
};

module.exports = { requireAuth };
