import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface BurgerLinkProps {
  url: string;
  children: React.ReactNode;
  onClick: () => void;
}

const BurgerLink: React.FC<BurgerLinkProps> = ({
  children,
  onClick,
  url,
}) => (
  <motion.div
    className="flex w-full mt-2 p-2 "
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.3 }}
  >
    <Link
      href={url}
      onClick={onClick}
      className="flex items-center w-full p-4 bg-white border-b border-gray-300 text-black hover:rounded-md hover:bg-red-700 hover:text-white transition-colors duration-300"
    >
      <p className="flex-1 text-left">{children}</p>
    </Link>
  </motion.div>
);

export default BurgerLink;
