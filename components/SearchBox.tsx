"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Căutare:", searchTerm);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-full my-4"
    >
      <motion.input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Căuta..."
        className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-red-700 transition-colors"
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      <motion.button
        type="submit"
        className="absolute left-4 text-gray-400 hover:text-red-700 focus:outline-none"
        whileHover={{ scale: 1.2 }} 
        whileTap={{ scale: 0.9 }} 
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </motion.button>
    </form>
  );
};

export default SearchBox;
