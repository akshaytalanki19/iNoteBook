import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host  = "http://localhost:5000";
  const notesInitialize = [];
  const [notes, setNotes] = useState(notesInitialize);
    // get note 
    const getNotes = async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ZTdiZTU2MDNkZmM0NDg0NzYxNDkwIn0sImlhdCI6MTczODM5NDk5N30.ghVvV1CdBaGvD8OzD6SpFlsbHkRIitwDhx-qu5Uenqg"
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
      console.log(notes);
    };

    // add note 
    const addNotes = async(title, description, tag)=>{
      const response = await fetch(`${host}/api/notes/addNotes`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ZTdiZTU2MDNkZmM0NDg0NzYxNDkwIn0sImlhdCI6MTczODM5NDk5N30.ghVvV1CdBaGvD8OzD6SpFlsbHkRIitwDhx-qu5Uenqg"
        },
        body:JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      const note = {
        "title":title,
        "description": description, 
        "tag": tag
      }
        setNotes(notes.concat(note))
    }
    // delete note
    const deleteNote = async(_id)=>{
      const response = await fetch(`${host}/api/notes/deleteNotes/${_id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ZTdiZTU2MDNkZmM0NDg0NzYxNDkwIn0sImlhdCI6MTczODM5NDk5N30.ghVvV1CdBaGvD8OzD6SpFlsbHkRIitwDhx-qu5Uenqg"
        },
        
      });
      const json = await response.json();
      console.log(json);
        const newNotes = notes.filter((note)=>{return note._id!==_id})
        setNotes(newNotes)
    }
    // edit note
    const editNote = async(id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updateNotes/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4ZTdiZTU2MDNkZmM0NDg0NzYxNDkwIn0sImlhdCI6MTczODM5NDk5N30.ghVvV1CdBaGvD8OzD6SpFlsbHkRIitwDhx-qu5Uenqg"
        },
        body:JSON.stringify({title, description, tag})
      });
      const json = await response.json();
      for (let index=0; index<notes.length; index++){
        const element = notes[index];
        if(element._id === id){
           element.title = title;
           element.description = description;
           element.tag=tag;
        }
      }
    }
  return (
    <NoteContext.Provider value={{notes, addNotes, deleteNote, editNote,getNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
