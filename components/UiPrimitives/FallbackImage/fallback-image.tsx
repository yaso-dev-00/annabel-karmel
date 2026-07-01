"use client";

import { useState } from "react";

type FallbackImageProps = {
  src: string;
  fallbackSrc: string;
  finalFallbackSrc?: string;
  alt: string;
  className?: string;
};

const DEFAULT_FINAL_FALLBACK = "/articles/introducing-allergenic-foods/hero.jpg";

export function FallbackImage({ src, fallbackSrc, finalFallbackSrc = DEFAULT_FINAL_FALLBACK, alt, className }: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }
        if (currentSrc !== finalFallbackSrc) {
          setCurrentSrc(finalFallbackSrc);
        }
      }}
    />
  );
}
