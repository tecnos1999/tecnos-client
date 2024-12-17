'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const videoUrls = [
  "https://courses-platform.s3.us-east-005.backblazeb2.com/backgroundVideo.mp4",
  "https://courses-platform.s3.us-east-005.backblazeb2.com/backgroundVideo2.mp4"
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videoUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === videoUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[710px] overflow-hidden">
      <motion.video
        key={currentIndex}
        src={videoUrls[currentIndex]}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      />

      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-20 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-30 text-white px-3 py-1 rounded-full focus:outline-none shadow-lg hover:bg-opacity-60 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faAngleLeft} size="lg" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-30 text-white px-3 py-1 rounded-full focus:outline-none shadow-lg hover:bg-opacity-60 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon icon={faAngleRight} size="lg" />
      </button>
    </div>
  );
};

export default HeroSection;
