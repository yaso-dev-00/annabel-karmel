'use client';

import { PartnerPageShell } from '@/components/ContentBlocks/partner-page-shell';
import { PreviewViewport } from '@/components/Admin/BlockEditor/preview-viewport';
import type { PartnerPage } from '@/lib/content-blocks/types';
import styles from '@/components/Admin/BlockEditor/block-editor.module.css';

type PreviewPageClientProps = {
  partner: PartnerPage;
};

export function PreviewPageClient({ partner }: PreviewPageClientProps) {
  return (
    <div className={styles.fullPagePreview}>
      <PreviewViewport>
        <PartnerPageShell partner={partner} />
      </PreviewViewport>
    </div>
  );
}
