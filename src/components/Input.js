import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

function Input(props)
{
    const [textAreaheight,setTextAreaheight]=useState(39);
    const [note,setNote]=useState({title:"",content:"",date:"",originalkey:-1});

    
    


    useEffect(()=>{
     setNote({title:props.title,content:props.content,date:"",originalkey:props.id});   
    },[props]);


    console.log(props.title);

    
    // console.log("*****");
    

   function handleChange(event)
   {
     setTextAreaheight(39);  
     setTextAreaheight(event.target.scrollHeight);  
     console.log(textAreaheight);
   };

    
   function handleText(event)
   {
      const {name,value}=event.target;
      
      setNote(prevNote=>{
          return {
              ...prevNote,
              [name]:value
          };
      });
   };


   function handleAdd()
   {
    var objToday = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],

    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear();

      
     

       props.addNote(note);
       setNote({title:"",content:""});
       
       props.changeedit();
       
       
   }


    return (
    <div className='input-box'>
        <input name="title" type="text" className='input-title' placeholder='Title' onChange={handleText} value={note.title} ></input>
        <br />
        <textarea name="content" placeholder='Enter Your Text' rows={props.isedit?'10':'4'} className='input-text'  onChange={handleText} value={note.content} ></textarea>
        <br />
        <button className='btn' onClick={handleAdd}>{props.isedit ? 'Update':'Add'} </button>
    </div>
    );
    
}

export default Input;