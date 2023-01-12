const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const handleError = (err) =>{
    const errors= {
        email:"",
        password:""
    } 
    if(err.message === 'incorrect email'){
        errors.email="Email is incorrect"
    }
    if(err.message==='incorrect password'){
        errors.password = "Password is incorrect"
    }
    //console.log(err)
 
    if(err.code===11000){
        errors.email="email already exist"
    }
    if(err._message==="User validation failed"){
        errors.email= err.errors.email?err.errors.email.properties.message:""
        errors.password= err.errors.password?err.errors.password.properties.message:""
    }
    return errors
}
const returnSignupPage = (req, res) => {
    res.render('signup')
}

const returnLoginPage = (req, res) => {
    res.render('login')
}

const createUser = async (req, res) => {
    console.log("the body data",req.body);
    try{
    const user = await User.create(req.body);
     const token = jwt.sign({
        user:user._id,
     },process.env.TOKEN_SECRET,{expiresIn:'1d'})
     res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
     res.json({
        message:"user save successfully",
        user:user,

     })
    }
    catch(err){
        const errors= handleError(err)
        res.status(500).json({errors})

    }

}

const loginUser = async (req, res) => {
    //Code 
    // try{
    //     const user = await User.create(req.body)
    //     const token = jwt.sign({
    //         user:user._id,
    //      },process.env.TOKEN_SECRET,{expiresIn:'1d'})
    //      res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    //     res.json({
    //         message:"User login successfully",
    //         user:user,
    //     })
    // } 
    // catch(err){
    //     if(err.code !=11000){
    //         errors.email="Email does not exist"
    //     }else{
    //         res.status(500).json({errors})
    //     }
       
        

    // // } 
    // console.log(req.body)
    // const {email,password} = req.
    try{
        const {email,password} = req.body 
        const user = await User.findOne({email});
        if(user){
            const passwordMatch = await bcrypt.compare(password,user.password);
            if(passwordMatch){ 
                const token = jwt.sign({
                    user:user._id,
                 },process.env.TOKEN_SECRET,{expiresIn:'1d'})
                 res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
                 res.json(
                  {user:user._id}
            
                 )

            } else{
                throw Error('incorrect password')
            }
        } else{
            throw Error('incorrect email')
        }             
    } catch(err){
        const errors= handleError(err)
        res.status(500).json({errors})
    }
   
}

const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login')
}

module.exports = {
    returnSignupPage,
    returnLoginPage,
    createUser,
    loginUser,
    logoutUser
}