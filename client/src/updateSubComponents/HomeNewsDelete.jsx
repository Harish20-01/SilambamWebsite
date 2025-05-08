import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/homeNewsDeleteStyle.css';
const HomeNewsDelete = () => {
  const [data,setData]=useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const{showError,showSuccess}=useToast();
  const[isProcessing,setIsPreocessing]=useState(false);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
    const response=await axios.get('https://silambamwebsite.onrender.com/news');
    console.log(response.data);
    if(response.status==200){
      setData(response.data);
    }
    else{
      alert('error fetching data from db');
    }}
    catch(err){
        console.log(err);
    }}
    fetchData();
    console.log(data);

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
 
  const handleDelete = async () => {
    if (selectedImages.length === 0) {
      showError('No images selected for deletion');
      return;
    }
    if(data.length-selectedImages.length<1){
      showError('You Can not delete all the news');
      return;
    }
    setIsPreocessing(true);
    try {
      const dataa={public_ids:selectedImages};
      console.log(dataa);
      const response=await axios.delete("https://silambamwebsite.onrender.com/news",{
        headers:{
          "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`, 
        },
        data:{
          dataa
        }
      });
      if (response.status==200) {
        showSuccess('Images deleted successfully');
        setData((prevImages) =>
          prevImages.filter((image) => !selectedImages.includes(image.public_id))
        );
        setIsPreocessing(false);
      } else {
        showError('Failed to delete images');
        setIsPreocessing(false);
      }
    } catch (error) {
      console.log(error)
      showError(`Error deleting images:{error}`);
      setIsPreocessing(false);
    }
  };



  return (
    isProcessing?(<LoadingComponent/>):(
        <div id="HomeNewsDelete-Container">
          <h2>
            Home News Delete Section
          </h2>
          <h3>Select Title to Delete</h3>
          <form>
            {data.map((item) => (
              <div key={item._id} onClick={() => handleCheckboxChange(item.public_id)}>
                <input
                  type="checkbox"
                  id={item._id}
                  value={item.public_id}
                  checked={selectedImages.includes(item.public_id)}
                  onChange={() => handleCheckboxChange(item.public_id)}
                />
                <label htmlFor={item._id} >{item.title}</label>
              </div>
            ))}
          </form>

          <button onClick={handleDelete}>Delete News</button>
        </div>
        )
  );
  
}

export default HomeNewsDelete
