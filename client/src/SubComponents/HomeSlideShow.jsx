import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/SubComponentsStyles/homeSlideShow.css"; // Optional: Add custom styles

const HomeSlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); 

  const nextSlide = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
  };
  
  const prevSlide = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); 
  };
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/homeSlide/images");
        setImages(response.data); // Set the fetched images
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(nextSlide, 5000); 
      return () => clearInterval(interval);
    }
  }, [images]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (images.length === 0) {
    return <div>No images found</div>; 
  }
  const validIndex = currentIndex % images.length;

  return (
    <div className="slideshow-container">
      <div className="slide">
        <img
          src={images[currentIndex]?.url} // Safe access using optional chaining
          alt={`Slide ${validIndex + 1}`}
          className="slide-image"
        />
      </div>

      {/* Navigation buttons */}
      <button className="prev" onClick={prevSlide}>
        &#10094; {/* Left arrow */}
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095; {/* Right arrow */}
      </button>
    </div>
  );
};

export default HomeSlideShow;
