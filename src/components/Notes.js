import React,  {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import { AddNotes } from './AddNotes';
 const Notes = () => {
    const context = useContext(noteContext);
  const {notes} = context;
  return (
    <>
    <AddNotes/>
    <div className="row my-3">
      <h2>your Notes</h2>
      {notes.map((note)=>{
        return <NoteItem note={note}/>
      })
    }
    </div>
    </>
  )
}
export default Notes;