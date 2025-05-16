/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/about.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('${url}/about');
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
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/about.css';
import { useLocation } from 'react-router-dom';
import Processing from '../../assets/Processing';

const Courses = () => {
  const courseRefs = React.useRef({});
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const location = useLocation();
  const [loading,setLoading]=useState(true);
  const url=import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${url}/about`);
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
      finally{
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(()=>{
    window.scrollTo(0,0);
  },
  [selectedCourse])

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseId = params.get('course');
    if (courseId && courses.length > 0) {
      const course = courses.find((c) => c._id === courseId);
      if (course) setSelectedCourse(course);
    }
  }, [location.search, courses]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const renderWithBold = (text) => {
    return text.split('\n').map((line, index) => {
      const parts = line.split(/(<b>.*?<\/b>)/g);
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

  if(loading){
    return <Processing/>
  }

  if (!courses.length) {
    return <div className="loading-message">No courses found...</div>;
  }

  if (selectedCourse) {
    return (
      <div className="course-expanded-view" onClick={() => setSelectedCourse(null)}>
        <div className="course-expanded-content" onClick={(e) => e.stopPropagation()}>
          <img src={selectedCourse.imageUrl} alt={selectedCourse.title} />
          <div>
            <h3>{selectedCourse.title}</h3>
            <div className="course-full-description">{renderWithBold(selectedCourse.description)}</div>
            <button
              onClick={() => {
                const courseId = selectedCourse?._id;
                setSelectedCourse(null);
                // Slight delay to ensure DOM is updated before scrolling
                setTimeout(() => {
                  courseRefs.current[courseId]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="close-btn"
            >
              குறைத்துக் காண்
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-container" >
      {courses.map((course, index) => {
        const isEven = index % 2 === 0;
        const layoutClass = isEven ? 'row-left' : 'row-right';
        const previewText = course.description.split('\n').slice(0, 5).join('\n');
        if (!courseRefs.current[course._id]) {
          courseRefs.current[course._id] = React.createRef();
        }

        return (
          <div key={course._id} className={`course-row ${layoutClass}`} ref={courseRefs.current[course._id]}>
            <div className="course-image-wrapper">
              <img src={course.imageUrl} alt={course.title} />
            </div>
            <div className="course-info">
              <h3 className="course-title">{course.title}</h3>
              <div className="course-description">
                {renderWithBold(previewText)}
                {course.description.split('\n').length > 5 && <span>...</span>}
              </div>
              <button onClick={() => handleCourseSelect(course)} className="course-button">
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
