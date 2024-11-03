"use client";
import React, { useState } from "react";
import WebinarCard from "./WebinarCard"; 
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import webinar1 from "@/assets/webinar1.jpg";

const webinars = [
  {
    date: "15 Decembrie 2025",
    title: "Introducere în Webinare",
    duration: "2 ore",
    name: "John Doe",
    description: "Un webinar despre tendințele în webinarii.",
    time: "18:00",
  },
  {
    date: "20 Decembrie 2025",
    title: "Cum să creezi Webinare de succes",
    duration: "3 ore",
    name: "Jane Doe",
    description: "O sesiune despre crearea webinariilor eficiente.",
    time: "17:00",
  },
  {
    date: "25 Decembrie 2025",
    title: "Webinarii interactive",
    duration: "1 oră",
    name: "Mark Smith",
    description: "Descoperă cum să creezi webinarii interactive.",
    time: "16:00",
  },
  {
    date: "25 Decembrie 2025",
    title: "Webinarii interactive",
    duration: "1 oră",
    name: "Mark Smith",
    description: "Descoperă cum să creezi webinarii interactive.",
    time: "16:00",
  },
  {
    date: "15 Decembrie 2025",
    title: "Introducere în Webinare",
    duration: "2 ore",
    name: "John Doe",
    description: "Un webinar despre tendințele în webinarii.",
    time: "18:00",
  },
  {
    date: "20 Decembrie 2025",
    title: "Cum să creezi Webinare de succes",
    duration: "3 ore",
    name: "Jane Doe",
    description: "O sesiune despre crearea webinariilor eficiente.",
    time: "17:00",
  },
  {
    date: "25 Decembrie 2025",
    title: "Webinarii interactive",
    duration: "1 oră",
    name: "Mark Smith",
    description: "Descoperă cum să creezi webinarii interactive.",
    time: "16:00",
  },
  {
    date: "25 Decembrie 2025",
    title: "Webinarii interactive",
    duration: "1 oră",
    name: "Mark Smith",
    description: "Descoperă cum să creezi webinarii interactive.",
    time: "16:00",
  },
  {
    date: "15 Decembrie 2025",
    title: "Introducere în Webinare",
    duration: "2 ore",
    name: "John Doe",
    description: "Un webinar despre tendințele în webinarii.",
    time: "18:00",
  },
  {
    date: "20 Decembrie 2025",
    title: "Cum să creezi Webinare de succes",
    duration: "3 ore",
    name: "Jane Doe",
    description: "O sesiune despre crearea webinariilor eficiente.",
    time: "17:00",
  },
  {
    date: "25 Decembrie 2025",
    title: "Webinarii interactive",
    duration: "1 oră",
    name: "Mark Smith",
    description: "Descoperă cum să creezi webinarii interactive.",
    time: "16:00",
  },
  {
    date: "25 Decembrie 2025",
    title: "Webinarii interactive",
    duration: "1 oră",
    name: "Mark Smith",
    description: "Descoperă cum să creezi webinarii interactive.",
    time: "16:00",
  },
];

const ITEMS_PER_PAGE = 4;

const WebinarContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(webinars.length / ITEMS_PER_PAGE);

  const currentEvents = webinars.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden mx-auto max-w-screen-xl">
      <div className="text-center mb-10">
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-600 mb-2">
          Descoperă webinarile noastre
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
          WEBINARII GRATUITE
        </h2>
      </div>

      <motion.div
        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md text-black z-20 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full p-2 sm:p-3 ${
          currentPage === 0 ? "hidden cursor-not-allowed" : ""
        }`}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-sm sm:text-xl" />
      </motion.div>

      <motion.div
        onClick={() =>
          setCurrentPage(
            currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1
          )
        }
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md text-black z-20 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full p-2 sm:p-3 ${
          currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-sm sm:text-xl" />
      </motion.div>

      <AnimatePresence >
        <div className="overflow-x-scroll md:overflow-hidden flex md:items-center md:justify-center gap-6">
          {currentEvents.map((event, index) => (
            <motion.div
              key={`${currentPage}-${index}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-shrink-0 w-[250px]"
            >
              <WebinarCard
                date={event.date}
                title={event.title}
                duration={event.duration}
                name={event.name}
                time={event.time}
                imageUrl={webinar1}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                currentPage === index ? "bg-red-700" : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebinarContainer;
