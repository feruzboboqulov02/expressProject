const tokenService = require("../service/token.service");
const BaseError = require("../errors/base.errors");
module.exports = function (req, res, next) {
    try {
        const authorization = req.headers.authorization;
        console.log("Authorization Header:", authorization);
        if(!authorization){
            return next(BaseError.UnauthorizedError());
        }
        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            return next(BaseError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(BaseError.UnauthorizedError());
        }
        req.user= userData;
        next();
    } catch (error) {
        return next(BaseError.UnauthorizedError());
    }
}

    