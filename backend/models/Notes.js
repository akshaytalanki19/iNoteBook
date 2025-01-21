import mongoose from "mongoose";
import { Schema } from "mongoose";

const NoteSchema =  new Schema({
   user:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
   },
   title:{
    type: String,
    required: true
   },
   description:{
    type: String,
    required: true
   },
   tag:{
    type: String,
    required: true
   },
   timestamp:{
    type: Date,
    default: Date.now
   },
});

const Notes = mongoose.model("Notes", NoteSchema);

export default Notes;