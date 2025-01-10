"use client";
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
          Performanta si Inovatie
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          Tecnoservice Equipment aduce pe piata echipamente de top, solutii
          adaptate nevoilor fiecarui client si un suport constant pentru a te
          ajuta sa atingi excelenta operationala. Suntem aici sa iti oferim
          echipamente si solutii ce optimizeaza procesele si resursele.
        </p>
        <ButtonPulse href="#">Aflati Mai Multe</ButtonPulse>
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
            Oferim echipamente de inalta calitate pentru industria ta,
            personalizate pentru a asigura performante maxime si o durabilitate
            exceptionala.
          </p>
          <motion.ul className="list-disc pl-6 space-y-2 text-gray-600">
            <motion.li whileHover={{ x: 10 }}>
              Automatizari industriale avansate
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Service rapid si eficient
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Suport tehnic permanent
            </motion.li>
          </motion.ul>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Consultanta Personalizata
          </h2>
          <p className="text-md text-gray-600 leading-relaxed mb-6">
            Beneficiaza de expertiza echipei noastre, adaptata exact nevoilor
            tale. Oferim consultanta pe toate aspectele echipamentelor si
            solutiilor tehnice.
          </p>
          <motion.ul className="list-disc pl-6 space-y-2 text-gray-600">
            <motion.li whileHover={{ x: 10 }}>
              Analiza detaliata a necesitatilor tale
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Implementarea celor mai bune solutii
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
            Ne asiguram ca fiecare client primeste instruirea adecvata pentru a
            utiliza eficient echipamentele, obtinand performante maxime din ele.
          </p>
          <motion.ul className="list-disc pl-6 space-y-2 text-gray-600">
            <motion.li whileHover={{ x: 10 }}>
              Formare completa pentru personal
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Suport tehnic post-implementare
            </motion.li>
            <motion.li whileHover={{ x: 10 }}>
              Certificari profesionale recunoscute
            </motion.li>
          </motion.ul>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUsContainer;
