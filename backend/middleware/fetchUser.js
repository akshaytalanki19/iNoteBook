import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_TOKEN;
const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try{
    const data = jwt.verify(token,JWT_SECRET );
    req.user=data.user;
    next();
    }catch(error){
        res.status(401).send({error: "Please catch authenticate using a valid token"})
    }
}

export default fetchUser;