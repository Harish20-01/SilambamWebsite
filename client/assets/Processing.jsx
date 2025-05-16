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
      }}>
      <div
        className="spinner"
        style={{
          border: '10px solid black',
          borderTop: '10px solid rgb(236, 15, 15)',
          borderRadius: '50%', // ✅ corrected from border-radius
          width: '80px',
          height: '80px',
          animation: 'spin 1s linear infinite',
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
