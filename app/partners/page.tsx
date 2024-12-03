"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PartnerDTO from "@/shared/partners/dto/PartnersDTO";
import PartnersService from "@/shared/partners/service/PartnersService";
import { determinePath } from "@/utils/utils";

const PartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPartners = async () => {
      const service = new PartnersService();
      try {
        const data = await service.getAllPartners();
        setPartners(data as PartnerDTO[]);
      } catch (error) {
        toast.error((error as string) || "Failed to load partners");
      }
    };

    fetchPartners();
  }, []);

  const handleViewProducts = (partnerName: string) => {
    router.push(determinePath(`products/partners`));
  };

  return (
    <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 py-12 min-h-[50vh]">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Cataloge și Parteneri</h1>
        <p className="text-lg text-gray-600 mt-4">
          Alegeți un partener pentru a vizualiza mai multe detalii despre catalog.
        </p>
      </div>

      {/* Cardurile Partenerilor */}
      <div className="flex flex-wrap justify-center gap-8">
        {partners.map((partner) => (
          <motion.div
            key={partner.name}
            className="relative bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105"
            style={{ width: "280px" }}
          >
            {/* Imaginea Partenerului */}
            <div className="relative w-full h-40 bg-gray-100">
              {partner.image?.url ? (
                <Image
                  src={partner.image.url}
                  alt={partner.name}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <span>No Image</span>
                </div>
              )}
            </div>

            {/* Titlu */}
            <div className="px-4 py-3 bg-gray-50 border-t">
              <h3 className="text-lg font-bold text-gray-800">{partner.name}</h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {partner.description || "No description available"}
              </p>
            </div>

            {/* Butoane */}
            <div className="flex justify-between items-center px-4 py-3 bg-white">
              {partner.catalogFile && (
                <motion.a
                  href={partner.catalogFile}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="text-sm bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
                >
                  Catalog
                </motion.a>
              )}
              <motion.button
                onClick={() => handleViewProducts(partner.name)}
                whileHover={{ scale: 1.05 }}
                className="text-sm bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition-all"
              >
                Produse
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PartnersPage;
