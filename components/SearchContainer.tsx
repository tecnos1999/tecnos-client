import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import ProductService from "@/shared/products/service/ProductService";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import { determinePath } from "@/utils/utils";

const SearchContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allProducts, setAllProducts] = useState<ProductDTO[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const productService = new ProductService();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products: ProductDTO[] = await productService.getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = allProducts.filter(
        (product) =>
          product.sku.toLowerCase().includes(lowerCaseSearch) ||
          product.name.toLowerCase().includes(lowerCaseSearch) ||
          product.description?.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);

  const handleRedirect = (sku: string) => {
    setSearchTerm("");
    router.push(determinePath(`product?sku=${sku}`));
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredProducts([]);
  };

  return (
    <div className="w-full flex flex-col items-center relative cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-center p-2"
      >
        <div className="w-3/4 md:w-1/2 flex items-center bg-white rounded-full border shadow-md relative">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 ml-4" />
          <input
            type="text"
            placeholder="Cauta aici..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-4 border-none rounded-full focus:outline-none"
          />
          {searchTerm && (
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-400 cursor-pointer mr-4"
              onClick={handleReset}
            />
          )}
        </div>
      </motion.div>

      {loading ? (
        <div className="mt-4 text-gray-500">Se încarcă...</div>
      ) : filteredProducts.length > 0 ? (
        <ul className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg w-3/4 md:w-1/2 max-h-60 overflow-y-auto z-50">
          {filteredProducts.map((product) => (
            <li
              key={product.sku}
              className="p-4 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRedirect(product.sku)}
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
              </div>
              <img
                src={product.images?.[0] || "https://via.placeholder.com/50"}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md"
              />
            </li>
          ))}
        </ul>
      ) : searchTerm && !loading ? (
        <div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg w-3/4 md:w-1/2 max-h-60 overflow-y-auto z-50 p-4">
          Nu s-au găsit rezultate.
        </div>
      ) : null}
    </div>
  );
};

export default SearchContainer;
