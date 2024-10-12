import React from "react";
import { motion } from "framer-motion";

interface QuoteCardProps {
  quote: string;
  imageSrc: string;
  author: string;
  job: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, imageSrc, author, job }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg w-80 h-96 bg-white flex flex-col justify-between m-4"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <blockquote className="relative p-6 text-sm italic font-medium text-gray-700 flex-1 flex items-center justify-center">
        <p className="mb-2 px-6 text-center ">{quote}</p>
        <span className="absolute text-6xl text-gray-200 top-0 left-3">&#10077;</span>
        <span className="absolute text-6xl text-gray-200 bottom-0 right-3">&#10078;</span>
      </blockquote>
   
      <motion.img
        src={imageSrc}
        alt={author}
        className="w-full h-48 object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="bg-white px-4 py-2 text-center">
        <h5 className="text-lg font-semibold text-gray-800">{author}</h5>
        <span className="text-sm text-gray-500">{job}</span>
      </div>
    </motion.div>
  );
};

export default QuoteCard;
