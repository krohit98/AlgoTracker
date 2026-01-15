const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/token.js');

// register function to create a new user
// @param req - request object
// @param res - response object
// @returns - success message
// @throws - error if name, email or password is not provided
// @throws - error if user already exists
const register = async(req,res) => {
    const {
        name,
        email, 
        password
    } = req.body;

    if(!(name && email && password)) return res.status(400).send('All input required!')
    
    const existingUser = await User.findOne({where:{email:email}});
    if(existingUser) return res.status(400).send('User already exists! Kindly login.');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await User.create({
        name,
        email,
        password:hash
    });

    res.status(200).send({
        success:true,
        body:{message:"User created. Kindly login!"}
    })
}

// login function to authenticate user and generate access and refresh tokens
// @param req - request object
// @param res - response object
// @returns - access token and refresh token
// @throws - error if email or password is not provided
// @throws - error if user is not registered
// @throws - error if password is invalid
const login = async(req,res) => {
    const {
        email,
        password
    } = req.body;

    if(!email || !password) return res.status(404).send({success:false,body:{message:'All input required!'}})

    const existingUser = await User.findOne({where:{email:email}});

    if(!existingUser) return res.status(404).send({success:false,body:{message:'User not registered! Kindly register.'}})

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if(!validPassword) return res.status(400).send({success:false,body:{message:'Invalid credentials!'}})

    const userObject = {name:existingUser.name, email}

    const accessToken = generateToken('access',{userObject});
    const refreshToken = generateToken('refresh',{userObject});

    const updateObject = {
        refreshToken,
        refreshTokenExpiryDate:new Date(new Date().getTime() + (24*60*60*1000))
    }

    await User.update(updateObject, {where:{email:email}})

    res.cookie('accessjwt', accessToken ,{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
    })

    res.cookie('refreshjwt', refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
        maxAge:24*60*60*1000
    })

    return res.status(200).send({
        success:true,
        body:{
            name:existingUser.name,
            email:existingUser.email,
            userId:existingUser.id
        }
    })
}

// logout function to clear cookies and invalidate session
// this function will be used to logout the user
// @param req - request object
// @param res - response object
// @returns - success message
// @throws - error if refresh token is not found or invalid
// @throws - error if user is not found
const logout = (req,res) => {
    if(!req.cookies?.refreshjwt) return res.status(404).send({success:false,body:{message:'Token not found! No session in progress.'}});

    const refreshToken = req.cookies.refreshjwt;
    
    jwt.verify(refreshToken, process.env.REFRESH_KEY,
        async (error, decoded) => {
            if(error) return res.status(401).send({success:false,body:{message:'Unauthorized! Invalid refresh token.'}})

            const user = await User.findOne({where:{email:decoded.userObject.email}})

            if(!user) return res.status(401).send({success:false,body:{message:'Unauthorized! Invalid refresh token.'}})

            const updateObject = {
                refreshToken:null,
                refreshTokenExpiryDate:null
            }

            await User.update(updateObject, {where:{email:decoded.userObject.email}})

            res.clearCookie('accessjwt');
            res.clearCookie('refreshjwt');
            return res.send({success:true,body:{message:'User logged out!'}})
        }
    )
}

module.exports={
    login,
    register,
    logout
}