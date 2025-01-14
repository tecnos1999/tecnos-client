"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PartnersService from "@/shared/partners/service/PartnersService";
import { determinePath } from "@/utils/utils";
import { PartnerDTO } from "@/shared/partners/dto/PartnersDTO";

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
    router.push(determinePath(`products/partners?partner=${partnerName}`));
  };

  return (
    <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 py-12 min-h-[50vh]">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Cataloge si Parteneri
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Alegeti un partener pentru a vizualiza mai multe detalii despre
          catalog.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {partners.map((partner) => (
          <motion.div
            key={partner.name}
            className="relative bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105"
            style={{ width: "280px" }}
          >
            <div className="relative w-full h-40 bg-gray-100">
              {partner.imageUrl ? (
                <Image
                  src={partner.imageUrl}
                  alt={partner.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <span>No Image</span>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t">
              <h3 className="text-lg font-bold text-gray-800">
                {partner.name}
              </h3>
              <p
                className="text-sm text-gray-500 mt-2 line-clamp-1"
                dangerouslySetInnerHTML={{ __html: partner.description }}
              ></p>
            </div>

            <div className="flex justify-between items-center px-4 py-3 bg-white">
              {partner.catalogFile && (
                <motion.a
                  href={partner.catalogFile}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="bg-blue-gradient from-blue-500 to-blue-700 text-white py-2 px-6 text-sm font-medium rounded-full transition-all duration-200 shadow-lg inline-block text-center"

                >
                  Catalog
                </motion.a>
              )}
              <motion.button
                onClick={() => handleViewProducts(partner.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-gradient from-red-500 to-red-700 text-sm  text-white py-2 px-6 rounded-full shadow transition-all"
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
