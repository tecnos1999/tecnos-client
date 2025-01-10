"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEmbedLink } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface ProductSidebarProps {
  images: string[] | null;
  name: string;
  videoLink?: string | null;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  images,
  name,
  videoLink,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <p className="text-gray-400 text-center italic">No images available</p>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <aside className="flex flex-col items-center w-full  p-4 space-y-6">
      <div
        className="relative w-full h-64 md:h-80  overflow-hidden cursor-pointer transition-transform hover:scale-105"
        onClick={() => setIsFullscreen(true)}
      >
        <motion.img
          src={images[currentIndex]}
          alt={name}
          className="w-full h-full object-contain"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex justify-center items-center  flex-wrap gap-2">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer border-2 transition-all m-0 ${
              index === currentIndex ? "border-red-500" : "border-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>

      {videoLink && (
        <div className="w-full hidden md:block ">
          <h3 className="text-lg font-bold text-gray-800 mb-4 ">
            Prezentare Video
          </h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={getEmbedLink(videoLink) || ""}
              title="Product Video"
              allowFullScreen
              className="w-full h-80 rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      )}

      <AnimatePresence>
      {isFullscreen && (
  <div className="absolute inset-0 bg-white flex items-center justify-center z-50">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-center w-full h-full p-4"
    >
      <motion.img
        src={images[currentIndex]}
        alt={name}
        className="max-w-full max-h-[80vh] md:max-w-4xl shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      />

      <div className="absolute top-4 right-4 flex gap-2 sm:top-6 sm:right-6">
        <button
          onClick={() => setIsFullscreen(false)}
          className="text-gray-400 hover:text-gray-600 transition-all"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>

      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex gap-4 sm:left-6">
        <button
          onClick={handlePrev}
          className="bg-white shadow-md text-black cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full p-2 sm:p-3"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
      </div>

      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-4 sm:right-6">
        <button
          onClick={handleNext}
          className="bg-white shadow-md text-black cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full p-2 sm:p-3"
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </div>

      <div className="absolute bottom-4 flex flex-wrap gap-2  px-4 sm:bottom-6">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
              index === currentIndex
                ? "border-red-500 opacity-100"
                : "border-gray-500 opacity-70"
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>
    </motion.div>
  </div>
)}

      </AnimatePresence>
    </aside>
  );
};

export default ProductSidebar;
