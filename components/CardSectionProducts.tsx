"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductService from "@/shared/products/service/ProductService";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import { useRouter } from "next/navigation";
import { determinePath } from "@/utils/utils";

interface Props {
  category: string;
  subCategory: string;
  itemCategory?: string;
}

const CardSectionProducts: React.FC<Props> = ({
  category,
  subCategory,
  itemCategory,
}) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const productService = new ProductService();
        let data: ProductDTO[];

        if (itemCategory) {
          data =
            await productService.getProductsByCategorySubCategoryAndItemCategory(
              category,
              subCategory,
              itemCategory
            );
        } else {
          data = await productService.getProductsByCategoryAndSubCategory(
            category,
            subCategory
          );
        }

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subCategory, itemCategory]);

  const redirectToProductDetails = (sku: string) => {
    router.push(determinePath(`product?sku=${encodeURIComponent(sku)}`));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <span className="text-xl font-semibold text-gray-600 animate-pulse">
          Se încarcă produsele...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-xl font-semibold text-gray-500">
          Nu au fost găsite produse pentru categoria selectată.
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl my-4">
      <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800 tracking-wide">
        Găsește Produsele Perfecte Pentru Tine
      </h1>
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
            className="relative w-full max-w-xs md:w-80 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            whileHover={{ scale: 1.01 }}
          >
            <div className="relative w-full h-60 bg-gray-200 flex items-center justify-center">
              <Image
                src={product.images?.[0] || "/fallback-image-url.jpg"}
                alt={product.name || "Product Image"}
                fill
                className="object-fit transition-transform duration-300"
                unoptimized
              />
            </div>

            <div className="p-4 flex flex-col h-[calc(100%-240px)]">
              <h3 className="text-lg font-semibold text-gray-700 mb-2 line-clamp-2 leading-tight">
                {product.name}
              </h3>
              <p
                className="text-gray-600 text-sm mb-4 line-clamp-1"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></p>
              <div className="mt-auto flex justify-between items-center">
                <motion.button
                  onClick={() => redirectToProductDetails(product.sku)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className=" bg-red-gradient from-red-500 to-red-700 text-white py-2 px-6 w-full text-sm font-medium rounded-full  transition-all duration-200 shadow-lg"
                >
                  Vezi detalii
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardSectionProducts;
