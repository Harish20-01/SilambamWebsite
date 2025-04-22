import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/SubComponentsStyles/imageGalleryStyle.css';
import LoadingComponent from '../../public/LoadingComponent';

const ImageGallery = () => {
  const [Images, setImages] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://silambamwebsite.onrender.com/gallery/');
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

  if (loading) {
    return <div><LoadingComponent/></div>;
  }

  return (
    <div>
      <div id="heading-image">
        <img src={Images[Images.length - 1].imageUrl} alt="Heading" />
        <h1>Gallery</h1>
      </div>

      <div className='gallery-container'>
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
        <div className="fullscreen-modal">
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
