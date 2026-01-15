const express = require('express');
const router = express.Router();

const {authenticate} = require('../middlewares/authentication');
const {addSolutionsByProblemId, getSolutionsByProblemId, updateSolutionById, deleteSolutionById} = require('../controllers/solutionController');

router.use(authenticate);
router.route('/get/:problemId').get(getSolutionsByProblemId);
router.route('/add/:problemId').post(addSolutionsByProblemId);
router.route('/update/:solutionId').put(updateSolutionById);
router.route('/delete/:solutionId').delete(deleteSolutionById);

module.exports = router; 