import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../Styles/SubComponentsStyles/homeAboutComponent.css';
import logo from '../../Logo/logo.png'

const data = [
  {
    title: 'தற்காப்புக்கலை:',
    items: ['சிலம்பம்', 'மல்லர்க்கம்பம்', 'மல்யுத்தம்', 'கரலாக்கட்டை', 'வளரி', 'ஊதுகொல்லி', 'வர்மம்'],
  },
  {
    title: 'யோகக்கலை:',
    items: ['மனவளக்கலை யோகா'],
  },
  {
    title: 'கிராமியக்கலை:',
    items: ['பறையாட்டம்', 'கோலாட்டம்', 'ஒயிலாட்டம்', 'மரக்கால் ஆட்டம்', 'கரகாட்டம்'],
  },
  {
    title: 'மருத்துவக்கலை:',
    items: ['வர்மம்', 'அக்குபஞ்சர்'],
  },
];

const HomeAboutComponent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      id="container"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6}}
      className="about-container"
    >
      <div className="heading-group">
        <h3> தமிழர் மரபுக் கலையகம் </h3>
        <p className="subheading">மரபு மீட்சி மற்றும் கலைப் பயிற்சிக்கான ஒருங்கிணைந்த இடம்</p>
      </div>

      <dl className="about-list">
        {data.map((section, index) => (
          <motion.div
            key={index}
            className="section"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut',delay: 0.4 * index }}
          >
            <dt className="title">{section.title}</dt>
            <dd className="items">
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx}>🌿 {item}</li>
                ))}
              </ul>
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );
};

export default HomeAboutComponent;
