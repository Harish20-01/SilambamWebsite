import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/imageInsertStyle.css';
const ImageInsertComponent = () => {
    const navigate=useNavigate();

const [selectedImages, setSelectedImages] = useState([]);
const [isProcessing, setIsProcessing] = useState(false);
const{showSuccess,showError}=useToast();
const url=import.meta.env.VITE_SERVER_URL;

const handleFileChange = (e) => {
  setSelectedImages(e.target.files);
};

const handleImageUpload = async () => {
  if (selectedImages.length === 0) {
    alert('Please select at least one image');
    return;
  }

  setIsProcessing(true);
  window.scrollTo({top:0,behavior:"instant"})

  try {
    const formData = new FormData();

    Array.from(selectedImages).forEach((file) => {
      formData.append('images', file);
    });
    
    const response = await axios.post(`${url}/gallery/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`, 
      },
    }); 
    /* setUploadedImages(response.data); */
    showSuccess('Images uploaded successfully!');
    setIsProcessing(false);
    /* setUploadSuccess(true); */
  } catch (error) {
    console.error('Error uploading images:', error);
    showError('Error uploading images');
    setIsProcessing(false);
  } finally {
    setIsProcessing(false);
  }
};

  return (
    isProcessing?(<Processing content='Inserting Images into the Gallery...'/>):(
        <div id="ImageInsert-Container">
          <h2>Gallery Image Insert Section</h2>
          <h3>You Can Submit Multiple Images at a time</h3>
          <div>
              <input type="file" multiple onChange={handleFileChange} />
              <button onClick={handleImageUpload} disabled={isProcessing}>
                Upload Images
              </button>
          </div>
        </div>
    )
  )
}

export default ImageInsertComponent
