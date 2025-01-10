"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BlogService from "@/shared/blog/services/BlogService";
import { BlogDTO } from "@/shared/blog/dto/BlogDTO";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Image from "next/image";

const BlogPageContent = () => {
  const searchParams = useSearchParams();
  const [blog, setBlog] = useState<BlogDTO | null>(null);

  const blogService = useMemo(() => new BlogService(), []);

  const blogCode = useMemo(() => searchParams.get("code"), [searchParams]);

  useEffect(() => {
    if (!blogCode) {
      toast.error("No blog code provided in URL.");
      return;
    }

    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.getBlogByCode(blogCode);
        setBlog(fetchedBlog);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        toast.error(errorMessage);
      }
    };

    fetchBlog();
  }, [blogCode, blogService]);

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
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg">
            {blog.title}
          </h1>
          <p className="mt-6 text-base md:text-lg leading-relaxed drop-shadow-lg">
            {blog.description}
          </p>
        </motion.div>
      </motion.section>

      {blog.captions && blog.captions.length > 0 && (
        <section className="px-6 lg:px-20 py-16 bg-gray-50">
          <div className="space-y-12 max-w-4xl mx-auto">
            {blog.captions.map((caption) => (
              <div
                key={caption.code}
                className={`flex flex-col items-center gap-6 md:gap-10 md:flex-row ${
                  caption.position === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2 rounded-lg shadow-lg overflow-hidden">
                  {caption.photoUrl ? (
                    <Image
                      src={caption.photoUrl}
                      alt={caption.text.slice(0, 30) || "Caption"}
                      width={500}
                      height={300}
                      className="object-cover w-full h-[300px] md:h-[400px]"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div
                    className="text-gray-700 leading-relaxed text-center md:text-left prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: caption.text }}
                  />
                </div>
              </div>
            ))}
          </div>
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
