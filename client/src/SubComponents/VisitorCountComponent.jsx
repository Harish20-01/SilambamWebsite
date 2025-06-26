import React from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaTimes } from 'react-icons/fa';
const VisitorCountComponent = ({count}) => {
  
  const [displayCount, setDisplayCount] = useState(0);
  const [close, setClose] = useState(false);
  const [cur,setCur]=useState(true);
  let visitCount;

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end = count;
      const duration = 6000;
      const increment = Math.ceil(end / (duration / 5));
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayCount(end);
          clearInterval(counter);
        } else {
          setDisplayCount(start);
        }
      }, 30);

      return () => clearInterval(counter);
    }, 4000);

    return () => clearTimeout(timer);
  }, [count]);
  return (
    <>
      {!close && <div className='visitCount'
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: "10px",
          left: "10px",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          color: "red",
          padding: "5px",
          fontWeight: "bold",
          zIndex: "10",
          backgroundColor: "rgba(0,0,0,0.5)",
          fontFamily: "monospace",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{display:"flex",alignItems:"center"}}>
          <Typewriter
            words={["Visitor's Count"]}
            cursor={cur}
            cursorStyle='_'
            typeSpeed={100}
            delaySpeed={200}
            loop={1} 
            onLoopDone={()=>setCur(false)}
          />
          <span
            onClick={() => setClose(true)}
            title="close"
            style={{
              cursor: "pointer",
              color: "white",
              marginLeft:"5px",
              borderRadius:"50%",
            }}
          ><FaTimes style={{marginTop:"2px",verticalAlign:"center"}}/></span>
        </div>
        <div
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginTop: "4px",
            fontFamily: "monospace",
            fontSize: "0.8rem"
          }}
        >
          <BsEye />
          <span>{displayCount}</span>
        </div>
      </div>

      }

    </>


  )
}

export default VisitorCountComponent
