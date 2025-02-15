import { Router } from "express"
import Note from "../models/Notes.js";
import fetchUser from "../middleware/fetchUser.js";
import { body, validationResult } from "express-validator"

const router = Router();
//Route 1: gets all the notes of users
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    try{
    const notes= await Note.find({user: req.user.id});
    res.json(notes);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
      }
})

//Route 2: add notes of users
router.post('/addnotes',[
    body('title', 'title should be min 3 characters').isLength({min:3}),
    body('description', 'title should be min 5 characters').isLength({min:5}),
],
    fetchUser,async(req,res)=>{
        const {title, description, tag}=req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        try{
        const note=new Note({
            title, description, tag, user: req.user.id   
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
      }
})

router.put('/updateNotes/:id',fetchUser,async(req,res)=>{
    try{
       const {title,description,tag}=req.body;
       const newNote = {};
       if(title){newNote.title=title};
       if(description){newNote.deescription=description};
       if(tag){newNote.tag=tag};

       let note= await Note.findById(req.params.id);
       if(!note){res.status(404).send("Not Found")}

       if(note.user.toString() !== req.user.id){
        return res.status(401).send("Note Allowed");
       }

       note=await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
       res.json(note);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
      }
})

router.delete('/deletenotes/:id',fetchUser,async(req,res)=>{
    try{
        let note= await Note.findById(req.params.id);
       if(!note){res.status(404).send("Not Found")}

       if(note.user.toString() !== req.user.id){
        return res.status(401).send("Note Allowed");
       }

       note=await Note.findOneAndDelete(req.params.id);
       res.json({"Success": "Notes has been deleted"})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal server error");
      }
})

export default router;