import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitialize = [
        {
          _id: "679dd52b7ebb574cfd5640e6",
          user: "678e7be5603dfc4484761490",
          title: "my-second-notes",
          description: "this is my second notes description hope you like it ",
          tag: "other",
          timestamp: "2025-02-01T08:02:51.158Z",
          __v: 0,
        },
        {
          _id: "679dd52e7ebb574cfd5640e8",
          user: "678e7be5603dfc4484761490",
          title: "my-second-notes updated",
          description: "this is my second notes description hope you like it ",
          tag: "other",
          timestamp: "2025-02-01T08:02:54.553Z",
          __v: 0,
        },
      ];
    const [notes, setNotes] = useState(notesInitialize);

    // add note 
    const addNote = (title, description, tag)=>{
      const note = {
        "title": "from frontend",
        "description": "looking forward to add it from frontend", 
        "tag": "eperimental"
      }
        setNotes(notes.push(note))
    }
    // delete note
    const deleteNote = ()=>{
      
    }
    // edit note
    const editNote = ()=>{
      
    }
  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
