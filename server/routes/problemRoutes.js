const express = require('express');
const router = express.Router();

const {addProblemByUserId, getProblemsByUserId, updateProblemById, deleteProblemById, flagProblemById} = require('../controllers/problemController');

router.route('/get/:userId').get(getProblemsByUserId);
router.route('/add/:userId').post(addProblemByUserId);
router.route('/update/:problemId').put(updateProblemById);
router.route('/delete/:problemId').delete(deleteProblemById);
router.route('/flag/:problemId').put(flagProblemById);

module.exports = router;