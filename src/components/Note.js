import React, { useCallback, useState } from 'react';
import pin from './icons/pin.png';
import unpin from './icons/unpin.png';
import trash from './icons/delete.png';
import edit from './icons/edit.png';
import './Note.css';


function Note(props)
{
    if(props.ispinned===true)
    console.log('true');
    else
    console.log('false');

    const note={
        title:props.title,
        content:props.content,
        date:"",
        originalkey:props.id
    };
   
    function handleDelete()
    {
        props.onDelete(props.id);
    }
   
    function handlePinned()
    {
        props.onPinned(note);
        props.onDelete(props.id);
        
    }

    function handleEdit()
    {
        console.log('edit was trggered');
         props.onEdit(props.id,props.isPinned);
    }


    return (
        <div className='note-container'>
            <div className='note-header'>
              <h1>{props.title}</h1>
              <img className="note-icon" onClick={handlePinned} src={props.isPinned?pin:unpin} />
            </div>

            <div className='note-body'>
                <p>{props.content}</p>
            </div>
            <footer className="note-footer">
                <img className="note-icon" onClick={handleEdit} src={edit} />
                <img className="note-icon" onClick={handleDelete} src={trash}/>               
            </footer>

            
        </div>
    );
}

export default Note;