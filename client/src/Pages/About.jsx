import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/about.css';

const LoadingComponent = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
  </div>
);

const About = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://silambamwebsite.onrender.com/about");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (id, e) => {
    e.stopPropagation();
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleContainerClick = (item) => {
    setSelectedItem(item);
  };

  if (loading) return <LoadingComponent />;

  if (data.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-700">
        No Images Found...
      </div>
    );
  }

  return (
    <div className="about-about-container">
      {data.map((item, index) => {
        const isExpanded = expandedItems.has(item.id);
        const layoutClass = isExpanded ? 'stacked' : 'side-by-side';
        const descriptionLines = item.description.split('\n');
        const previewText = descriptionLines.slice(0, 5).join('\n');
        const remainingText = descriptionLines.slice(5).join('\n');
        const renderDescription = isExpanded ? item.description : previewText;

        const contentElement = (
          <>
            <h3 className="about-title">{item.title}</h3>
            <div className={`about-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
              {renderDescription.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
              {!isExpanded && remainingText && <span>...</span>}
            </div>
            {remainingText && (
              <button
                onClick={(e) => toggleExpand(item.id, e)}
                className="about-button"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
            <h2 className="about-staff">
              <span className="staff-label">Teaching STAFF: </span>{item.staff}
            </h2>
          </>
        );

        return (
          <div
            key={item.id}
            className={`about-element ${layoutClass}`}
            style={{
              backgroundColor: index % 2 === 0 ? "rgb(165, 174, 174)" : "rgb(237, 220, 220)"
            }}
            onClick={() => handleContainerClick(item)}
          >
            {layoutClass === 'side-by-side' ? (
              index % 2 === 0 ? (
                <>
                  <div className="about-content" onClick={(e) => e.stopPropagation()}>
                    {contentElement}
                  </div>
                  <div className="about-image">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                </>
              ) : (
                <>
                  <div className="about-image">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <div className="about-content" onClick={(e) => e.stopPropagation()}>
                    {contentElement}
                  </div>
                </>
              )
            ) : (
              <>
                <div className="about-image">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
                <div className="about-content" onClick={(e) => e.stopPropagation()}>
                  {contentElement}
                </div>
              </>
            )}
          </div>
        );
      })}

      {selectedItem && (
        <div className="fullscreen-overlay" onClick={() => setSelectedItem(null)}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img className="fullscreen-bg" src={selectedItem.imageUrl} alt={selectedItem.title} />
            <div className="fullscreen-details">
              <h3>{selectedItem.title}</h3>
              <div className="fullscreen-description">
                {selectedItem.description.split('\n').map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
              <h2><span className="staff-label">Teaching STAFF: </span>{selectedItem.staff}</h2>
              <button className="close-btn" onClick={() => setSelectedItem(null)}>X</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;