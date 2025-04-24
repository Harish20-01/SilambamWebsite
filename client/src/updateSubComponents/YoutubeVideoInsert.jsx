import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/homeNewsInsertStyle.css';

const YoutubeVideoInsert = () => {
    const[title,setTitle]=useState('');
    const[id,setId]=useState('');
    const{showError,showSuccess}=useToast();
    const[isProcessing,setIsPreocessing]=useState(false);
   async  function handleSubmit(e){
        e.preventDefault();
        
        if(title==''||id==''){
            showError('Fill all the field');
            return;
        }
        setIsPreocessing(true);
        const data={
            title,
            id
        }
        try{
            const response=await axios.post('https://silambamwebsite.onrender.com/youtube-video',data,{
                headers:{
                    "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`, 
                }
            });
            if(response.status==200){
                showSuccess('successfully uploaded');
                setId('');
                setTitle('');
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
        isProcessing?(<LoadingComponent/>):(
            <div id="HomeNewsInsert-Container">
                <h3>Update Youtube ID Here..</h3>
                <form>
                    <label>Title</label>
                    <input 
                        type='text'
                        value={title}
                        required
                        onChange={(e)=>setTitle(e.target.value)}
                    >
                    </input>
                    <label>ID</label>
                    <input 
                        type='text'
                        value={id}
                        required
                        onChange={(e)=>setId(e.target.value)}
                    >
                    </input>
        
                    <div id="HomeNewsInsert-Submit-Button">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    )

}

export default YoutubeVideoInsert;
