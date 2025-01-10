"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductService from "@/shared/products/service/ProductService";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import LoadingScreen from "@/core/products/pages/LoadingScreen";
import ErrorScreen from "@/core/products/pages/ErrorScreen";
import ProductSidebar from "@/core/products/components/ProductSidebar";
import ProductDetails from "@/core/products/components/ProductDetails";
import { motion } from "framer-motion";
import Image from "next/image";

const ITEMS_PER_PAGE = 4;

const ProductDetailsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryProducts, setCategoryProducts] = useState<ProductDTO[]>([]);
  const [subcategoryProducts, setSubcategoryProducts] = useState<ProductDTO[]>(
    []
  );

  const [categoryProductsPage, setCategoryProductsPage] = useState<number>(1);
  const [subcategoryProductsPage, setSubcategoryProductsPage] =
    useState<number>(1);

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
      .then(async (data) => {
        setProduct(data);
        setLoading(false);

        if (data?.category && data?.subCategory) {
          const categoryPromise = productService
            .getProductsByCategoryAndSubCategory(
              data.category,
              data.subCategory
            )
            .then((products) => products.filter((p) => p.sku !== sku));

          const subcategoryPromise = data?.itemCategory
            ? productService
                .getProductsByCategorySubCategoryAndItemCategory(
                  data.category,
                  data.subCategory,
                  data.itemCategory
                )
                .then((products) => products.filter((p) => p.sku !== sku))
            : Promise.resolve([]);

          const [categoryProds, subcategoryProds] = await Promise.all([
            categoryPromise,
            subcategoryPromise,
          ]);

          const filteredCategoryProducts = categoryProds.filter(
            (p) => !subcategoryProds.some((subP) => subP.sku === p.sku)
          );

          setCategoryProducts(filteredCategoryProducts);
          setSubcategoryProducts(subcategoryProds);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch product details");
        setLoading(false);
      });
  }, [sku]);

  if (loading) return <LoadingScreen message="Loading product details..." />;
  if (error) return <ErrorScreen message={error} />;
  if (!product) return <ErrorScreen message="Product not found" />;

  const displayedCategoryProducts = categoryProducts.slice(
    0,
    categoryProductsPage * ITEMS_PER_PAGE
  );
  const displayedSubcategoryProducts = subcategoryProducts.slice(
    0,
    subcategoryProductsPage * ITEMS_PER_PAGE
  );

  const handleLoadMoreCategoryProducts = () => {
    setCategoryProductsPage((prevPage) => prevPage + 1);
  };

  const handleLoadMoreSubcategoryProducts = () => {
    setSubcategoryProductsPage((prevPage) => prevPage + 1);
  };

  const renderProductCard = (prod: ProductDTO) => (
    <motion.div
      key={prod.sku}
      className="relative w-full max-w-xs md:w-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      whileHover={{ scale: 1.01 }}
    >
      <div className="relative w-full h-60 bg-gray-200 flex items-center justify-center">
        <Image
          src={prod.images?.[0] || "/fallback-image-url.jpg"}
          alt={prod.name || "Product Image"}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          unoptimized
        />
      </div>

      <div className="p-4 flex flex-col h-[calc(100%-240px)]">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 line-clamp-2 leading-tight">
          {prod.name}
        </h3>
        <p
          className="text-gray-600 text-sm mb-4 line-clamp-1"
          dangerouslySetInnerHTML={{ __html: prod.description }}
        ></p>
        <div className="mt-auto flex justify-between items-center">
          <motion.button
            onClick={() => console.log(`Redirect to ${prod.sku}`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-gradient from-red-500 to-red-700 text-white py-2 px-6 w-full text-sm font-medium rounded-full transition-all duration-200 shadow-lg"
          >
            Vezi detalii
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="mt-[104px] md:mt-[188px] px-4 sm:px-6 lg:px-20 min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg">
        <ProductSidebar images={product.images || null} name={product.name}   videoLink={product.linkVideo || null} />
        <ProductDetails product={product} />
      </div>

      {categoryProducts.length > 0 && (
        <div className="max-w-screen-xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Produse similare
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedCategoryProducts.map(renderProductCard)}
          </div>

          {displayedCategoryProducts.length < categoryProducts.length && (
            <motion.button
              onClick={handleLoadMoreCategoryProducts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 mx-auto block bg-red-gradient from-red-500 to-red-700 text-white py-2 px-6 rounded-full transition duration-200"
            >
              Incarca mai multe
            </motion.button>
          )}
        </div>
      )}

      {subcategoryProducts.length > 0 && (
        <div className="max-w-screen-xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Produse din aceeasi categorie
          </h2>
          <div className="grid place-content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedSubcategoryProducts.map(renderProductCard)}
          </div>

          {displayedSubcategoryProducts.length < subcategoryProducts.length && (
            <motion.button
              onClick={handleLoadMoreSubcategoryProducts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 mx-auto block bg-red-gradient from-red-500 to-red-700 text-white py-2 px-6 rounded-full transition duration-200"
            >
              Incarca mai multe
            </motion.button>
          )}
        </div>
      )}
    </section>
  );
};

export default ProductDetailsContent;
