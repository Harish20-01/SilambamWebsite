import Header from "./Header";
import { Routes,Route } from "react-router-dom";
import Home from'./Pages/Home';
import About from './Pages/About';
import Silambam from './Pages/Silambam';
import Image from './Pages/image';
import Video from './Pages/Video';
import Contact from './Pages/Contact';
import Footer from './Footer';
import Login from './Pages/Login';
import UpdateComponent from './SubComponents/UpdateComponent';
import './App.css';
import { useState,useEffect } from "react";
import HomeUpdateComponent from "./updateComponents/HomeUpdateComponent";
import ImageUpdateComponent from "./updateComponents/ImageUpdateComponent";
import AboutUpdateComponent from "./updateComponents/AboutUpdateComponent";
import AboutInsertComponent from "./updateSubComponents/AboutInsertComponent";
import AboutDeleteComponent from "./updateSubComponents/AboutDeleteComponent";
import HomeSlideimageUpdateComponent from "./updateComponents/HomeSlideimageUpdateComponent";
import HomeSlideImageInsert from "./updateSubComponents/HomeSlideImageInsert";
import HomeSlideImageDelete from "./updateSubComponents/HomeSlideImageDelete";
import HomeNewsUpdateComponent from "./updateComponents/HomeNewsUpdateComponent";
import HomeNewsInsert from "./updateSubComponents/HomeNewsInsert";
import HomeNewsDelete from "./updateSubComponents/HomeNewsDelete";
import ImageInsertComponent from "./updateSubComponents/ImageInsertComponent";
import ImageDeleteComponent from "./updateSubComponents/ImageDeleteComponent";
import UnAuthorisedRoute from "../assets/UnAuthorisedRoute";
import PasswordUpdate from "./SubComponents/PasswordUpdate";
import ClassVenueUpdateComponent from "./updateComponents/ClassVenueUpdateComponent";
import ClassVenueInsert from "./updateSubComponents/ClassVenueInsert";
import ClassVenueDelete from "./updateSubComponents/ClassVenueDeleteComponent";
import ProductUpdateComponent from './updateComponents/ProductUpdateComponent';
import ProductInsertComponent from "./updateSubComponents/ProductInsertComponent";
import ProductDeleteComponent from "./updateSubComponents/ProductDeleteComponent";
import LoadingComponent from "../assets/LoadingComponent";
import YoutubeUpdateComponent from "./updateComponents/YoutubeUpdateComponent";
import YoutubeVideoInsert from "./updateSubComponents/YoutubeVideoInsert";
import YoutubeVideoDelete from "./updateSubComponents/YoutubeVideoDelete";
import AboutDataUpdateComponent from "./updateSubComponents/AboutDataUpdateComponent";
import ReviewDeleteComponent from "./updateComponents/ReviewDeleteComponent";
import ClassVenueDataUpdate from "./updateSubComponents/ClassVenueDataUpdate";
import ProductDataUpdateComponent from "./updateSubComponents/ProductDataUpdateComponent";
import ScrollToTop from "./ScrollFunctionality";

function App() {
  const[isLoggedIn,setIsLoggedIn]=useState(sessionStorage.getItem('isLoggedIn')==='true');
  const[isLoading,setIsLoading]=useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingComponent/>;
  }
  return (
    <>
      <ScrollToTop/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/silambam" element={<Silambam />} />
        <Route path="/gallery" element={<Image />} />
        <Route path="/gallery/image" element={<Image />} />
        <Route path="/gallery/video" element={<Video />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route 
          path="/update" 
          /* element={<UpdateComponent />} */
          element={isLoggedIn ? <UpdateComponent /> : <><div>please log in </div><Login setIsLoggedIn={setIsLoggedIn} /> </>} 
        />
              {/* Routes for Admin Panel */}
              
              <Route path="/homeUpdateComponent" element={isLoggedIn?<HomeUpdateComponent/> :<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
              <Route path="/homeUpdateComponent/homeSlideComponent" element={isLoggedIn?(<HomeSlideimageUpdateComponent/>):<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}>
                  <Route index element={isLoggedIn?<HomeSlideImageInsert/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="homeSlideImageInsert" element={isLoggedIn?<HomeSlideImageInsert/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="homeSlideImageDelete" element={isLoggedIn?<HomeSlideImageDelete/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
              </Route>
              <Route path="/homeUpdateComponent/homeNewsUpdateComponent" element={isLoggedIn?<HomeNewsUpdateComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>} >
                  <Route index element={isLoggedIn?<HomeNewsInsert/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="homeNewsInsert" element={isLoggedIn?<HomeNewsInsert/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="homeNewsDelete" element={isLoggedIn?<HomeNewsDelete/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
              </Route>
              <Route path="/homeUpdateComponent/classVenueUpdateComponent" element={isLoggedIn?<ClassVenueUpdateComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>} >
                  <Route index element={isLoggedIn?<ClassVenueInsert/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="classVenueInsert" element={isLoggedIn?<ClassVenueInsert/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="classVenueDelete" element={isLoggedIn?<ClassVenueDelete/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="classVenueUpdate" element={isLoggedIn?<ClassVenueDataUpdate/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
              </Route>
              <Route path="/homeUpdateComponent/youtubeUpdateComponent" element={isLoggedIn?<YoutubeUpdateComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>} >
                  <Route index element={isLoggedIn?<YoutubeVideoInsert/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="youtubeVideoInsert" element={isLoggedIn?<YoutubeVideoInsert/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="youtubeVideoDelete" element={isLoggedIn?<YoutubeVideoDelete/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                  
              </Route>
              <Route path="/homeUpdateComponent/reviewDeleteComponent" element={isLoggedIn?<ReviewDeleteComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>} ></Route>
              <Route path="/aboutUpdateComponent" element={isLoggedIn?<AboutUpdateComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>} >
                  <Route index  element={isLoggedIn?<AboutInsertComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                   <Route path="insertAboutImage" element={isLoggedIn?<AboutInsertComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                   <Route path="deleteAboutImage" element={isLoggedIn?<AboutDeleteComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                   <Route path="updateAboutImage" element={isLoggedIn?<AboutDataUpdateComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
              </Route>
              <Route path="/productUpdateComponent" element={isLoggedIn?<ProductUpdateComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>} >
                  <Route index  element={isLoggedIn?<ProductInsertComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                   <Route path="productInsert" element={isLoggedIn?<ProductInsertComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                   <Route path="productDelete" element={isLoggedIn?<ProductDeleteComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                   <Route path="productUpdate" element={isLoggedIn?<ProductDataUpdateComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
              </Route>
              <Route path="/imageUpdateComponent" element={isLoggedIn?<ImageUpdateComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>} >
                    <Route index element={isLoggedIn?<ImageInsertComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="imageInsertComponent" element={isLoggedIn?<ImageInsertComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
                    <Route path="imageDeleteComponent" element={isLoggedIn?<ImageDeleteComponent/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
              </Route>
              <Route path="/updateComponenet" element={isLoggedIn?<UpdateComponent />:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>} />
              <Route path="/passwordUpdateComponent" element={isLoggedIn?<PasswordUpdate/>:<UnAuthorisedRoute setIsLoggedIn={setIsLoggedIn}/>}/>
      </Routes>
      <Footer/>
    </>
    
  );
}

export default App
