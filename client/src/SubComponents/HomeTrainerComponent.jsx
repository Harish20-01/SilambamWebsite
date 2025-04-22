import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import image from '../../Logo/logo.png';
import '../Styles/SubComponentsStyles/trainerProfile.css';

const TrainerProfile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [showMore, setShowMore] = useState(false);

  const containerStyle = {
    width: showMore ? '96%' : '',
    maxWidth: '900px',
    transition: 'width 0.4s ease-in-out',
  };

  return (
    <motion.div
      ref={ref}
      className="trainer-profile"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={containerStyle}
    >
      <h2>பயிற்றுநர் விவரம்</h2>

      <motion.div
        className={`trainer-details ${showMore ? 'expanded' : ''}`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        <motion.img
          src={image}
          alt="Trainer"
          className={`trainer-image ${showMore ? 'expanded-image' : ''}`}
          whileHover={{ scale: 1.1, rotate: 10 ,border:"5px solid red"}}
          transition={{ type: 'spring', stiffness: 300 }}
        />

        <div className={`trainer-info ${showMore ? 'expanded-text' : ''}`}>
          <motion.p whileHover={{ x: 5 }}>
            <strong>பெயர்:</strong> திரு. அ. வெங்கடேசன், B.Sc Agri., PGDAMM., DIS., DVMS., DYHE., YIC., DIP., M.ACU., MD(ACU)., NSNIS.,
          </motion.p>

          {!showMore && (
            <>
              <motion.p whileHover={{ x: 5 }}>
                <strong>நிறுவனர், பயிற்றுநர்:&nbsp;</strong>தமிழர் மரபுக் கலையகம்
              </motion.p>
              <motion.p whileHover={{ x: 5 }}>
                <strong>நோக்கம்: </strong>தமிழரின் மரபுக் கலைகளை அனைத்துத் தரப்பு மக்களிடமும் எளிய முறையில் கொண்டு சேர்ப்பதே எமது நோக்கம்.
              </motion.p>
            </>
          )}

          {showMore && (
            <>
              <motion.p whileHover={{ x: 5 }}>
                திரு. அ. வெங்கடேசன் அவர்கள் சேலம் மாவட்டம், தலைவாசல் வட்டம், சதாசிவபுரம் கிராமத்தை சேர்ந்தவர். 15க்கும் மேற்பட்ட ஆசான்களிடம் இருந்து சிலம்பம், மல்லர்க்கம்பம், மல்யுத்தம், கரலாக்கட்டை, வளரி, ஊதுகொல்லி, வர்மம் போன்ற தற்காப்புக் கலைகளையும்; யோகக்கலையும்; பறையாட்டம், கோலாட்டம், ஒயிலாட்டம், மரக்கால் ஆட்டம், கரகாட்டம் போன்ற கிராமியக்கலைகளையும்; வர்மம், அக்குபஞ்சர் போன்ற மருத்துவக் கலைகளையும் கற்றும், கற்பித்தும் வருகிறார்.
              </motion.p>

              <motion.p whileHover={{ x: 5 }}>
                கலைத்துறையில் 9 ஆண்டுகள் அனுபவம் கொண்ட இவர், 2020ஆம் ஆண்டு முதல் தனது சொந்த ஊரான சதாசிவபுரத்தில் “கலைநிலம்” என்ற பயிற்சிக்களம் அமைத்து, “தமிழர் மரபுக் கலையகம்” என்ற மரபுப் பள்ளியைத் துவங்கி, மரபுக் கலைகளை பலருக்கும் பயிற்சியளித்து வருகிறார்.
              </motion.p>

              <motion.p whileHover={{ x: 5 }}>
                மேலும், சுற்றியுள்ள ஆத்தூர், கெங்கவல்லி, கடம்பூர், மணிவிழுந்தான், சம்பேரி உள்ளிட்ட பல கிராமங்களில் கிளைப்பள்ளிகள் அமைத்து மாணவர்களுக்கு பயிற்சியளித்து வருகிறார்.
              </motion.p>

              <motion.p whileHover={{ x: 5 }}>
                தமிழ்நாடு சிலம்பாட்டக் கழகத்தில் மாநில நடுவராகவும், முதலமைச்சர் கோப்பை சிலம்பப் போட்டிகளில் மாவட்ட நடுவராகவும், பாரம்பரிய பட்டை மல்யுத்த போட்டியில் மாநில நடுவராகவும் பணியாற்றியுள்ளார். மேலும், பல அரசுப் பள்ளிகளில் மாணவிகளுக்கு பகுதி நேர தற்காப்புப் பயிற்றுநராக பணியாற்றியுள்ளார்.
              </motion.p>

              <motion.p whileHover={{ x: 5 }}>
                அரசு நிகழ்ச்சிகள் உட்பட நூற்றுக்கும் மேற்பட்ட மேடைகளில் சிலம்பம், மல்லர்க்கம்பம் போன்ற கலைநிகழ்ச்சிகள் நிகழ்த்தியுள்ளார்.
              </motion.p>

              <motion.p whileHover={{ x: 5 }}>
                இவரிடம் பயின்ற மாணவர்கள் பலர் அரசு நடத்திய போட்டிகளில் வென்று, மேற்படிப்பில் விளையாட்டுத்துறை இட ஒதுக்கீட்டுச் சலுகையும் பெற்றுள்ளனர்.
              </motion.p>

              <motion.p whileHover={{ x: 5 }}>
                தற்போது இவர் நேரடியாகவும், இவரால் பயிற்றுவிக்கப்பட்ட ஆசிரியர்கள் மூலமாகவும் 10க்கும் மேற்பட்ட தனியார் கல்வி நிறுவனங்களில் சிலம்பம், மல்லர்க்கம்பம் முதலிய கலைகள் பயிற்சி அளித்து வருகிறார்.
              </motion.p>
            </>
          )}
        </div>
      </motion.div>

      <motion.button
        onClick={() => setShowMore(!showMore)}
        className="read-more-btn"
        whileTap={{ scale: 0.95 }}
      >
        {showMore ? 'குறைத்துக் காண்' : 'மேலும் படிக்க'}
      </motion.button>
    </motion.div>
  );
};

export default TrainerProfile;
