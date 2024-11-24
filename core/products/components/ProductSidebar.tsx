import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProductSidebarProps {
  images: { url: string }[] | null;
  name: string;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({ images, name }) => {
  const [stickyClass, setStickyClass] = useState<string>("top-0");

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

  return (
    <aside
      className={`hidden lg:flex flex-col sticky ${stickyClass} min-h-64 h-[30%] p-6 rounded-lg overflow-hidden`}
    >
      {images && images.length > 0 ? (
        <>
          <motion.img
            src={images[0]?.url || "https://via.placeholder.com/600"}
            alt={name}
            className="w-full h-64 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <div className="flex space-x-4 mt-4">
            {images.slice(1).map((image, index) => (
              <motion.img
                key={index}
                src={image.url || "https://via.placeholder.com/400"}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 rounded-lg cursor-pointer hover:opacity-80"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No images available</p>
      )}
    </aside>
  );
};

export default ProductSidebar;
