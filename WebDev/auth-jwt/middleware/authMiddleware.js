const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req,res,next) => {

    const token = req.cookies.jwt;

    // checking if json token exists
    if(token)
    {
        // verifying if token is tampered/correct
        jwt.verify(token,'mazhar secret code', (err,decodedToken) => {

            if(err)
            {
                console.log(err.message);
                res.redirect('/login');
            }
            else
            {
                console.log(decodedToken);
                next();
            }
        });
    }
    else
    {
        res.redirect('/login');
    }

};

const checkUser = (req,res,next) => {

    const token = req.cookies.jwt;

    // checking if json token exists
    if(token)
    {
        // verifying if token is tampered/correct
        jwt.verify(token,'mazhar secret code', async (err,decodedToken) => {

            if(err)
            {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else
            {
                console.log(decodedToken);
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else
    {
        res.locals.user = null;
        next();
    }

};

module.exports = {requireAuth,checkUser};