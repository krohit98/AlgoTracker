const jwt = require('jsonwebtoken');

// this function is used to generate access and refresh tokens
// it is used in login and refresh functions
// @param type - type of token (access or refresh)
// @param userObject - user object to be encoded in the token
// @returns - generated token
// @throws - error if type or userObject is not provided
function generateToken(type, userObject){
    if(!type || !userObject) {
        throw new Error('Type and userObject are required to generate token');
    }
    const secretKey = type === 'access' ? process.env.AUTH_KEY : process.env.REFRESH_KEY;
    const expiresIn = type === 'access' ? '10m' : '1d';

    return jwt.sign(
        userObject,
        secretKey,
        { expiresIn }
    );
}

module.exports = {
    generateToken
}