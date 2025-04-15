import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/homeSlideImageInsertStyle.css'

const HomeSlideImageInsert = () => {
  
  const[file,setFile]=useState();
  const{showError,showSuccess}=useToast();
  const[isProcessing,setIsProcessing]=useState(false);
  async function handleSubmit(e){
    e.preventDefault();
    setIsProcessing(true);
    try{
      const data=new FormData()
      data.append("image",file);
      console.log(sessionStorage.getItem('authToken'));
      const response=await axios.post("https://silambamwebsite.onrender.com/homeSlide/upload",data,{
        headers:{
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearers ${sessionStorage.getItem('authToken')}`, 
        }
      });
      if(response.status==200){
        showSuccess("uploaded succesfully");
        setIsProcessing(false);
      }
      else{
        showError("something went wrong");
        setIsProcessing(false);
      }
    }
    catch(error){
      console.log(error);
      setIsProcessing(false);
    }
    finally{
      setIsProcessing(false);
    }
  }
  return (
    isProcessing?(<LoadingComponent/>):(
        <div id="HomeSlideImage-insert">
          <h3>Home SlideShow Image Adding Section</h3>
          <form onSubmit={handleSubmit}>
            <label>Submit the Photo</label>
            <input  
              type='file'
              onChange={(e)=>setFile(e.target.files[0])}
              ></input>
              <button type='submit'>Submit</button>
          </form>
        </div>
        )
  )
}

export default HomeSlideImageInsert
