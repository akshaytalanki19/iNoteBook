import React,  {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
import { useState } from 'react'
export const AddNotes = () => {
    const context = useContext(noteContext);
    const {addNotes} = context;
    const [note, setNote]=useState({title: "", description: "", tag: "experimental"})
    const handleClick = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
       </form>
    </div>
  )
}
