const express = require('express');
const mongoose = require('mongoose');
const postmodel = require('./models/post.model.js');
require('dotenv').config();
const fileupload = require('express-fileupload');
const requestTime = require('./middlewares/request-time');
const helmet = require('helmet');
const morgan = require('morgan');
const authService = require('./service/auth.service.js');
const cookieParser = require('cookie-parser');


const postRoute = require('./routes/post.route.js');
const { parser } = require('mathjs');
const errorMiddleware = require('./middlewares/error.middleware.js');
const app = express();

app.use(express.static('static'))
app.use(cookieParser({}));
app.use(express.json());
app.use(fileupload({}))
app.use(requestTime);
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/post',require('./routes/post.route.js'));
app.use('/api/auth',require('./routes/auth.route.js'));
app.use(errorMiddleware)

// app.get("/",)


// app.post("/",async (req,res)=>{
//     try {
//         const {title, body} = req.body;
//         const newPost = await postmodel.create({title, body})
//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(500).json({error: "Internal Server Error"});
//     }

// })

// app.delete("/:id",(req,res)=>{
//     const {id} = req.params;
//     res.send(`User with id ${id} deleted successfully`);
// })

// app.put("/:id",(req,res)=>{
//     const {id} = req.params;
//     const body = req.body;
//     res.json({id,body})
// })

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