"use client";
import React, { useEffect, useState } from "react";
import ProductService from "@/shared/products/service/ProductService";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import { useRouter } from "next/navigation";
import { determinePath } from "@/utils/utils";
import ProductCard from "@/core/products/components/ProductCard";

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
    <div className="max-w-screen-xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Găsește Produsele Perfecte Pentru Tine
      </h1>
      <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.sku}
            product={product}
            onClick={redirectToProductDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSectionProducts;
