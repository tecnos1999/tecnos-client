"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import ProductService from "@/shared/products/service/ProductService";
import { getEmbedLink } from "@/utils/utils";

const ProductPage: React.FC = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stickyClass, setStickyClass] = useState<string>("top-0");

  const productService = new ProductService();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight / 3;

      if (scrollY > triggerPoint) {
        setStickyClass("top-48");
      } else {
        setStickyClass("top-0");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    productService
      .getProductBySku(slug as string)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch product");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading product details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Product not found</p>
      </section>
    );
  }

  return (
    <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
        <aside
          className={`hidden lg:flex flex-col sticky min-h-64 h-[30%] ${stickyClass} p-6  rounded-lg overflow-hidden`}
        >
          {product.images && product.images.length > 0 ? (
            <>
              <motion.img
                src={product.images[0]?.url || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-64 object-contain rounded-lg transition-transform duration-300 hover:scale-105"
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <div className="flex space-x-4 mt-4">
                {product.images.slice(1).map((image, index) => (
                   <motion.img
                   key={index}
                   src={image.url || "https://via.placeholder.com/400"}
                   alt={`Thumbnail ${index + 1}`}
                   className="w-20 h-20 rounded-lg cursor-pointer hover:opacity-80"
                   whileHover={{ scale: 1.1 }}
                   transition={{ duration: 0.5, ease: "easeInOut" }}
                 />
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </aside>

        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>
              <p className="text-gray-500 text-sm mt-1">SKU: {product.sku}</p>
              <div className="mt-6 space-y-4">
                {product.description.split("\n").map((text, index) => (
                  <p key={index} className="text-gray-700">
                    {text}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { label: "Fișa Tehnică", url: product.tehnic, colors: "from-blue-500 to-blue-700" },
                { label: "Catalog", url: product.catalog, colors: "from-green-500 to-green-700" },
                { label: "Broschure", url: product.broschure, colors: "from-yellow-500 to-yellow-700" },
              ]
                .filter((action) => action.url)
                .map((action, idx) => (
                  <motion.a
                    key={idx}
                    href={action.url!}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg shadow-lg text-white bg-gradient-to-r ${action.colors} focus:outline-none transition`}
                  >
                    {action.label}
                  </motion.a>
                ))}
            </div>

            {product.linkVideo && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-8"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Prezentare Video</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={getEmbedLink(product.linkVideo) || ""}
                    title="Product Video"
                    allowFullScreen
                    className="w-full h-64 rounded-lg shadow-lg"
                  ></iframe>
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold text-lg rounded-lg shadow-lg"
            >
              Cerere Ofertă
            </motion.button>
          </motion.div>
        </main>
      </div>
    </section>
  );
};

export default ProductPage;
