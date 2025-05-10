import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/imageDeleteStyle.css';
const ImageDeleteComponent = () => {
    const[images,setImages]=useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const[isProcessing,setIsProcessing]=useState(false);
    const{showSuccess,showError}=useToast();
    const url=import.meta.env.VITE_SERVER_URL;

  useEffect(()=>{
    const fetchImage=async()=>{
      try{
      const response=await axios.get(`${url}/gallery`);
      setImages(response.data);
      }
      catch(err){
        showError(err);
      }
    }
    fetchImage();
  },[])
  const handleCheckboxChange = (public_id) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(public_id)) {
        return prevSelected.filter((id) => id !== public_id); 
      } else {
        return [...prevSelected, public_id]; 
      }
    });
  };

  const handleImageClick = (public_id) => {
    handleCheckboxChange(public_id); 
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
      const data = { public_ids: selectedImages};
      console.log(data);
      const response = await axios.delete(`${url}/gallery`, {
        headers:{
          "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`
        }, 
           data :{
              data
           },
      });
      if (response.status === 200) {
        showSuccess('Images deleted successfully');
        setImages((prevImages) =>
          prevImages.filter((image) => !selectedImages.includes(image.public_id))
        );
        setSelectedImages([]); 
        setIsProcessing(false);
      } else {
        showError('Failed to delete images');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error deleting images:', error);
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
      <div id="ImageDelete-Container">
        <h2>Gallery Image Delete Section</h2>
        <h3>Select Images to delete</h3>
        <div >
          {images.map((image,index) => (
            <li key={image._id}>
              <input
                type="checkbox"
                value={image.public_id}
                checked={selectedImages.includes(image.public_id)}
                onChange={() => handleCheckboxChange(image.public_id)}
              />
            <img
                  src={image.imageUrl}
                  width="100px"
                  height="100px"
                  alt="Home Slide"
                  onClick={() => handleImageClick(image.public_id)} // Toggle selection when the image is clicked
                  style={{
                    border: selectedImages.includes(image.public_id) ? '2px solid red' : 'none', // Highlight selected images
                    cursor: 'pointer',
                  }}>
                  </img>
            </li>
          ))}
        </div>
          <div className='ImageDelete-Submit-Button'>
            <button type="button" onClick={handleDelete}>
              Delete Selected Images
            </button>
          </div>
        </div>)
      }
    </div>
  );
};



export default ImageDeleteComponent
