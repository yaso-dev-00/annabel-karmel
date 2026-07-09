"use client";

import { AdviceArticleShell } from "@/components/ContentBlocks/advice-article-shell";
import { PreviewViewport } from "@/components/Admin/BlockEditor/preview-viewport";
import type { AdviceArticle } from "@/lib/content-blocks/types";
import styles from "@/components/Admin/BlockEditor/block-editor.module.css";

type PreviewPageClientProps = {
  article: AdviceArticle;
};

export function PreviewPageClient({ article }: PreviewPageClientProps) {
  return (
    <div className={styles.fullPagePreview}>
      <PreviewViewport>
        <AdviceArticleShell article={article} />
      </PreviewViewport>
    </div>
  );
}
