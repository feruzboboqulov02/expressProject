const authService = require('../service/auth.service');

class AuthController{
    async register(req,res,next){
        try {
            const {email, password} = req.body;
            const data =  await authService.register(email, password);
            return res.status(201).json(data);
        } catch (error) {
            console.log(error);
            
        }
        next();
    }

    async activation(req,res,next){
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

module.exports = new AuthController();