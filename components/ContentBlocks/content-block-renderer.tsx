import Link from "next/link";
import type { CSSProperties } from "react";
import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { PreviewBlockWrapper } from "@/components/Admin/BlockEditor/preview-block-wrapper";
import { getImageInlineStyle, getImageStackItemStyle, getTwoColumnImageBleedStyle, getTwoColumnImageDisplayStyle } from "@/lib/admin/block-image-resize";
import { CmsAccordionBlock, CmsExpertAttributionBlock } from "./blocks/cms-accordion-block";
import { CmsCustomForm } from "./blocks/cms-custom-form";
import { CmsRelatedArticlesBlock } from "./blocks/cms-related-articles-block";
import { createDefaultFormSchema } from "@/lib/content-blocks/form-schema";
import type { BlockSettings, ContentBlock, MaxWidthPreset } from "@/lib/content-blocks/types";
import { shouldRenderBlock, type ContentRenderContext } from "@/lib/content-blocks/block-context";
import {
  getAnnouncementBannerStyle,
  getBlockWrapperStyle,
  getCalloutStyle,
  getCtaButtonStyle,
  getExpertAttributionStyle,
  getFormEmbedStyle,
  getHeroStyle,
  getIntrinsicChildBoxStyle,
  getNestedMiniBlockStyle,
  getPartnerPromoStyle,
  getRichTextStyle,
  getTwoColumnBlockStyle,
  getTwoColumnColumnStyle,
  hasBlockChrome,
} from "@/lib/content-blocks/block-styles";
import { hasCustomPadding } from "@/lib/content-blocks/padding";
import { getProseParagraphGapStyle, hasParagraphGap, resolveColumnProseParagraphGap } from "@/lib/content-blocks/block-prose";
import { getImageStackGridStyle } from "@/lib/content-blocks/image-stack-columns";
import { getRecipeGridStyle, recipeGridUsesMatchAspect } from "@/lib/content-blocks/recipe-grid-columns";
import { getProductGridStyle, productGridUsesMatchAspect } from "@/lib/content-blocks/product-grid-columns";
import {
  getImageBlockDesktopStyle,
  getImageBlockMobileStyle,
  getImageBlockSharedSizeVars,
  imageBlockHasCustomSize,
  isImageBlockMobileEnabled,
  resolveImageBlockMobileSrc,
} from "@/lib/content-blocks/image-block-mobile";
import { hasCustomMargin } from "@/lib/content-blocks/margin";
import { resolveImageSrc } from "@/lib/content-blocks/image-src";
import { getRelatedLinkClass, getRelatedLinksListClass, resolveRelatedLinksStyle } from "@/lib/content-blocks/related-links-styles";
import { getTableClassNames, resolveTableInlineStyle } from "@/lib/content-blocks/table-styles";
import styles from "./content-blocks.module.css";

function proseGapClass(settings?: BlockSettings): string {
  return hasParagraphGap(settings) ? styles.blockProseParagraphGap : "";
}

type TwoColumnStyleTarget = "block" | "left" | "right";

type ContentBlockRendererProps = {
  blocks: ContentBlock[];
  contentMaxWidth?: MaxWidthPreset;
  contentMaxWidthCustom?: string;
  previewMode?: boolean;
  selectedBlockId?: string | null;
  selectedTwoColumnTarget?: TwoColumnStyleTarget;
  onBlockSelect?: (id: string) => void;
  onTwoColumnTargetSelect?: (id: string, target: TwoColumnStyleTarget) => void;
  onBlockSettingsChange?: (id: string, patch: Partial<BlockSettings>) => void;
  onBlockDataChange?: (id: string, data: ContentBlock["data"]) => void;
  excludeArticleSlug?: string;
  renderContext?: ContentRenderContext;
};

function spacingClass(settings?: ContentBlock["settings"]) {
  // Block vertical spacing is controlled on .blockWrapper (30px default).
  if (hasCustomMargin(settings)) return "";
  return "";
}

