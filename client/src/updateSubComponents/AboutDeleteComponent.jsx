import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/aboutDeleteStyle.css';
const AboutDeleteComponent = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const[isProcessing,setIsPreocessing]=useState(false);
  const{showSuccess,showError}=useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://silambamwebsite.onrender.com");
        setImages(response.data); 
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
    try {
        const data={public_ids:selectedImages};
        const response=await axios.delete("https://silambamwebsite.onrender.com/about/",{
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
    isProcessing?(<LoadingComponent/>):(
      <div id="AboutDelete-Container">
        <h2>About Section</h2>
        <h3>Select Images to Delete</h3>
        <form>
          {images.map((image) => (
            <div key={image.public_id} htmlFor={image.public_id} className='AboutDelete-Element'>
              <input
                type="checkbox"
                id={image.public_id}
                value={image.public_id}
                onChange={() => handleCheckboxChange(image.public_id)}
              />
              <label htmlFor={image.public_id}>{image.title}</label>
            </div>
          ))}
        </form>

        <button onClick={handleDelete}>Delete Selected</button>
      </div>
      )
  );
};

export default AboutDeleteComponent;
