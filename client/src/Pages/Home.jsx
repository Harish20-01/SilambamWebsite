import React from 'react'
import vite from '../vite.svg';
import HomeSlideShow from '../SubComponents/HomeSlideShow';
import HomeAboutComponent from '../SubComponents/HomeAboutComponent';
import HomeNewsComponent from '../SubComponents/HomeNewsComponent';
const Home = () => {
  return (
    <div style={{backgroundColor:"#f9f9f4"}} > 
      <HomeSlideShow/>
      <HomeAboutComponent/>
      <HomeNewsComponent/>
    </div>
  )
}

export default Home
