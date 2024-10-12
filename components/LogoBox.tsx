import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const LogoBox = () => {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={logoVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-auto h-auto" 
    >
      <Image
        src={logo}
        alt="logo"
        width={350} 
        height={200} 
        className="min-w-[250px] h-auto md:w-[250px] lg:w-[350px]" 
      />
    </motion.div>
  );
};

export default LogoBox;
