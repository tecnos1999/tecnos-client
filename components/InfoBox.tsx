import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const InfoBox: React.FC = () => {
  const [openItem, setOpenItem] = useState<'phone' | 'email' | null>(null);

  const toggleItem = (item: 'phone' | 'email') => {
    if (openItem === item) {
      setOpenItem(null);
    } else {
      setOpenItem(item); 
    }
  };

  const boxVariant = {
    hidden: { opacity: 0, x: -50, y: -20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-6">
      <div className="relative flex items-center">
        <div
          onClick={() => toggleItem('phone')}
          className="flex items-center gap-2 p-2 rounded-full text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #b91c1c, #f87171)', 
          }}
        >
          <FaPhoneAlt />
          {openItem === 'phone' && (
            <motion.span
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={boxVariant}
              className="flex items-center text-white rounded-md text-sm"
            >
              +40 123 456 789
            </motion.span>
          )}
        </div>
      </div>

      <div className="relative flex items-center">
        <div
          onClick={() => toggleItem('email')}
          className="flex items-center gap-2 cursor-pointer p-2 rounded-full text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #b91c1c, #f87171)',
          }}
        >
          <FaEnvelope />
          {openItem === 'email' && (
            <motion.span
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={boxVariant}
              className="flex items-center text-white rounded-md text-sm"
            >
              tecnos@yahoo.com
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
