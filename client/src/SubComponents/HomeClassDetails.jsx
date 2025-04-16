import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../Styles/SubComponentsStyles/homeClassDetails.css'; // The external CSS file for styles

// Class Details Component
const ClassDetails = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // When the section comes into view

  return (
    <div ref={ref} className="class-details-container">
      {/* Class Description */}
      <motion.div
        className="section class-description"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="section-title">Class Description</h2>
        <p>
          Silambam is an ancient Tamil martial art form. It is practiced for self-defense, physical fitness, and discipline.
          It combines combat techniques, strategy, and a deep spiritual understanding.
        </p>
      </motion.div>
    
      {/* Venue 1, Venue 2, and Venue 3 */}
      <motion.div
        className="venue-container"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
    
        <div className="venue">
          <h2 className="venue-title">Venue 1 - Edayarpalayam</h2>
          <p>Weekdays Morning</p>
          <ul>
            <li>Batch 1 (5AM - 6AM) Coming Soon</li>
            <li>Batch 2 (6AM - 7AM)</li>
            <li>Batch 3 (7AM - 8AM)</li>
          </ul>
          <p>Weekdays Evening</p>
          <ul>
            <li>Batch 1 (5PM - 6PM)</li>
            <li>Batch 2 (6PM - 7PM)</li>
            <li>Batch 3 (7PM - 8PM) Coming Soon</li>
          </ul>
          <p>Sunday Morning</p>
          <ul>
            <li>8:30 AM - 10:00 AM</li>
          </ul>
          <p>Sunday Evening</p>
          <ul>
            <li>6:30 PM - 8:00 PM</li>
          </ul>
          <motion.a
                href="tel:+9159318285"
                className="contact-btn"
                whileTap={{ scale: 0.95 }}
             >
                Contact Now
            </motion.a>

        </div>

        <div className="venue">
          <h2 className="venue-title">Venue 2 - Kongunadu College</h2>
          <p>Batch 1 (New Students)</p>
          <ul>
            <li>Saturday: 5PM to 6PM</li>
            <li>Sunday: 7AM to 8AM</li>
            <li>Sunday: 4PM to 5PM</li>
          </ul>
          <p>Batch 2 (Seniors)</p>
          <ul>
            <li>Saturday: 6PM to 7PM</li>
            <li>Sunday: 6AM to 7AM</li>
            <li>Sunday: 5PM to 6PM</li>
          </ul>
          <motion.a
                href="tel:+9159318285"
                className="contact-btn"
                whileTap={{ scale: 0.95 }}
             >
                Contact Now
            </motion.a>
        </div>

        <div className="venue">
          <h2 className="venue-title">Venue 3 - MJ Vincent Matric School</h2>
          <p>Timings</p>
          <ul>
            <li>Saturday: 6AM to 7AM</li>
            <li>Sunday: 6AM to 8AM</li>
          </ul>
          <p>Location:</p>
          <p>Police Quarters Rd, Kondu Nagar, Peelamedu, Coimbatore, TN - 641004</p>
          <motion.a
                href="tel:+9159318285"
                className="contact-btn"
                whileTap={{ scale: 0.95 }}
             >
                Contact Now
            </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default ClassDetails;
