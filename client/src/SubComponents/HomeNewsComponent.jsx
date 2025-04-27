import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegCalendarAlt } from 'react-icons/fa';
import '../Styles/SubComponentsStyles/homeNewsComponent.css'; 

const HomeNewsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://silambamwebsite.onrender.com/news');
        setNews(response.data); 
        console.log(response.data)
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false); 
      }
    };

    fetchNews(); // Fetch the news articles
  }, []);
  useEffect(()=>{
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); 
  },[news])

  // Move to the next slide (news item)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  // Move to the previous slide (news item)
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + news.length) % news.length
    );
  };

  // Show loading state if the news is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no news articles are found, show a fallback message
  if (news.length === 0) {
    return <div>No news available</div>;
  }

  return (
    <div className="slideshow-container" id="SlideShow-Container">
          <h3 className="blinking-title">செய்திகளும்,நிகழ்வுகளும்</h3>
         {!loading&& (<><div className="news-ticker">
              <div className="news-ticker-content">
                {news.map((item, index) => (
                  <span key={index} className="news-item">
                    {item.title} &nbsp;&nbsp;|&nbsp;&nbsp;
                  </span>
                ))}
              </div>
            </div>

      {/* Display the current slide (news item) */}
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
          </>)}
    </div>
  );
};

export default HomeNewsComponent;
