const express = require('express');
const router = express.Router();

const {authenticate} = require('../middlewares/authentication');
const {addNotesByProblemId, getNotesByProblemId, updateNoteById, deleteNoteById, deleteNotesByProblemId} = require('../controllers/noteController');

router.use(authenticate);
router.route('/get/:problemId').get(getNotesByProblemId);
router.route('/add/:problemId').post(addNotesByProblemId);
router.route('/update/:noteId').put(updateNoteById);
router.route('/delete/:noteId').delete(deleteNoteById);
router.route('/delete/problem/:problemId').delete(deleteNotesByProblemId);

module.exports = router; 