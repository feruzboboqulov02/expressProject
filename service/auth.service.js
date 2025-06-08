const UserDto = require('../dtos/user.dto');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const mailService = require('./mail.service');
const BaseError = require('../errors/base.errors');

class AuthService{
    async register(email,password){
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            throw BaseError.BadRequest(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ email, password: hashPassword });
        const userDto = new UserDto(user);


        await mailSearvice.sendMail(email,`${process.env.API_URL}/api/auth/activation/${userDto.id}`,`Activate your account`);

        

        const tokens = tokenService.generateToken({...userDto});
        await tokenService.savetoken(userDto.id, tokens.refreshToken);
        return {user: userDto, ...tokens};
    } 

    async activation(userId){
        const user = await userModel.findById(userId);
        if (!user) {
            throw BaseError.badRequest(`User with id ${userId} not found`);
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email,password){
        const user = await userModel.findOne({ email });
        if(!user){
            throw BaseError.BadRequest(`User with email ${email} not found`);
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            throw BaseError.BadRequest('Invalid password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.savetoken(userDto.id, tokens.refreshToken);
        return {user: userDto, ...tokens};
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw BaseError.unauthorized('Refresh token is required');
        }
        const userPayload = tokenService.validateRefreshToken(refreshToken);
        const tokenDb = await tokenService.findToken(refreshToken);
        if(!userPayload || !tokenDb){
            throw BaseError.unauthorized('Invalid refresh token');
        }
        const user = await userModel.findById(userPayload.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.savetoken(userDto.id, tokens.refreshToken);
        return {user: userDto, ...tokens};
    }
    async getUsers(){
        return await userModel.find()
    }
}

module.exports = new AuthService();