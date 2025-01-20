import { Router } from "express"
import User from "../models/User.js"
import { body, validationResult } from "express-validator"
const router = Router();
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
    user= await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    })
   }catch(error){
     console.log(error.message);
     res.status(500).send("Internal server error");
   }
})

export default router;