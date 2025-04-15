
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/about.css';

const About = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://silambamwebsite.onrender.com/about");
        console.log(response.data); // Check if data is coming from the API
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;  // Show loading if data is still being fetched
  }

  return (
    <div id="About-Container">
      {data.map((item, index) => {
        return index % 2 === 0 ? (
          
          <div key={item.id} className="About-Element-Container" style={{backgroundColor:"rgb(165, 174, 174)"}} onClick={() => setSelectedItem(item)}>
            <div className='About-Description-Content'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <h2><span>Teaching STAFF:</span>{item.staff}</h2>
            </div>
            <div className='About-Image-Content'>
              <img src={item.imageUrl} alt={item.title} />
            </div>
          </div>
        ) : (
          
          <div key={item.id} className="About-Element-Container" style={{backgroundColor:"rgb(237, 220, 220)"}} onClick={() => setSelectedItem(item)}>
            <div className='About-Image-Content'>
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div className='About-Description-Content'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <h2><span>Teaching STAFF:</span>{item.staff}</h2>
            </div>
          </div>
        );
      })}

      {selectedItem && (
        <div className="fullscreen-overlay" onClick={() => setSelectedItem(null)}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img className="fullscreen-bg" src={selectedItem.imageUrl} alt={selectedItem.title} />
            <div className="fullscreen-details">
              <h3>{selectedItem.title}</h3>
              <p>{selectedItem.description}</p>
              <h2><span>Teaching STAFF: </span>{selectedItem.staff}</h2>
              <button className="close-btn" onClick={() => setSelectedItem(null)}>X</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default About;
