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
        
    }

    async activation(req,res,next){
        try {
            const userId = req.params.id;
            await authService.activation(userId);
            res.json({message: "User activated successfully"});
        } catch (error) {
            console.log(error);
            
        }
    }
}

module.exports = new AuthController();