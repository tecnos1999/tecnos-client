'use client';
import React from 'react';
import { motion } from "framer-motion";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonPulse: React.FC<ButtonProps> = ({ href, children, className }) => {
  return (
    <motion.a
      href={href}
      className={`bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-8 rounded-lg font-semibold transition-all ${className}`}
      whileHover={{
        background: "linear-gradient(90deg, #ff6b6b, #ff4d4d)", // Schimbare de gradient pe hover
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

export default ButtonPulse;
