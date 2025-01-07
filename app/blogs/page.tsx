"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogService from "@/shared/blog/services/BlogService";
import { BlogDTO } from "@/shared/blog/dto/BlogDTO";
import { motion } from "framer-motion";

const BlogPage = () => {
  const searchParams = useSearchParams();
  const [blog, setBlog] = useState<BlogDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  const blogService = new BlogService();

  useEffect(() => {
    const blogCode = searchParams.get("code");

    if (!blogCode) {
      setError("No blog code provided in URL.");
      return;
    }

    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.getBlogByCode(blogCode);
        setBlog(fetchedBlog);
      } catch (err: any) {
        console.error("Failed to fetch blog:", err);
        setError(err.message || "Failed to fetch blog.");
      }
    };

    fetchBlog();
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex items-center justify-center mt-20 text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center mt-20 font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg">
            {blog.title}
          </h1>
          <p className="mt-6 text-base md:text-lg leading-relaxed drop-shadow-lg">
            {blog.description}
          </p>
        </motion.div>
      </motion.section>

      {/* Captions Section */}
      {blog.captions.length > 0 && (
        <section className="px-6 lg:px-20 py-16 bg-gray-50">
          <div className="space-y-12 max-w-4xl mx-auto">
            {blog.captions.map((caption) => (
              <div
                key={caption.code}
                className={`flex flex-col items-center gap-6 md:gap-10 md:flex-row ${
                  caption.position === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Container */}
                <div className="w-full md:w-1/2 rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={caption.photoUrl}
                    alt={caption.text.slice(0, 30) || "Caption"}
                    className="object-cover w-full h-[300px] md:h-[400px]"
                  />
                </div>

                {/* Text Container */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <p className="text-gray-700 leading-relaxed text-center md:text-left">
                    {caption.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPage;
