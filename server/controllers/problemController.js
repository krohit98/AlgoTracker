const { Problem } = require('../models')

// get problems by user id
const getProblemsByUserId = async (req,res) =>{
    let problemId = req.param.Id;
    let problems = Problem.findAll({where:{id:problemId}})
    return res.status(200).send({success:true, body:problems})
}

// add a problem
const addProblem = async (req,res) =>{
    let {
        statement,
        link,
        status,
        difficulty
    } = req.body;

    if(!statement && !link) return res.status(404).send({success:false, body:{message:"Problem statement and link not provided"}});
    
    const newProblem = await Problem.create({
        statement:statement,
        link:link,
        status:status,
        difficulty:difficulty
    })

    return res.status(200).send({success:true, body:newProblem});
}

// update a problem by id
const updateProblemById = async (req,res) =>{

    let problemId = req.param.Id;

    let {
        statement,
        link,
        status,
        difficulty
    } = req.body;

    

}

// delete a problem by id
const deleteProblemById = async (req,res) =>{

}

module.exports = {
    getProblemsByUserId,
    addProblem,
    updateProblemById, 
    deleteProblemById
}