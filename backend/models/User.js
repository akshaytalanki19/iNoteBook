import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserSchema =  new Schema({
   name:{
    type: String,
    required: true
   },
   email:{
    type: String,
    required: true,
    unique: true
   },
   Password:{
    type: String,
    required: true
   },
   timestamp:{
    type: Date,
    default: Date.now
   },
});

export default UserSchema;