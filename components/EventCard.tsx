import React, { useState } from "react";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";

interface EventCardProps {
  image: StaticImageData;
  date: string;
  title: string;
  subtitle: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  date,
  title,
  subtitle,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const formattedDate = new Date(date);

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
            <motion.img
              src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              alt="Ice Cream Sundae Party"
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.1 : 1,
                opacity: isHovered ? 0.6 : 1,
              }}
              transition={{ duration: 0.5 }}
            />
          </a>
        </motion.header>
        <motion.div
          className="absolute flex items-center justify-center flex-col top-5 right-5 w-[35px] h-[35px] bg-coral rounded-full text-white bg-red-700 text-center font-bold leading-[13px]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isValidDate ? (
            <>
              <span className="text-sm">{formattedDate.getDate()}</span>
              <span className="uppercase text-xs">
                {formattedDate.toLocaleString("default", { month: "short" })}
              </span>
            </>
          ) : (
            <>
              <span className="text-sm">11</span>
              <span className="uppercase text-xs">Sep</span>
            </>
          )}
        </motion.div>
        <motion.div
          className="relative p-4 h-[150px] md:h-[165px]"
          animate={{ height: isHovered ? "250px" : "150px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute top-[-20px] left-0 h-[20px] px-[10px] bg-coral text-white bg-red-700 uppercase text-xs leading-[20px]"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="#">pet</a>
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
          <span className="icon ion-clock">Create by Flore Denis</span>
        </motion.footer>
      </motion.article>
    </div>
  );
};

export default EventCard;
