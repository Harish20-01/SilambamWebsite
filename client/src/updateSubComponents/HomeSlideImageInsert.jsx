import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/homeSlideImageInsertStyle.css'

const HomeSlideImageInsert = () => {
  
  const[file,setFile]=useState();
  const{showError,showSuccess}=useToast();
  const[isProcessing,setIsProcessing]=useState(false);
  const url=import.meta.env.VITE_SERVER_URL;
  async function handleSubmit(e){
    e.preventDefault();
    setIsProcessing(true);
    window.scrollTo({top:0,behavior:"instant"})
    try{
      const data=new FormData()
      data.append("image",file);
      console.log(sessionStorage.getItem('authToken'));
      const response=await axios.post(`${url}/homeSlide/upload`,data,{
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
    isProcessing?(<Processing content='Inserting HomeSlide Images'/>):(
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
