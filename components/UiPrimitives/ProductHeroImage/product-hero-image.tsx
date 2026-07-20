import Image from "next/image";

import type { ProductHeroDimensions } from "@/data/chilled-product-page";
import { normalizeCmsImageSrc } from "@/lib/content-blocks/image-src";
import styles from "./product-hero-image.module.css";

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
  const desktop = normalizeCmsImageSrc(desktopSrc);
  const mobile = normalizeCmsImageSrc(mobileSrc);
  if (!desktop && !mobile) return null;

  return (
    <div className={className}>
      {desktop ? (
        <Image
          src={desktop}
          alt={alt}
          width={desktopWidth}
          height={desktopHeight}
          priority
          className={styles.desktop}
          sizes="100vw"
        />
      ) : null}
      {mobile ? (
        <Image
          src={mobile}
          alt={alt}
          width={mobileWidth}
          height={mobileHeight}
          priority
          className={styles.mobile}
          sizes="100vw"
        />
      ) : null}
    </div>
  );
}
