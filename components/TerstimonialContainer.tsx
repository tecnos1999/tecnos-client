'use client';

import React, { useState } from 'react';
import QuoteCard from './QuoteCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const testimonials = [
  {
    quote: "Sometimes I think the surest sign that intelligent life exists elsewhere...",
    author: "Pelican Steve",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample3.jpg",
  },
  {
    quote: "I don't need to compromise on my principles...",
    author: "Max Conversion",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample47.jpg",
  },
  {
    quote: "That's the problem with nature...",
    author: "Eleanor Faint",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample17.jpg",
  },
  {
    quote: "Sometimes I think the surest sign that intelligent life exists elsewhere...",
    author: "Pelican Steve",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample3.jpg",
  },
  {
    quote: "I don't need to compromise on my principles...",
    author: "Max Conversion",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample47.jpg",
  },
  {
    quote: "That's the problem with nature...",
    author: "Eleanor Faint",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample17.jpg",
  },
  {
    quote: "Sometimes I think the surest sign that intelligent life exists elsewhere...",
    author: "Pelican Steve",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample3.jpg",
  },
  {
    quote: "I don't need to compromise on my principles...",
    author: "Max Conversion",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample47.jpg",
  },
  {
    quote: "That's the problem with nature...",
    author: "Eleanor Faint",
    job: "LittleThemes",
    imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample17.jpg",
  },
];

const ITEMS_PER_PAGE = 3;

const TestimonialContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const currentTestimonials = testimonials.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden mx-auto max-w-screen-xl">
      <div className="text-center mb-10">
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-600 mb-2">
          Ce spun clienții noștri
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
          TESTIMONIALE
        </h2>
      </div>

      <motion.div
        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md text-black z-20 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full p-2 sm:p-3 ${
          currentPage === 0 ? 'hidden ' : ''
        }`}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-sm sm:text-xl" />
      </motion.div>

      <motion.div
        onClick={() =>
          setCurrentPage(
            currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1
          )
        }
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md text-black z-20 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full p-2 sm:p-3 ${
          currentPage === totalPages - 1 ? 'hidden ' : ''
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-sm sm:text-xl" />
      </motion.div>

      <AnimatePresence mode="wait">
        <div className="overflow-x-scroll md:overflow-hidden flex md:items-center md:justify-center gap-6">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${currentPage}-${index}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-shrink-0 w-[350px]"
            >
              <QuoteCard
                quote={testimonial.quote}
                author={testimonial.author}
                job={testimonial.job}
                imageSrc={testimonial.imageUrl}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                currentPage === index ? 'bg-red-700' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentPage(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialContainer;
