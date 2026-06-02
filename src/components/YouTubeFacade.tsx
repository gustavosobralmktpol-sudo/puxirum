"use client";

import { useState } from "react";
import Image from "next/image";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
  playsinline?: boolean;
}

export default function YouTubeFacade({ videoId, title, className = "", playsinline = false }: YouTubeFacadeProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1${playsinline ? "&playsinline=1" : ""}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`${className} group cursor-pointer bg-primary-dark relative`}
      aria-label={`Reproduzir: ${title}`}
    >
      {/* YouTube thumbnail */}
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-detail/90 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-detail group-hover:scale-110 transition-all duration-300">
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
