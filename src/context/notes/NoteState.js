import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // Get all Notes
  const getNotes =async () => {
    // todo:api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    // console.log(json)
    setNotes(json)
  }


  // Add a Note
  const addNote =async (title, description, tag) => {
    // todo:api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }


  // Delete a Note
  const deleteNote =async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }

  // Edit a Node
  const editNote =async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });

    const json = await response.json(); 
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }




  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;