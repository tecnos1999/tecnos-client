"use client";

import React, { Suspense } from "react";
import ProductDetailsContent from "@/core/products/components/ProductDetailsContent";

const LoadingFallback: React.FC = () => {
  return <div>Loading product details...</div>;
};

const ProductPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductDetailsContent />
    </Suspense>
  );
};

export default ProductPage;
