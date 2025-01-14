"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
  faTimes,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import CategoryService from "@/shared/category/service/CategoryService";
import { Category } from "@/shared/category/models/Category";
import { MainSection } from "@/shared/category/enum/MainSection";
import { MainSectionLabels } from "@/shared/category/enum/MainSectionLabels";
import { determinePath } from "@/utils/utils";

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryService = new CategoryService();
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenuAndRedirect = (
    path: string,
    queryParams: Record<string, string> = {}
  ) => {
    const queryString = new URLSearchParams(queryParams).toString();
    router.push(determinePath(`${path}?${queryString}`));
    setIsOpen(false);
  };

  const toggleExpandedCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMainSectionClick = (section: MainSection) => {
    const routeMap: Record<MainSection, string> = {
      [MainSection.ACASA]: "/",
      [MainSection.PRODUSE]: "/",
      [MainSection.APLICATII_TEHNOLOGIE]: "/",
      [MainSection.PARTENERI]: "/partners",
    };

    const route = routeMap[section];
    if (route) {
      closeMenuAndRedirect(route);
    }
  };

  const isCategoryExpanded = (category: string) =>
    expandedCategories.has(category);

  return (
    <>
      {/* Toggle Button */}
      <div className="flex justify-end md:hidden p-4 cursor-pointer">
        <motion.div
          className="bg-red-700 grid place-content-center rounded-lg p-2 shadow-lg"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faBars} className="text-white w-5 h-5" />
        </motion.div>
      </div>

      {/* Burger Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col p-4 overflow-y-auto shadow-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <header className="flex justify-between items-center mb-4 border-b pb-2">
              <Image
                src={logo}
                alt="Logo"
                width={240}
                height={60}
                unoptimized
              />
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </header>

            <div className="relative w-full mb-6">
              <input
                type="text"
                placeholder="Caută..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-700 placeholder-gray-500 text-gray-700"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <div className="space-y-6">
              {Object.values(MainSection).map((section) => {
                const sectionCategories = filteredCategories.filter(
                  (cat) => cat.mainSection === section
                );

                return (
                  <div key={section} className="space-y-3">
                    <button
                      className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center  "
                      onClick={() => handleMainSectionClick(section)}
                    >
                      {MainSectionLabels[section]}
                      {sectionCategories.length > 0 && (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          size="sm"
                          className="ml-2 text-gray-500"
                        />
                      )}
                    </button>

                    {/* Categories */}
                    {sectionCategories.length > 0 && (
                      <motion.ul
                        className="pl-6 mt-2 space-y-3 bg-gray-50 border-l-4 border-gray-200 rounded-lg"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {sectionCategories.map((category) => (
                          <li key={category.name}>
                            {/* Category */}
                            <button
                              className="text-gray-700 hover:text-red-700 flex justify-between w-full px-2 py-2 rounded-lg hover:bg-gray-100"
                              onClick={() =>
                                toggleExpandedCategory(category.name)
                              }
                            >
                              {category.name}
                              <FontAwesomeIcon
                                icon={
                                  isCategoryExpanded(category.name)
                                    ? faChevronDown
                                    : faChevronRight
                                }
                                size="sm"
                                className="ml-2 text-gray-400 transition-transform duration-300"
                              />
                            </button>

                            {/* Subcategories */}
                            {isCategoryExpanded(category.name) && (
                              <ul className="pl-4 mt-2 space-y-1">
                                {category.subCategories?.map((subCategory) => (
                                  <li key={subCategory.name}>
                                    <button
                                      className="text-gray-500 hover:text-red-700 transition-colors w-full text-left"
                                      onClick={() =>
                                        closeMenuAndRedirect("products", {
                                          category: category.name,
                                          subCategory: subCategory.name,
                                        })
                                      }
                                    >
                                      {subCategory.name}
                                    </button>

                                    {/* Item Categories */}
                                    {subCategory.itemCategories?.length > 0 && (
                                      <ul className="pl-4 mt-2 space-y-1">
                                        {subCategory.itemCategories.map(
                                          (item) => (
                                            <li key={item.name}>
                                              <button
                                                className="text-gray-400 hover:text-red-700 transition-colors"
                                                onClick={() =>
                                                  closeMenuAndRedirect(
                                                    "products",
                                                    {
                                                      category: category.name,
                                                      subCategory:
                                                        subCategory.name,
                                                      itemCategory: item.name,
                                                    }
                                                  )
                                                }
                                              >
                                                {item.name}
                                              </button>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;
