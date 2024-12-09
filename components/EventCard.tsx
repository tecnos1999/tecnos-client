// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface EventCardProps {
  image: string;
  date: string;
  updated_at: string;
  title: string;
  subtitle: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  date,
  updated_at,
  title,
  subtitle,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const formattedDate = new Date(date);
  const updateFormattedDate = new Date(updated_at);

  const isValidDate = !isNaN(formattedDate.getTime());

  return (
    <div className="flex justify-center items-center  w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg m-4">
      <motion.article
        className="relative w-full bg-white shadow-lg transition-shadow duration-500 hover:shadow-2xl overflow-hidden"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header
          className="overflow-hidden bg-black h-[180px] md:h-[200px]"
          animate={{ height: isHovered ? "120px" : "180px" }}
          transition={{ duration: 0.5 }}
        >
          <a href="#">
            <Image
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              width={500}
              height={300}
              unoptimized
            />
          </a>
        </motion.header>

        <motion.div
          className="relative p-4 h-[150px] md:h-[165px]"
          animate={{ height: isHovered ? "250px" : "150px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute top-[-20px] left-0 h-[20px] px-[10px] bg-coral text-white bg-red-700 uppercase text-xs leading-[20px] gap-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isValidDate ? (
              <>
                <span className="text-xs">
                  {formattedDate.getDate()}{" "}
                  {formattedDate.toLocaleString("default", { month: "short" })}
                </span>
              </>
            ) : (
              <>
                <span className="text-xs uppercase">11 Sep</span>
              </>
            )}
          </motion.div>
          <h2 className="m-0 mb-1 text-black text-xl font-bold uppercase">
            <a href="#">{title}</a>
          </h2>
          <div className="m-0 mb-2 text-lg text-red-700">{subtitle}</div>
          <motion.p
            className="absolute left-5 right-5 bottom-[50px] m-0 text-gray-600 leading-6"
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 45,
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>
        <motion.footer
          className="absolute bottom-3 left-5 right-5 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="icon ion-clock">Updated on {updateFormattedDate.getDate()}{" "}
          {updateFormattedDate.toLocaleString("default", { month: "short" })}</span>
        </motion.footer>
      </motion.article>
    </div>
  );
};

export default EventCard;
