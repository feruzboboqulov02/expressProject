const express = require('express');
const mongoose = require('mongoose');
const postmodel = require('./models/post.model.js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.get("/",async (req,res)=>{
    try {
        const allPosts = await postmodel.find();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    } 
})
app.post("/",async (req,res)=>{
    try {
        const {title, body} = req.body;
        const newPost = await postmodel.create({title, body})
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }

})

app.delete("/:id",(req,res)=>{
    const {id} = req.params;
    res.send(`User with id ${id} deleted successfully`);
})

app.put("/:id",(req,res)=>{
    const {id} = req.params;
    const body = req.body;
    res.json({id,body})
})

const PORT =process.env.PORT || 8080;



const bootstrsap =async ()=>{
    try{ 
        await mongoose.connect(process.env.DB_URL).then(() => {console.log("Connected to MongoDB")});
        app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});
    }catch(error){
        console.log(`Error connecting to the database: ${error.message}`);
        
    }
}
bootstrsap();