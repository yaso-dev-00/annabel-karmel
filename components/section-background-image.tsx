import Image from "next/image";

import styles from "./section-background-image.module.css";

type ObjectFit = "cover" | "contain";
type MobileLayout = "fill" | "fullWidth";

type SectionBackgroundImageProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt?: string;
  priority?: boolean;
  desktopFit?: ObjectFit;
  mobileFit?: ObjectFit;
  desktopPosition?: string;
  mobilePosition?: string;
  /** fullWidth matches legacy `background-size: 100% auto` on mobile */
  mobileLayout?: MobileLayout;
  mobileImageWidth?: number;
  mobileImageHeight?: number;
  unoptimized?: boolean;
};

export function SectionBackgroundImage({
  desktopSrc,
  mobileSrc,
  alt = "",
  priority = false,
  desktopFit = "cover",
  mobileFit = "cover",
  desktopPosition = "top center",
  mobilePosition = "top center",
  mobileLayout = "fill",
  mobileImageWidth = 880,
  mobileImageHeight = 10500,
  unoptimized = false,
}: SectionBackgroundImageProps) {
  const mobile = mobileSrc ?? desktopSrc;

  return (
    <div className={styles.wrap} aria-hidden>
      <Image
        src={desktopSrc}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 768px) 100vw, 0px"
        unoptimized={unoptimized}
        className={`${styles.image} ${styles.desktopOnly}`}
        style={{ objectFit: desktopFit, objectPosition: desktopPosition }}
      />
      {mobileLayout === "fullWidth" ? (
        <div className={`${styles.mobileFullWidth} ${styles.mobileOnly}`}>
          <Image
            src={mobile}
            alt={alt}
            width={mobileImageWidth}
            height={mobileImageHeight}
            priority={priority}
            sizes="(max-width: 767px) 100vw, 0px"
            unoptimized={unoptimized}
            className={styles.mobileFullWidthImage}
          />
        </div>
      ) : (
        <Image
          src={mobile}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 767px) 100vw, 0px"
          unoptimized={unoptimized}
          className={`${styles.image} ${styles.mobileOnly}`}
          style={{ objectFit: mobileFit, objectPosition: mobilePosition }}
        />
      )}
    </div>
  );
}

export function SingleSectionBackgroundImage({
  src,
  alt = "",
  priority = false,
  fit = "cover",
  position = "center",
  unoptimized = false,
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  fit?: ObjectFit;
  position?: string;
  unoptimized?: boolean;
}) {
  return (
    <div className={styles.wrap} aria-hidden>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        unoptimized={unoptimized}
        className={styles.image}
        style={{ objectFit: fit, objectPosition: position }}
      />
    </div>
  );
}
