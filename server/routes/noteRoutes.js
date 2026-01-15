const express = require('express');
const router = express.Router();

const {authenticate} = require('../middlewares/authentication');
const {addNotesByProblemId, getNotesByProblemId, updateNoteById, deleteNoteById} = require('../controllers/noteController');

router.use(authenticate);
router.route('/get/:problemId').get(getNotesByProblemId);
router.route('/add/:problemId').post(addNotesByProblemId);
router.route('/update/:noteId').put(updateNoteById);
router.route('/delete/:noteId').delete(deleteNoteById);

module.exports = router; 