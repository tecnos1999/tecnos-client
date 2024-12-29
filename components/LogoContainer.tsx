"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import PartnersService from "@/shared/partners/service/PartnersService";
import "swiper/css";
import "swiper/css/autoplay";
import { useRouter } from "next/navigation";
import { determinePath } from "@/utils/utils";
import { PartnerDTO } from "@/shared/partners/dto/PartnersDTO";

const LogoContainer: React.FC = () => {
  const [logos, setLogos] = useState<{ url: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPartners = async () => {
      const service = new PartnersService();
      try {
        const data = await service.getAllPartners();
        const formattedData = data
          .map((partner: PartnerDTO) => ({
            url: partner.imageUrl || "/default-logo.png",
            name: partner.name || "Unknown Partner",
          }))
          .filter((partner) => partner.url && partner.name);

        setLogos(formattedData);
      } catch (error) {
        console.error("Failed to fetch logos:", error);
      }
    };

    fetchPartners();
  }, []);

  const handleLogoClick = (partnerName: string) => {
    router.push(determinePath(`/products/partners?partner=${partnerName}`));
  };

  return (
    <div className="py-16 px-4 sm:px-6 md:px-8 relative mx-auto max-w-screen-xl">
      <div className="text-center mb-10">
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-600 mb-2">
          Partenerii noștri
        </h3>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
          Colaboratori
        </h2>
      </div>

      {logos.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={5000}
          grabCursor={true}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {logos.concat(logos).map((logo, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => handleLogoClick(logo.name)}
              >
                <div className="bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-transform duration-300">
                  <Image
                    src={logo.url}
                    alt={`Logo ${logo.name}`}
                    width={120}
                    height={60}
                    className="object-contain"
                    unoptimized={true}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">Se încarcă partenerii...</p>
      )}
    </div>
  );
};

export default LogoContainer;
