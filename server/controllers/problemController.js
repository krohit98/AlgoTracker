const { Problem } = require('../models')

// get problems by user id
const getProblemsByUserId = async (req,res) =>{
    let problemId = req.param.Id;
    let problems = Problem.findAll({where:{id:problemId}})
    
}

// add a problem
const addProblem = async (req,res) =>{

}

// update a problem by id
const updateProblemById = async (req,res) =>{

}

// delete a problem by id
const deleteProblemById = async (req,res) =>{

}

return{
    getProblemsByUserId,
    addProblem,
    updateProblemById,
    deleteProblemById
}