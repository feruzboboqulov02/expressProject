const express = require('express');

const app = express();
app.use(express.json());
const PORT = 8080
app.get("/",(req,res)=>{
    //res.send("Hello World");
    res.status(200).send({message: "Hello World"});
})
app.post("/",(req,res)=>{
    console.log((req.body));
    const {firstname, lastName} = req.body;
    const message = `his full name is ${firstname} ${lastName}`;
    res.send(message);
    
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

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});