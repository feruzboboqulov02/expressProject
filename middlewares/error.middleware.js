const BaseError = require('../errors/base.errors');
module.exports = function (err, req, res, next) {
    console.error('error  middleware', err);
    if(err instanceof BaseError){
        return res.status(err.status|| 500).json({message:err.message, errors: err.errors||[]});
    }

    return res.status(500).json({message:"server error"})
}