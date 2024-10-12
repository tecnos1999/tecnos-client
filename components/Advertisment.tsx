'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Advertisment = () => {
  const messages = [
    'Promotie la produsele noastre!',
    'Noua colectie este acum disponibila!',
    'Livrare gratuita la comenzi peste 200 RON!',
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="overflow-hidden h-12 flex items-center justify-center bg-red-gradient  shadow-md">
      <motion.div
        key={currentMessageIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-lg font-semibold text-white uppercase"
      >
        {messages[currentMessageIndex]}
      </motion.div>
    </div>
  );
};

export default Advertisment;
