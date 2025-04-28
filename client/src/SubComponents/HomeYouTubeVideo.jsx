import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/SubComponentsStyles/youtubeVideoStyle.css';
import axios from 'axios';

const HomeYouTubeVideo = () => {
  const[data,setData]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await axios.get('https://silambamwebsite.onrender.com/youtube-video');
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
    <motion.div
      id="YoutubeVideo-Container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
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
    </motion.div>
  );
};

export default HomeYouTubeVideo; 