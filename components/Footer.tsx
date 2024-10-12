'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiTwitter, FiFacebook, FiDribbble, FiGithub } from 'react-icons/fi';
import Image from 'next/image';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="relative bg-black pt-10 pb-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start md:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mb-4"
            >
              <Image
                src={logo}
                alt="logo"
                width={150}
                height={75}
                className="w-auto h-auto"
              />
            </motion.div>
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Empowering your business with cutting-edge solutions.
            </motion.p>
            <motion.div className="flex space-x-4 mt-4">
              {['https://twitter.com', 'https://facebook.com', 'https://dribbble.com', 'https://github.com'].map((link, index) => (
                <motion.a
                  href={link}
                  key={index}
                  className="bg-gray-800 p-2 rounded-full shadow-lg hover:bg-red-700"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {index === 0 && <FiTwitter className="text-white" size={18} />}
                  {index === 1 && <FiFacebook className="text-white" size={18} />}
                  {index === 2 && <FiDribbble className="text-white" size={18} />}
                  {index === 3 && <FiGithub className="text-white" size={18} />}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col">
            <motion.h4
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Useful Links
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <li>
                <a className="text-gray-300 hover:text-red-700 block pb-2" href="#about">About Us</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-red-700 block pb-2" href="#blog">Blog</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-red-700 block pb-2" href="#github">Github</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-red-700 block pb-2" href="#free-products">Free Products</a>
              </li>
            </motion.ul>
          </div>

          <div className="flex flex-col">
            <motion.h4
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Other Resources
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <li>
                <a className="text-gray-300 hover:text-red-700 block pb-2" href="#license">MIT License</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-red-700 block pb-2" href="#terms">Terms &amp; Conditions</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-red-700 block pb-2" href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-red-700 block pb-2" href="#contact">Contact Us</a>
              </li>
            </motion.ul>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <a href="https://www.tecnos.com" className="text-gray-300 hover:text-red-700">Flore Dennis</a>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
