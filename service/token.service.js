const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token.model');

class TokenSerice{
    generateToken(payload){
        const accessToken= jwt.sign(payload, process.env.JWT_ACCESS_KEY,{expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY,{expiresIn: '30d'});

        return {accessToken, refreshToken};
    }

    async savetoken(userId,refreshToken){
        const existToken = await tokenModel.findOne({user: userId});
        if (existToken) {
            existToken.refreshToken = refreshToken;
            return await existToken.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken){
        return await tokenModel.findOneAndDelete({refreshToken});
    }

    validateRefreshToken(token){
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY);
        } catch (error) {
            return null;
        }
    }

    async findToken(refreshToken){
        return await tokenModel.findOne({refreshToken});
    }

    validateAccessToken(token){
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY);
        } catch (error) {
            return null;
        }
    }
}


module.exports = new TokenSerice();