const User = require('../models/User');

// Error handling
const handleErrors = (err) => {

    // console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    // duplicate email errors
    if(err.code === 11000)
    {
        errors.email = 'Email already exists in database';
    }

    // validation errors
    if(err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach( ({properties}) => {

            errors[properties.path] = properties.value;

        });
    }

    return errors;
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

        res.status(201).json(user);


    } catch (err) {
        
        const error = handleErrors(err);
        res.status(400).json({error});

    }

};

module.exports.login_post = (req,res) => {

    const {email,password}  = req.body;
    
    console.log(email,password);

    res.send('user login');

};