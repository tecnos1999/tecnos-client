'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProductSidebarProps {
  images: string[] | null;
  name: string;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({ images, name }) => {
  const [stickyClass, setStickyClass] = useState<string>("top-0");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight / 3;

      if (scrollY > triggerPoint) {
        setStickyClass("top-48");
      } else {
        setStickyClass("top-0");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNext = () => {
    if (!images) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    if (!images) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images || images.length === 0) {
    return <p className="text-gray-500">No images available</p>;
  }

  return (
    <aside
      className={`hidden lg:flex flex-col sticky ${stickyClass} h-[30%] w-full p-4 min-h-[500px] bg-white rounded-lg`}
    >
      <div className="flex flex-col h-full">
        <div className="relative h-[70%]  w-full rounded-lg overflow-hidden shadow-md">
          <motion.img
            key={currentIndex}
            src={images[currentIndex] || "https://via.placeholder.com/600"}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
          >
            &#8594;
          </button>
        </div>

        <div className="flex justify-center items-center space-x-2 mt-4 h-[30%] overflow-hidden">
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image || "https://via.placeholder.com/100"}
              alt={`Thumbnail ${index + 1}`}
              className={`w-14 h-14 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                currentIndex === index
                  ? "border-2 border-red-600 scale-105"
                  : "border border-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;
