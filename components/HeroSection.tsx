'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import CarouselService from '@/core/carousel/service/CarouselService';

const HeroSection = () => {
  const [carouselItems, setCarouselItems] = useState<
    { fileUrl: string; type: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const carouselService = new CarouselService();
        const items = await carouselService.getAllCarouselItems();
        // Stocăm doar URL-ul și tipul fișierului.
        setCarouselItems(items.map((item) => ({ fileUrl: item.fileUrl, type: item.type })));
      } catch (error) {
        console.error('Failed to fetch carousel items:', error);
      }
    };

    fetchCarouselItems();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[710px] overflow-hidden">
      {carouselItems.length > 0 ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {carouselItems[currentIndex].type === 'video' ? (
            <video
              src={carouselItems[currentIndex].fileUrl}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={carouselItems[currentIndex].fileUrl}
              alt={`Carousel item ${currentIndex}`}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      ) : (
        <div className="flex items-center justify-center w-full h-full text-white bg-gray-800">
          Loading...
        </div>
      )}

      {carouselItems.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
};

export default HeroSection;
