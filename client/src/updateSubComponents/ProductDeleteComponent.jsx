import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/aboutDeleteStyle.css';
const ProductDeleteComponent = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const[isProcessing,setIsPreocessing]=useState(false);
  const{showSuccess,showError}=useToast();
  const url=import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${url}/silambam-products`);
        setImages(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

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
      showError('No Image Selected to Delete');
      return;
    }
    setIsPreocessing(true);
    window.scrollTo({top:0,behavior:"instant"})
    try {
        const data={public_ids:selectedImages};
        const response=await axios.delete(`${url}/silambam-products`,{
          headers:{
            "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`, 
          },
          data:{
            data
          }
        });
        if (response.status==200) {
          showSuccess('Images deleted successfully');
          setImages((prevImages) =>
            prevImages.filter((image) => !selectedImages.includes(image.public_id))
          );
          setIsPreocessing(false);
        } else {
          showError('Failed to delete images');
          setIsPreocessing(false);
        }
    } catch (error) {
      /* console.error('Error deleting images:', error); */
      showError('Error deleting images');
      setIsPreocessing(false);
    }
  };

  return (
    isProcessing?(<Processing content= 'Deleting Product'/>):(
      <div id="AboutDelete-Container">
        <h2>Product Section</h2>
        <h3>Select Name to Delete</h3>
        <form>
          {images.map((image) => (
            <div key={image.public_id} htmlFor={image.public_id} className='AboutDelete-Element' onClick={() => handleCheckboxChange(image.public_id)}>
              <input
                type="checkbox"
                id={image.public_id}
                value={image.public_id}
                onClick={() => handleCheckboxChange(image.public_id)}
                checked={selectedImages.includes(image.public_id)}
              />
              <label htmlFor={image.public_id}>{image.name}</label>
            </div>
          ))}
        </form>

        <button onClick={handleDelete}>Delete Selected</button>
      </div>
      )
  );
};

export default ProductDeleteComponent;
