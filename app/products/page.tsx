'use client';
import React, { Suspense } from "react";
import CardSectionProducts from "@/components/CardSectionProducts";
import { useSearchParams } from "next/navigation";

const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const itemCategory = searchParams.get("itemCategory");

  return (
    <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 min-h-[50vh]">
      <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800 tracking-wide">
        Găsește Produsele Perfecte Pentru Tine
      </h1>
      {category && subCategory ? (
        <CardSectionProducts
          category={category}
          subCategory={subCategory}
          itemCategory={itemCategory || undefined}
        />
      ) : (
        <p className="text-center text-gray-600">
          Nu s-au găsit produse disponibile.
        </p>
      )}
    </section>
  );
};

const ProductsPage = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductsPage;
