'use client';
import React from "react";
import { motion } from "framer-motion";
import ButtonPulse from "./ButtonPulse";

const AboutUsContainer: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 py-16 px-8 mt-36">
      <motion.div
        className="text-center max-w-5xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Performanță și Inovație
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          Tecnoservice Equipment aduce pe piață echipamente de top, soluții
          adaptate nevoilor fiecărui client și un suport constant pentru a te ajuta să atingi
          excelența operațională. Suntem aici să îți oferim echipamente și
          soluții ce optimizează procesele și resursele.
        </p>
        <ButtonPulse href="#">
          Aflați Mai Multe
        </ButtonPulse>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Echipamente Performante
          </h2>
          <p className="text-md text-gray-600 leading-relaxed mb-6">
            Oferim echipamente de înaltă calitate pentru industria ta,
            personalizate pentru a asigura performanțe maxime și o durabilitate
            excepțională.
          </p>
          <motion.ul className="list-disc pl-6 space-y-2 text-gray-600">
            <motion.li whileHover={{ x: 10 }}>
              Automatizări industriale avansate
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>Service rapid și eficient</motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Suport tehnic permanent
            </motion.li>
          </motion.ul>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Consultanță Personalizată
          </h2>
          <p className="text-md text-gray-600 leading-relaxed mb-6">
            Beneficiază de expertiza echipei noastre, adaptată exact
            nevoilor tale. Oferim consultanță pe toate aspectele echipamentelor
            și soluțiilor tehnice.
          </p>
          <motion.ul className="list-disc pl-6 space-y-2 text-gray-600">
            <motion.li whileHover={{ x: 10 }}>
              Analiza detaliată a necesităților tale
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Implementarea celor mai bune soluții
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Training specializat pentru echipe
            </motion.li>
          </motion.ul>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Traininguri de Specialitate
          </h2>
          <p className="text-md text-gray-500 leading-relaxed mb-6">
            Ne asigurăm că fiecare client primește instruirea adecvată pentru a
            utiliza eficient echipamentele, obținând performanțe maxime din ele.
          </p>
          <motion.ul className="list-disc pl-6 space-y-2 text-gray-600">
            <motion.li whileHover={{ x: 10 }}>
              Formare completă pentru personal
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Suport tehnic post-implementare
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Certificări profesionale recunoscute
            </motion.li>
          </motion.ul>
        </div>
      </motion.div>

      <motion.div
        className="mt-20 bg-gray-900 text-white py-12 px-6 rounded-lg text-center max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-semibold mb-6">
          Gata să ne apucăm de treabă?
        </h3>
        <p className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Contactați-ne astăzi și descoperiți cum putem transforma operațiunile
          dumneavoastră cu soluțiile noastre inovatoare și performante. Suntem
          aici pentru a face diferența!
        </p>
        <ButtonPulse href="#">
          Contactați-ne
        </ButtonPulse>
      </motion.div>
    </div>
  );
};

export default AboutUsContainer;

