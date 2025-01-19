import { Router } from "express"
import User from "../models/User.js"
const router = Router();
//create a User using: POST "/api/auth"
router.get('/',(req,res)=>{
    const user=User(req.body);
    user.save();
    res.send(req.body);
})

export default router;