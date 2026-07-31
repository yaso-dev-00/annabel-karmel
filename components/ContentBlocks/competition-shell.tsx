import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { resolveMaxWidth } from '@/lib/content-blocks/max-width';
import type { Competition } from '@/lib/content-blocks/types';
import { ContentBlockRenderer } from './content-block-renderer';
import styles from './advice-article-shell.module.css';

type CompetitionShellProps = {
  competition: Competition;
};

export function CompetitionShell({ competition }: CompetitionShellProps) {
  const containerMaxWidth = resolveMaxWidth(
    competition.content_max_width,
    competition.content_max_width_custom,
  );
  const contentMaxWidth = competition.content_max_width ?? 'default';

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <div
          className={styles.container}
          style={{ maxWidth: containerMaxWidth }}
        >
          <ContentBlockRenderer
            blocks={competition.content_blocks}
            contentMaxWidth={contentMaxWidth}
            contentMaxWidthCustom={competition.content_max_width_custom}
            renderContext="competition"
          />
        </div>
        {competition.show_instagram_share ? <InstagramShareSection /> : null}
      </main>
      <SiteFooter />
    </>
  );
}
