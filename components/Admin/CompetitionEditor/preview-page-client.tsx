'use client';

import { CompetitionShell } from '@/components/ContentBlocks/competition-shell';
import { PreviewViewport } from '@/components/Admin/BlockEditor/preview-viewport';
import type { Competition } from '@/lib/content-blocks/types';
import styles from '@/components/Admin/BlockEditor/block-editor.module.css';

type PreviewPageClientProps = {
  competition: Competition;
};

export function PreviewPageClient({ competition }: PreviewPageClientProps) {
  return (
    <div className={styles.fullPagePreview}>
      <PreviewViewport>
        <CompetitionShell competition={competition} />
      </PreviewViewport>
    </div>
  );
}
