const express = require('express');
const authController = require('../controllers/auth.controller');
const authService = require('../service/auth.service');
const router = express.Router();

router.post('/register',authController.register)
router.post('/activation/:link',authController.activation);

module.exports = router