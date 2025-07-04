import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/homeNewsInsertStyle.css';

const ClassVenueInsert = () => {
    const[place,setPlace]=useState('');
    const[description,setDescription]=useState('');
    const[day,setDay]=useState('');
    const[timing,setTiming]=useState('');
    const{showError,showSuccess}=useToast();
    const[isProcessing,setIsPreocessing]=useState(false);
    const url=import.meta.env.VITE_SERVER_URL;
   async  function handleSubmit(e){
        e.preventDefault();
        window.scrollTo({top:0,behavior:"instant"})
        if(place==''||description==''||timing==''){
            showError('Fill all the field');
            return;
        }
        setIsPreocessing(true);
        const data={
            day,
            place,
            description,
            timing
        }
        try{
            const response=await axios.post(`${url}/class-venue`,data,{
                headers:{
                    "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`, 
                }
            });
            if(response.status==200){
                showSuccess('successfully uploaded');
                setPlace('');
                setDescription('');
                setDay('');
                setTiming('');
                setIsPreocessing(false);
            }
            else{
                showError('upload fail',response.status);
                setIsPreocessing(false);
            }
        }
        catch(err){
            console.log(err);
            showError(err.message||"error");
            setIsPreocessing(false);
        }
    }
    return(
        isProcessing?(<Processing content='Inserting Venues....'/>):(
            <div id="HomeNewsInsert-Container">
                <h3>Insert New Venues Here</h3>
                <form>
                    <label>Place(இடம்)</label>
                    <input 
                        type='text'
                        value={place}
                        required
                        onChange={(e)=>setPlace(e.target.value)}
                    >
                    </input>
                    <label>Date(நாள்)</label>
                    <input 
                        type='text'
                        value={day}
                        required
                        onChange={(e)=>setDay(e.target.value)}
                    >
                    </input>
                    
                    <label>Timing(நேரம் )</label>
                    <input 
                        type='text'
                        required
                        onChange={(e)=>setTiming(e.target.value)}
                    >
                    </input>
                    <label>Description(குறிப்பு)</label>
                    <textarea
                        type='text'
                        value={description}
                        required
                        onChange={(e)=>setDescription(e.target.value)}
                    >
                    </textarea>
                    
                    <div id="HomeNewsInsert-Submit-Button">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    )

}

export default ClassVenueInsert
