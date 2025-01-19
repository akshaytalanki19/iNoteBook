import connectMongoDb from "./db.js";
import dotenv from "dotenv";
import express from "express"
import auth from "./routes/auth.js"
import notes from "./routes/notes.js"
dotenv.config();
connectMongoDb();

const app=express();
const port = process.env.port||3000
 
app.use(express.json)

app.listen(port, () =>{
    console.log(`app listening at http://localhost:${port}`)
})

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use('/api/auth',auth)
app.use('/api/notes',notes)
