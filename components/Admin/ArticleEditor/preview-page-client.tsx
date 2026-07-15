"use client";

import { ArticleShell } from "@/components/ContentBlocks/article-shell";
import { PreviewViewport } from "@/components/Admin/BlockEditor/preview-viewport";
import type { Article } from "@/lib/content-blocks/types";
import styles from "@/components/Admin/BlockEditor/block-editor.module.css";

type PreviewPageClientProps = {
  article: Article;
};

export function ArticlePreviewPageClient({ article }: PreviewPageClientProps) {
  return (
    <div className={styles.fullPagePreview}>
      <PreviewViewport>
        <ArticleShell article={article} />
      </PreviewViewport>
    </div>
  );
}
