import React from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
const VisitorCountComponent = () => {
  
  const [displayCount, setDisplayCount] = useState(0);
  const [close, setClose] = useState(false);
  const [cur,setCur]=useState(true);
  let visitCount;

  useEffect(() => {
      const timer = setTimeout(() => {
      let start = 0;
       visitCount = parseInt(sessionStorage.getItem("visitCount")) || 0;
      const end = visitCount;
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
      return ()=>clearInterval(counter);
    }, 4000)


    return () => clearInterval(timer);
  }, [visitCount]);
  return (
    <>
      {!close && <div className='visitCount'
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: "10px",
          right: "10px",
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
        <div>
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
              color: "black",
              marginLeft:"5px",
              backgroundColor:"white",
              padding:"1px 2px",
              borderRadius:"50%",
              lineHeight:"8px"
            }}
          >X</span>
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
