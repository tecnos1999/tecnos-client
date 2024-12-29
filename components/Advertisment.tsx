'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MottoService from '@/core/motto/service/MottoService';

const Advertisment = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const fetchMottos = async () => {
      try {
        const mottoService = new MottoService();
        const mottos = await mottoService.getAllMottos();
        setMessages(mottos.map((motto) => motto.content));
      } catch (error) {
        console.error('Failed to fetch mottos:', error);
      }
    };

    fetchMottos();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) =>
          prevIndex === messages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [messages]);

  return (
    <div className="overflow-hidden h-12 flex items-center justify-center bg-red-gradient shadow-md">
      {messages.length > 0 ? (
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
      ) : (
        <div className="text-lg font-semibold text-white uppercase">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Advertisment;
