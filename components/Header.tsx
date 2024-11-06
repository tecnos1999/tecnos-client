"use client";
import React, { useState, useEffect } from "react";
import BurgerMenu from "./BurgerMenu";
// import LogoBox from "./LogoBox";
import NavBar from "./NavBar";
import InfoBox from "./InfoBox";
import SearchContainer from "./SearchContainer";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed flex items-center justify-center  bg-white top-0 left-0 right-0 w-full z-50">
      <div
        className={`grid grid-cols-3 bg-white md:grid-cols-4 md:grid-rows-2  pt-2 items-center relative py-4 px-4 mx-auto max-w-screen-xl ${
          scrolled
            ? "bg-secondary   mx-0 w-full"
            : "bg-secondary"
        }`}
      >
        <div className="col-span-1">
          {/* <LogoBox /> */}
        </div>
        <div className="hidden md:flex md:flex-col col-span-2  justify-center">
          <NavBar />
        </div>
        <div className="col-span-1 flex justify-end md:justify-center">
          <InfoBox />
        </div>
        <div className="flex justify-end  md:hidden">
          <BurgerMenu />
        </div>

        <div className="hidden md:flex row-span-2 col-span-4">
        <SearchContainer />
         </div>
      </div>

      
    </header>
  );
};

export default Header;
