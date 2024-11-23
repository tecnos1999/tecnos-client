'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 

const products = [
  { id: 1, image: 'https://via.placeholder.com/200', title: 'Aparat automat cu inel si bila pentru bitum Softmatic Matest' },
  { id: 2, image: 'https://via.placeholder.com/200', title: 'Agitator motorizat cu dulap de securitate pentru echivalent de nisip Matest' },
  { id: 3, image: 'https://via.placeholder.com/200', title: 'Analizor automat pentru mixturi asfaltice (AMA) Matest' },
  { id: 4, image: 'https://via.placeholder.com/200', title: 'Analizor de textura CTX AMETEK Brookfield' },
  { id: 5, image: 'https://via.placeholder.com/200', title: 'Aparat cu coloana rezonanta de tip Hardin – GDS Instruments' },
  { id: 6, image: 'https://via.placeholder.com/200', title: 'Aparat de masurare punct de roua DMT152 Vaisala' },
  { id: 1, image: 'https://via.placeholder.com/200', title: 'Aparat automat cu inel si bila pentru bitum Softmatic Matest' },
  { id: 2, image: 'https://via.placeholder.com/200', title: 'Agitator motorizat cu dulap de securitate pentru echivalent de nisip Matest' },
  { id: 3, image: 'https://via.placeholder.com/200', title: 'Analizor automat pentru mixturi asfaltice (AMA) Matest' },
  { id: 4, image: 'https://via.placeholder.com/200', title: 'Analizor de textura CTX AMETEK Brookfield' },
  { id: 5, image: 'https://via.placeholder.com/200', title: 'Aparat cu coloana rezonanta de tip Hardin – GDS Instruments' },
  { id: 6, image: 'https://via.placeholder.com/200', title: 'Aparat de masurare punct de roua DMT152 Vaisala' },
];

const CardSectionProducts = () => {
  return (
    <div className="flex justify-center items-center py-12 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
          >
            <div className="relative w-full h-48 overflow-hidden bg-gray-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
                Nou
              </div>
            </div>
            <div className="p-4 flex flex-col justify-between h-[calc(100%-192px)]">
              <h3 className="text-base font-semibold text-gray-800 mb-3 line-clamp-2">
                {product.title}
              </h3>
              <div className="flex justify-between items-center">
                <button className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md">
                  Vezi detalii
                </button>
                <motion.div
                  className="w-10 h-10 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardSectionProducts;
