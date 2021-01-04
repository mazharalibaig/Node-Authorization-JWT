const jwt = require('jsonwebtoken');

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

module.exports = {requireAuth};