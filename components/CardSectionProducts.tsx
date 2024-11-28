import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import ProductService from "@/shared/products/service/ProductService";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import { determinePath } from "@/utils/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        let data;

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

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        No products found for the selected category.
      </div>
    );
  }


  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex flex-wrap gap-8 justify-center max-w-screen-xl">
        {products.map((product) => (
          <motion.div
            key={product.sku}
            className="relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105"
            style={{ width: "270px" }}
          >
            <div className="relative w-full h-64 overflow-hidden bg-gray-200">
              <Image
                src={product.images?.[0]?.url || "/fallback-image-url.jpg"}
                alt={product.name || "Product Image"}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                unoptimized
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md">
                Nou
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between h-[calc(100%-256px)]">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex justify-between items-center">
                <Link
                  href={determinePath(`product/${product.sku}`)}
                  className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
                >
                 
                  Vezi detalii
                </Link>

              
                <motion.div
                  className="w-10 h-10 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardSectionProducts;
