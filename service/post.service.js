const PostDto = require('../dtos/post.dto');
const postModel = require('../models/post.model');
const fileService = require('./file.service');
class PostService{
    async create (post,picture){
        const fileName = fileService.save(picture)
        const newPost = await postModel.create({...post, picture: fileName});
        return newPost;
    }
    async getAll(){
        const allPosts = await postModel.find();
        return allPosts;
    }
    async delete(id){
        const deletedPost = await postModel.findByIdAndDelete(id);
        return deletedPost;
    }
    async edit(post, id){
        if(!id) throw new Error("Post ID is required for editing");
        const updatedData = await postModel.findByIdAndUpdate(id,post,{new: true, runValidators: true});
        return updatedData; 
}
    async getOne(id){
        if(!id) throw  new Error("Post ID is required for fetching a single post");
        const post = await postModel.findById(id);
        const postDto = new PostDto(post);
        return {post: postDto};
    }
}

module.exports = new PostService();