module.exports = class PostDto{
    title
    body


    constructor(model) {
        this.title = model.title;
        this.body = model.body;
    }
}