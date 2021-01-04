const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Error handling
const handleErrors = (err) => {

    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    // duplicate email errors
    if(err.code === 11000)
    {
        errors.email = 'Email already exists in database';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach( ({properties}) => {

            errors[properties.path] = properties.message;

        });
    }

    // login validation errors
    if(err.message === 'No user found with this email!')
    {
        errors.email = 'No user found with this email!';
    }

    if(err.message === 'Incorrect Password!')
    {
        errors.password = 'Incorrect Password!';
    }

    return errors;
};

const maxAge = 3*24*60*60; // 3 days in secs

const createToken =  (id) => {

    return jwt.sign({id}, 'mazhar secret code', { 
        
        expiresIn: maxAge 
    
    });

};

module.exports.signup_get = (req,res) => {

    res.render('signup');

};

module.exports.login_get = (req,res) => {

    res.render('login');

};

module.exports.signup_post = async (req,res) => {

    const {email,password}  = req.body;

    try {
        
        const user = await User.create({ email, password});

        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });

        res.status(201).json({ user: user._id });

    } catch (err) {
        
        const error = handleErrors(err);
        console.log("From auth");
        console.log(error);
        res.status(400).json({error});

    }

};

module.exports.login_post = async (req,res) => {

    const {email,password}  = req.body;
    
    console.log(email,password);

    try {
        
        const user = await User.login(email,password);

        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });

        res.status(200).json({user: user._id});

    } catch (err) {
        
        const error = handleErrors(err);
        res.status(400).json({error});

    }

};

module.exports.logout_get = (req,res) => {

    res.cookie('jwt','', {maxAge: 0});
    res.redirect('/');

};