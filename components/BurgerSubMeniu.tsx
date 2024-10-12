"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface SubMenuItem {
  text: string;
  url: string;
  submenu?: SubMenuItem[];
}

interface BurgerSubMeniuProps {
  text: string;
  url: string;
  submenu?: SubMenuItem[];
  onClose: () => void;
}

const BurgerSubMeniu: React.FC<BurgerSubMeniuProps> = ({
  text,
  url,
  submenu,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <motion.div className="w-full mt-2">
      <motion.div
        className="flex w-full mt-2 p-2 text-gray-400  "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div
          onClick={toggleSubmenu}
          className="flex items-center w-full p-4 border-b border-gray-300 bg-white text-black hover:rounded-md hover:bg-red-700 hover:text-white transition-colors duration-300"
        >
          <p className="flex-1 text-left">{text}</p>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} size="sm" />

        </div>

      </motion.div>

      

      {isOpen && (
        <motion.ul
          variants={submenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.4 }}
          className="px-2 mt-2 bg-white rounded-lg shadow-md"
        >
          {submenu?.map((submenuItem, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="py-2"
            >
              {submenuItem.submenu ? (
                <BurgerSubMeniu
                  text={submenuItem.text}
                  url={submenuItem.url}
                  submenu={submenuItem.submenu}
                  onClose={onClose}
                />
              ) : (
                <Link
                  href={submenuItem.url}
                  onClick={onClose}
                  className="flex items-center w-full p-4 bg-white text-black rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-300"
                >
                  {submenuItem.text}
                </Link>
              )}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default BurgerSubMeniu;
