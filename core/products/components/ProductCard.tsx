"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";

interface ProductCardProps {
  product: ProductDTO;
  onClick: (sku: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <motion.div
      key={product.sku}
      className="
        relative 
        w-full 
        bg-gradient-to-br from-gray-50 to-white 
        rounded-lg 
        shadow-md 
        overflow-hidden 
        hover:shadow-xl 
        hover:-translate-y-2 
        transition-transform duration-300
      "
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-lg">
        <Image
          src={product.images?.[0] || "/fallback-image-url.jpg"}
          alt={product.name || "Product Image"}
          fill
          className="object-fit transition-transform duration-300"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p
          className="text-gray-600 text-sm mb-4 line-clamp-1"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></p>
        <motion.button
          onClick={() => onClick(product.sku)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className=" bg-red-gradient from-red-500 to-red-700 text-white py-2 px-6 w-full text-sm font-medium rounded-full transition-all duration-200 shadow-lg"
        >
          Vezi detalii
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
