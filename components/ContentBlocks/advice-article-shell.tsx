import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { resolveMaxWidth } from "@/lib/content-blocks/max-width";
import { groupAdviceArticleBlocks } from "@/lib/content-blocks/advice-article-layout";
import type { AdviceArticle } from "@/lib/content-blocks/types";
import { ContentBlockRenderer } from "./content-block-renderer";
import styles from "./advice-article-shell.module.css";

type AdviceArticleShellProps = {
  article: AdviceArticle;
};

export function AdviceArticleShell({ article }: AdviceArticleShellProps) {
  const containerMaxWidth = resolveMaxWidth(
    article.content_max_width,
    article.content_max_width_custom,
  );
  const contentMaxWidth = article.content_max_width ?? "default";
  const hasRelatedArticlesBlock = article.content_blocks.some(
    (block) => block.type === "related_articles",
  );
  const blockGroups = groupAdviceArticleBlocks(article.content_blocks);

  const rendererProps = {
    contentMaxWidth,
    contentMaxWidthCustom: article.content_max_width_custom,
    excludeArticleSlug: article.slug,
    renderContext: "advice" as const,
  };

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        {blockGroups.map((group, index) =>
          group.fullBleed ? (
            <div key={`full-bleed-${index}`} className={styles.fullBleedSection}>
              <ContentBlockRenderer blocks={group.blocks} {...rendererProps} />
            </div>
          ) : (
            <div
              key={`contained-${index}`}
              className={styles.container}
              style={{ maxWidth: containerMaxWidth }}
            >
              <ContentBlockRenderer blocks={group.blocks} {...rendererProps} />
            </div>
          ),
        )}
        {!hasRelatedArticlesBlock && article.related_articles.length > 0 ? (
          <section className={styles.fullBleedSection}>
            <div className={styles.legacyRelatedHeader}>
              <h2 className={styles.relatedHeading}>Related Advice</h2>
            </div>
            <div className={styles.fullBleedCarousel}>
              <RelatedArticlesCarousel items={article.related_articles} />
            </div>
          </section>
        ) : null}
        {article.show_instagram_share ? <InstagramShareSection /> : null}
      </main>
      <SiteFooter />
    </>
  );
}
