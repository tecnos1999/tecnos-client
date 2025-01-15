"use client";

import React, { useEffect, useState } from "react";
import BannersCard from "./BannersCard";
import NewsService from "@/shared/news/services/NewsService";
import NewsDTO from "@/shared/news/dto/NewsDTO";
import { freeIcons } from "@/utils/utils";
import ModalNewsDetails from "@/core/news/ModalNewsDetails";

const Banners: React.FC = () => {
  const [news, setNews] = useState<NewsDTO[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsDTO | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const newsService = new NewsService();
      try {
        const fetchedNews = await newsService.getAllNews();
        setNews(fetchedNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleCardClick = (newsItem: NewsDTO) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  return (
    <section className="flex  flex-col items-center md:absolute md:flex-row md:-translate-y-1/2 justify-center gap-20 py-8 mx-auto w-full">
      {news.length > 0 ? (
        news.map((item, index) => {
          const iconEntry = freeIcons.find(
            (icon) => icon.name === item.icon.toLowerCase()
          );

          return (
            <BannersCard
              onClick={() => handleCardClick(item)}
              key={item.title + index}
              icon={iconEntry ? iconEntry.icon : undefined}
              title={item.title}
              content={item.shortDescription}
            />
          );
        })
      ) : (
        <p>Loading news...</p>
      )}

      {selectedNews && (
        <ModalNewsDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedNews.title}
          shortDescription={selectedNews.shortDescription}
          longDescription={selectedNews.longDescription}
          tags={selectedNews.tags}
          link={selectedNews.link}
        />
      )}
    </section>
  );
};

export default Banners;
