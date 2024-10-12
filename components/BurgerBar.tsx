// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";
import React from "react";
import { motion } from "framer-motion";
import BurgerSubMeniu from "./BurgerSubMeniu";
import BurgerLink from "./BurgerLink";
import ButtonFull from "./ButtonFull";
import Image from "next/image";
import logo from "@/assets/logo.png";
import ButtonClose from "./ButtonClose";
import SearchBox from "./SearchBox";

interface BurgerBarProps {
  isOpen: boolean;
  onClose: () => void;
  isAuth: boolean;
}

const links = [
  { text: "Acasa", url: "/" },
  { text: "Produse", url: "/produse" },
  {
    text: "Aplicatii si Tehnologie",
    url: "/aplicatii&tehnologie",
    submenu: [
      { text: "Ametek Brookfield", url: "/aplicatii&tehnologie/ametek" },
      {
        text: "BYK-Gardner",
        url: "/aplicatii&tehnologie/byk&gardner",
        submenu: [
          { text: "Solutii QC pentru Automotive", url: "/byk-gardner/automotive" },
          { text: "Solutii pentru vopsea si straturi de acoperire", url: "/byk-gardner/vopsea" },
          { text: "Solutii pentru electronice consumabile", url: "/byk-gardner/electronice" },
          { text: "Instrumente BYK Gardner", url: "/byk-gardner/instrumente" },
        ],
      },
    ],
  },
  { text: "Servicii", url: "/servicii" },
];

const BurgerBar: React.FC<BurgerBarProps> = ({ isOpen, onClose, isAuth }) => {
  return (
    <motion.section
      className="fixed top-0 left-0 w-full mx-auto max-w-screen-xl  h-dvh bg-white z-50 flex flex-col p-4 overflow-y-auto"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? "0%" : "-100%" }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <header className="flex justify-between items-center my-2">
        <Image src={logo} width={250} height={150} alt="logo" />
        <ButtonClose onClose={onClose} />
      </header>

      <SearchBox />

      <motion.ul className="flex flex-col gap-4 mb-4">
        {links.map((link, index) =>
          link.submenu ? (
            <motion.li
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <BurgerSubMeniu
              key={index}
              text={link.text}
              url={link.url}
              submenu={link.submenu}
              onClose={onClose}
            />
            </motion.li>
          ) : (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <BurgerLink url={link.url} onClick={onClose}>
                {link.text}
              </BurgerLink>
            </motion.li>
          )
        )}
      </motion.ul>

      <section className="flex flex-col items-center gap-4 mt-4">
        
        <p className="text-gray-400 text-sm mt-4">
          © 2021 Global Development Future
        </p>
      </section>
    </motion.section>
  );
};

export default BurgerBar;
