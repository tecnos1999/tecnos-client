"use client";
import React from "react";
import { FiFacebook, FiLinkedin, FiInstagram, FiYoutube } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const SocialSidebar = () => {
  return (
    <>
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-4 z-25">
        <div className="flex flex-col items-center space-y-4">
          {[
            {
              href: "https://facebook.com",
              icon: <FiFacebook />,
              bgColor: "bg-blue-600",
              hoverColor: "hover:bg-blue-700",
            },
            {
              href: "https://linkedin.com",
              icon: <FiLinkedin />,
              bgColor: "bg-blue-500",
              hoverColor: "hover:bg-blue-600",
            },
            {
              href: "https://instagram.com",
              icon: <FiInstagram />,
              bgColor: "bg-pink-500",
              hoverColor: "hover:bg-pink-600",
            },
            {
              href: "https://youtube.com",
              icon: <FiYoutube />,
              bgColor: "bg-red-600",
              hoverColor: "hover:bg-red-700",
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg text-white ${social.bgColor} ${social.hoverColor} transition-transform transform hover:scale-110`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 800, damping: 15 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      <motion.a
        href="https://wa.me/123456789"
        className="fixed right-4 bottom-12 w-16 h-16 flex items-center justify-center rounded-full shadow-xl text-white bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-110 z-30"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 800, damping: 15 }}
      >
        <FaWhatsapp className="text-4xl" />
      </motion.a>
    </>
  );
};

export default SocialSidebar;
