import React from 'react'
import loadingImage from './LoadingGif.gif';
const LoadingComponent = () => {
  return (
   /*  <div>
      <div id="Loadingpage" style={{backgroundImage:{loadingImage},width:"100vw",height:"60vh",boxSizing:"border-box",margin:"",display:"flex",alignItems:"center",justifyContent:"center",objectFit:"contain cover",}}>
          {/* <img src={loadingImage} width="" height="100%"></img> 
          <h3>Processing..</h3>
      </div>
    </div> */
    <div>
  <div
    id="Loadingpage"
    style={{
      backgroundImage: `url(${loadingImage})`,
      backgroundColor:"rgb(0,0,0,0.8)",
      width: "100vw",
      height: "100vh",
      boxSizing: "border-box",
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      zIndex:"1000"
    }}
  >
    {/* <img src={loadingImage} alt="Loading" style={{ height: "100%" }} /> */}
    <h3
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
      }}
    >Processing..</h3>
  </div>
</div>

  )
}

export default LoadingComponent
