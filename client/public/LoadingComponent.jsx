import React from 'react';
import '../src/Styles/loadingComponentStyle.css';

const LoadingComponent = () => {
  return (
    <div className="loader-fullscreen">
      <div className="loader-container">
        <div className="loader-wrapper md">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="stick">
              <div className="stick-line"></div>
            </div>
          ))}
        </div>
        <p className="loader-text md">Loading...</p>
      </div>
    </div>
  );
};
 

export default LoadingComponent;
