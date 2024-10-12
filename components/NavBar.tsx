import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const links = [
  { text: "Acasa", url: "/" },
  {
    text: "Produse",
    submenu: [
      { text: "Categorie", url: "/produse/categorie1" },
      { text: "Categorie2", url: "/produse/categorie2" },
      { text: "Categorie3", url: "/produse/categorie3" },
    ],
  },
  {
    text: "Aplicații și Tehnologie",
    submenu: [
      { text: "Ametek Brookfield", url: "/aplicatii/ametek" },
      {
        text: "BYK-Gardner",
        submenu: [
          {
            text: "Solutii QC pentru Automotive",
            url: "/byk-gardner/automotive",
          },
          { text: "Solutii pentru vopsea", url: "/byk-gardner/vopsea" },
        ],
      },
    ],
  },
  { text: "Parteneri", url: "/parteneri" },
];


const staggeredMenuVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};



const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: -10, 
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Navbar: React.FC = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredMenu(null);
      setHoveredSubmenu(null);
    }, 200);
    setHideTimeout(timeout);
  };

  const handleSubmenuHover = (submenu: string) => {
    setHoveredSubmenu(submenu);
  };

  return (
    <nav className="bg-white mx-auto hidden md:flex">
      <div className="container px-4 h-16 flex justify-between items-center">
        <div className="flex items-center justify-center gap-4"
       
        
        >
          {links.map((link, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(link.text)}
              onMouseLeave={handleMouseLeave}
            >
              <motion.button
                className={`px-4 py-2 font-semibold flex text-[14px] lg:text-md items-center transition-colors duration-300 relative ${
                  hoveredMenu === link.text
                    ? "text-red-700"
                    : "text-gray-500 hover:text-red-700"
                }`}
              >
                {link.text}
                {link.submenu && (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="sm"
                    className="ml-2"
                  />
                )}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-red-700"
                  initial={{ width: "0%" }}
                  animate={{
                    width: hoveredMenu === link.text ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <AnimatePresence>
                {hoveredMenu === link.text && link.submenu && (
                  <motion.div
                    className="absolute left-0 top-full pt-0 -mt-[95px]   shadow-md w-full flex z-10 h-96"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() =>
                      hideTimeout && clearTimeout(hideTimeout)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.div className="flex flex-col gap-4 bg-red-gradient  w-2/6  shadow-lg"
                    variants={staggeredMenuVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    
                    >
                      {link.submenu.map((submenuItem, subIndex) => (
                        <motion.div
                          key={subIndex}
                          className="flex items-center justify-between px-4 py-2 text-white hover:text-red-700 hover:bg-white transition-all font-medium"
                          whileHover={{ scale: 1.05 }}
                          onMouseEnter={() =>
                            handleSubmenuHover(submenuItem.text)
                          }
                          variants={menuItemVariants}
                        >
                          <button className="px-4 py-2 text-left ">
                            {submenuItem.text}
                          </button>

                          {submenuItem.submenu && (
                            <FontAwesomeIcon icon={faChevronRight} size="sm" />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>

                    <div className="w-full p-4 bg-white shadow-md">
                      {hoveredSubmenu &&
                        links
                          .find((linkItem) => linkItem.text === hoveredMenu)
                          ?.submenu?.find(
                            (submenuItem) => submenuItem.text === hoveredSubmenu
                          )?.submenu && (
                          <motion.div
                            className="flex flex-col gap-4 p-4"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            {links
                              .find((linkItem) => linkItem.text === hoveredMenu)
                              ?.submenu?.find(
                                (submenuItem) =>
                                  submenuItem.text === hoveredSubmenu
                              )
                              ?.submenu?.map((subsubmenuItem, subSubIndex) => (
                                <motion.div
                                  key={subSubIndex}
                                  className="relative group"
                                >
                                  <Link
                                    href={subsubmenuItem.url || "#"}
                                    className="text-gray-500 hover:text-red-700 px-4 py-2 transition-colors relative "
                                  >
                                    {subsubmenuItem.text}
                                  </Link>
                                  <motion.div className="absolute left-0 top-0 h-full bg-red-700 w-0 group-hover:w-1 transition-all rounded-lg duration-300 ease-in-out" />
                                </motion.div>
                              ))}
                          </motion.div>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
