import React, { useState, useEffect, useSyncExternalStore } from 'react';
import axios from 'axios';
import LoadingComponent from '../../public/LoadingComponent';
import { useToast } from '../../public/MessageToastContent';
import '../Styles/updateSubComponentStyle/homeSlideImageDeleteStyle.css';

const HomeSlideImageDelete = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const[isProcessing,setIsProcessing]=useState(false);
  const{showError,showSuccess}=useToast();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get('http://localhost:3000/homeSlide/images');
        if (response.status === 200) {
          setImages(response.data);
          console.log(response);
        } else {
          alert('Error fetching images');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching images');
      }
    };
    fetchImage();
  }, []);

  const handleImageClick = (public_id) => {
    handleCheckboxChange(public_id); 
  };

  const handleCheckboxChange = (public_id) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(public_id)) {
        return prevSelected.filter((id) => id !== public_id); 
      } else {
        return [...prevSelected, public_id]; 
      }
    });
  };

  const handleDelete = async () => {
    if (selectedImages.length === 0) {
      showError('No images selected for deletion');
      return;
    }
    else if(images.length-selectedImages.length<=2){
      showError('Atleast two images Should be there ');
      return;
    }
    setIsProcessing(true);
    try {
      const data = { public_ids: selectedImages };
      console.log(data,sessionStorage.getItem('authToken'));
      const response = await axios.delete('http://localhost:3000/homeSlide', {
        headers:{
          "Authorization":`Bearer ${sessionStorage.getItem('authToken')}`, 
        },
        data
      },  );
      if (response.status === 200) {
        showSuccess('Images deleted successfully');
        setImages((prevImages) =>
          prevImages.filter((image) => !selectedImages.includes(image.public_id))
        );
        setSelectedImages([]); 
      } else {
        showError('Failed to delete images');
      }
    } catch (error) {
      showError('Error deleting images');
    }
    finally{
      setIsProcessing(false);
    }
  };

  return (
  
    <div>
      {isProcessing?(<LoadingComponent/>):
      (
        <>
      <h3 className='HomeSlideImageDelete-title'>Home Slide Image Delete Section</h3>
      <div className='HomeSlideImageDelete-Container'>
      <div id='HomeSlideImage-delete'>
        {images.map((image) => (
          <li key={image._id}>
            <input
              type="checkbox"
              value={image.public_id}
              checked={selectedImages.includes(image.public_id)}
              onChange={() => handleCheckboxChange(image.public_id)}
            />
            <img src={image.url}  alt="Home Slide"
               width="100%"
               height="100%"
               onClick={() => handleImageClick(image.public_id)} // Toggle selection when the image is clicked
               style={{
                 border: selectedImages.includes(image.public_id) ? '2px solid red' : 'none', // Highlight selected images
                 cursor: 'pointer',}}
            />
          </li>
        ))}
      </div>
      <div className="HomeSlideImageDelete-button">
          <button type="button"   onClick={handleDelete}>
            Delete Selected Images
          </button>
      </div>
      </div>
      </>
      )
    }
    </div>
  );
};

export default HomeSlideImageDelete;
