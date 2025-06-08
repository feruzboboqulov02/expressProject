const { max } = require('mathjs');
const authService = require('../service/auth.service');
const {validationResult} = require('express-validator');
const BaseError = require('../errors/base.errors');

class AuthController{
    async register(req,res,next){
        try {
            const {email, password} = req.body;
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(BaseError.BadRequest("Validation error", errors.array()));
            }
            const data =  await authService.register(email, password);
            res.cookie("refreshtoken", data.refreshToken,{httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000}); // 30 days
            return res.status(201).json(data);
        } catch (error) {
            next(error);
            
        }
        
    }

    async activation(req,res,next){
        try {
            const userId = req.params.id;
            await authService.activation(userId);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);            
        }
    }

    async login(req,res,next){
        try {
            const {email,password} = req.body;
            const data = await authService.login(email, password);
            res.cookie("refreshtoken", data.refreshToken,{httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000}); // 30 days
            return res.status(201).json(data);
        } catch (error) {
            next(error);

        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie("refreshtoken");
            return res.status(200).json({token});
        } catch (error) {
            next(error);
        }
    }

    async refresh(req,res,next){
        try {
            const {refreshToken} = req.cookies;
            const data = await authService.refresh(refreshToken);
            res.cookie("refreshtoken", data.refreshToken,{httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000}); // 30 days
            return res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }
    async getUser(req,res,next){
        try {
            const data = await authService.getUsers();
            return res.status(200).json(data);
        } catch (error) {
            next(error);
            
        }
    }
}

module.exports = new AuthController();