import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { resolveMaxWidth } from "@/lib/content-blocks/max-width";
import type { PartnerPage } from "@/lib/content-blocks/types";
import { ContentBlockRenderer } from "./content-block-renderer";
import styles from "./advice-article-shell.module.css";

type PartnerPageShellProps = {
  partner: PartnerPage;
};

export function PartnerPageShell({ partner }: PartnerPageShellProps) {
  const containerMaxWidth = resolveMaxWidth(
    partner.content_max_width,
    partner.content_max_width_custom,
  );
  const contentMaxWidth = partner.content_max_width ?? "default";

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <div className={styles.container} style={{ maxWidth: containerMaxWidth }}>
          <ContentBlockRenderer
            blocks={partner.content_blocks}
            contentMaxWidth={contentMaxWidth}
            contentMaxWidthCustom={partner.content_max_width_custom}
            renderContext="partners"
          />
        </div>
        {partner.show_instagram_share ? <InstagramShareSection /> : null}
      </main>
      <SiteFooter />
    </>
  );
}
