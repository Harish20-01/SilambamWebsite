import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/SubComponentsStyles/imageGalleryStyle.css';
import Processing from '../../assets/Processing';

const ImageGallery = () => {
  const [Images, setImages] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${url}/gallery/`);
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const openFullScreen = (index) => {
    setCurrentImageIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setCurrentImageIndex(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % Images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + Images.length) % Images.length);
  };

  // Touch Handlers for swipe support
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextImage(); // Swiped left
      } else {
        prevImage(); // Swiped right
      }
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (loading) {
    return <div><Processing content='Loading Images....' /></div>;
  }

  return (
    <div>
      <div id="heading-image">
        <h1>படங்கள்</h1>
      </div>

      <div className="gallery-container">
        {Images.map((image, index) => (
          <div
            key={index}
            className="gallery-thumbnail-wrapper"
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            {!loadedImages[index] && (
              <div className="skeleton" style={{ width: '100%', height: '100%' }}></div>
            )}
            <img
              src={image.imageUrl}
              className="gallery-thumbnail"
              onClick={() => openFullScreen(index)}
              onLoad={() => handleImageLoad(index)}
              style={{ display: loadedImages[index] ? 'block' : 'none' }}
              alt={`thumbnail ${index}`}
            />
          </div>
        ))}
      </div>

      {isFullScreen && currentImageIndex !== null && (
        <div
          className="fullscreen-modal"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="fullscreen-button fullscreen-close-button"
            onClick={closeFullScreen}
            title="Close the Window"
          >
            X
          </button>

          <button
            className="fullscreen-button fullscreen-prev-button"
            onClick={prevImage}
            title="left"
          >
            &#60;
          </button>

          {Images[currentImageIndex] && (
            <img
              src={Images[currentImageIndex].imageUrl}
              className="fullscreen-image"
              alt={`fullscreen ${currentImageIndex}`}
            />
          )}

          <button
            className="fullscreen-button fullscreen-next-button"
            onClick={nextImage}
            title="right"
          >
            &#62;
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
