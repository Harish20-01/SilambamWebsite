import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/SubComponentsStyles/imageGalleryStyle.css'
const ImageGallery = () => {
  const [Images, setImages] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/gallery/');
        setImages(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='gallery-container'>
        {Images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            className="gallery-thumbnail"
            onClick={() => openFullScreen(index)}
            alt={`thumbnail ${index}`}
          />
        ))}
      </div>

      {isFullScreen && currentImageIndex !== null && (
        <div className="fullscreen-modal">
          <button
            className="fullscreen-button fullscreen-close-button"
            onClick={closeFullScreen}
            title='Close the Window'
          >
            X
          </button>

          <button
            className="fullscreen-button fullscreen-prev-button"
            onClick={prevImage}
            title='left '
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
            title='right'
          >
            &#62;
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
