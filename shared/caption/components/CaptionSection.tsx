import React from "react";
import { CaptionDTO } from "@/shared/caption/dto/CaptionDTO";

interface CaptionSectionProps {
  captions: CaptionDTO[];
}

const CaptionSection: React.FC<CaptionSectionProps> = ({ captions }) => {
  return (
    <section className="w-full px-6 lg:px-20 py-16 bg-white">
      {captions.map((caption) => (
        <div
          key={caption.code}
          className={`flex flex-col md:flex-row items-center gap-6 mb-12 
            ${caption.position === "right" ? "md:flex-row-reverse" : ""}`}
        >
          <div className="w-full md:w-1/2 rounded-lg shadow-lg overflow-hidden">
            <img
              src={caption.photoUrl}
              alt={caption.text.slice(0, 30) || "Caption"}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2">
            <p className="text-gray-700 leading-relaxed">{caption.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CaptionSection;
