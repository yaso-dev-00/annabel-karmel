import Image from "next/image";

import type { ProductHeroDimensions } from "@/data/chilled-product-page";

type ProductHeroImageProps = ProductHeroDimensions & {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  className?: string;
};

export function ProductHeroImage({
  desktopSrc,
  mobileSrc,
  alt,
  desktopWidth,
  desktopHeight,
  mobileWidth,
  mobileHeight,
  className,
}: ProductHeroImageProps) {
  return (
    <div className={className}>
      <Image
        src={desktopSrc}
        alt={alt}
        width={desktopWidth}
        height={desktopHeight}
        priority
        className="hidden h-auto w-full align-bottom md:block"
        sizes="100vw"
      />
      <Image
        src={mobileSrc}
        alt={alt}
        width={mobileWidth}
        height={mobileHeight}
        priority
        className="block h-auto w-full align-bottom md:hidden"
        sizes="100vw"
      />
    </div>
  );
}
