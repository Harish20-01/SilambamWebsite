import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/silambamProduct.css';
import { motion, useInView } from 'framer-motion';

const Silambam = () => {
  const [data, setData] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const toggleDescription = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://silambamwebsite.onrender.com/silambam-products');
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data)
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div id="product-heading">
        <h1>பொருட்கள்</h1>
      </div>
      <div className="product-grid">
        {data.map(item => (
          <div 
            className="product-card" 
            key={item._id}
          >
            <img 
              src={item.imageUrl} 
              alt="Product" 
              className={`product-img ${expandedCards[item.id] ? 'imageExtension' : ''}`} 
            />
            <div className="product-info">
              <h2 className="product-price">₹{item.price}</h2>
              <h3>{item.name}</h3>
              <p className={`product-desc ${expandedCards[item._id] ? 'expanded' : ''}`}>
                {item.description}
              </p>
              <button 
                className="toggle-btn" 
                onClick={() => toggleDescription(item._id)}
              >
                {expandedCards[item._id] ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Silambam;
