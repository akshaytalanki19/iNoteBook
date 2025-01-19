import mongoose from "mongoose";

const NoteSchema =  new Schema({
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
    type: date,
    default: Date.now
   },
});

export default NoteSchema;