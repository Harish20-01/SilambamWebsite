import React, { useState } from 'react'
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/aboutInsertStyle.css';
const AboutInsertComponent = () => {
    const[title,setTitle]=useState('');
    const [staffName,setStaffName]=useState('');
    const[file,setFile]=useState();
    const[description,setDescription]=useState('');
    const{showError,showSuccess}=useToast();
    const[isProcessing,setIsPreocessing]=useState(false);
     async function handleSubmit(e){
        e.preventDefault();
        setIsPreocessing(true);
            const data=new FormData();
            data.append("title",title);
            data.append("staff",staffName);
            data.append("description",description);
            data.append("image",file);
            
        try{
            const response= await axios.post("https://silambamwebsite.onrender.com/about",data,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`, 
                },
            });
            
            if(response.status==200){
                console.log("submitted");
                setDescription('');
                setFile();
                setStaffName('');
                setTitle('');
                setIsPreocessing(false);
                showSuccess('Image inserted Successfully..');
            }
            else{
                showError('Something went wrong!....')
                setIsPreocessing(false);
            }
        }
        catch{
            showError('Error Occurs while processing,please try again later..')
            setIsPreocessing(false);
        }
    }
  
  return (
    isProcessing?(<LoadingComponent/>):(
        <div id="AboutInsert-Container">
            <h2>
                About Section
            </h2>
            <h3>
                Insert the data
            </h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                ></input>
                <label>Staff Name</label>
                <input
                    type="text"
                    required
                    value={staffName}
                    onChange={(e)=>setStaffName(e.target.value)}
                ></input>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
                <label>Upload Image</label>
                <input
                    type='file'
                    required
                    onChange={(e)=>setFile(e.target.files[0])}
                ></input>
                <div id="Aboutinsert-Submit-Button">
                    <button type='submit'>Submit</button>
                </div>
             </form>
        </div>
        )
  )
}

export default AboutInsertComponent
