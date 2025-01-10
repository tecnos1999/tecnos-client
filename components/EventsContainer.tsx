"use client";

import React, { useEffect, useMemo, useState } from "react";
import EventCard from "./EventCard";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import EventDTO from "@/shared/event/dto/EventDTO";
import EventService from "@/shared/event/service/EventService";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 4;

const EventsContainer: React.FC = () => {
  const [events, setEvents] = useState<EventDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  const currentEvents = events.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const eventService = useMemo(() => new EventService(), []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await eventService.getAllEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        toast.error((error as string) || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventService]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
    exit: { opacity: 0, y: -20 },
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">Loading events...</div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden mx-auto max-w-screen-xl">
      <div className="text-center mb-10">
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-700 mb-2">
          Descopera evenimentele noastre
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
          Evenimente
        </h2>
      </div>

      <motion.div
        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md text-black z-20 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-full p-2 sm:p-3 ${
          currentPage === 0 ? "hidden" : ""
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
          currentPage === totalPages - 1 ? "hidden" : ""
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
                image={event.imageUrl || ""}
                title={event.title}
                subtitle={event.description}
                description={event.description || ""}
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
