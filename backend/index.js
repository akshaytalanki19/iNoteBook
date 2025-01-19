import connectMongoDb from "./db.js";
import dotenv from "dotenv";
import express from "express"
dotenv.config();
connectMongoDb();

const app=express();
const port = process.env.port||3000

app.listen(port, () =>{
    console.log(`app listening at http://localhost:${port}`)
})

app.get('/',(req,res)=>{
    res.send('hello world')
})