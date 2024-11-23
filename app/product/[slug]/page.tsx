'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const product = {
  title: 'Produs Inovator',
  sku: 'SKU987654',
  description: [
    "SmartPulse este o masina de testare dinamica cu actionare electro-mecanica servocontrolata...",
    "SmartPulse ofera o capacitate de testare de 18 kN in sarcina dinamica si 12 kN in sarcina statica...",
    "Cheia designului sau este camera climatica integrata, cu conditionare termoelectrica cu consum redus...",
    "SmartPulse este completat de controlerul digital CDAS2 de la Pavetest si de software-ul TestLab...",
    "B265-01: SmartPulse este, de asemenea, disponibil cu o unitate de refrigerare...",
    "Alimentare electrica: 230V, 50 Hz, 1ph, 10A / 110V, 60Hz, 1ph, 19A. Dimensiuni: 1900(h) x 1000(d)...",
  ],
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
  const [stickyClass, setStickyClass] = useState('top-0');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight / 3;

      if (scrollY > triggerPoint) {
        setStickyClass('top-1/3');
      } else {
        setStickyClass('top-0');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-6 lg:p-12">
      <div className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className={`hidden lg:flex bg-gray-100 p-6 h-[40%] sticky ${stickyClass} flex-col items-center justify-start transition-all duration-500`}
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
        </div>

        <div className="flex lg:hidden bg-gray-100 p-6 flex-col items-center justify-start">
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 flex flex-col space-y-8"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              {product.title}
            </h1>
            <p className="text-sm text-gray-500 mb-6">SKU: {product.sku}</p>
            <div>
              {product.description.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
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

          {product.video && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full mt-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Prezentare Video
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={product.video}
                  title="Product Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-64 rounded-lg shadow-lg"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-red-700 text-white text-lg font-semibold rounded-lg shadow-lg focus:outline-none"
          >
            Cerere Ofertă
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPage;
