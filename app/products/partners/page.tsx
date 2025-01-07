'use client';
import React, { Suspense } from "react";
import ProductsContent from "@/core/products/components/ProductContent";

const ProductsPartnersPage: React.FC = () => {
    return (
        <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 py-12 min-h-[50vh]">
            <Suspense fallback={<div className="text-center text-xl">Loading...</div>}>
                <ProductsContent />
            </Suspense>
        </section>
    );
};

export default ProductsPartnersPage;
