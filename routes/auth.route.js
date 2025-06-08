const express = require('express');
const authController = require('../controllers/auth.controller');
const authService = require('../service/auth.service');
const router = express.Router();
const {body} = require('express-validator');

router.post('/register',body('email').isEmail().body('password').isLength({min:6, max:30}),authController.register)
router.get('/activation/:id',authController.activation);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh)

module.exports = router