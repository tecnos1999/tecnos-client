"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";

interface ModalProductOfferProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDTO;
}

const ModalProductOffer: React.FC<ModalProductOfferProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRequestOffer = () => {
    alert("Cerere de ofertă trimisă!");
    setFormData({
      fullName: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    });
    onClose();
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
        className="relative bg-white w-full max-w-3xl rounded-lg shadow-lg z-60 overflow-hidden"
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
            Cerere de ofertă pentru {product.name}
          </h2>
        </div>

        <div className="overflow-y-auto px-5 py-4 max-h-[60vh]">
          <div className="flex flex-col items-center mb-6">
            <img
              src={product.images?.[0] || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-md shadow-lg"
            />
            <p className="text-gray-700 mt-4">
              SKU: <span className="font-semibold">{product.sku}</span>
            </p>
          </div>

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
            disabled={!formData.fullName || !formData.email || !formData.phone}
            className={`text-white px-5 py-2 rounded-md text-sm transition-all ${
              formData.fullName && formData.email && formData.phone
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

export default ModalProductOffer;
