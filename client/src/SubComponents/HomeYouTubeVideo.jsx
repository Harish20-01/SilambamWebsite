import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/SubComponentsStyles/youtubeVideoStyle.css';
import axios from 'axios';

const HomeYouTubeVideo = () => {
  const[data,setData]=useState([]);
  const url=import.meta.env.VITE_SERVER_URL;
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get(`${url}/youtube-video`);
        if(response.status==200){
            setData(response.data);
        
        }
        else{
          console.log("error");
        }
      }
      catch(err){
        console.log(err)
       }
    }
    fetchData();
  },[])
  return (
    <div
      id="YoutubeVideo-Container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <h1 style={{textAlign:"center",color:"red"}}>காணொளிகள்</h1>
     { data.map((item,index)=>(
          <iframe
          id={index}
          src={`https://www.youtube.com/embed/${item.id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
     ))
     }
    </div>
  );
};

export default HomeYouTubeVideo; 