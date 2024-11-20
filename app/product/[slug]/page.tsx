'use client';
import React from 'react';
import { motion } from 'framer-motion';

const product = {
  title: 'Produs Inovator',
  sku: 'SKU987654',
  description:
    'Acest produs reprezintă o combinație perfectă între funcționalitate și design modern. Construit pentru a oferi performanțe deosebite, este ideal pentru cei mai exigenți utilizatori.',
  images: [
    'https://via.placeholder.com/600',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/400',
  ],
  technicalSheet: '#',
  catalog: '#',
  documentation: '#',
  video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
};

const ProductPage = () => {
  return (
    <div className="mt-[104px] md:mt-[188px] px-6 lg:px-20  min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-6 lg:p-12">
      <div className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gray-100 p-6 flex flex-col items-center justify-center"
          >
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex space-x-4 mt-4">
              {product.images.slice(1).map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 flex flex-col justify-between space-y-8"
          >
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 mb-6">SKU: {product.sku}</p>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href={product.technicalSheet}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg focus:outline-none transition-all"
              >
                Fișa Tehnică
              </motion.a>
              <motion.a
                href={product.catalog}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-lg focus:outline-none transition-all"
              >
                Catalog
              </motion.a>
              <motion.a
                href={product.documentation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-lg shadow-lg focus:outline-none transition-all"
              >
                Documentație
              </motion.a>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-red-700 text-white text-lg font-semibold rounded-lg shadow-lg focus:outline-none"
            >
              Cerere Ofertă
            </motion.button>
          </motion.div>
        </div>
      </div>

      {product.video && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12 max-w-screen-xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Prezentare Video</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={product.video}
              title="Product Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-96 rounded-lg shadow-lg"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductPage;
