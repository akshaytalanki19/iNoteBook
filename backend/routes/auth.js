import { Router } from "express"
import User from "../models/User.js"
import { body, validationResult } from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fetchUser from "../middleware/fetchUser.js"
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const JWT_SECRET = process.env.JWT_TOKEN;

//create a User using: POST "/api/auth"
router.post('/createUser',[
     body('name', 'Name should be min 3 characters').isLength({min:3}),
     body('email', 'Enter a valid name').isEmail(),
     body('password', 'Password should be min 5 characters').isLength({min:5}),
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
    let user =await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "user already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass =await bcrypt.hash(req.body.password, salt);
    user= await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    });
    const data ={
        user:{
        id: user.id
        }
    }
    const jwtData=jwt.sign(data,JWT_SECRET);
    console.log(jwtData);
    res.json(jwtData);
   }catch(error){
     console.log(error.message);
     res.status(500).send("Internal server error");
   }
})

// authenticate a user
router.post('/login',[
    body('email', 'Enter a valid name').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password}=req.body;

    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please enter valid credentials"});
        }
        const passwordCompare =await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please enter valid credentials"});
        }
        const data ={
            user:{
            id: user.id
            }
        }
        const jwtData=jwt.sign(data,JWT_SECRET);
        res.json(jwtData);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// get user details login is mandatory
router.post('/getUser',fetchUser,async (req,res)=>{
    
    try {
        const userId =req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }

})


export default router;