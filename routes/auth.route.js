const express = require('express');
const authController = require('../controllers/auth.controller');
const authService = require('../service/auth.service');
const router = express.Router();

router.post('/register',authController.register)
router.get('/activation/:id',authController.activation);

module.exports = router