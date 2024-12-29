"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import TagDTO from "@/shared/tags/dto/TagDTO";
import ProductService from "@/shared/products/service/ProductService";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";

interface ModalNewsDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: TagDTO[];
}

const ModalNewsDetails: React.FC<ModalNewsDetailsProps> = ({
  isOpen,
  onClose,
  title,
  shortDescription,
  longDescription,
  tags,
}) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const productService = new ProductService();

  useEffect(() => {
    if (isOpen && tags?.length > 0) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const tagNames = tags.map((tag) => tag.name);
          console.log("Fetching products for tags:", tagNames);

          const fetchedProducts = await productService.getProductsByTagsName(
            tagNames
          );
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching products by tags:", error);
          setProducts([]); // Setează o listă goală dacă există eroare
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [isOpen, tags]);

  const handleProductSelect = (sku: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(sku)
        ? prevSelected.filter((id) => id !== sku)
        : [...prevSelected, sku]
    );
  };

  const handleRequestOffer = () => {
    console.log("Selected products for offer:", selectedProducts);
    alert("Cerere de ofertă trimisă!");
    setSelectedProducts([]);
    onClose();
  };

  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.75 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.75 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fundal cu animație */}
      <motion.div
        className="absolute inset-0 bg-black"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      />
      {/* Conținutul modalului */}
      <motion.div
        className="relative bg-white w-[70%] h-[80vh] p-8 rounded-lg shadow-xl z-60 flex flex-col overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-4xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-3xl font-bold focus:outline-none hover:text-red-600"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <p className="text-lg text-gray-700 mb-4">{shortDescription}</p>
          <p className="text-lg text-gray-600 mb-6">{longDescription}</p>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Produse asociate:
          </h3>

          {loading ? (
            <p className="text-center text-lg text-gray-500">
              Se încarcă produsele...
            </p>
          ) : products.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <li
                  key={product.sku}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
                >
                  <img
                    src={
                      product.images?.[0] ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                  </div>
                  <button
                    onClick={() => handleProductSelect(product.sku)}
                    className={`absolute top-2 right-2 px-3 py-1 text-sm rounded-md shadow-md ${
                      selectedProducts.includes(product.sku)
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                  >
                    {selectedProducts.includes(product.sku)
                      ? "Deselectează"
                      : "Selectează"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-500">
              Nu există produse asociate cu aceste tag-uri.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-700 text-sm">
            {selectedProducts.length} produs(e) selectat(e)
          </p>
          <button
            onClick={handleRequestOffer}
            disabled={selectedProducts.length === 0}
            className={`text-white text-lg px-8 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 ${
              selectedProducts.length > 0
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Trimite cerere ofertă
          </button>
        </div>
      </motion.div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ModalNewsDetails;
