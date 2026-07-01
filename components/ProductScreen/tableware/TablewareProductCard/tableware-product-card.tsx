"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import type { TablewareProduct, TablewareSwatchColor } from "@/data/tableware-page";
import { tablewareAssets } from "@/data/tableware-page";
import styles from "./tableware-product-card.module.css";

type TablewareProductCardProps = {
  product: TablewareProduct;
  variant?: "default" | "completeSet";
};

const swatchBorder: Record<TablewareSwatchColor, string> = {
  "soft-sage": "#b4c7a3",
  "warm-stone": "#f0e1da",
  blushberry: "#BC7F7A",
};

export function TablewareProductCard({ product, variant = "default" }: TablewareProductCardProps) {
  const initialSwatch = product.swatches.find((s) => s.active) ?? product.swatches[0];
  const [activeSwatch, setActiveSwatch] = useState(initialSwatch);
  const [linkHref, setLinkHref] = useState(product.href);
  const [defaultImage, setDefaultImage] = useState(product.defaultImage);
  const [hoverImage, setHoverImage] = useState(product.hoverImage);

  useEffect(() => {
    const swatch = product.swatches.find((s) => s.active) ?? product.swatches[0];
    setActiveSwatch(swatch);
    setLinkHref(product.href);
    setDefaultImage(product.defaultImage);
    setHoverImage(product.hoverImage);
  }, [product]);

  const selectSwatch = useCallback((swatch: (typeof product.swatches)[number]) => {
    setActiveSwatch(swatch);
    setLinkHref(swatch.href);
    setDefaultImage(swatch.image);
    setHoverImage(swatch.hover);
  }, []);

  return (
    <article className={`${styles.card}${variant === "completeSet" ? ` ${styles.cardCompleteSet}` : ""}`}>
      <div className={styles.thumb}>
        <Link href={linkHref}>
          <img src={defaultImage} alt="" className={`${styles.thumbImage} ${styles.defaultImage}`} decoding="async" />
          <img src={hoverImage} alt="" className={`${styles.thumbImage} ${styles.hoverImage}`} decoding="async" />
        </Link>
      </div>

      <Link href={linkHref} className={styles.titleLink}>
        <h3 className={styles.title}>{product.title}</h3>
      </Link>

      <div className={styles.swatches} role="list" aria-label={`${product.title} colour options`}>
        {product.swatches.map((swatch) => {
          const isActive = activeSwatch.color === swatch.color;
          const swatchSrc = isActive
            ? tablewareAssets.swatchImagesActive[swatch.color]
            : tablewareAssets.swatchImages[swatch.color];

          return (
            <button
              key={swatch.color}
              type="button"
              role="listitem"
              className={`${styles.swatch} ${styles[swatch.color]} ${isActive ? styles.swatchActive : ""}`}
              style={{
                backgroundImage: `url(${swatchSrc})`,
                borderColor: isActive ? swatchBorder[swatch.color] : "transparent",
              }}
              aria-label={`${swatch.color.replace("-", " ")} colour`}
              aria-pressed={isActive}
              onClick={() => selectSwatch(swatch)}
            />
          );
        })}
      </div>
    </article>
  );
}
