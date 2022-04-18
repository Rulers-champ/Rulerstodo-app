import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import Input from './components/Input';
import Note from './components/Note';



const getOthersfromLS=()=>{

    const othersdata=localStorage.getItem('othersNote');
    if (othersdata)
      return JSON.parse(othersdata);
    else 
      return [];
}


const getPinnedfromLS=()=>{

    const pinneddata=localStorage.getItem('pinnedNote');

    if (pinneddata)
      return JSON.parse(pinneddata);
    else
      return [];  
}

function App()
{
    const [othersNote,setothersNote]=useState(getOthersfromLS());
    const [pinnedNote,setpinnedNote]=useState(getPinnedfromLS());
    const [isedit,setedit]=useState(false);
    const [isadd,setadd]=useState(false);    
    const [editnote,seteditnote]=useState([]);

    const [pageNumber,setPageNumber]=useState(0);
    const notesPerPage=6;
    const noteVisited=pageNumber*notesPerPage;



    function addNote(note)
    {
        setothersNote(prevNote=>{
            return [...prevNote,note];
        });
        console.log(othersNote);
    };


    function deleteNote(key)
    {
        setothersNote(prevNote=>{
            return prevNote.filter((item,index)=>{
                return index!==key;
            });
        });
    };

    function addPinned(note)
    {
        setpinnedNote(prevNote=>{
            return [...prevNote,note];
        });

        
    };

    function deletePinnedNote(key)
    {
        setpinnedNote(prevNote=>{
            return prevNote.filter((item,index)=>{
                return index!==key;
            });
        });
    };


    function updateNote(key,flag)
    {
        setedit(true);
        setadd(flag);

       

        {
            flag?seteditnote(()=>{
            return pinnedNote.filter((item,index)=>{
                return index===key;
            });
            }):seteditnote(()=>{
                return othersNote.filter((item,index)=>{
                    return index===key;
                });
            })
        }
        
        if (flag===true)
        {
            deletePinnedNote(key);
        }
        else
        {
            deleteNote(key);
        }
        console.log(editnote);

        
        
        
    }


    //saving the data in localstorage..

    useEffect(()=>{
      
      localStorage.setItem('othersNote',JSON.stringify(othersNote));

    },[othersNote])

    useEffect(()=>{

        localStorage.setItem('pinnedNote',JSON.stringify(pinnedNote));

    },[pinnedNote])


    
    function displayNotes()
    {
       return othersNote.slice(noteVisited,noteVisited+notesPerPage).map((item,index)=>{
         return (<Note 
            key={index}
            id={index}
            title={item.title} 
            content={item.content} 
            onDelete={deleteNote}   
            onPinned={addPinned} 
            onEdit={updateNote}
            isPinned={false}
            />);
       });
    }



    return (
<>

    <div className={isedit?'main-section':''}>
       <header>
            <h1>Keeper App</h1>
       </header>
       {isedit? <div></div>:<Input addNote={addNote} isedit={false} id={""} title={""} content={""} /> }
      
       
        {pinnedNote.length!==0?  
            <div className='pinned-section'>
                <h6 className="subheading">Pinned Notes</h6>
                <div className='pinned-grid'>
                    {pinnedNote.map((item,index)=>{
                        return <Note 
                                    key={index}
                                    id={index}
                                    title={item.title} 
                                    content={item.content} 
                                    onDelete={deletePinnedNote}   
                                    onPinned={addNote} 
                                    onEdit={updateNote}
                                    isPinned={true}
                                />;
                    })}
                </div>
            </div>:<span></span>
        }  
           
        {othersNote.length==0?<h2 className='main-subheading'>No Items</h2>: <h6 className="subheading">Others</h6>}   
         
    
       <div className="others-grid">
        {othersNote.map((item,index)=>{
            return <Note 
                    key={index}
                    id={index}
                    title={item.title} 
                    content={item.content} 
                    onDelete={deleteNote}   
                    onPinned={addPinned} 
                    onEdit={updateNote}
                    isPinned={false}
                    />;
        })}
       </div>
      

       </div>

{isedit?<div className='update-section' ><Input className ='update-section' addNote={isadd?addPinned:addNote} changeedit={()=>{setedit(false)}} isedit={true}  id={editnote[0].id} title={editnote[0].title} content={editnote[0].content} /></div>:<div></div>}
</>
    );
}



export default App;