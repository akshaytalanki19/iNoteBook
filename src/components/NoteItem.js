import React,  {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
   const {note, updateNote} = props;
  return (
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-trash mx-4" onClick={()=>(deleteNote(note._id))}></i>
            <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
    </div>
  )
}
export default NoteItem;