"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import ProductService from "@/shared/products/service/ProductService";
import { motion } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { determinePath } from "@/utils/utils";
import { useRouter } from "next/navigation";

const ProductsContent: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const partnerName = decodeURIComponent(searchParams.get("partner") || "");
  const router = useRouter();
  const productsService = useMemo(() => new ProductService(), []);

  useEffect(() => {
    if (!partnerName) {
      setError("Nu a fost specificat niciun partener în URL.");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await productsService.getProductsByPartner(partnerName);
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

    fetchProducts();
  }, [partnerName, productsService]);

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
        <span className="text-xl text-red-500 font-semibold">
          {error}
        </span>
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
    <div className="min-h-screen py-10 px-4 md:px-8 bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Titlu */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Products by Partner
      </h1>
      <h2 className="text-xl font-semibold text-center mb-10 text-gray-700">
        Produsele partenerului{" "}
        <span className="text-red-600">{partnerName}</span>
      </h2>

      {/* Grid responsive pentru cardurile de produse */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-6 
          justify-items-center
        "
      >
        {products.map((product) => (
          <motion.div
            key={product.sku}
            className="
              relative 
              w-full             /* Pe ecrane mici, cardul ocupă toată lățimea */
              max-w-xs           /* Limităm lățimea maximă a cardului */
              md:w-80            /* Pe ecrane medii și mai mari, cardul are lățime fixă de 80 */
              bg-white 
              rounded-xl 
              shadow-lg 
              overflow-hidden 
              transition-all 
              duration-500 
              hover:shadow-2xl 
              hover:-translate-y-1
            "
            whileHover={{ scale: 1.01 }}
          >
            <div className="relative w-full h-60 bg-gray-200 flex items-center justify-center">
              <Image
                src={product.images?.[0] || "/fallback-image-url.jpg"}
                alt={product.name || "Product Image"}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                unoptimized
              />
          
            </div>

            <div className="p-4 flex flex-col h-[calc(100%-240px)]">
              <h3 className="text-lg font-semibold text-gray-700 mb-2 line-clamp-2 leading-tight">
                {product.name}
              </h3>
              <div className="mt-auto flex justify-between items-center">
                <button
                  onClick={() => redirectToProductDetails(product.sku)}
                  className="py-2 px-6 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
                >
                  Vezi detalii
                </button>

             
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductsContent;
