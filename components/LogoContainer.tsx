'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PartnersService from '@/shared/partners/service/PartnersService';
import PartnerDTO from '@/shared/partners/dto/PartnersDTO';

const LogoContainer: React.FC = () => {
  const [logos, setLogos] = useState<string[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const service = new PartnersService();
      try {
        const data = await service.getAllPartners();
        const logoUrls = data.map((partner: PartnerDTO) => partner.image?.url).filter(Boolean);
        setLogos(logoUrls);
      } catch (error) {
        console.error('Failed to fetch logos:', error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 md:px-8 relative overflow-hidden mx-auto max-w-screen-xl">
      <div className="text-center mb-10">
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-600 mb-2">
          Partenerii noștri
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
          Colaboratori
        </h2>
      </div>

      {logos.length > 0 ? (
        <motion.div
          className="flex gap-6"
          animate={{ x: ['0%', '-100%'] }} 
          transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
        >
          {logos.map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <Image src={logo} alt={`Logo ${index + 1}`} width={150} height={50} />
            </div>
          ))}

          {logos.map((logo, index) => (
            <div key={index + logos.length} className="flex-shrink-0">
              <Image src={logo} alt={`Logo ${index + 1}`} width={150} height={50} />
            </div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">Se încarcă partenerii...</p>
      )}
    </div>
  );
};

export default LogoContainer;
