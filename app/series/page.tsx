"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SeriesDTO } from "@/shared/series/dto/SeriesDTO";
import { BlogDTO } from "@/shared/blog/dto/BlogDTO";
import SeriesService from "@/shared/series/services/SeriesService";
import BlogService from "@/shared/blog/services/BlogService";

const SeriesPage = () => {
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
          <p className="mt-6 text-base md:text-lg leading-relaxed drop-shadow-lg">
            {series.description}
          </p>
        </motion.div>
      </motion.section>

      <section className="px-6 lg:px-20 py-16 bg-gray-50">
        {blogs.length > 0 ? (
          <div className="space-y-16">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.code}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-6`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-full md:w-1/2 rounded-lg shadow-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${blog.mainPhotoUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  
                    <div className="relative w-full aspect-w-16 aspect-h-9">
                      <div
                        className="absolute inset-0 bg-center bg-cover"
                        style={{ backgroundImage: `url(${blog.mainPhotoUrl})` }}
                      ></div>
                    </div>
                 
                  <div style={{ paddingTop: "56.25%" }}></div> 
                </motion.div>

                <motion.div
                  className="w-full md:w-1/2"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blog.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {blog.viewUrl && (
                      <motion.a
                        href={blog.viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-6 py-3 rounded-full m-2 shadow-lg focus:outline-none 
                                   transition-colors text-white 
                                   bg-gradient-to-r from-red-500 to-red-700 
                                   hover:from-red-600 hover:to-red-800"
                      >
                        Read More
                      </motion.a>
                    )}

                   
                    {blog.broschureUrl && (
                      <motion.a
                        href={blog.broschureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-6 py-3 rounded-full m-2 shadow-lg focus:outline-none 
                                   transition-colors bg-white border-2 border-red-500 text-red-500 
                                   hover:bg-red-50"
                      >
                        Download Document
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No related blogs found.</p>
        )}
      </section>
    </>
  );
};

export default SeriesPage;