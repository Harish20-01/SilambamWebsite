import React from 'react';

const Processing = ({content=''}) => {
  return (
    <div style={{ 
      textAlign: 'center',
       marginTop: '20px',
       display:"flex",
       alignItems:"center",
       justifyContent:"center",
       height:"80vh",
       flexDirection:"column"
      }} className='div'>
      <div
        className="spinner"
        style={{
          border: '10px solid black',
          borderTop: '10px solid rgb(236, 15, 15)',
          borderRadius: '50%', // ✅ corrected from border-radius
          width: '80px',
          height: '80px',
          animation: 'spin 0.8s linear infinite',
          position:"relative",
          top:'-15%',
          margin: '0 auto 15px' // ✅ cleaner centering and spacing
        }}
      ></div>
      <div className="loading-text">{content==''?"Processing details...":content}</div>

       <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Processing;
