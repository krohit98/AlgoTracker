const express = require('express');
const router = express.Router();

const { login, register, logout, refresh, authenticate } = require('../controllers/authController');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh').get(refresh);
router.route('/logout').get(logout);
router.route('/authenticate').get(authenticate);

module.exports = router; 