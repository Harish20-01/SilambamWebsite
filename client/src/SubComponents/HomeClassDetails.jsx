import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import '../Styles/SubComponentsStyles/homeClassDetails.css'; 
import axios from 'axios';

const ClassDetails = () => {
  const[venue,setVenue]=useState([]);
  const url=import.meta.env.VITE_SERVER_URL;
  useEffect(()=>{
    const fetchData=async()=>{
      try{
      const response=await axios.get(`${url}/class-venue`);
      if(response.status==200){
          setVenue(response.data);
          console.log(response.data);
      }
      else{
        console.log("error");
      }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[])
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // When the section comes into view

  return (
    <div ref={ref} className="class-details-container">
      {/* Class Description */}
      < div
        className="section class-description"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="section-title"><span>பயிற்சி&nbsp;</span><span>நடக்கும்&nbsp;</span><span> இடங்கள்:</span></h2>
      </ div>
    
      {/* Venue 1, Venue 2, and Venue 3 */}
      < div
        className="venue-container"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
      {venue.map((item, index) => (
      <div key={index} className="venue"  >{/*  #d5b${index}*/}
        <h2 className="venue-title"> இடம் {index + 1} -<span> {item.place || 'Unnamed Venue'}</span></h2>
        <ul>
          <li><span>நாள்:</span>&nbsp;&nbsp;{item.day || 'N/A'}</li>
          <li><span>நேரம்:</span>&nbsp;&nbsp;{item.timing || 'N/A'}</li>
          <li>
            <span>விவரம்:</span>&nbsp;&nbsp;{item.description || 'முடிவடையவில்லை'}
          </li> 
        </ul>
        < a
          href="tel:+919159318285"
          className="contact-btn"
          whileTap={{ scale: 0.95 }}
        >
          அழைக்க
        </ a>
        </div>
        ))} 
          </ div>
    </div>
  );
};

export default ClassDetails;
