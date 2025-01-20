import { Router } from "express"
import User from "../models/User.js"
import { body, validationResult } from "express-validator"
const router = Router();
//create a User using: POST "/api/auth"
router.post('/',[
     body('name', 'Name should be min 3 characters').isLength({min:3}),
     body('email', 'Enter a valid name').isEmail(),
     body('password', 'Password should be min 5 characters').isLength({min:5}),
],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user=> res.json(user))
    .catch(err=> {console.log(err)
       res.json({error: 'email already exists'})
     })
   
})

export default router;