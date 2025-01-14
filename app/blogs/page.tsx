"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogService from "@/shared/blog/services/BlogService";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";
import { determinePath, getEmbedLink } from "@/utils/utils";
import { ProductDTO } from "@/shared/products/dto/ProductDTO";
import ProductService from "@/shared/products/service/ProductService";
import { BlogDTO } from "@/shared/blog/dto/BlogDTO";

const BlogPageContent = () => {
  const searchParams = useSearchParams();
  const [blog, setBlog] = useState<BlogDTO | null>(null);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const blogService = useMemo(() => new BlogService(), []);
  const productService = useMemo(() => new ProductService(), []);
  const blogCode = useMemo(() => searchParams.get("code"), [searchParams]);
  const router = useRouter();
  useEffect(() => {
    if (!blogCode) {
      toast.error("No blog code provided in URL.");
      return;
    }

    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.getBlogByCode(blogCode);
        setBlog(fetchedBlog);

        if (fetchedBlog.skuProducts && fetchedBlog.skuProducts.length > 0) {
          const fetchedProducts = await productService.findBySkuIn(
            fetchedBlog.skuProducts
          );
          setProducts(fetchedProducts);
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        toast.error(errorMessage);
      }
    };

    fetchBlog();
  }, [blogCode, blogService, productService]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center mt-20 font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <>
      <motion.section
        className="relative mt-[104px] md:mt-[188px] px-6 lg:px-20 py-12 min-h-[40vh] w-full flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${blog.mainPhotoUrl})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70"></div>
        <motion.div
          className="relative z-10 text-white max-w-3xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg uppercase">
            {blog.title}
          </h1>
        </motion.div>
      </motion.section>

      {blog.captions && blog.captions.length > 0 && (
        <section className="px-6 lg:px-20 py-16 bg-gray-50">
          <div className="space-y-8 max-w-4xl mx-auto">
            {blog.captions.map((caption) => (
              <article key={caption.code} className="clearfix mb-12">
                <div
                  className={`max-w-[300px] md:max-w-[400px] ${
                    caption.position === "left"
                      ? "float-left mr-6"
                      : "float-right ml-6"
                  } mb-2`}
                >
                  {caption.photoUrl ? (
                    <Image
                      src={caption.photoUrl}
                      alt={caption.title || "Caption"}
                      width={500}
                      height={300}
                      className="object-cover w-full h-auto"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                <div className="text-gray-700 leading-relaxed prose">
                  <h2 className="font-semibold text-xl mb-2 uppercase">
                    {caption.title}
                  </h2>

                  <div dangerouslySetInnerHTML={{ __html: caption.text }} />
                </div>

                <div className="clear-both" />
              </article>
            ))}
          </div>

          {blog.viewUrl && (
            <div className="max-w-4xl mx-auto mt-8">
              <h2 className="text-2xl font-semibold mb-4">Watch the Video</h2>
              <div
                className="relative overflow-hidden"
                style={{ paddingBottom: "56.25%", height: 0 }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getEmbedLink(blog.viewUrl) || ""}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {products.length > 0 && (
            <section className="px-6 lg:px-20 py-16 bg-gray-50">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                  Produse Recomandate
                </h2>
                <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                  Descopera produsele recomandate in acest articol.
                </p>
                <div className="flex flex-row flex-wrap gap-4 justify-center">
                  {products.map((prod) => (
                    <motion.div
                      key={prod.sku}
                      className="relative w-full max-w-xs bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="relative w-full h-60 bg-gray-200 flex items-center justify-center">
                        <Image
                          src={prod.images?.[0] || "/fallback-image-url.jpg"}
                          alt={prod.name || "Product Image"}
                          fill
                          className="object-fit transition-transform duration-300"
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
                            onClick={() => {
                              router.push(determinePath(`product?sku=${prod.sku}`));
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-gradient from-red-500 to-red-700 text-white py-2 px-6 w-full text-sm font-medium rounded-full transition-all duration-200 shadow-lg"
                          >
                            Vezi detalii
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </section>
      )}
    </>
  );
};

const BlogPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPageContent />
    </Suspense>
  );
};

export default BlogPage;
