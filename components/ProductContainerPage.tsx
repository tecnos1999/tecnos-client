'use client'
import React, { useEffect, useState } from "react";
import ProductSidebar from "@/core/products/components/ProductSidebar";
import ProductDetails from "@/core/products/components/ProductDetails";
import ProductService from "@/shared/products/service/ProductService";
import LoadingScreen from "@/core/products/pages/LoadingScreen";
import ErrorScreen from "@/core/products/pages/ErrorScreen";

interface ProductContainerPageProps {
  sku: string;
}

const ProductContainerPage: React.FC<ProductContainerPageProps> = ({ sku }) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const productService = new ProductService();

      try {
        const data = await productService.getProductBySku(sku);
        setProduct(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch product");
        setLoading(false);
      }
    };

    fetchProduct();
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

export default ProductContainerPage;
