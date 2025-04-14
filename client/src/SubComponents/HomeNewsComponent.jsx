import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/SubComponentsStyles/homeNewsComponent.css'; 

const HomeNewsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/news');
        setNews(response.data); // Set the news data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false); // Handle error and stop loading
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
          <div className="news-ticker">
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
          </div>
    </div>
  );
};

export default HomeNewsComponent;
