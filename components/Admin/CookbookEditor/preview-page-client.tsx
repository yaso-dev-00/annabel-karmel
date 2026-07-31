'use client';

import { CookbookLivePreview } from '@/components/Admin/CookbookEditor/cookbook-live-preview';
import type { Cookbook } from '@/lib/cookbooks/types';
import styles from '@/components/Admin/BlockEditor/block-editor.module.css';

type PreviewPageClientProps = {
  cookbook: Cookbook;
};

export function CookbookPreviewPageClient({
  cookbook,
}: PreviewPageClientProps) {
  return (
    <div className={styles.fullPagePreview}>
      <CookbookLivePreview cookbook={cookbook} defaultFullscreen />
    </div>
  );
}
