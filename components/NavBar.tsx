import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CategoryService from "@/shared/category/service/CategoryService";
import { Category } from "@/shared/category/models/Category";
import { MainSection } from "@/shared/category/enum/MainSection";
import { MainSectionLabels } from "@/shared/category/enum/MainSectionLabels";
import { determinePath } from "@/utils/utils";

const Navbar: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<MainSection | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const handleSectionHover = (section: MainSection) => {
    if (hideTimeout) clearTimeout(hideTimeout);
    setHoveredSection(section);
  };

  const handleCategoryHover = (category: string) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredSection(null);
      setHoveredCategory(null);
    }, 200);
    setHideTimeout(timeout);
  };

  const handleSubCategoryClick = (category: string, subCategory: string) => {
    const queryParams = new URLSearchParams({
      category: encodeURIComponent(category),
      subCategory: encodeURIComponent(subCategory),
    });

    router.push(determinePath(`products?${queryParams.toString()}`));
  };

  const handleMainSectionClick = (section: MainSection) => {
    const routeMap: Record<MainSection, string> = {
      [MainSection.ACASA]: "/",
      [MainSection.PRODUSE]: "/",
      [MainSection.APLICATII_TEHNOLOGIE]: "aplicatii&tehnologie",
      [MainSection.PARTENERI]: "parteneri",
    };

    const route = routeMap[section];
    if (route) {
      router.push(determinePath(route));
    }
  };

  const handleItemCategoryClick = (
    category: string,
    subCategory: string,
    itemCategory: string
  ) => {
    const queryParams = new URLSearchParams({
      category: encodeURIComponent(category),
      subCategory: encodeURIComponent(subCategory),
      itemCategory: encodeURIComponent(itemCategory),
    });

    router.push(determinePath(`products?${queryParams.toString()}`));
  };

  return (
    <nav className="bg-white mx-auto hidden md:flex cursor-pointer">
      <div className="container px-4 h-16 flex justify-between items-center">
        <div className="flex items-center justify-center gap-4">
          {Object.values(MainSection).map((section) => {
            const hasCategories = categories.some(
              (cat) => cat.mainSection === section
            );

            return (
              <div
                key={section}
                onMouseEnter={() => handleSectionHover(section)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.button
                  className={`px-4 py-2 font-semibold flex text-[14px] lg:text-md items-center transition-colors duration-300 relative ${
                    hoveredSection === section
                      ? "text-red-700"
                      : "text-gray-500 hover:text-red-700"
                  }`}
                onClick={() => handleMainSectionClick(section)}

                
                >
                  {MainSectionLabels[section]}
                  {hoveredSection === section && hasCategories && (
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
                      width: hoveredSection === section ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <AnimatePresence>
                  {hoveredSection === section && hasCategories && (
                    <motion.div
                      className="absolute left-0 top-[100%] min-h-[60vh] pt-0 shadow-lg w-full flex z-10 bg-white border border-gray-200"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      onMouseLeave={handleMouseLeave}
                    >
                      <motion.div className="w-1/4 bg-gray-100 p-4 border-r border-gray-200">
                        {categories
                          .filter((cat) => cat.mainSection === section)
                          .map((category) => (
                            <div
                              key={category.name}
                              className="flex items-center justify-between text-gray-800 hover:text-red-700 hover:bg-gray-200 p-3 rounded transition-all"
                              onMouseEnter={() =>
                                handleCategoryHover(category.name)
                              }
                            >
                              <button
                                className="text-left w-full font-medium"
                              >
                                {category.name}
                              </button>
                              {category.subCategories?.length > 0 && (
                                <FontAwesomeIcon
                                  icon={faChevronRight}
                                  size="sm"
                                />
                              )}
                            </div>
                          ))}
                      </motion.div>

                      <div className="w-3/4 p-6 bg-white grid grid-cols-3 gap-8">
                        {hoveredCategory &&
                          categories
                            .find((cat) => cat.name === hoveredCategory)
                            ?.subCategories?.map((subCategory) => (
                              <div key={subCategory.name} className="space-y-2">
                                <h3 className="font-semibold text-gray-700 flex items-center">
                                  <span className="text-red-700 mr-2">▸</span>
                                  <button
                                    onClick={() =>
                                      handleSubCategoryClick(
                                        hoveredCategory,
                                        subCategory.name
                                      )
                                    }
                                    className="hover:underline text-left"
                                  >
                                    {subCategory.name}
                                  </button>
                                </h3>
                                <ul className="pl-6 space-y-1">
                                  {subCategory.itemCategories?.map((item) => (
                                    <li
                                      key={item.name}
                                      className="text-gray-600 hover:text-red-700 transition-colors"
                                    >
                                      <button
                                        onClick={() =>
                                          handleItemCategoryClick(
                                            hoveredCategory,
                                            subCategory.name,
                                            item.name
                                          )
                                        }
                                      >
                                        {item.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
