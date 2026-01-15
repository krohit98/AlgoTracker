const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { generateToken } = require('../utils/token.js');

// authenticator function to authenticate other routes
// this function will be used as a middleware in other routes
// calls the refreshAccessToken function if access token is not valid
// @param req - request object
// @param res - response object
// @param next - next function to call the next middleware
// @returns - next function if authenticated
// @throws - error if access token is not found or invalid
const authenticate = (req, res, next) => {
    if(!req.cookies?.accessjwt) return res.status(401).send({success:false,body:{message:'Unauthorized! Access token not found.'}});

    let accessToken = req.cookies.accessjwt;

    jwt.verify(accessToken, process.env.AUTH_KEY,
        (error) => {
            if(error) {
                refreshAccessToken(req, res, next);
            }
            else next();
        })
}

// refresh function to generate new access token
// @param req - request object
// @param res - response object
// @returns - new access token
// @throws - error if refresh token is not found or invalid
// @throws - error if user is not found
const refreshAccessToken = (req, res, next) => {
    if(!req.cookies?.refreshjwt) {
        res.clearCookie('accessjwt');
        return res.status(401).send({success:false,body:{message:'Unauthorized! Please log in again.'}})
    }

    const refreshToken = req.cookies.refreshjwt;

    jwt.verify(refreshToken, process.env.REFRESH_KEY,
        async (error, decoded) => {
            if(error) {
                res.clearCookie('accessjwt');
                res.clearCookie('refreshjwt');
                return res.status(401).send({success:false,body:{message:'Unauthorized! Please login again.'}})
            }

            const user = await User.findOne({where:{email:decoded.userObject.email}})

            if(!user) {
                res.clearCookie('accessjwt');
                res.clearCookie('refreshjwt');
                return res.status(401).send({success:false,body:{message:'Unauthorized! Invalid refresh token.'}})
            }

            const accessToken = generateToken('access',{userObject:decoded.userObject});
            res.cookie('accessjwt', accessToken ,{
                httpOnly:true,
                secure:false,
                sameSite:'strict',
            })
            next();
        } 
    )
}

module.exports = {
    authenticate
}