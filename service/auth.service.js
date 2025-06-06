const UserDto = require('../dtos/user.dto');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

class AuthService{
    async register(email,password){
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            throw new Error(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ email, password: hashPassword });

        const userDto = new UserDto(user);
        return {user: userDto};
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