function partnerPromoAlignClass(textAlign?: BlockSettings["text_align"]) {
  switch (textAlign) {
    case "center":
      return styles.partnerPromoAlignCenter;
    case "right":
      return styles.partnerPromoAlignRight;
    case "justify":
      return styles.partnerPromoAlignJustify;
    case "left":
      return styles.partnerPromoAlignLeft;
    default:
      return styles.partnerPromoAlignLeft;
  }
}

function RenderBlock({
  block,
  previewMode,
  excludeArticleSlug,
  renderContext = "competition",
  selectedTwoColumnTarget = "block",
  onTwoColumnTargetSelect,
}: {
  block: ContentBlock;
  previewMode?: boolean;
  excludeArticleSlug?: string;
  renderContext?: ContentRenderContext;
  selectedTwoColumnTarget?: TwoColumnStyleTarget;
  onTwoColumnTargetSelect?: (target: TwoColumnStyleTarget) => void;
}) {
  const wrapClass = spacingClass(block.settings);
  const imageStyle = getImageInlineStyle(block);

  switch (block.type) {
    case "hero": {
      const d = block.data;
      return (
        <section className={`${styles.hero} ${wrapClass}`} style={getHeroStyle(d, block.settings)}>
          <h1 className={styles.heroHeadline} style={{ color: d.text_color }}>
            {d.headline}
          </h1>
          {d.subheadline ? <p className={styles.heroSubheadline}>{d.subheadline}</p> : null}
          {d.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={d.image_url}
              alt={d.image_alt ?? ""}
              className={styles.heroImage}
              data-cms-resize-image="true"
              style={imageStyle}
            />
          ) : null}
          {d.cta_label && d.cta_url ? (
            <Link href={d.cta_url} className={styles.heroCta}>
              {d.cta_label}
            </Link>
          ) : null}
        </section>
      );
    }
    case "rich_text": {
      const d = block.data;
      const cls =
        d.variant === "lead" ? styles.lead : d.variant === "pull_quote" ? styles.pullQuote : styles.body;
      const proseGapSettings = resolveColumnProseParagraphGap(block.settings);
      return (
        <div
          className={`${cls} ${wrapClass} ${styles.blockProse} ${proseGapClass(proseGapSettings)}`.trim()}
          style={{
            ...getRichTextStyle(d.variant, block.settings),
            ...getProseParagraphGapStyle(proseGapSettings),
          }}
          dangerouslySetInnerHTML={{ __html: d.html }}
        />
      );
    }
    case "heading": {
      const d = block.data;
      const cls = d.level === "h1" ? styles.pageTitle : d.level === "h3" ? styles.subTitle : styles.sectionTitle;
      if (d.level === "h1") return <h1 className={`${cls} ${wrapClass}`}>{d.text}</h1>;
      if (d.level === "h3") return <h3 className={`${cls} ${wrapClass}`}>{d.text}</h3>;
      return <h2 className={`${cls} ${wrapClass}`}>{d.text}</h2>;
    }
    case "list": {
      const d = block.data;
      const Tag = d.ordered ? "ol" : "ul";
      const listCls = d.ordered ? styles.orderedList : styles.list;
      const items = d.items
        .map((item) => (typeof item === "string" ? item.trim() : item))
        .filter((item) => (typeof item === "string" ? Boolean(item) : Boolean(item.label || item.text)));
      return (
        <Tag className={`${listCls} ${wrapClass}`}>
          {items.map((item, i) => (
            <li key={i}>
              {typeof item === "string" ? (
                item
              ) : (
                <>
                  <strong className={styles.listLabel}>{item.label}</strong>: {item.text}
                </>
              )}
            </li>
          ))}
        </Tag>
      );
    }
    case "divider": {
      const d = block.data;
      if (d.style === "image" && d.image_src) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={d.image_src} alt="" className={styles.divider} aria-hidden="true" />
        );
      }
      return <hr className={styles.divider} />;
    }
    case "image": {
      const d = block.data;
      const imageSrc = resolveImageSrc(d.src);
      const mobileSrcRaw = isImageBlockMobileEnabled(d) ? resolveImageBlockMobileSrc(d) : undefined;
      const mobileSrc = mobileSrcRaw ? resolveImageSrc(mobileSrcRaw) : undefined;
      const useMobileSwap = Boolean(imageSrc && mobileSrc && mobileSrc !== imageSrc);
      const sized = imageBlockHasCustomSize(d);
      const imageClass = `${styles.image} ${d.full_width ? styles.imageFull : ""} ${sized ? styles.imageSized : ""}`.trim();

      // Swap: each img has its own size. Single img: CSS vars so mobile ≠ desktop.
      const desktopImg = imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={d.alt}
          className={`${imageClass}${useMobileSwap ? ` ${styles.imageDesktop}` : ""}`}
          style={
            useMobileSwap
              ? getImageBlockDesktopStyle(d)
              : getImageBlockSharedSizeVars(d)
          }
          data-cms-resize-image="desktop"
          loading="lazy"
        />
      ) : null;

      const mobileImg =
        useMobileSwap && mobileSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mobileSrc}
            alt={d.alt}
            className={`${imageClass} ${styles.imageMobile}`}
            style={getImageBlockMobileStyle(d)}
            data-cms-resize-image="mobile"
            loading="lazy"
          />
        ) : null;

      const media = useMobileSwap ? (
        <div className={styles.imageSwap}>
          {desktopImg}
          {mobileImg}
        </div>
      ) : (
        desktopImg
      );

      return (
        <figure className={wrapClass}>
          {media ? (d.link_href ? <Link href={d.link_href}>{media}</Link> : media) : null}
          {d.caption ? <figcaption className={styles.caption}>{d.caption}</figcaption> : null}
        </figure>
      );
    }
    case "image_text": {
      const d = block.data;
      const layoutCls =
        d.image_position === "right"
          ? styles.imageTextRight
          : d.image_position === "top"
            ? styles.imageTextTop
            : styles.imageTextLeft;
      const imageSrc = resolveImageSrc(d.image_src);
      const imgEl = imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={d.image_alt}
          className={styles.imageTextImg}
          style={imageStyle}
          data-cms-resize-image="true"
          loading="lazy"
        />
      ) : null;
      const textEl = (
        <div className={styles.imageTextCol}>
          {d.heading ? <h3 className={styles.subTitle}>{d.heading}</h3> : null}
          <div
            className={`${styles.body} ${styles.blockProse} ${proseGapClass(block.settings)}`.trim()}
            style={getProseParagraphGapStyle(block.settings)}
            dangerouslySetInnerHTML={{ __html: d.body }}
          />
        </div>
      );
      return (
        <div className={`${styles.imageText} ${layoutCls} ${wrapClass}`}>
          {d.image_first !== false && d.image_position !== "right" ? (
            <>
              {imgEl}
              {textEl}
            </>
          ) : d.image_position === "right" ? (
            <>
              {textEl}
              {imgEl}
            </>
          ) : (
            <>
              {imgEl}
              {textEl}
            </>
          )}
        </div>
      );
    }
    case "image_stack": {
      const d = block.data;
      const isGrid = d.layout === "grid";
      const matchAspect = isGrid && d.image_aspect && d.image_aspect !== "auto";
      const layoutCls = isGrid
        ? `${styles.imageStackGrid}${matchAspect ? ` ${styles.imageStackGridMatchAspect}` : ""}`
        : styles.imageStackVertical;
      return (
        <div className={`${layoutCls} ${wrapClass}`} style={getImageStackGridStyle(d)}>
          {d.images.map((img, index) => {
            const imageSrc = resolveImageSrc(img.src);
            return (
              <figure key={img.id ?? imageSrc ?? `image-stack-${index}`}>
                {imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageSrc}
                    alt={img.alt}
                    className={styles.imageStackImg}
                    style={getImageStackItemStyle(img, { grid: isGrid, matchAspect: Boolean(matchAspect) })}
                    data-cms-resize-image="true"
                    data-cms-image-index={index}
                    loading="lazy"
                  />
                ) : null}
                {img.caption ? <figcaption className={styles.caption}>{img.caption}</figcaption> : null}
              </figure>
            );
          })}
        </div>
      );
    }
    case "accordion":
      return (
        <CmsAccordionBlock
          data={block.data}
          style={getIntrinsicChildBoxStyle(block.settings, {
            backgroundColor: block.settings?.background_color?.trim() || "#ffffff",
            clipOverflow: false,
          })}
          paragraphGapSettings={hasParagraphGap(block.settings) ? block.settings : undefined}
        />
      );
    case "table": {
      const d = block.data;
      const tableClass = getTableClassNames(d, styles);
      const tableStyle = resolveTableInlineStyle(d);
      return (
        <div className={styles.tableWrap} style={getIntrinsicChildBoxStyle(block.settings, { clipOverflow: false })}>
          {d.caption ? <p className={styles.tableCaption}>{d.caption}</p> : null}
          <table className={tableClass} style={tableStyle}>
            <tbody>
              {d.rows.map((row) => (
                <tr key={`${row.label}-${row.value}`}>
                  <th scope="row">{row.label}</th>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "multi_column_table": {
      const d = block.data;
      const tableClass = getTableClassNames(d, styles, { multiColumn: true });
      const tableStyle = resolveTableInlineStyle(d);
      return (
        <div className={styles.tableWrap} style={getIntrinsicChildBoxStyle(block.settings, { clipOverflow: false })}>
          {d.caption ? <p className={styles.tableCaption}>{d.caption}</p> : null}
          <table className={tableClass} style={tableStyle}>
            <thead>
              <tr>
                {d.headers.map((header, index) => (
                  <th key={`header-${index}`} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    case "callout": {
      const d = block.data;
      const variantCls =
        d.variant === "warning"
          ? styles.calloutWarning
          : d.variant === "highlight"
            ? styles.calloutHighlight
            : "";
      return (
        <aside className={`${styles.callout} ${variantCls} ${wrapClass}`} style={getCalloutStyle(d, block.settings)}>
          {d.title ? <p className={styles.calloutTitle}>{d.title}</p> : null}
          <div
            className={`${styles.blockProse} ${proseGapClass(block.settings)}`.trim()}
            style={getProseParagraphGapStyle(block.settings)}
            dangerouslySetInnerHTML={{ __html: d.body }}
          />
        </aside>
      );
    }
    case "cta_button": {
      const d = block.data;
      return (
        <Link
          href={d.url}
          className={`${styles.ctaButton} ${d.style === "secondary" ? styles.ctaSecondary : styles.ctaPrimary}`}
          style={getCtaButtonStyle(block.settings)}
          target={d.open_in_new_tab ? "_blank" : undefined}
          rel={d.open_in_new_tab ? "noreferrer" : undefined}
        >
          {d.label}
        </Link>
      );
    }
    case "related_links": {
      const d = block.data;
      const listClass = getRelatedLinksListClass(d, styles);
      const linkClass = getRelatedLinkClass(d, styles);
      const linkStyle = resolveRelatedLinksStyle(d);
      const chrome = hasBlockChrome(block.settings);
      const isRow = d.layout === "row";
      const content = (
        <>
          {d.intro ? (
            <div
              className={`${styles.relatedIntro} ${styles.blockProse} ${proseGapClass(block.settings)}`.trim()}
              style={getProseParagraphGapStyle(block.settings)}
              dangerouslySetInnerHTML={{ __html: d.intro }}
            />
          ) : null}
          <ul className={listClass}>
            {d.links.map((link) => {
              const iconSrc = resolveImageSrc(link.icon_src ?? "");
              return (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href} className={linkClass} target={isRow ? "_blank" : undefined} rel={isRow ? "noreferrer" : undefined}>
                    {iconSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={iconSrc} alt={link.icon_alt || ""} className={styles.relatedSocialIcon} />
                    ) : null}
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      );

      return (
        <div className={wrapClass} style={isRow ? undefined : linkStyle}>
          {chrome ? (
            <div
              className={styles.relatedLinksChrome}
              style={getIntrinsicChildBoxStyle(block.settings, { clipOverflow: false })}
            >
              {content}
            </div>
          ) : (
            content
          )}
        </div>
      );
    }
    case "related_articles": {
      return (
        <CmsRelatedArticlesBlock
          data={block.data}
          previewMode={previewMode}
          excludeSlug={excludeArticleSlug}
          catalog={renderContext === "article" ? "article" : "advice"}
        />
      );
    }
    case "expert_attribution": {
      const d = block.data;
      return (
        <CmsExpertAttributionBlock
          {...d}
          previewMode={previewMode}
          style={getExpertAttributionStyle(d.preset, block.settings)}
        />
      );
    }
    case "announcement_banner": {
      const d = block.data;
      return (
        <div className={styles.banner} style={getAnnouncementBannerStyle(d, block.settings)}>
          {d.message}
          {d.link_url && d.link_label ? (
            <>
              {" "}
              <Link href={d.link_url} className={styles.inlineLink}>
                {d.link_label}
              </Link>
            </>
          ) : null}
        </div>
      );
    }
    case "product_grid": {
      const d = block.data;
      return (
        <div
          className={`${styles.grid} ${styles.cmsResponsiveGrid}${
            productGridUsesMatchAspect(d)
              ? ` ${styles.cmsResponsiveGridMatchAspect}`
              : ` ${styles.cmsResponsiveGridNatural}`
          }`}
          style={{
            ...getIntrinsicChildBoxStyle(block.settings),
            ...getProductGridStyle(d),
          }}
        >
          {d.items.map((item, index) => {
            const imageSrc = resolveImageSrc(item.image);
            return (
              <Link key={`${item.url}-${item.title}-${index}`} href={item.url} className={styles.gridCard}>
                {imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageSrc} alt={item.title} loading="lazy" />
                ) : null}
                <p className={styles.gridCardTitle}>{item.title}</p>
              </Link>
            );
          })}
        </div>
      );
    }
    case "recipe_grid": {
      const d = block.data;
      if (d.layout === "carousel" && d.items.length > 0) {
        return (
          <div style={getIntrinsicChildBoxStyle(block.settings)}>
            <ArticleRecipeCarousel
              embedded={previewMode}
              items={d.items.map((item) => ({
                title: item.title,
                href: item.url,
                image: item.image,
                appExclusive: item.app_exclusive,
              }))}
              perDesktopView={previewMode ? 4 : 5}
              className={previewMode ? "mt-0" : "mt-[60px]"}
            />
          </div>
        );
      }
      return (
        <div
          className={`${styles.grid} ${styles.cmsResponsiveGrid}${
            recipeGridUsesMatchAspect(d)
              ? ` ${styles.cmsResponsiveGridMatchAspect}`
              : ` ${styles.cmsResponsiveGridNatural}`
          }`}
          style={{
            ...getIntrinsicChildBoxStyle(block.settings),
            ...getRecipeGridStyle(d),
          }}
        >
          {d.items.map((item, index) => {
            const imageSrc = resolveImageSrc(item.image);
            return (
              <Link key={`${item.url}-${item.title}-${index}`} href={item.url} className={styles.gridCard}>
                {imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageSrc} alt={item.title} loading="lazy" />
                ) : null}
                <p className={styles.gridCardTitle}>{item.title}</p>
              </Link>
            );
          })}
        </div>
      );
    }
    case "video": {
      const d = block.data;
      return (
        <figure className={wrapClass}>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            {d.provider === "youtube" && d.url ? (
              <iframe
                src={d.url.includes("embed") ? d.url : `https://www.youtube.com/embed/${extractYoutubeId(d.url)}`}
                title="Video"
                className="h-full w-full"
                allowFullScreen
              />
            ) : d.url ? (
              <video src={d.url} controls className="h-full w-full" />
            ) : null}
          </div>
          {d.caption ? <figcaption className={styles.caption}>{d.caption}</figcaption> : null}
        </figure>
      );
    }
    case "form_embed": {
      const d = block.data;
      const mode = d.mode ?? (d.schema ? "builder" : "embed");
      const formChromeStyle = getFormEmbedStyle(block.settings);
      if (mode === "builder") {
        return (
          <CmsCustomForm
            schema={d.schema ?? createDefaultFormSchema()}
            previewMode={previewMode}
            chromeStyle={formChromeStyle}
          />
        );
      }
      return (
        <div style={formChromeStyle}>
          {d.title ? <h3 className={styles.subTitle}>{d.title}</h3> : null}
          {d.embed_code ? <div dangerouslySetInnerHTML={{ __html: d.embed_code }} /> : null}
        </div>
      );
    }
    case "partner_promo": {
      const d = block.data;
      const logo = d.logo_src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={d.logo_src} alt={d.logo_alt} className={styles.partnerPromoLogo} />
      ) : null;
      const alignClass = partnerPromoAlignClass(block.settings?.text_align);
      return (
        <aside
          className={`${styles.callout} ${styles.partnerPromo} ${alignClass} ${d.layout === "stacked" ? styles.partnerPromoStacked : ""}`}
          style={getPartnerPromoStyle(block.settings)}
        >
          {logo ? (d.logo_href ? <Link href={d.logo_href}>{logo}</Link> : logo) : null}
          <div className={styles.imageTextCol}>
            {d.title ? <p className={styles.calloutTitle}>{d.title}</p> : null}
            {d.body ? (
              <div
                className={`${styles.blockProse} ${proseGapClass(block.settings)}`.trim()}
                style={getProseParagraphGapStyle(block.settings)}
                dangerouslySetInnerHTML={{ __html: d.body }}
              />
            ) : null}
            {d.links?.length ? (
              <div className={styles.partnerPromoLinks}>
                {d.links.map((link) => (
                  <Link key={`${link.href}-${link.label}`} href={link.href} className={styles.inlineLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </aside>
      );
    }
    case "partnership_tag": {
      const d = block.data;
      const logoSrc = resolveImageSrc(d.logo_src);
      const logo = logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoSrc} alt={d.logo_alt} className={styles.partnershipTagLogo} />
      ) : null;
      return (
        <div className={`${styles.partnershipTag} ${wrapClass}`}>
          <p className={styles.partnershipTagLabel}>{d.label || "In partnership with"}</p>
          {logo ? (d.logo_href ? <Link href={d.logo_href} className={styles.partnershipTagLogoLink}>{logo}</Link> : logo) : null}
        </div>
      );
    }
    case "book_promo": {
      const d = block.data;
      return (
        <aside className={`${styles.imageText} ${styles.imageTextLeft} ${wrapClass}`}>
          {resolveImageSrc(d.cover_src) ? (
            <Link href={d.book_href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImageSrc(d.cover_src)!}
                alt={d.cover_alt}
                className={styles.imageTextImg}
                style={imageStyle}
                data-cms-resize-image="true"
              />
            </Link>
          ) : null}
          <div className={styles.imageTextCol}>
            <h3 className={styles.subTitle}>{d.book_title}</h3>
            <div
              className={`${styles.body} ${styles.blockProse} ${proseGapClass(block.settings)}`.trim()}
              style={getProseParagraphGapStyle(block.settings)}
              dangerouslySetInnerHTML={{ __html: d.body }}
            />
          </div>
        </aside>
      );
    }
    case "author_bio": {
      const d = block.data;
      return (
        <aside className={`${styles.imageText} ${styles.imageTextLeft} ${wrapClass}`}>
          {resolveImageSrc(d.photo_src) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolveImageSrc(d.photo_src)!}
              alt={d.photo_alt}
              className={styles.imageTextImg}
              style={imageStyle}
              data-cms-resize-image="true"
            />
          ) : null}
          <div
            className={`${styles.imageTextCol} ${proseGapClass(block.settings)}`.trim()}
            style={getProseParagraphGapStyle(block.settings)}
          >
            <h3 className={styles.subTitle}>{d.name}</h3>
            {d.bio_paragraphs.map((p) => (
              <p key={p} className={styles.body}>
                {p}
              </p>
            ))}
          </div>
        </aside>
      );
    }
    case "two_column": {
      const d = block.data;
      let imageFlatIndex = 0;
      const renderColumn = (minis: typeof d.left_blocks, columnSettings?: BlockSettings) =>
        minis.map((mini, i) => {
          const imageIndex =
            mini.type === "image" && mini.src?.trim() ? imageFlatIndex++ : undefined;
          const proseGapSettings = resolveColumnProseParagraphGap(columnSettings, block.settings);
          return (
            <MiniBlock
              key={mini.id ?? i}
              block={mini}
              imageIndex={imageIndex}
              inTwoColumn
              proseGapSettings={proseGapSettings}
            />
          );
        });
      const renderColumnShell = (
        column: "left" | "right",
        minis: typeof d.left_blocks,
        columnSettings?: BlockSettings,
      ) => {
        const columnSelected = previewMode && selectedTwoColumnTarget === column;
        const columnCustomPadding = hasCustomPadding(columnSettings);
        const isImageOnlyColumn =
          minis.length === 1 && minis[0]?.type === "image" && Boolean(minis[0].src?.trim());
        const hasImage = minis.some((mini) => mini.type === "image" && mini.src?.trim());
        const columnStyle = {
          ...getTwoColumnColumnStyle(columnSettings, hasImage),
          ...getTwoColumnImageBleedStyle(block.settings, isImageOnlyColumn),
        };
        return (
          <div
            className={`${styles.twoColumnCol} ${hasImage ? styles.twoColumnColHasImage : ""} ${isImageOnlyColumn ? styles.twoColumnColMedia : ""} ${columnCustomPadding ? styles.twoColumnColCustomPadding : ""} ${previewMode ? styles.twoColumnColEditable : ""} ${columnSelected ? styles.twoColumnColSelected : ""}`}
            style={columnStyle}
            data-cms-column={column}
            data-cms-interactive={previewMode ? "true" : undefined}
            onClick={
              previewMode && onTwoColumnTargetSelect
                ? (e) => {
                    e.stopPropagation();
                    onTwoColumnTargetSelect(column);
                  }
                : undefined
            }
            onKeyDown={
              previewMode && onTwoColumnTargetSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      onTwoColumnTargetSelect(column);
                    }
                  }
                : undefined
            }
            role={previewMode && onTwoColumnTargetSelect ? "button" : undefined}
            tabIndex={previewMode && onTwoColumnTargetSelect ? 0 : undefined}
            aria-label={
              previewMode && onTwoColumnTargetSelect
                ? `Select ${column} column styles`
                : undefined
            }
          >
            {renderColumn(minis, columnSettings)}
          </div>
        );
      };
      const blockCustomPadding = hasCustomPadding(block.settings);
      return (
        <div
          className={`${styles.twoColumn} ${blockCustomPadding ? styles.twoColumnBlockCustomPadding : ""} ${wrapClass} ${previewMode ? styles.twoColumnEditable : ""}`}
          style={getTwoColumnBlockStyle(block.settings)}
          onClick={
            previewMode && onTwoColumnTargetSelect
              ? (e) => {
                  if ((e.target as HTMLElement).closest("[data-cms-column]")) return;
                  e.stopPropagation();
                  onTwoColumnTargetSelect("block");
                }
              : undefined
          }
        >
          {renderColumnShell("left", d.left_blocks, d.left_settings)}
          {renderColumnShell("right", d.right_blocks, d.right_settings)}
        </div>
      );
    }
    default:
      return null;
  }
}

function MiniBlock({
  block,
  imageIndex,
  inTwoColumn = false,
  proseGapSettings,
}: {
  block: import("@/lib/content-blocks/types").NestedMiniBlock;
  imageIndex?: number;
  inTwoColumn?: boolean;
  proseGapSettings?: import("@/lib/content-blocks/types").BlockSettings;
}) {
  const layoutStyle = getNestedMiniBlockStyle(block.style);

  switch (block.type) {
    case "rich_text": {
      const proseGapClassName = proseGapClass(proseGapSettings);
      const proseGapStyle = getProseParagraphGapStyle(proseGapSettings);
      return (
        <div
          className={`${styles.body} ${styles.blockProse} ${proseGapClassName}`.trim()}
          style={{ ...layoutStyle, ...proseGapStyle }}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    }
    case "image": {
      const imageSrc = resolveImageSrc(block.src);
      if (!imageSrc) return null;
      const sizeStyle = inTwoColumn
        ? getTwoColumnImageDisplayStyle(block)
        : block.width || block.height
          ? {
              width: "100%",
              maxWidth: block.width ?? "100%",
              height: block.height || "auto",
              objectFit: (block.height ? "cover" : undefined) as "cover" | undefined,
            }
          : undefined;
      const image = (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={block.alt}
          className={styles.image}
          loading="lazy"
          style={sizeStyle}
          data-cms-resize-image="true"
          data-cms-image-index={imageIndex != null ? String(imageIndex) : undefined}
        />
      );
      return layoutStyle ? <div style={layoutStyle}>{image}</div> : image;
    }
    case "cta_button":
      return (
        <div style={layoutStyle}>
          <Link href={block.url} className={`${styles.ctaButton} ${styles.ctaPrimary}`}>
            {block.label}
          </Link>
        </div>
      );
    case "list": {
      const items = block.items.map((item) => item.trim()).filter(Boolean);
      return block.ordered ? (
        <ol className={styles.orderedList} style={layoutStyle}>
          {items.map((item, i) => (
            <li key={`${i}-${item}`}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className={styles.list} style={layoutStyle}>
          {items.map((item, i) => (
            <li key={`${i}-${item}`}>{item}</li>
          ))}
        </ul>
      );
    }
    default:
      return null;
  }
}

function extractYoutubeId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=)([\w-]+)/);
  return match?.[1] ?? url;
}

function isRecipeCarouselBlock(block: ContentBlock): boolean {
  return block.type === "recipe_grid" && block.data.layout === "carousel";
}

function isFullWidthCarouselBlock(block: ContentBlock): boolean {
  return isRecipeCarouselBlock(block) || block.type === "related_articles";
}

function getBlockWrapperStyleForRender(
  block: ContentBlock,
  contentMaxWidth?: MaxWidthPreset,
  contentMaxWidthCustom?: string,
): CSSProperties {
  const style = getBlockWrapperStyle(
    block.settings,
    contentMaxWidth,
    contentMaxWidthCustom,
    block.type,
  );
  if (!isFullWidthCarouselBlock(block)) return style;
  return {
    ...style,
    maxWidth: "none",
    width: "100%",
    marginLeft: 0,
    marginRight: 0,
  };
}

function getPreviewBlockWrapperStyle(
  block: ContentBlock,
  contentMaxWidth?: MaxWidthPreset,
  contentMaxWidthCustom?: string,
) {
  return getBlockWrapperStyleForRender(block, contentMaxWidth, contentMaxWidthCustom);
}

export function ContentBlockRenderer({
  blocks,
  contentMaxWidth = "default",
  contentMaxWidthCustom,
  previewMode = false,
  selectedBlockId = null,
  selectedTwoColumnTarget = "block",
  onBlockSelect,
  onTwoColumnTargetSelect,
  onBlockSettingsChange,
  onBlockDataChange,
  excludeArticleSlug,
  renderContext = "competition",
}: ContentBlockRendererProps) {
  const sorted = blocks
    .slice()
    .sort((a, b) => a.order - b.order)
    .filter((block) => previewMode || !block.settings?.hidden)
    .filter((block) => shouldRenderBlock(block.type, renderContext));
  return (
    <div>
      {sorted.map((block) => {
        const selected = previewMode && selectedBlockId === block.id;
        return (
          <PreviewBlockWrapper
            key={block.id}
            block={block}
            selected={selected}
            previewMode={previewMode}
            style={
              previewMode
                ? getPreviewBlockWrapperStyle(block, contentMaxWidth, contentMaxWidthCustom)
                : getBlockWrapperStyleForRender(block, contentMaxWidth, contentMaxWidthCustom)
            }
            onSelect={onBlockSelect ? () => onBlockSelect(block.id) : undefined}
            onSettingsChange={
              onBlockSettingsChange
                ? (patch) => onBlockSettingsChange(block.id, patch)
                : undefined
            }
            onDataChange={
              onBlockDataChange ? (data) => onBlockDataChange(block.id, data) : undefined
            }
          >
            <RenderBlock
              block={block}
              previewMode={previewMode}
              excludeArticleSlug={excludeArticleSlug}
              renderContext={renderContext}
              selectedTwoColumnTarget={
                previewMode && selectedBlockId === block.id ? selectedTwoColumnTarget : "block"
              }
              onTwoColumnTargetSelect={
                previewMode && onTwoColumnTargetSelect && block.type === "two_column"
                  ? (target) => onTwoColumnTargetSelect(block.id, target)
                  : undefined
              }
            />
          </PreviewBlockWrapper>
        );
      })}
    </div>
  );
}
