"use client";

import { CmsRelatedArticlesCarousel } from "@/components/SharedCarousels/CmsRelatedArticlesCarousel";
import { resolveRelatedArticlesBlockItems } from "@/lib/content-blocks/resolve-related-articles-block";
import type { RelatedArticlesBlockData } from "@/lib/content-blocks/types";
import styles from "./cms-related-articles-block.module.css";

type CmsRelatedArticlesBlockProps = {
  data: RelatedArticlesBlockData;
  previewMode?: boolean;
  excludeSlug?: string;
  catalog?: "advice" | "article";
};

export function CmsRelatedArticlesBlock({
  data,
  previewMode = false,
  excludeSlug,
  catalog = "advice",
}: CmsRelatedArticlesBlockProps) {
  const items = resolveRelatedArticlesBlockItems(data, excludeSlug, catalog);
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.headerWrap}>
        <h2 className={styles.relatedTitle}>{data.heading || "Related Articles"}</h2>
        {data.subtitle ? <p className={styles.relatedText}>{data.subtitle}</p> : null}
      </div>
      <div className={styles.carouselWrap}>
        <CmsRelatedArticlesCarousel items={items} previewMode={previewMode} />
      </div>
    </section>
  );
}
