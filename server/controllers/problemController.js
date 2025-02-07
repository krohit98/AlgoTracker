const { Problem, Note, Solution } = require('../models')

// get problems by user id
const getProblemsByUserId = async (req,res) =>{
    let userId = req.params.userId;
    if(!userId) return res.status(404).send({success:false, body:{message:"UserId not provided"}});
    let problems = await Problem.findAll({
        where:{userId:userId},
        include:[{model:Note},{model:Solution}],
        order:[['createdAt','DESC']]
    })
    return res.status(200).send({success:true, body:problems})
}

// add a problem 
const addProblemByUserId = async (req,res) =>{
    let userId = req.params.userId;

    if(!userId) return res.status(404).send({success:false, body:{message:"UserId not provided"}});

    let {
        statement,
        link,
        status,
        difficulty
    } = req.body;

    if(!statement && !link) return res.status(404).send({success:false, body:{message:"Problem statement and link not provided"}});
    
    const newProblem = await Problem.create({
        userId:userId,
        statement:statement,
        link:link,
        status:status,
        difficulty:difficulty
    })

    return res.status(200).send({success:true, body:newProblem});
}

// update a problem by id
const updateProblemById = async (req,res) =>{

    let problemId = req.params.problemId;

    if(!problemId) return res.status(404).send({success:false, body:{message:"Problem Id not provided"}})

    let {
        statement,
        link,
        status,
        difficulty
    } = req.body;

    let problem = await Problem.findOne({where:{id:problemId}})

    if(!problem) return res.status(404).send({success:false, body:{message:"Problem not found"}})

    let response = await problem.update({
        statement, 
        link,
        status,
        difficulty
    })

    return res.status(200).send({success:true, body:response});
}

// delete a problem by id
const deleteProblemById = async (req,res) =>{
    let problemId = req.params.problemId;

    if(!problemId) return res.status(404).send({success:false, body:{message:"Problem Id not provided"}})

    let problem = await Problem.findOne({where:{id:problemId}})

    if(!problem) return res.status(404).send({success:false, body:{message:"Problem not found"}})

    problem.destroy();

    return res.status(200).send({success:true});
}

const flagProblemById = async (req,res) => {
    let problemId = req.params.problemId;

    if(!problemId) return res.status(404).send({success:false, body:{message:"Problem Id not provided"}})
    
    let {flagged} = req.body;
    
    let problem = await Problem.findOne({where:{id:problemId}})

    if(!problem) return res.status(404).send({success:false, body:{message:"Problem not found"}})
    
    let response = await problem.update({flagged})

    return res.status(200).send({success:true, body:response});
}

module.exports = {
    getProblemsByUserId,
    addProblemByUserId,
    updateProblemById, 
    deleteProblemById,
    flagProblemById
}