const { Solution } = require('../models')

// get solutions by problem id
const getSolutionsByProblemId = async (req,res) =>{
    let problemId = req.params.problemId;
    let solutions = Solution.findAll({where:{problemId:problemId}})
    return res.status(200).send({success:true, body:solutions})
}

// add a solution
const addSolutionsByProblemId = async (req,res) =>{
    
    let problemId = req.params.problemId;

    let {
        solutions
    } = req.body;

    if(solutions.length < 1) return res.status(404).send({success:false, body:{message:"Code not provided"}});

    let addedSolutions = [];
    
    for(let solution of solutions){
        const newSolution = await Solution.create({
            problemId,
            title:solution.title,
            code:solution.code
        })
        addedSolutions.push(newSolution);
    }
 
    return res.status(200).send({success:true, body:addedSolutions});
}

// update a problem by id
const updateSolutionById = async (req,res) =>{

    let solutionId = req.params.solutionId;

    if(!solutionId) return res.status(404).send({success:false, body:{message:"solution Id not provided"}})

    let {
        title,
        code
    } = req.body;

    let solution = await Solution.findOne({where:{id:solutionId}})

    if(!solution) return res.status(404).send({success:false, body:{message:"solution not found"}})

    let response = await solution.update({
        title,
        code
    })

    return res.status(200).send({success:true, body:response});
}

// delete a problem by id
const deleteSolutionById = async (req,res) =>{
    let solutionId = req.params.solutionId;

    if(!solutionId) return res.status(404).send({success:false, body:{message:"solution Id not provided"}})

    let solution = await Solution.findOne({where:{id:solutionId}})

    if(!solution) return res.status(404).send({success:false, body:{message:"solution not found"}})

    solution.destroy();

    return res.status(200).send({success:true});
}

module.exports = {
    getSolutionsByProblemId,
    addSolutionsByProblemId,
    updateSolutionById, 
    deleteSolutionById
}