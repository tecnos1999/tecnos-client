import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchContainer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center p-2 "
    >
      <div className="w-3/4 md:w-1/2 flex items-center bg-white rounded-full border shadow-md ">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-4" />
        <input
          type="text"
          placeholder="Cauta aici..."
          className="flex-grow p-4 border-none rounded-full focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-gradient from-red-500 to-red-700 text-white px-6 py-2 rounded-full m-2 shadow-lg focus:outline-none"
        >
          Cauta
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchContainer;
