import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import '../Styles/SubComponentsStyles/homeClassDetails.css'; // The external CSS file for styles
import axios from 'axios';

// Class Details Component
const ClassDetails = () => {
  const[venue,setVenue]=useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
      const response=await axios.get('https://silambamwebsite.onrender.com/class-venue');
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
      <motion.div
        className="section class-description"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="section-title">பயிற்சி நடக்கும் இடங்கள்:</h2>
      </motion.div>
    
      {/* Venue 1, Venue 2, and Venue 3 */}
      <motion.div
        className="venue-container"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
      {venue.map((item, index) => (
      <div key={index} className="venue">
        <h2 className="venue-title"> இடம் {index + 1} - {item.place || 'Unnamed Venue'}</h2>
        <ul>
          <li><span>நாள்:</span>&nbsp;&nbsp;{item.place || 'N/A'},</li>
          <li><span>நேரம்:</span>&nbsp;&nbsp;{item.timing || 'N/A'},</li>
          <li><dl>
            <dt><span>விவரம்:</span>&nbsp;&nbsp;</dt>
            <dd>&nbsp;{item.description || 'முடிவடையவில்லை'}.</dd>
          </dl>
          </li> 
        </ul>
        <motion.a
          href="tel:+919159318285"
          className="contact-btn"
          whileTap={{ scale: 0.95 }}
        >
          அழைக்க
        </motion.a>
        </div>
        ))} 
          </motion.div>
    </div>
  );
};

export default ClassDetails;
