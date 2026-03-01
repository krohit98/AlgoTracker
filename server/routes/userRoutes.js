const express = require('express');
const router = express.Router();

const {authenticate} = require('../middlewares/authentication');
const { updateCodeThemeByUserId } = require('../controllers/userController');

router.use(authenticate);
router.route('/update/codetheme/:userId').put(updateCodeThemeByUserId);

module.exports = router; 