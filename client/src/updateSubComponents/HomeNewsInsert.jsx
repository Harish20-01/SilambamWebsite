import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/homeNewsInsertStyle.css';

const HomeNewsInsert = () => {
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const[image,setImage]=useState();
    const{showError,showSuccess}=useToast();
    const url=import.meta.env.VITE_SERVER_URL;
    const[isProcessing,setIsPreocessing]=useState(false);
   async  function handleSubmit(e){
        e.preventDefault();
        const data=new FormData();
        if(title==''||description==''||image==''){
            showError('Fill all the field');
            return;
        }
        setIsPreocessing(true);
        data.append('title',title);
        data.append('description',description);
        data.append('image',image);
        try{
            const response=await axios.post(`${url}/news`,data,{
                headers:{
                    'Content-type':'mutlipart/form-data',
                    "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`, 
                }
            });
            if(response.status==200){
                showSuccess('successfully uploaded');
                setTitle('');
                setDescription('');
                setImage();
                setIsPreocessing(false);
            }
            else{
                showError('upload fail',response.status);
                setIsPreocessing(false);
            }
        }
        catch(err){
            console.log(err);
            showError(err);
            setIsPreocessing(false);
        }
    }
    return(
        isProcessing?(<Processing content='Inserting News'/>):(
            <div id="HomeNewsInsert-Container">
                <h3>Update New News Here</h3>
                <form>
                    <label>Title</label>
                    <input 
                        type='text'
                        value={title}
                        required
                        onChange={(e)=>setTitle(e.target.value)}
                    >
                    </input>
                    <label>Description</label>
                    <textarea
                        type='text'
                        value={description}
                        required
                        onChange={(e)=>setDescription(e.target.value)}
                    >
                    </textarea>
                    <label>Image</label>
                    <input 
                        type='file'
                        required
                        onChange={(e)=>setImage(e.target.files[0])}
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

export default HomeNewsInsert
