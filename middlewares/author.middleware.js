const BaseError = require("../errors/base.errors");

module.exports = async function (req, res, next) {
    try {
        const post = await postModel.findById(req.params.id);
        const authorId = req.user.id;
        if(post.author !== authorId){
            return next(BaseError.BadRequestError("Only author can edit or delete the post"));
        }next();
    } catch (error) {
        return next(BaseError.BadRequestError("Only author can edit or delete the post"));
    }
}