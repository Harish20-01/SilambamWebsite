import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegCalendarAlt } from 'react-icons/fa';
import '../Styles/SubComponentsStyles/homeNewsComponent.css'; 

const HomeNewsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const url=import.meta.env.VITE_SERVER_URL;
  const [isPaused, setIsPaused] = useState(false); // NEW STATE

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${url}/news`);
        setNews(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false); 
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [news, isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  if (loading) return <div>Loading...</div>;
  if (news.length === 0) return <div>No news available</div>;

  return (
    <div 
      className="slideshow-container" 
      id="SlideShow-Container" 
      onClick={togglePause} // TOGGLE ON CLICK
      title={isPaused ? "Click to resume" : "Click to pause"} // OPTIONAL
      style={{ cursor: 'pointer' }} // OPTIONAL: make it feel clickable
    >
          {isPaused && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            zIndex: 10
          }}>
            Paused
          </div>
        )}
      <h3 className="blinking-title">செய்திகளும்,நிகழ்வுகளும்</h3>
      {!loading && (
        <>
          <div className="news-ticker">
            <div className="news-ticker-content">
              {news.map((item, index) => (
                <span key={index} className="news-item">
                  {item.title} &nbsp;&nbsp;|&nbsp;&nbsp;
                </span>
              ))}
            </div>
          </div>

          <div className="slide">
            <h2>{news[currentIndex].title}</h2>
            <p>{news[currentIndex].description}</p>

            {news[currentIndex].imageUrl && (
              <img src={news[currentIndex].imageUrl} alt="News" className="slide-image" />
            )}
            <p className="published-date">
              <FaRegCalendarAlt style={{ marginRight: '8px' }} className='published-date-icon'/>
              Last Updated: {new Date(news[currentIndex].publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeNewsComponent;
