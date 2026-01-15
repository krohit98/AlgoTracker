const express = require('express');
const router = express.Router();

const {authenticate} = require('../middlewares/authentication');
const {
    addProblemByUserId, 
    getProblemsByUserId, 
    updateProblemById, 
    deleteProblemById, 
    flagProblemById, 
    getLeetcodeProblems
} = require('../controllers/problemController');

router.use(authenticate);
router.route('/get/:userId').get(getProblemsByUserId);
router.route('/add/:userId').post(addProblemByUserId);
router.route('/update/:problemId').put(updateProblemById);
router.route('/delete/:problemId').delete(deleteProblemById);
router.route('/flag/:problemId').put(flagProblemById);
router.route('/leetcode').get(getLeetcodeProblems);

module.exports = router;