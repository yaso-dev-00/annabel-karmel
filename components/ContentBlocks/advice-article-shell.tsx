import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { resolveMaxWidth } from "@/lib/content-blocks/max-width";
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

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.container} style={{ maxWidth: containerMaxWidth }}>
          <ContentBlockRenderer
            blocks={article.content_blocks}
            contentMaxWidth={contentMaxWidth}
            contentMaxWidthCustom={article.content_max_width_custom}
          />
        </div>
        <section className={styles.relatedSection}>
          <div className={styles.container} style={{ maxWidth: containerMaxWidth }}>
            <h2 className={styles.relatedHeading}>Related Advice</h2>
            <RelatedArticlesCarousel items={article.related_articles} />
          </div>
        </section>
        {article.show_instagram_share ? <InstagramShareSection /> : null}
      </main>
      <SiteFooter />
    </>
  );
}
