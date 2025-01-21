import { Router } from "express"
import Notes from "../models/Notes.js";
import fetchUser from "../middleware/fetchUser.js";


const router = Router();
//gets all the notes of users
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    const notes= await Notes.find({user: req.user.id});
    res.json([notes])
})

export default router;