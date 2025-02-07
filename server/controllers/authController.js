const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    const createdUser = await User.create({
        name,
        email,
        password:hash
    });

    res.status(200).send({
        success:true,
        body:{message:"User created. Kindly login!"}
    })
}

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

    const accessToken = generateAccessToken({userObject});
    const refreshToken = generateRefreshToken({userObject});

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

    res.status(200).send({
        success:true,
        body:{
            name:existingUser.name,
            email:existingUser.email,
            userId:existingUser.id
        }
    })
}

const refresh = (req,res) => {
    if(!req.cookies?.refreshjwt) return res.status(401).send({success:false,body:{message:'Unauthorized! Refresh token not found.'}})

    const refreshToken = req.cookies.refreshjwt;

    jwt.verify(refreshToken, process.env.REFRESH_KEY,
        async (error, decoded) => {
            if(error) return res.status(401).send({success:false,body:{message:'Unauthorized! Invalid refresh token.'}})

            const user = await User.findOne({where:{email:decoded.userObject.email}})

            if(!user) return res.status(401).send({success:false,body:{message:'Unauthorized! Invalid refresh token.'}})

            const accessToken = generateAccessToken({userObject:decoded.userObject});
            res.cookie('accessjwt', accessToken ,{
                httpOnly:true,
                secure:false,
                sameSite:'strict',
            })
            .send({success:true,body:{message:'Access token refreshed!'}}) 
        } 
    )
}

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
            res.send({success:true,body:{message:'User logged out!'}})
        }
    )
}

const authenticate = (req,res) => {
    if(!req.cookies?.accessjwt) return res.status(401).send({success:false,body:{message:'Unauthorized! Access token not found.'}});

    let accessToken = req.cookies.accessjwt;

    jwt.verify(accessToken, process.env.AUTH_KEY,
        (error, decoded) => {
            if(error) return res.status(401).send({success:false,body:{message:'Unauthorized! Invalid access token.'}})

            res.status(200).send({success:true,body:{message:'Resource sent!'}})
        })
}

function generateAccessToken(userObject){
    const accessToken = jwt.sign(
    userObject,
    process.env.AUTH_KEY,
    {
        expiresIn:'10m'
    });
    return accessToken;
}

function generateRefreshToken(userObject){
    const refreshToken = jwt.sign(
    userObject,
    process.env.REFRESH_KEY,
    {
        expiresIn:'1d'
    });
    return refreshToken;
}

module.exports={
    login,
    register,
    refresh,
    logout,
    authenticate
}