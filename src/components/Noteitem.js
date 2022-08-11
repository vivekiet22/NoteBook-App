
import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'



const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note,updateNote } = props
    return (
        <div className='col-md-3 '>
            <div className="card my-3" >
                    <div className="card-body">
                        <div className="d-flex align-item-center">
                        <h4 className="card-title">{note.title}</h4>
                        
                        <i className='fas fa-edit mx-3' onClick={()=>{updateNote(note)}}></i>
                        <i className='fas fa-trash mx-2' onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success")}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>

                        
                       
                    </div>
            </div>
            
            
        </div>
    )
}

export default Noteitem