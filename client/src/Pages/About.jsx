
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/about.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Processing from '../../assets/Processing';

const Courses = () => {
  const courseRefs = useRef({});
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${url}/about`);
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCourse]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseId = params.get('course');

    if (courseId && courses.length > 0) {
      const course = courses.find((c) => c._id === courseId);
      if (course) setSelectedCourse(course);
    } else {
      setSelectedCourse(null);
    }
  }, [location.search, courses]);

  const handleCourseSelect = (course) => {
    // Push new URL with course ID (adds to history)
    navigate(`?course=${course._id}`, { replace: false });
    setSelectedCourse(course);
  };

  const renderWithBold = (text) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      const parts = trimmedLine.split(/(<b>.*?<\/b>)/g);

      const isTitle = trimmedLine.startsWith('☯️') ||
        trimmedLine.startsWith('☀️') ||
        trimmedLine.startsWith('💥') ||
        trimmedLine.startsWith('🥁') ||
        trimmedLine.startsWith('🔆') ||
        trimmedLine.startsWith('🧘🏻‍♂️') ||
        trimmedLine.startsWith('🌳') ||
        trimmedLine.startsWith('🪵') ||
        trimmedLine.startsWith('🌺') ||
        trimmedLine.startsWith('🌼');

      const paragraphClass = isTitle ? 'no-indent' : 'indented';

      return (
        <p key={index} className={paragraphClass}>
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

  if (loading) {
    return <Processing />;
  }

  if (!courses.length) {
    return <div className="loading-message">No courses found...</div>;
  }

  if (selectedCourse) {
    return (
      <div className="course-expanded-view" onClick={() => navigate(-1)}>
        <div className="course-expanded-content" onClick={(e) => e.stopPropagation()}>
          <img src={selectedCourse.imageUrl} alt={selectedCourse.title}
            onLoad={(e) => e.target.classList.add('loaded')}
            loading='lazy'
          />
          <div>
            <h3>{selectedCourse.title}</h3>
            <div className="course-full-description">{renderWithBold(selectedCourse.description)}</div>
            <button
              onClick={() => {
                // Navigate back (removes ?course= from URL and resets view)
                navigate(-1);
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
    <div className="courses-container">
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
