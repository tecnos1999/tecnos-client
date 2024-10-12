'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';

interface BannersCardProps {
  icon: IconDefinition;
  title: string;
  content: string;
}

const BannersCard: React.FC<BannersCardProps> = ({ icon, title, content }) => {
  return (
    <motion.div
      className="shadow-lg rounded-lg flex flex-col items-center justify-center w-1/4 min-w-[320px] "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="bg-red-gradient w-full flex flex-col items-center justify-center text-white p-6 rounded-t-lg">
        <FontAwesomeIcon icon={icon} size="3x" />
        <h3 className="text-xl font-bold text-center mt-2">{title}</h3>
      </div>
      <div className="bg-white text-center p-4">
        <p>{content}</p>
      </div>
    </motion.div>
  );
};

export default BannersCard;
