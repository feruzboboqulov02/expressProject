const postmodel = require('../models/post.model');
const postService = require('../service/post.service');

class postController {  
    async getAll(req,res){
        try {
                console.log("Request Time:", req.requestTime);
                const allPosts = await postService.getAll();
                res.status(200).json(allPosts);
            }   catch (error) {
                res.status(500).json({error: "Internal Server Error"});
            } 
    }
    async create(req, res){
        try {

            const post = await postService.create(req.body,req.files.picture);
            res.status(201).json(post);
        }   catch (error) {
            res.status(500).json({error: "Internal Server Error"});
            }
        }
    
    async delete (req,res){
        try {
            const post = await postService.delete(req.params.id);
            res.status(200).json(post); 
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});

        }
    }
    async edit(req,res){
        try {
            const {body,params}= req
            const post = await postService.edit(body,params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});

        }
    }
    async getOne(req,res){
        try {
            const post = await postService.getOne(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});

        }
    }
}


module.exports = new postController();