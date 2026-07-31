'use client';

import { ExpertProfileShell } from '@/components/ContentBlocks/expert-profile-shell';
import { PreviewViewport } from '@/components/Admin/BlockEditor/preview-viewport';
import type { Expert } from '@/lib/experts/types';
import styles from '@/components/Admin/BlockEditor/block-editor.module.css';

type PreviewPageClientProps = {
  expert: Expert;
};

export function ExpertPreviewPageClient({ expert }: PreviewPageClientProps) {
  return (
    <div className={styles.fullPagePreview}>
      <PreviewViewport>
        <ExpertProfileShell expert={expert} />
      </PreviewViewport>
    </div>
  );
}
