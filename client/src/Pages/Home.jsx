import React from 'react'
import vite from '../vite.svg';
import HomeSlideShow from '../SubComponents/HomeSlideShow';
import HomeAboutComponent from '../SubComponents/HomeAboutComponent';
import HomeNewsComponent from '../SubComponents/HomeNewsComponent';
import TrainerProfile from '../SubComponents/HomeTrainerComponent';
import HomeClassDetails from '../SubComponents/HomeClassDetails';
import HomeYouTubeVideo from '../SubComponents/HomeYouTubeVideo';
import HomeReviewComponent from '../SubComponents/HomeReviewComponent';
const Home = () => {
   

  return (
    <div style={{overflowX:"hidden"}}> 
      <HomeSlideShow/>
      <HomeAboutComponent/>
      <HomeNewsComponent/>
      <TrainerProfile/>
      <HomeClassDetails/>
      <HomeYouTubeVideo/>
      <HomeReviewComponent/>
    </div>
  )
}

export default Home
