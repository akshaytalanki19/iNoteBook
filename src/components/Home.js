import React from 'react'
import Notes from './Notes';
import { AddNotes } from './AddNotes';
export const Home = () => {

  return (
    <div>
    <div className='container my-3'>
       <h2>Add a Note</h2>
    </div>
     <Notes/>
    </div>
  )
}
