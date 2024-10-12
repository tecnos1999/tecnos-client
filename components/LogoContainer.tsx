'use client';

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "https://via.placeholder.com/150x50.png?text=Logo+1",
  "https://via.placeholder.com/150x50.png?text=Logo+2",
  "https://via.placeholder.com/150x50.png?text=Logo+3",
  "https://via.placeholder.com/150x50.png?text=Logo+4",
  "https://via.placeholder.com/150x50.png?text=Logo+5",
  "https://via.placeholder.com/150x50.png?text=Logo+6",
];

const LogoContainer: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden mx-auto max-w-screen-xl">
      <div className="text-center mb-10">
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-600 mb-2">
          Partenerii noștri
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
          Colaboratori
        </h2>
      </div>

      <motion.div
        className="flex gap-6"
        animate={{ x: ['0%', '-100%'] }} 
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }} 
      >
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <img src={logo} alt={`Logo ${index + 1}`} className="w-[250px] h-[150px]" />
          </div>
        ))}
 
        {logos.map((logo, index) => (
          <div key={index + logos.length} className="flex-shrink-0">
            <img src={logo} alt={`Logo ${index + 1}`} className="w-[250px] h-[150px]" />
          </div>
        ))}

      </motion.div>
    </div>
  );
};

export default LogoContainer;
