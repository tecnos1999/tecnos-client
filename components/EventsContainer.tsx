"use client";
import React, { useState } from "react";
import EventCard from "./EventCard";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import webinar1 from "@/assets/webinar1.jpg";

const events = [
  {
    image: webinar1,
    date: "15.12.2025",
    title: "JavaScript Conference",
    subtitle: "Modern JS Frameworks",
    description: "Discover the latest advancements in JavaScript frameworks and libraries.",
  },

  {
    image: webinar1,
    date: "18.12.2025",
    title: "AI & Machine Learning Summit",
    subtitle: "Future of AI",
    description: "Explore cutting-edge AI technologies and their applications in various industries.",
  },

  {
    image: webinar1,
    date: "20.12.2025",
    title: "Cloud Computing Workshop",
    subtitle: "Scaling with Cloud",
    description: "Learn how to efficiently scale applications using cloud infrastructure.",
  },

  {
    image: webinar1,
    date: "22.12.2025",
    title: "Cybersecurity Conference",
    subtitle: "Securing Digital Assets",
    description: "Understand modern cybersecurity threats and solutions to protect your data.",
  },

  {
    image: webinar1,
    date: "25.12.2025",
    title: "Blockchain Hackathon",
    subtitle: "Innovating with Blockchain",
    description: "Join developers to build innovative solutions using blockchain technology.",
  },

  {
    image: webinar1,
    date: "28.12.2025",
    title: "DevOps Meetup",
    subtitle: "Automation and CI/CD",
    description: "Explore best practices for automating workflows and continuous integration.",
  },

  {
    image: webinar1,
    date: "30.12.2025",
    title: "Frontend Developer Conference",
    subtitle: "Building Interactive UIs",
    description: "Learn the latest tools and techniques for creating interactive user interfaces.",
  },

  {
    image: webinar1,
    date: "02.01.2026",
    title: "Data Science Workshop",
    subtitle: "Data Analysis & Visualization",
    description: "Gain insights into data analysis techniques and powerful visualization tools.",
  },

  {
    image: webinar1,
    date: "05.01.2026",
    title: "AR/VR Conference",
    subtitle: "Building Immersive Experiences",
    description: "Discover how AR and VR technologies are reshaping user experiences.",
  },
];


const ITEMS_PER_PAGE = 4;

const EventsContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  const currentEvents = events.slice(
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
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 md:mb-12 text-black"></h2>

      <div className="text-center mb-10">
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-700 mb-2">
          Descoperă evenimentele noastre
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
           Evenimente
        </h2>
      </div>

      <motion.div
        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md text-black z-20 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full p-2 sm:p-3 ${
          currentPage === 0 ? "hidden " : ""
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
          currentPage === totalPages - 1 ? " hidden " : ""
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-sm sm:text-xl" />
      </motion.div>

      <div className="overflow-x-scroll md:overflow-hidden flex md:items-center md:justify-center gap-6">
        <AnimatePresence mode="wait">
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
              <EventCard
                image={event.image}
                date={event.date}
                title={event.title}
                subtitle={event.subtitle}
                description={event.description}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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

export default EventsContainer;
