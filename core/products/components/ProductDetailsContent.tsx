"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductService from "@/shared/products/service/ProductService";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import LoadingScreen from "@/core/products/pages/LoadingScreen";
import ErrorScreen from "@/core/products/pages/ErrorScreen";
import ProductSidebar from "@/core/products/components/ProductSidebar";
import ProductDetails from "@/core/products/components/ProductDetails";

const ProductDetailsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sku) {
      setError("SKU not provided");
      setLoading(false);
      return;
    }

    const productService = new ProductService();
    setLoading(true);

    productService
      .getProductBySku(sku)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch product details");
        setLoading(false);
      });
  }, [sku]);

  if (loading) return <LoadingScreen message="Loading product details..." />;
  if (error) return <ErrorScreen message={error} />;
  if (!product) return <ErrorScreen message="Product not found" />;

  return (
    <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
        <ProductSidebar images={product.images || null} name={product.name} />
        <ProductDetails product={product} />
      </div>
    </section>
  );
};

export default ProductDetailsContent;
