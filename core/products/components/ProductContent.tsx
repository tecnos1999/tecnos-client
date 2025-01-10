"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import ProductService from "@/shared/products/service/ProductService";
import { motion } from "framer-motion";
import Image from "next/image";
import { determinePath } from "@/utils/utils";
import PartnersService from "@/shared/partners/service/PartnersService";
import { PartnerDTO } from "@/shared/partners/dto/PartnersDTO";
import Link from "next/link";

const ProductsContent: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [partner, setPartner] = useState<PartnerDTO | null>(null);

  const searchParams = useSearchParams();
  const partnerName = decodeURIComponent(searchParams.get("partner") || "");
  const router = useRouter();

  const productsService = useMemo(() => new ProductService(), []);
  const partnerService = useMemo(() => new PartnersService(), []);

  useEffect(() => {
    if (!partnerName) {
      setError("Nu a fost specificat niciun partener în URL.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const partnerDetails = await partnerService.getPartnerByName(
          partnerName
        );
        setPartner(partnerDetails);

        const fetchedProducts = await productsService.getProductsByPartner(
          partnerName
        );
        setProducts(fetchedProducts);

        setError(null);
      } catch (err) {
        const errorMessage =
          typeof err === "string"
            ? err
            : err instanceof Error
            ? err.message
            : "A apărut o eroare la încărcarea produselor.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [partnerName, productsService, partnerService]);

  const redirectToProductDetails = (sku: string) => {
    const queryParams = new URLSearchParams({
      sku: encodeURIComponent(sku),
    });
    router.push(determinePath(`product?${queryParams.toString()}`));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-xl font-semibold text-gray-600 animate-pulse">
          Se încarcă produsele...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-xl text-red-500 font-semibold">{error}</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-xl font-semibold text-gray-500">
          Nu au fost găsite produse pentru acest partener.
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-8  bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl">
      {partner && (
        <div className="max-w-screen-xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center  transition-all duration-300 px-4 py-8">
            <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
              <Image
                src={partner.imageUrl || "/fallback-image-url.jpg"}
                alt={`${partner.name} Logo`}
                width={300}
                height={300}
                className="object-contain rounded-md   "
                unoptimized
              />
            </div>
            <div className="w-full md:w-2/3 md:ml-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {partner.name}
              </h2>
              <p
                className="text-gray-600 mb-6 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: partner.description }}
              />
              {partner.catalogFile && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    href={partner.catalogFile}
                    passHref
                    className="bg-blue-gradient from-blue-500 to-blue-700 text-white py-2 px-8 text-sm font-medium rounded-full transition-all duration-200 shadow-lg inline-block text-center"
                  >
                    Vezi Catalog
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className="
      max-w-screen-xl mx-auto 
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      gap-8 
      justify-items-center
    "
      >
        {products.map((product) => (
          <motion.div
            key={product.sku}
            className="
          relative 
          w-full 
          bg-gradient-to-br from-gray-50 to-white 
          rounded-lg 
          shadow-md 
          overflow-hidden 
          hover:shadow-xl 
          hover:-translate-y-2 
          transition-transform duration-300
        "
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-lg">
              <Image
                src={product.images?.[0] || "/fallback-image-url.jpg"}
                alt={product.name || "Product Image"}
                fill
                className="object-fit transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p
                className="text-gray-600 text-sm mb-4 line-clamp-1"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></p>
              <motion.button
                onClick={() => redirectToProductDetails(product.sku)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" bg-red-gradient from-red-500 to-red-700 text-white py-2 px-6 w-full text-sm font-medium rounded-full  transition-all duration-200 shadow-lg"
              >
                Vezi detalii
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsContent;
