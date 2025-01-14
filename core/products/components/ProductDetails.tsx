import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import { getEmbedLink } from "@/utils/utils";
import ModalProductOffer from "./ModalProductOffer";

interface ProductDetailsProps {
  product: ProductDTO;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className="p-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col bg-white overflow-hidden p-4 "
      >
        <div className="mb-4">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {product.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">SKU: {product.sku}</p>
        </div>

        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[30vh] py-2 md:py-4  bg-red-gradient from-red-500 to-red-700 text-white font-bold text-lg rounded-full self-center mt-6"
        >
          Cerere Ofertă
        </motion.button>

        {product.description ? (
          <div className="mt-4 space-y-4">
            {product.description.split("\n").map((text, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: text }}
              ></p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Descrierea nu este disponibilă.
          </p>
        )}
        <div className="flex flex-wrap gap-4 mt-6">
          {[
            {
              label: "Fișa Tehnică",
              url: product.tehnic,
              colors: "from-blue-500 to-blue-700",
            },
            {
              label: "Broschure",
              url: product.broschure,
              colors: "from-yellow-500 to-yellow-700",
            },
          ]
            .filter((action) => action.url)
            .map((action, idx) => (
              <motion.a
                key={idx}
                href={action.url!}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full shadow-lg text-white bg-gradient-to-r ${action.colors} focus:outline-none transition`}
              >
                {action.label}
              </motion.a>
            ))}
        </div>

        {product.linkVideo && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-8 md:hidden"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Prezentare Video
            </h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={getEmbedLink(product.linkVideo) || ""}
                title="Product Video"
                allowFullScreen
                className="w-full h-80 rounded-lg shadow-lg"
              ></iframe>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-1/2 py-2 md:py-4 md:w-full bg-red-gradient from-red-500 to-red-700 text-white font-bold text-lg rounded-full self-center mt-6"
        >
          Cerere Ofertă
        </motion.button>

        <ModalProductOffer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={product}
        />
      </motion.div>
    </main>
  );
};

export default ProductDetails;
