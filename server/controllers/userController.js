const { User } = require('../models')

// update code theme by user id
const updateCodeThemeByUserId = async (req,res) =>{

    let userId = req.params.userId;

    if(!userId) return res.status(404).send({success:false, body:{message:"user Id not provided"}})

    let {
        codeTheme
    } = req.body;

    let user = await User.findOne({where:{id:userId}})

    if(!user) return res.status(404).send({success:false, body:{message:"user not found"}})

    let response = await user.update({
        codeTheme
    })

    return res.status(200).send({success:true, body:response});
}

// update user account

// delete user account

module.exports = {
    updateCodeThemeByUserId
}