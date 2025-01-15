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
  link?: string;
}

const ModalNewsDetails: React.FC<ModalNewsDetailsProps> = ({
  isOpen,
  onClose,
  title,
  shortDescription,
  longDescription,
  tags,
  link,
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
    judet: "",
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
      judet: "",
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
        className="relative bg-white w-full max-w-7xl rounded-lg shadow-lg z-60 overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="sticky top-0 bg-white p-6 border-b shadow-md z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none text-base"
          >
            ×
          </button>
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        </div>

        <div className="flex flex-col md:flex-row overflow-hidden">
          {/* Coloana Stângă */}
          <div
            className={`flex-1 p-6 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${
              products.length === 0 ? "w-full" : "w-2/3"
            }`}
          >
            <p
              className="text-lg text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: shortDescription }}
            ></p>
            <p
              className="text-md text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: longDescription }}
            ></p>

            {products.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Produse asociate:
                </h3>
                <button
                  onClick={handleSelectAllProducts}
                  className="mb-6 px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                >
                  {selectedProducts.length === products.length
                    ? "Deselectează toate"
                    : "Selectează toate"}
                </button>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <li
                      key={product.sku}
                      className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition flex flex-col items-center"
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/150"
                        }
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-md"
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
                        className="mt-2 accent-red-500 cursor-pointer"
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {products.length > 0 && (
            <div className="w-full md:w-1/3 p-6 bg-gray-50 border-l">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Trimite cerere de oferta
              </h3>
              <form className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nume complet"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Companie"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Numar de telefon"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                  required
                />
                <input
                  type="text"
                  name="judet"
                  placeholder="Judet"
                  value={formData.judet}
                  onChange={handleInputChange}
                  className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Mesaj"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                ></textarea>
              </form>
              <div className="mt-6 flex justify-between">
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white px-5 py-2 rounded-md text-sm transition-all bg-blue-500 hover:bg-blue-600"
                  >
                    Vezi mai multe
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleRequestOffer}
                  disabled={
                    selectedProducts.length === 0 ||
                    !formData.fullName ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.judet
                  }
                  className={`text-white px-5 py-2 rounded-md text-sm transition-all ${
                    selectedProducts.length > 0 &&
                    formData.fullName &&
                    formData.email &&
                    formData.phone &&
                    formData.judet
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Trimite cerere de oferta
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer pentru butonul link, dacă nu sunt produse */}
        {products.length === 0 && link && (
          <div className="p-4 flex justify-center border-t bg-gray-50">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-5 py-2 rounded-md text-sm transition-all bg-blue-500 hover:bg-blue-600"
            >
              Vezi mai multe
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ModalNewsDetails;
