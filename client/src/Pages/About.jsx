import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/about.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://silambamwebsite.onrender.com/about');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);


  const renderWithBold = (text) => {
    return text.split('\n').map((line, index) => {
      const parts = line.split(/(<b>.*?<\/b>)/g); // Split on <b>...</b>
      return (
        <p key={index}>
          {parts.map((part, i) => {
            if (part.startsWith('<b>') && part.endsWith('</b>')) {
              return <strong key={i}>{part.slice(3, -4)}</strong>;
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    });
  };
  if (!courses.length) {
    return (
      <div className="loading-message">
        No courses found...
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div className="course-expanded-view" onClick={() => setSelectedCourse(null)}>
        <div className="course-expanded-content" onClick={(e) => e.stopPropagation()}>
          <img src={selectedCourse.imageUrl} alt={selectedCourse.title} />
          <div>
            <h3>{selectedCourse.title}</h3>
           <div className="course-full-description">
              {renderWithBold(selectedCourse.description)}
            </div>
            <button onClick={() => setSelectedCourse(null)} className="close-btn">குறைத்துக் காண்</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-container">
      {courses.map((course, index) => {
        const isEven = index % 2 === 0;
        const layoutClass = isEven ? 'row-left' : 'row-right';
        const previewText = course.description.split('\n').slice(0, 5).join('\n');

        return (
          <div key={course._id} className={`course-row ${layoutClass}`}>
            <div className="course-image-wrapper">
              <img src={course.imageUrl} alt={course.title} />
            </div>
            <div className="course-info">
              <h3 className="course-title">{course.title}</h3>
              <div className="course-description">
                {renderWithBold(previewText)}
                {course.description.split('\n').length > 5 && <span>...</span>}
              </div>
              <button onClick={() => setSelectedCourse(course)} className="course-button">
                 மேலும் படிக்க
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Courses;
