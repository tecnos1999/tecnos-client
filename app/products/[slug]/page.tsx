import CardSectionProducts from '@/components/CardSectionProducts';
import React from 'react';

const ProductsPage = () => {
  return (
    <section className="mt-[104px] md:mt-[188px] px-6 lg:px-20 ">
      <h1 className="text-center text-4xl font-bold mb-12 text-gray-800">New Arrivals</h1>
      <CardSectionProducts />
    </section>
  );
};

export default ProductsPage;
