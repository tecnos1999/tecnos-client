"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SeriesDTO } from "@/shared/series/dto/SeriesDTO";
import { BlogDTO } from "@/shared/blog/dto/BlogDTO";
import SeriesService from "@/shared/series/services/SeriesService";
import BlogService from "@/shared/blog/services/BlogService";
import Link from "next/link";
import { determinePath } from "@/utils/utils";

const SeriesPageContent = () => {
  const searchParams = useSearchParams();
  const [series, setSeries] = useState<SeriesDTO | null>(null);
  const [blogs, setBlogs] = useState<BlogDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeriesAndBlogs = async () => {
      const name = searchParams.get("name");
      if (name) {
        try {
          const seriesService = new SeriesService();
          const seriesData = await seriesService.getSeriesByName(name);
          setSeries(seriesData);

          const blogService = new BlogService();
          if (seriesData.blogCodes) {
            const blogsData = await blogService.getBlogsByCodeIn(
              seriesData.blogCodes
            );
            setBlogs(blogsData);
          }
        } catch (e) {
          console.error("Failed to fetch series or blogs:", e);
          setError("Failed to fetch data. Please try again later.");
        }
      }
    };

    fetchSeriesAndBlogs();
  }, [searchParams]);

  if (error) {
    return (
      <div className="mt-24 flex justify-center items-center text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  if (!series) {
    return (
      <div className="mt-24 flex justify-center items-center font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <>
      <motion.section
        className="relative mt-[104px] md:mt-[188px] px-6 lg:px-20 py-12 min-h-[40vh] w-full flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${series.imageUrl})` }}
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg">
            {series.name}
          </h1>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed drop-shadow-lg"
            dangerouslySetInnerHTML={{ __html: series.description }}
          ></p>
        </motion.div>
      </motion.section>

      <section className="px-6 lg:px-20 py-16 bg-gray-50">
        {blogs.length > 0 ? (
          <div className="space-y-16">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.code}
                className="relative w-full pb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`${
                    index % 2 === 0
                      ? "float-left mr-4 mb-4"
                      : "float-right ml-4 mb-4"
                  } w-full md:w-1/3  `}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={
                      blog.mainPhotoUrl || "https://via.placeholder.com/300x200"
                    }
                    alt={blog.title || "Blog image"}
                    className="object-cover w-full h-auto rounded-lg"
                    style={{ width: "600px", height: "500px" }}
                  />
                </motion.div>

                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {blog.title}
                </h3>
                <p
                  className="text-gray-600 mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                ></p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={determinePath(`blogs?code=${blog.code}`)}
                      className="bg-red-gradient from-red-500 to-red-700 text-white py-2 px-6 text-sm font-medium rounded-full transition-all duration-200 shadow-lg inline-block text-center"
                      
                   >
                      Citeste mai mult
                    </Link>
                  </motion.div>

                  {blog.broschureUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={blog.broschureUrl}
                        className="bg-blue-gradient from-blue-500 to-blue-700 text-white py-2 px-6 text-sm font-medium rounded-full transition-all duration-200 shadow-lg inline-block text-center"
                      >
                        Document
                      </Link>
                    </motion.div>
                  )}
                </div>
                <div className="clear-both"></div>
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No related blogs found.</p>
        )}
      </section>
    </>
  );
};

const SeriesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SeriesPageContent />
    </Suspense>
  );
};

export default SeriesPage;
