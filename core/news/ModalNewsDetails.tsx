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
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const productService = new ProductService();

  useEffect(() => {
    if (isOpen && tags?.length > 0) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const tagNames = tags.map((tag) => tag.name);
          const fetchedProducts = await productService.getProductsByTagsName(
            tagNames
          );
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching products by tags:", error);
          setProducts([]);
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

  const handleSelectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.sku));
    }
  };

  const handleRequestOffer = () => {
    alert("Cerere de ofertă trimisă!");
    setSelectedProducts([]);
    setFormData({
      fullName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    });
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!isOpen) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      <motion.div
        className="absolute inset-0 bg-black opacity-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      />
      <motion.div
        className="relative bg-white w-full max-w-4xl rounded-lg shadow-lg z-60 overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="sticky top-0 bg-white p-5 border-b shadow-md z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none text-base"
          >
            ×
          </button>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            {title}
          </h2>
        </div>

        <div className="overflow-y-auto px-5 py-4 max-h-[60vh]">
          <p
            className="text-md text-gray-700 mb-3"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          ></p>
          <p
            className="text-sm text-gray-600 mb-5"
            dangerouslySetInnerHTML={{ __html: longDescription }}
          ></p>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Produse asociate:
          </h3>
          {loading ? (
            <p className="text-center text-gray-500 text-sm">Se încarcă...</p>
          ) : products.length > 0 ? (
            <div>
              <button
                onClick={handleSelectAllProducts}
                className="mb-4 px-3 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
              >
                {selectedProducts.length === products.length
                  ? "Deselectează toate"
                  : "Selectează toate"}
              </button>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <li
                    key={product.sku}
                    className="p-3 border rounded-lg shadow-sm hover:shadow-md transition relative flex flex-col items-center"
                  >
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/150"
                      }
                      alt={product.name}
                      className="w-full h-36 object-cover rounded-md"
                    />
                    <div className="mt-3 text-center">
                      <h4 className="text-sm font-medium text-gray-800">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        SKU: {product.sku}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.sku)}
                      onChange={() => handleProductSelect(product.sku)}
                      className="absolute top-3 right-3 h-3.5 w-3.5 accent-red-500 cursor-pointer"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 text-md">Nu există produse asociate.</p>
          )}

          <form className="mt-5 grid grid-cols-1 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Nume complet"
              value={formData.fullName}
              onChange={handleInputChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
            <input
              type="text"
              name="company"
              placeholder="Companie"
              value={formData.company}
              onChange={handleInputChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Număr de telefon"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            />
            <textarea
              name="message"
              placeholder="Mesaj"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
            ></textarea>
          </form>
        </div>

        <div className="sticky bottom-0 bg-white p-4 border-t shadow-md flex justify-end z-10">
          <button
            type="button"
            onClick={handleRequestOffer}
            disabled={
              selectedProducts.length === 0 ||
              !formData.fullName ||
              !formData.email ||
              !formData.phone
            }
            className={`text-white px-5 py-2 rounded-md text-sm transition-all ${
              selectedProducts.length > 0 &&
              formData.fullName &&
              formData.email &&
              formData.phone
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Trimite cerere de ofertă
          </button>
        </div>
      </motion.div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ModalNewsDetails;
