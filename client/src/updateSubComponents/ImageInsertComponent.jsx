import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/imageInsertStyle.css';
const ImageInsertComponent = () => {
    const navigate=useNavigate();

const [selectedImages, setSelectedImages] = useState([]);
const [isProcessing, setIsProcessing] = useState(false);
const{showSuccess,showError}=useToast();
/* const [uploadSuccess, setUploadSuccess] = useState(false);
const [uploadedImages, setUploadedImages] = useState([]); */

const handleFileChange = (e) => {
  setSelectedImages(e.target.files);
};

const handleImageUpload = async () => {
  if (selectedImages.length === 0) {
    alert('Please select at least one image');
    return;
  }

  setIsProcessing(true);
  

  try {
    const formData = new FormData();

    Array.from(selectedImages).forEach((file) => {
      formData.append('images', file);
    });
    
    const response = await axios.post('http://localhost:3000/gallery/upload', formData, {
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
    isProcessing?(<LoadingComponent/>):(
        <div id="ImageInsert-Container">
          <h2>Gallery Image Insert Section</h2>
          <h3>Submit the Image </h3>
          <h3>You Can Submit Multiple Image at a time</h3>
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
