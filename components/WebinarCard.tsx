import React from 'react';
import { motion } from 'framer-motion';
import { StaticImageData } from 'next/image';

interface WebinarCardProps {
  date: string;
  title: string;
  duration: string;
  name: string;
  time: string;
  imageUrl: StaticImageData;
}

const WebinarCard: React.FC<WebinarCardProps> = ({
  date,
  title,
  duration,
  name,
  time,
  imageUrl,
}) => {
  return (
    <motion.div
      className="relative group max-w-sm bg-black rounded-lg overflow-hidden cursor-pointer m-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={imageUrl.src}
        alt={title}
        className="w-full h-64 object-cover transition-opacity duration-500 group-hover:opacity-50"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-50">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-sm mt-2">
          <span>{name}</span> | <span>{date}</span> | <span>{time}</span> | <span>{duration}</span>
        </div>
      </div>

      <div className="absolute top-2 right-2 h-10 w-10 border-t-2 border-r-2 border-white"></div>
    </motion.div>
  );
};

export default WebinarCard;
