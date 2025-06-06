const UserDto = require('../dtos/user.dto');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const mailService = require('./mail.service');

class AuthService{
    async register(email,password){
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            throw new Error(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ email, password: hashPassword });
                const userDto = new UserDto(user);


        await mailService.sendMail(email,`${process.env.API_URL}/api/auth/activation/${userDto.id}`,`Activate your account`);

        

        const tokens = tokenService.generateToken({...userDto});
        await tokenService.savetoken(userDto.id, tokens.refreshToken);
        return {user: userDto, ...tokens};
    } 

    async activation(userId){
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new AuthService();