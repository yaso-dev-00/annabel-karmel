'use client';

import { ImageField } from '@/components/Admin/Ui/ImageField';
import { ColorField, ColorThemePanel } from '@/components/Admin/Ui/ColorField';
import { createBlockId } from '@/lib/content-blocks/defaults';
import type {
  BlockDataByType,
  BlockSettings,
  ContentBlock,
  HeroBlockData,
  RichTextBlockData,
  HeadingBlockData,
  ListBlockData,
  ImageBlockData,
  ImageTextBlockData,
  CalloutBlockData,
  TableBlockData,
  MultiColumnTableBlockData,
  AccordionBlockData,
  AccordionSubsection,
  TwoColumnBlockData,
  RelatedLinksBlockData,
  RelatedArticlesBlockData,
  ExpertAttributionBlockData,
  CtaButtonBlockData,
  DividerBlockData,
  VideoBlockData,
  FormEmbedBlockData,
  AnnouncementBannerBlockData,
  ProductGridBlockData,
  RecipeGridBlockData,
  PartnerPromoBlockData,
  PartnershipTagBlockData,
  BookPromoBlockData,
  AuthorBioBlockData,
  ImageStackBlockData,
} from '@/lib/content-blocks/types';
import {
  resolveHeroBackgroundColor,
  HERO_DEFAULT_BACKGROUND,
} from '@/lib/content-blocks/block-background';
import { DS_BACKGROUND_PRESETS } from '@/lib/design-system/color-presets';
import {
  createEmptyMultiColumnRow,
  MULTI_COLUMN_COUNT_LABELS,
  MULTI_COLUMN_TABLE_COUNTS,
  resizeMultiColumnTable,
} from '@/lib/content-blocks/multi-column-table';
import { FormBuilder } from '@/components/Admin/FormBuilder';
import { createDefaultFormSchema } from '@/lib/content-blocks/form-schema';
import { RichTextEditor } from './rich-text-editor';
import { TwoColumnFields } from './two-column-fields';
import { ImageStackFields } from './image-stack-fields';
import { RelatedArticlesFields } from './related-articles-fields';
import { ResponsiveGridColumnsField } from './responsive-grid-columns-field';
import { RESPONSIVE_GRID_DEFAULT_COLUMNS } from '@/lib/content-blocks/responsive-grid-columns';
import { withProductGridColumnDefaults } from '@/lib/content-blocks/product-grid-columns';
import { withRecipeGridColumnDefaults } from '@/lib/content-blocks/recipe-grid-columns';
import type { ContentEditorContext } from '@/lib/content-blocks/block-context';
import {
  DEFAULT_LINK_COLOR,
  RELATED_LINK_COLOR_PRESETS,
  RELATED_LINK_STYLE_LABELS,
  RELATED_LIST_SPACING_LABELS,
} from '@/lib/content-blocks/related-links-styles';
import {
  DEFAULT_TABLE_COLORS,
  TABLE_BORDER_LABELS,
  TABLE_BORDER_PRESETS,
  TABLE_HEADER_BG_PRESETS,
  TABLE_LABEL_WIDTH_LABELS,
  TABLE_ROW_BG_PRESETS,
  TABLE_STYLE_LABELS,
  TABLE_TEXT_PRESETS,
  type TableAppearanceData,
} from '@/lib/content-blocks/table-styles';

type BlockFormFieldsProps = {
  block: ContentBlock;
  onChange: (data: ContentBlock['data']) => void;
  onSettingsChange?: (patch: Partial<BlockSettings>) => void;
  relatedArticlesCatalog?: 'advice' | 'article';
  editorContext?: ContentEditorContext;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label className="fieldLabel">{label}</label>
      {children}
    </div>
  );
}

function TableAppearanceFields({
  data,
  onPatch,
}: {
  data: TableAppearanceData;
  onPatch: (patch: Partial<TableAppearanceData>) => void;
}) {
  return (
    <>
      <Field label="Table style">
        <select
          className="fieldSelect"
          value={data.style}
          onChange={(e) =>
            onPatch({ style: e.target.value as TableAppearanceData['style'] })
          }
        >
          {(
            Object.keys(TABLE_STYLE_LABELS) as TableAppearanceData['style'][]
          ).map((key) => (
            <option key={key} value={key}>
              {TABLE_STYLE_LABELS[key]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Borders">
        <select
          className="fieldSelect"
          value={data.border_style ?? 'full'}
          onChange={(e) =>
            onPatch({
              border_style: e.target
                .value as TableAppearanceData['border_style'],
            })
          }
        >
          {(
            Object.keys(TABLE_BORDER_LABELS) as NonNullable<
              TableAppearanceData['border_style']
            >[]
          ).map((key) => (
            <option key={key} value={key}>
              {TABLE_BORDER_LABELS[key]}
            </option>
          ))}
        </select>
      </Field>
      <ColorThemePanel
        title="Table colors"
        hint="Curated presets with custom picker for each role."
      >
        <ColorField
          label="Header background"
          value={data.header_bg}
          defaultColor={DEFAULT_TABLE_COLORS.header_bg}
          presets={TABLE_HEADER_BG_PRESETS}
          onChange={(header_bg) => onPatch({ header_bg })}
        />
        <ColorField
          label="Row background"
          value={data.row_bg}
          defaultColor={DEFAULT_TABLE_COLORS.row_bg}
          presets={TABLE_ROW_BG_PRESETS}
          onChange={(row_bg) => onPatch({ row_bg })}
        />
        {data.style === 'striped' ? (
          <ColorField
            label="Striped row background"
            value={data.striped_row_bg}
            defaultColor={DEFAULT_TABLE_COLORS.striped_row_bg}
            presets={TABLE_ROW_BG_PRESETS}
            onChange={(striped_row_bg) => onPatch({ striped_row_bg })}
          />
        ) : null}
        <ColorField
          label="Border color"
          value={data.border_color}
          defaultColor={DEFAULT_TABLE_COLORS.border_color}
          presets={TABLE_BORDER_PRESETS}
          onChange={(border_color) => onPatch({ border_color })}
        />
        <ColorField
          label="Header text color"
          value={data.header_text_color}
          defaultColor={DEFAULT_TABLE_COLORS.header_text_color}
          presets={TABLE_TEXT_PRESETS}
          onChange={(header_text_color) => onPatch({ header_text_color })}
        />
        <ColorField
          label="Body text color"
          value={data.body_text_color}
          defaultColor={DEFAULT_TABLE_COLORS.body_text_color}
          presets={TABLE_TEXT_PRESETS}
          onChange={(body_text_color) => onPatch({ body_text_color })}
        />
      </ColorThemePanel>
    </>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="fieldCheckbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

export function BlockFormFields({
  block,
  onChange,
  onSettingsChange,
  relatedArticlesCatalog = 'advice',
  editorContext = 'competition',
}: BlockFormFieldsProps) {
  const patch = (data: ContentBlock['data']) => onChange(data);

  switch (block.type) {
    case 'hero': {
      const d = block.data as HeroBlockData;
      return (
        <>
          <Field label="Headline">
            <input
              className="fieldInput"
              value={d.headline}
              onChange={(e) => patch({ ...d, headline: e.target.value })}
            />
          </Field>
          <Field label="Subheadline">
            <input
              className="fieldInput"
              value={d.subheadline ?? ''}
              onChange={(e) => patch({ ...d, subheadline: e.target.value })}
            />
          </Field>
          <Field label="Hero image">
            <ImageField
              value={d.image_url ?? ''}
              alt={d.image_alt ?? ''}
              onChange={(src, altVal) =>
                patch({
                  ...d,
                  image_url: src,
                  image_alt: altVal ?? d.image_alt ?? '',
                })
              }
              onAltChange={(altVal) => patch({ ...d, image_alt: altVal })}
            />
          </Field>
          <Field label="CTA label">
            <input
              className="fieldInput"
              value={d.cta_label ?? ''}
              onChange={(e) => patch({ ...d, cta_label: e.target.value })}
            />
          </Field>
          <Field label="CTA URL">
            <input
              className="fieldInput"
              value={d.cta_url ?? ''}
              onChange={(e) => patch({ ...d, cta_url: e.target.value })}
            />
          </Field>
          <ColorThemePanel
            title="Hero colors"
            hint="Shared with the layout toolbar — changes apply in both places."
          >
            <ColorField
              label="Background"
              value={resolveHeroBackgroundColor(d, block.settings)}
              defaultColor={HERO_DEFAULT_BACKGROUND}
              presets={DS_BACKGROUND_PRESETS}
              onChange={(background_color) => {
                onSettingsChange?.({ background_color });
                if (d.background_color)
                  patch({ ...d, background_color: undefined });
              }}
            />
          </ColorThemePanel>
        </>
      );
    }
    case 'rich_text': {
      const d = block.data as RichTextBlockData;
      return (
        <>
          <Field label="Variant">
            <select
              className="fieldSelect"
              value={d.variant}
              onChange={(e) =>
                patch({ ...d, variant: e.target.value as typeof d.variant })
              }
            >
              <option value="body">Body</option>
              <option value="lead">Lead</option>
              <option value="pull_quote">Pull quote</option>
            </select>
          </Field>
          <Field label="Content">
            <RichTextEditor
              value={d.html}
              onChange={(html) => patch({ ...d, html })}
            />
          </Field>
        </>
      );
    }
    case 'heading': {
      const d = block.data as HeadingBlockData;
      return (
        <>
          <Field label="Level">
            <select
              className="fieldSelect"
              value={d.level}
              onChange={(e) =>
                patch({ ...d, level: e.target.value as typeof d.level })
              }
            >
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
            </select>
          </Field>
          <Field label="Text">
            <input
              className="fieldInput"
              value={d.text}
              onChange={(e) => patch({ ...d, text: e.target.value })}
            />
          </Field>
        </>
      );
    }
    case 'list': {
      const d = block.data as ListBlockData;
      return (
        <>
          <Field label="Style">
            <select
              className="fieldSelect"
              value={d.style}
              onChange={(e) =>
                patch({ ...d, style: e.target.value as typeof d.style })
              }
            >
              <option value="plain">Plain</option>
              <option value="labeled">Label + text</option>
            </select>
          </Field>
          <CheckboxField
            label="Ordered"
            checked={d.ordered}
            onChange={(ordered) => patch({ ...d, ordered })}
          />
          <Field label="Items">
            <div className="nestedList">
              {d.items.map((item, i) => (
                <div key={i} className="nestedRow">
                  {d.style === 'labeled' && typeof item === 'object' ? (
                    <>
                      <input
                        className="fieldInput"
                        placeholder="Label"
                        value={item.label}
                        onChange={(e) => {
                          const items = [...d.items];
                          items[i] = {
                            ...(item as { label: string; text: string }),
                            label: e.target.value,
                          };
                          patch({ ...d, items });
                        }}
                      />
                      <input
                        className="fieldInput"
                        placeholder="Text"
                        value={item.text}
                        onChange={(e) => {
                          const items = [...d.items];
                          items[i] = {
                            ...(item as { label: string; text: string }),
                            text: e.target.value,
                          };
                          patch({ ...d, items });
                        }}
                      />
                    </>
                  ) : (
                    <input
                      className="fieldInput"
                      style={{ gridColumn: '1 / 3' }}
                      value={typeof item === 'string' ? item : item.text}
                      onChange={(e) => {
                        const items = [...d.items];
                        items[i] = e.target.value;
                        patch({ ...d, items });
                      }}
                    />
                  )}
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={() =>
                      patch({
                        ...d,
                        items: d.items.filter((_, idx) => idx !== i),
                      })
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btnGhost"
                onClick={() =>
                  patch({
                    ...d,
                    items: [
                      ...d.items,
                      d.style === 'labeled' ? { label: '', text: '' } : '',
                    ],
                  })
                }
              >
                + Add item
              </button>
            </div>
          </Field>
        </>
      );
    }
    case 'image': {
      const d = block.data as ImageBlockData;
      const mobileEnabled =
        d.use_mobile_image ??
        Boolean(d.mobile_src?.trim() || d.fallback_src?.trim());
      const mobileSrc = d.mobile_src ?? d.fallback_src ?? '';
      return (
        <>
          <Field label="Image (desktop)">
            <ImageField
              value={d.src}
              alt={d.alt}
              onChange={(src, altVal) =>
                patch({ ...d, src, alt: altVal ?? d.alt })
              }
              onAltChange={(altVal) => patch({ ...d, alt: altVal })}
            />
          </Field>
          <CheckboxField
            label="Use different image on mobile"
            checked={mobileEnabled}
            onChange={(use_mobile_image) => patch({ ...d, use_mobile_image })}
          />
          {mobileEnabled ? (
            <Field label="Image (mobile)">
              <ImageField
                value={mobileSrc}
                showAlt={false}
                onChange={(src) =>
                  patch({
                    ...d,
                    use_mobile_image: true,
                    mobile_src: src,
                    fallback_src: undefined,
                  })
                }
              />
              <p style={{ margin: '8px 0 0', fontSize: 13, color: '#6d5757' }}>
                Shown at ≤767px (and in the mobile preview). Leave empty to keep
                using the desktop image.
              </p>
            </Field>
          ) : null}
          <Field label="Caption">
            <input
              className="fieldInput"
              value={d.caption ?? ''}
              onChange={(e) => patch({ ...d, caption: e.target.value })}
            />
          </Field>
          <CheckboxField
            label="Full width"
            checked={d.full_width ?? false}
            onChange={(full_width) => patch({ ...d, full_width })}
          />
          <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6d5757' }}>
            Resize in the preview: desktop/tablet preview sets desktop size;
            mobile preview sets mobile size separately .
          </p>
          <Field label="Link URL">
            <input
              className="fieldInput"
              value={d.link_href ?? ''}
              onChange={(e) => patch({ ...d, link_href: e.target.value })}
            />
          </Field>
        </>
      );
    }
    case 'image_text': {
      const d = block.data as ImageTextBlockData;
      return (
        <>
          <Field label="Image">
            <ImageField
              value={d.image_src}
              alt={d.image_alt}
              onChange={(src, altVal) =>
                patch({
                  ...d,
                  image_src: src,
                  image_alt: altVal ?? d.image_alt,
                })
              }
              onAltChange={(altVal) => patch({ ...d, image_alt: altVal })}
            />
          </Field>
          <Field label="Position">
            <select
              className="fieldSelect"
              value={d.image_position}
              onChange={(e) =>
                patch({
                  ...d,
                  image_position: e.target.value as typeof d.image_position,
                })
              }
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="top">Top</option>
            </select>
          </Field>
          <Field label="Heading">
            <input
              className="fieldInput"
              value={d.heading ?? ''}
              onChange={(e) => patch({ ...d, heading: e.target.value })}
            />
          </Field>
          <Field label="Body">
            <RichTextEditor
              value={d.body}
              onChange={(body) => patch({ ...d, body })}
            />
          </Field>
        </>
      );
    }
    case 'callout': {
      const d = block.data as CalloutBlockData;
      return (
        <>
          <Field label="Variant">
            <select
              className="fieldSelect"
              value={d.variant}
              onChange={(e) =>
                patch({ ...d, variant: e.target.value as typeof d.variant })
              }
            >
              <option value="tip">Tip</option>
              <option value="highlight">Highlight</option>
              <option value="warning">Warning</option>
            </select>
          </Field>
          <Field label="Title">
            <input
              className="fieldInput"
              value={d.title ?? ''}
              onChange={(e) => patch({ ...d, title: e.target.value })}
            />
          </Field>
          <Field label="Body">
            <RichTextEditor
              value={d.body}
              onChange={(body) => patch({ ...d, body })}
            />
          </Field>
        </>
      );
    }
    case 'table': {
      const d = block.data as TableBlockData;
      return (
        <>
          <Field label="Caption">
            <input
              className="fieldInput"
              value={d.caption ?? ''}
              onChange={(e) => patch({ ...d, caption: e.target.value })}
            />
          </Field>
          <Field label="Table style">
            <select
              className="fieldSelect"
              value={d.style}
              onChange={(e) =>
                patch({
                  ...d,
                  style: e.target.value as TableBlockData['style'],
                })
              }
            >
              {(
                Object.keys(TABLE_STYLE_LABELS) as TableBlockData['style'][]
              ).map((key) => (
                <option key={key} value={key}>
                  {TABLE_STYLE_LABELS[key]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Borders">
            <select
              className="fieldSelect"
              value={d.border_style ?? 'full'}
              onChange={(e) =>
                patch({
                  ...d,
                  border_style: e.target
                    .value as TableBlockData['border_style'],
                })
              }
            >
              {(
                Object.keys(TABLE_BORDER_LABELS) as NonNullable<
                  TableBlockData['border_style']
                >[]
              ).map((key) => (
                <option key={key} value={key}>
                  {TABLE_BORDER_LABELS[key]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Label column width">
            <select
              className="fieldSelect"
              value={d.label_width ?? 'auto'}
              onChange={(e) =>
                patch({
                  ...d,
                  label_width: e.target.value as TableBlockData['label_width'],
                })
              }
            >
              {(
                Object.keys(TABLE_LABEL_WIDTH_LABELS) as NonNullable<
                  TableBlockData['label_width']
                >[]
              ).map((key) => (
                <option key={key} value={key}>
                  {TABLE_LABEL_WIDTH_LABELS[key]}
                </option>
              ))}
            </select>
          </Field>
          <ColorThemePanel
            title="Table colors"
            hint="Curated presets with custom picker for each role."
          >
            <ColorField
              label="Header background"
              value={d.header_bg}
              defaultColor={DEFAULT_TABLE_COLORS.header_bg}
              presets={TABLE_HEADER_BG_PRESETS}
              onChange={(header_bg) => patch({ ...d, header_bg })}
            />
            <ColorField
              label="Row background"
              value={d.row_bg}
              defaultColor={DEFAULT_TABLE_COLORS.row_bg}
              presets={TABLE_ROW_BG_PRESETS}
              onChange={(row_bg) => patch({ ...d, row_bg })}
            />
            {d.style === 'striped' ? (
              <ColorField
                label="Striped row background"
                value={d.striped_row_bg}
                defaultColor={DEFAULT_TABLE_COLORS.striped_row_bg}
                presets={TABLE_ROW_BG_PRESETS}
                onChange={(striped_row_bg) => patch({ ...d, striped_row_bg })}
              />
            ) : null}
            <ColorField
              label="Border color"
              value={d.border_color}
              defaultColor={DEFAULT_TABLE_COLORS.border_color}
              presets={TABLE_BORDER_PRESETS}
              onChange={(border_color) => patch({ ...d, border_color })}
            />
            <ColorField
              label="Header text color"
              value={d.header_text_color}
              defaultColor={DEFAULT_TABLE_COLORS.header_text_color}
              presets={TABLE_TEXT_PRESETS}
              onChange={(header_text_color) =>
                patch({ ...d, header_text_color })
              }
            />
            <ColorField
              label="Body text color"
              value={d.body_text_color}
              defaultColor={DEFAULT_TABLE_COLORS.body_text_color}
              presets={TABLE_TEXT_PRESETS}
              onChange={(body_text_color) => patch({ ...d, body_text_color })}
            />
          </ColorThemePanel>
          <Field label="Rows">
            <div className="nestedList">
              {d.rows.map((row, i) => (
                <div key={i} className="nestedRow">
                  <input
                    className="fieldInput"
                    placeholder="Label"
                    value={row.label}
                    onChange={(e) => {
                      const rows = [...d.rows];
                      rows[i] = { ...row, label: e.target.value };
                      patch({ ...d, rows });
                    }}
                  />
                  <input
                    className="fieldInput"
                    placeholder="Value"
                    value={row.value}
                    onChange={(e) => {
                      const rows = [...d.rows];
                      rows[i] = { ...row, value: e.target.value };
                      patch({ ...d, rows });
                    }}
                  />
                  <button
                    type="button"
                    className="iconBtn"
                    onClick={() =>
                      patch({
                        ...d,
                        rows: d.rows.filter((_, idx) => idx !== i),
                      })
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btnGhost"
                onClick={() =>
                  patch({ ...d, rows: [...d.rows, { label: '', value: '' }] })
                }
              >
                + Add row
              </button>
            </div>
          </Field>
        </>
      );
    }
    case 'multi_column_table': {
      const d = block.data as MultiColumnTableBlockData;
      return (
        <>
          <Field label="Caption">
            <input
              className="fieldInput"
              value={d.caption ?? ''}
              onChange={(e) => patch({ ...d, caption: e.target.value })}
            />
          </Field>
          <Field label="Columns">
            <select
              className="fieldSelect"
              value={d.column_count}
              onChange={(e) =>
                patch(
                  resizeMultiColumnTable(
                    d,
                    Number(
                      e.target.value,
                    ) as MultiColumnTableBlockData['column_count'],
                  ),
                )
              }
            >
              {MULTI_COLUMN_TABLE_COUNTS.map((count) => (
                <option key={count} value={count}>
                  {MULTI_COLUMN_COUNT_LABELS[count]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Column headers">
            <div
              className="nestedRowMultiColumn"
              style={{ ['--nested-row-cols' as string]: d.column_count }}
            >
              {d.headers.map((header, index) => (
                <input
                  key={index}
                  className="fieldInput"
                  placeholder={`Column ${index + 1}`}
                  value={header}
                  onChange={(e) => {
                    const headers = [...d.headers];
                    headers[index] = e.target.value;
                    patch({ ...d, headers });
                  }}
                />
              ))}
              <span aria-hidden="true" />
            </div>
          </Field>
          <TableAppearanceFields
            data={d}
            onPatch={(appearance) => patch({ ...d, ...appearance })}
          />
          <Field label="Rows">
            <div className="nestedList">
              {d.rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="nestedRowMultiColumn"
                  style={{ ['--nested-row-cols' as string]: d.column_count }}
                >
                  {row.map((cell, colIndex) => (
                    <input
                      key={colIndex}
                      className="fieldInput"
                      placeholder={
                        d.headers[colIndex] || `Column ${colIndex + 1}`
                      }
                      value={cell}
                      onChange={(e) => {
                        const rows = d.rows.map((existingRow, index) => {
                          if (index !== rowIndex) return existingRow;
                          const nextRow = [...existingRow];
                          nextRow[colIndex] = e.target.value;
                          return nextRow;
                        });
                        patch({ ...d, rows });
                      }}
                    />
                  ))}
                  <button
                    type="button"
                    className="nestedRowRemoveBtn"
                    onClick={() =>
                      patch({
                        ...d,
                        rows: d.rows.filter((_, index) => index !== rowIndex),
                      })
                    }
                    aria-label={`Remove row ${rowIndex + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btnGhost"
                onClick={() =>
                  patch({
                    ...d,
                    rows: [
                      ...d.rows,
                      createEmptyMultiColumnRow(d.column_count),
                    ],
                  })
                }
              >
                + Add row
              </button>
            </div>
          </Field>
        </>
      );
    }
    case 'accordion': {
      const d = block.data as AccordionBlockData;
      return (
        <>
          <Field label="Default open">
            <select
              className="fieldSelect"
              value={
                d.default_open === 'none'
                  ? 'none'
                  : d.default_open === 'first'
                    ? 'first'
                    : 'panel'
              }
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'none') patch({ ...d, default_open: 'none' });
                else if (val === 'first')
                  patch({ ...d, default_open: 'first' });
                else
                  patch({
                    ...d,
                    default_open: { panel_id: d.panels[0]?.id ?? '' },
                  });
              }}
            >
              <option value="first">First panel</option>
              <option value="none">All closed</option>
            </select>
          </Field>
          <CheckboxField
            label="Numbered titles"
            checked={d.numbered_titles ?? false}
            onChange={(numbered_titles) => patch({ ...d, numbered_titles })}
          />
          {d.panels.map((panel, pi) => (
            <div key={panel.id} className="card nestedCard">
              <Field label={`Panel ${pi + 1} title`}>
                <input
                  className="fieldInput"
                  value={panel.title}
                  onChange={(e) => {
                    const panels = [...d.panels];
                    panels[pi] = { ...panel, title: e.target.value };
                    patch({ ...d, panels });
                  }}
                />
              </Field>
              <Field label="Content">
                <RichTextEditor
                  value={panel.paragraphs ?? ''}
                  onChange={(html) => {
                    const panels = [...d.panels];
                    panels[pi] = { ...panel, paragraphs: html };
                    patch({ ...d, panels });
                  }}
                />
              </Field>
              <Field label="List items (one per line)">
                <textarea
                  className="fieldTextarea"
                  value={(panel.list_items ?? []).join('\n')}
                  onChange={(e) => {
                    const panels = [...d.panels];
                    panels[pi] = {
                      ...panel,
                      list_items: e.target.value.split('\n'),
                    };
                    patch({ ...d, panels });
                  }}
                  onBlur={() => {
                    const panels = [...d.panels];
                    panels[pi] = {
                      ...panel,
                      list_items: (panel.list_items ?? [])
                        .map((item) => item.trim())
                        .filter(Boolean),
                    };
                    patch({ ...d, panels });
                  }}
                />
              </Field>
              {(panel.subsections ?? []).map((sub, si) => (
                <div key={sub.id} className="card nestedCard">
                  <Field label={`Subsection ${si + 1} heading`}>
                    <input
                      className="fieldInput"
                      value={sub.heading}
                      onChange={(e) => {
                        const panels = [...d.panels];
                        const subsections = [...(panel.subsections ?? [])];
                        subsections[si] = { ...sub, heading: e.target.value };
                        panels[pi] = { ...panel, subsections };
                        patch({ ...d, panels });
                      }}
                    />
                  </Field>
                  <Field label="Heading style">
                    <select
                      className="fieldSelect"
                      value={sub.heading_variant ?? 'step'}
                      onChange={(e) => {
                        const panels = [...d.panels];
                        const subsections = [...(panel.subsections ?? [])];
                        subsections[si] = {
                          ...sub,
                          heading_variant: e.target
                            .value as AccordionSubsection['heading_variant'],
                        };
                        panels[pi] = { ...panel, subsections };
                        patch({ ...d, panels });
                      }}
                    >
                      <option value="step">Bold step</option>
                      <option value="display">Display title</option>
                    </select>
                  </Field>
                  <Field label="Subsection content">
                    <RichTextEditor
                      value={sub.paragraphs ?? ''}
                      onChange={(html) => {
                        const panels = [...d.panels];
                        const subsections = [...(panel.subsections ?? [])];
                        subsections[si] = { ...sub, paragraphs: html };
                        panels[pi] = { ...panel, subsections };
                        patch({ ...d, panels });
                      }}
                    />
                  </Field>
                  <Field label="Subsection list items (one per line)">
                    <textarea
                      className="fieldTextarea"
                      value={(sub.list_items ?? []).join('\n')}
                      onChange={(e) => {
                        const panels = [...d.panels];
                        const subsections = [...(panel.subsections ?? [])];
                        subsections[si] = {
                          ...sub,
                          list_items: e.target.value.split('\n'),
                        };
                        panels[pi] = { ...panel, subsections };
                        patch({ ...d, panels });
                      }}
                      onBlur={() => {
                        const panels = [...d.panels];
                        const subsections = [...(panel.subsections ?? [])];
                        subsections[si] = {
                          ...sub,
                          list_items: (sub.list_items ?? [])
                            .map((item) => item.trim())
                            .filter(Boolean),
                        };
                        panels[pi] = { ...panel, subsections };
                        patch({ ...d, panels });
                      }}
                    />
                  </Field>
                  <div className="nestedCardAction">
                    <button
                      type="button"
                      className="btn btnGhost"
                      onClick={() => {
                        const panels = [...d.panels];
                        panels[pi] = {
                          ...panel,
                          subsections: (panel.subsections ?? []).filter(
                            (s) => s.id !== sub.id,
                          ),
                        };
                        patch({ ...d, panels });
                      }}
                    >
                      Remove subsection
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btnGhost"
                onClick={() => {
                  const panels = [...d.panels];
                  panels[pi] = {
                    ...panel,
                    subsections: [
                      ...(panel.subsections ?? []),
                      {
                        id: createBlockId(),
                        heading: 'New subsection',
                        heading_variant: 'step',
                      },
                    ],
                  };
                  patch({ ...d, panels });
                }}
              >
                + Add subsection
              </button>
              <div className="nestedCardAction">
                <button
                  type="button"
                  className="btn btnGhost"
                  onClick={() =>
                    patch({
                      ...d,
                      panels: d.panels.filter((p) => p.id !== panel.id),
                    })
                  }
                >
                  Remove panel
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() =>
              patch({
                ...d,
                panels: [
                  ...d.panels,
                  {
                    id: createBlockId(),
                    title: 'New panel',
                    paragraphs: '<p></p>',
                  },
                ],
              })
            }
          >
            + Add panel
          </button>
        </>
      );
    }
    case 'related_links': {
      const d = block.data as RelatedLinksBlockData;
      const allowSocialRow = editorContext === 'partners';
      const isSocialRow = allowSocialRow && d.layout === 'row';
      return (
        <>
          {allowSocialRow ? (
            <Field label="Layout">
              <select
                className="fieldSelect"
                value={d.layout ?? 'list'}
                onChange={(e) =>
                  patch({
                    ...d,
                    layout: e.target.value as RelatedLinksBlockData['layout'],
                  })
                }
              >
                <option value="list">Vertical list</option>
                <option value="row">Horizontal row (social)</option>
              </select>
            </Field>
          ) : null}
          <Field label="Intro">
            <RichTextEditor
              value={d.intro}
              onChange={(intro) => patch({ ...d, intro })}
            />
          </Field>
          {!isSocialRow ? (
            <>
              <Field label="Link style">
                <select
                  className="fieldSelect"
                  value={d.link_style ?? 'underline'}
                  onChange={(e) =>
                    patch({
                      ...d,
                      link_style: e.target
                        .value as RelatedLinksBlockData['link_style'],
                    })
                  }
                >
                  {(
                    Object.keys(RELATED_LINK_STYLE_LABELS) as NonNullable<
                      RelatedLinksBlockData['link_style']
                    >[]
                  ).map((key) => (
                    <option key={key} value={key}>
                      {RELATED_LINK_STYLE_LABELS[key]}
                    </option>
                  ))}
                </select>
              </Field>
              <ColorField
                label="Link color"
                value={d.link_color}
                defaultColor={DEFAULT_LINK_COLOR}
                presets={RELATED_LINK_COLOR_PRESETS}
                onChange={(link_color) => patch({ ...d, link_color })}
              />
              <Field label="List spacing">
                <select
                  className="fieldSelect"
                  value={d.list_spacing ?? 'normal'}
                  onChange={(e) =>
                    patch({
                      ...d,
                      list_spacing: e.target
                        .value as RelatedLinksBlockData['list_spacing'],
                    })
                  }
                >
                  {(
                    Object.keys(RELATED_LIST_SPACING_LABELS) as NonNullable<
                      RelatedLinksBlockData['list_spacing']
                    >[]
                  ).map((key) => (
                    <option key={key} value={key}>
                      {RELATED_LIST_SPACING_LABELS[key]}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          ) : null}
          <Field label="Links">
            <div className="nestedList">
              {d.links.map((link, i) => (
                <div key={i} className="card nestedCard">
                  <input
                    className="fieldInput"
                    placeholder="Label"
                    value={link.label}
                    onChange={(e) => {
                      const links = [...d.links];
                      links[i] = { ...link, label: e.target.value };
                      patch({ ...d, links });
                    }}
                  />
                  <input
                    className="fieldInput"
                    placeholder="URL"
                    value={link.href}
                    onChange={(e) => {
                      const links = [...d.links];
                      links[i] = { ...link, href: e.target.value };
                      patch({ ...d, links });
                    }}
                  />
                  {isSocialRow ? (
                    <ImageField
                      value={link.icon_src ?? ''}
                      alt={link.icon_alt ?? ''}
                      onChange={(src, altVal) => {
                        const links = [...d.links];
                        links[i] = {
                          ...link,
                          icon_src: src,
                          icon_alt: altVal ?? link.icon_alt ?? '',
                        };
                        patch({ ...d, links });
                      }}
                      onAltChange={(altVal) => {
                        const links = [...d.links];
                        links[i] = { ...link, icon_alt: altVal };
                        patch({ ...d, links });
                      }}
                    />
                  ) : null}
                  <div className="nestedCardAction">
                    <button
                      type="button"
                      className="btn btnGhost"
                      onClick={() =>
                        patch({
                          ...d,
                          links: d.links.filter((_, idx) => idx !== i),
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btnGhost nestedAddBtn"
                onClick={() =>
                  patch({ ...d, links: [...d.links, { label: '', href: '/' }] })
                }
              >
                + Add link
              </button>
            </div>
          </Field>
        </>
      );
    }
    case 'related_articles': {
      const d = block.data as RelatedArticlesBlockData;
      return (
        <RelatedArticlesFields
          data={d}
          catalog={relatedArticlesCatalog}
          onChange={(next) => patch(next)}
        />
      );
    }
    case 'expert_attribution': {
      const d = block.data as ExpertAttributionBlockData;
      return (
        <>
          <Field label="Preset">
            <select
              className="fieldSelect"
              value={d.preset}
              onChange={(e) =>
                patch({ ...d, preset: e.target.value as typeof d.preset })
              }
            >
              <option value="milk_making_mama">Milk Making Mama</option>
              <option value="kerry_secker">Kerry Secker</option>
              <option value="mother_box">Mother Box</option>
              <option value="custom">Custom</option>
            </select>
          </Field>
          <Field label="Prefix text">
            <input
              className="fieldInput"
              value={d.prefix ?? ''}
              onChange={(e) => patch({ ...d, prefix: e.target.value })}
              placeholder="Optional intro shown before the preset sign-off"
            />
          </Field>
          {d.preset === 'custom' ? (
            <>
              <Field label="Name">
                <input
                  className="fieldInput"
                  value={d.name ?? ''}
                  onChange={(e) => patch({ ...d, name: e.target.value })}
                />
              </Field>
              <Field label="Bio">
                <textarea
                  className="fieldTextarea"
                  value={(d.bio_paragraphs ?? []).join('\n\n')}
                  onChange={(e) =>
                    patch({
                      ...d,
                      bio_paragraphs: e.target.value.split('\n\n'),
                    })
                  }
                  onBlur={() =>
                    patch({
                      ...d,
                      bio_paragraphs: (d.bio_paragraphs ?? [])
                        .map((p) => p.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
              <Field label="Links">
                <div className="nestedList">
                  {(d.links ?? []).map((link, i) => (
                    <div key={i} className="nestedRow">
                      <input
                        className="fieldInput"
                        placeholder="Label"
                        value={link.label}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const label = e.target.value;
                          patch({
                            ...d,
                            links: (d.links ?? []).map((item, idx) =>
                              idx === i ? { ...item, label } : item,
                            ),
                          });
                        }}
                      />
                      <input
                        className="fieldInput"
                        placeholder="URL"
                        value={link.href}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          const href = e.target.value;
                          patch({
                            ...d,
                            links: (d.links ?? []).map((item, idx) =>
                              idx === i ? { ...item, href } : item,
                            ),
                          });
                        }}
                      />
                      <button
                        type="button"
                        className="btn btnGhost"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          patch({
                            ...d,
                            links: (d.links ?? []).filter(
                              (_, idx) => idx !== i,
                            ),
                          });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btnGhost nestedAddBtn"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      patch({
                        ...d,
                        links: [...(d.links ?? []), { label: '', href: '/' }],
                      });
                    }}
                  >
                    + Add link
                  </button>
                </div>
              </Field>
            </>
          ) : null}
        </>
      );
    }
    case 'cta_button': {
      const d = block.data as CtaButtonBlockData;
      return (
        <>
          <Field label="Label">
            <input
              className="fieldInput"
              value={d.label}
              onChange={(e) => patch({ ...d, label: e.target.value })}
            />
          </Field>
          <Field label="URL">
            <input
              className="fieldInput"
              value={d.url}
              onChange={(e) => patch({ ...d, url: e.target.value })}
            />
          </Field>
          <Field label="Style">
            <select
              className="fieldSelect"
              value={d.style}
              onChange={(e) =>
                patch({ ...d, style: e.target.value as typeof d.style })
              }
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </Field>
        </>
      );
    }
    case 'divider': {
      const d = block.data as DividerBlockData;
      return (
        <>
          <Field label="Style">
            <select
              className="fieldSelect"
              value={d.style}
              onChange={(e) =>
                patch({ ...d, style: e.target.value as typeof d.style })
              }
            >
              <option value="hr">Horizontal rule</option>
              <option value="image">Image</option>
            </select>
          </Field>
          {d.style === 'image' ? (
            <Field label="Divider image">
              <ImageField
                value={d.image_src ?? ''}
                showAlt={false}
                onChange={(src) => patch({ ...d, image_src: src })}
              />
            </Field>
          ) : null}
        </>
      );
    }
    case 'video': {
      const d = block.data as VideoBlockData;
      return (
        <>
          <Field label="Provider">
            <select
              className="fieldSelect"
              value={d.provider}
              onChange={(e) =>
                patch({ ...d, provider: e.target.value as typeof d.provider })
              }
            >
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="upload">Upload URL</option>
            </select>
          </Field>
          <Field label="URL / ID">
            <input
              className="fieldInput"
              value={d.url}
              onChange={(e) => patch({ ...d, url: e.target.value })}
            />
          </Field>
          <Field label="Caption">
            <input
              className="fieldInput"
              value={d.caption ?? ''}
              onChange={(e) => patch({ ...d, caption: e.target.value })}
            />
          </Field>
        </>
      );
    }
    case 'form_embed': {
      const d = block.data as FormEmbedBlockData;
      const mode = d.mode ?? (d.schema ? 'builder' : 'embed');
      const schema = d.schema ?? createDefaultFormSchema();

      return (
        <>
          <Field label="Display mode">
            <select
              className="fieldSelect"
              value={mode}
              onChange={(e) => {
                const nextMode = e.target.value as FormEmbedBlockData['mode'];
                if (nextMode === 'builder') {
                  patch({
                    ...d,
                    mode: 'builder',
                    schema: d.schema ?? createDefaultFormSchema(),
                  });
                } else {
                  patch({
                    ...d,
                    mode: 'embed',
                    embed_code: d.embed_code ?? '',
                  });
                }
              }}
            >
              <option value="builder">Visual form builder</option>
              <option value="embed">HTML embed code</option>
            </select>
          </Field>

          {mode === 'builder' ? (
            <FormBuilder
              schema={schema}
              onChange={(nextSchema) =>
                patch({ ...d, mode: 'builder', schema: nextSchema })
              }
            />
          ) : (
            <>
              <Field label="Title">
                <input
                  className="fieldInput"
                  value={d.title ?? ''}
                  onChange={(e) => patch({ ...d, title: e.target.value })}
                />
              </Field>
              <Field label="Embed code">
                <textarea
                  className="fieldTextarea"
                  value={d.embed_code ?? ''}
                  onChange={(e) => patch({ ...d, embed_code: e.target.value })}
                  style={{ fontFamily: 'monospace', minHeight: 120 }}
                />
              </Field>
            </>
          )}
        </>
      );
    }
    case 'announcement_banner': {
      const d = block.data as AnnouncementBannerBlockData;
      return (
        <>
          <Field label="Message">
            <input
              className="fieldInput"
              value={d.message}
              onChange={(e) => patch({ ...d, message: e.target.value })}
            />
          </Field>
          <Field label="Link URL">
            <input
              className="fieldInput"
              value={d.link_url ?? ''}
              onChange={(e) => patch({ ...d, link_url: e.target.value })}
            />
          </Field>
          <Field label="Link label">
            <input
              className="fieldInput"
              value={d.link_label ?? ''}
              onChange={(e) => patch({ ...d, link_label: e.target.value })}
            />
          </Field>
        </>
      );
    }
    case 'product_grid': {
      const d = withProductGridColumnDefaults(
        block.data as ProductGridBlockData,
      );
      return (
        <>
          <ResponsiveGridColumnsField
            value={d}
            defaultImageAspect="4/3"
            onChange={(patchCols) => patch({ ...d, ...patchCols })}
          />
          {d.items.map((item, i) => (
            <div key={i} className="card nestedCard">
              <input
                className="fieldInput"
                placeholder="Title"
                value={item.title}
                onChange={(e) => {
                  const items = [...d.items];
                  items[i] = { ...item, title: e.target.value };
                  patch({ ...d, items });
                }}
              />
              <ImageField
                value={item.image}
                showAlt={false}
                onChange={(src) => {
                  const items = [...d.items];
                  items[i] = { ...item, image: src };
                  patch({ ...d, items });
                }}
              />
              <input
                className="fieldInput"
                placeholder="URL"
                value={item.url}
                onChange={(e) => {
                  const items = [...d.items];
                  items[i] = { ...item, url: e.target.value };
                  patch({ ...d, items });
                }}
              />
              <div className="nestedCardAction">
                <button
                  type="button"
                  className="btn btnGhost"
                  onClick={() =>
                    patch({
                      ...d,
                      items: d.items.filter((_, idx) => idx !== i),
                    })
                  }
                >
                  Remove item
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              patch({
                ...d,
                items: [...d.items, { title: '', image: '', url: '/' }],
              })
            }
          >
            + Add item
          </button>
        </>
      );
    }
    case 'recipe_grid': {
      const d = block.data as RecipeGridBlockData;
      return (
        <>
          <Field label="Layout">
            <select
              className="fieldSelect"
              value={d.layout}
              onChange={(e) => {
                const layout = e.target.value as RecipeGridBlockData['layout'];
                if (layout === 'grid') {
                  patch(
                    withRecipeGridColumnDefaults({
                      ...d,
                      layout,
                      columns_desktop:
                        d.columns_desktop ??
                        RESPONSIVE_GRID_DEFAULT_COLUMNS.desktop,
                      columns_tablet:
                        d.columns_tablet ??
                        RESPONSIVE_GRID_DEFAULT_COLUMNS.tablet,
                      columns_mobile:
                        d.columns_mobile ??
                        RESPONSIVE_GRID_DEFAULT_COLUMNS.mobile,
                    }),
                  );
                  return;
                }
                patch({ ...d, layout });
              }}
            >
              <option value="grid">Grid</option>
              <option value="carousel">Carousel</option>
            </select>
          </Field>
          {d.layout === 'grid' ? (
            <ResponsiveGridColumnsField
              value={d}
              defaultImageAspect="4/3"
              onChange={(patchCols) => patch({ ...d, ...patchCols })}
            />
          ) : null}
          {d.items.map((item, i) => (
            <div key={i} className="card nestedCard">
              <input
                className="fieldInput"
                placeholder="Title"
                value={item.title}
                onChange={(e) => {
                  const items = [...d.items];
                  items[i] = { ...item, title: e.target.value };
                  patch({ ...d, items });
                }}
              />
              <ImageField
                value={item.image}
                showAlt={false}
                onChange={(src) => {
                  const items = [...d.items];
                  items[i] = { ...item, image: src };
                  patch({ ...d, items });
                }}
              />
              <input
                className="fieldInput"
                placeholder="URL"
                value={item.url}
                onChange={(e) => {
                  const items = [...d.items];
                  items[i] = { ...item, url: e.target.value };
                  patch({ ...d, items });
                }}
              />
              <label className="fieldCheckbox">
                <input
                  type="checkbox"
                  checked={item.app_exclusive ?? false}
                  onChange={(e) => {
                    const items = [...d.items];
                    items[i] = {
                      ...item,
                      app_exclusive: e.target.checked || undefined,
                    };
                    patch({ ...d, items });
                  }}
                />
                App exclusive (show lock)
              </label>
              <div className="nestedCardAction">
                <button
                  type="button"
                  className="btn btnGhost"
                  onClick={() =>
                    patch({
                      ...d,
                      items: d.items.filter((_, idx) => idx !== i),
                    })
                  }
                >
                  Remove item
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              patch({
                ...d,
                items: [...d.items, { title: '', image: '', url: '/' }],
              })
            }
          >
            + Add item
          </button>
        </>
      );
    }
    case 'partner_promo': {
      const d = block.data as PartnerPromoBlockData;
      return (
        <>
          <Field label="Logo">
            <ImageField
              value={d.logo_src}
              alt={d.logo_alt}
              onChange={(src, altVal) =>
                patch({ ...d, logo_src: src, logo_alt: altVal ?? d.logo_alt })
              }
              onAltChange={(altVal) => patch({ ...d, logo_alt: altVal })}
            />
          </Field>
          <Field label="Logo link URL">
            <input
              className="fieldInput"
              value={d.logo_href ?? ''}
              onChange={(e) =>
                patch({ ...d, logo_href: e.target.value || undefined })
              }
              placeholder="https://"
            />
          </Field>
          <Field label="Layout">
            <select
              className="fieldSelect"
              value={d.layout}
              onChange={(e) =>
                patch({
                  ...d,
                  layout: e.target.value as PartnerPromoBlockData['layout'],
                })
              }
            >
              <option value="stacked">Stacked</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </Field>
          <Field label="Title">
            <input
              className="fieldInput"
              value={d.title ?? ''}
              onChange={(e) => patch({ ...d, title: e.target.value })}
            />
          </Field>
          <Field label="Body">
            <RichTextEditor
              value={d.body ?? ''}
              onChange={(body) => patch({ ...d, body })}
            />
          </Field>
          <Field label="Links">
            {(d.links ?? []).map((link, i) => (
              <div key={i} className="card nestedCard">
                <input
                  className="fieldInput"
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) => {
                    const links = [...(d.links ?? [])];
                    links[i] = { ...link, label: e.target.value };
                    patch({ ...d, links });
                  }}
                />
                <input
                  className="fieldInput"
                  placeholder="URL"
                  value={link.href}
                  onChange={(e) => {
                    const links = [...(d.links ?? [])];
                    links[i] = { ...link, href: e.target.value };
                    patch({ ...d, links });
                  }}
                />
                <div className="nestedCardAction">
                  <button
                    type="button"
                    className="btn btnGhost"
                    onClick={() => {
                      const links = (d.links ?? []).filter(
                        (_, index) => index !== i,
                      );
                      patch({ ...d, links });
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btnGhost"
              onClick={() =>
                patch({
                  ...d,
                  links: [...(d.links ?? []), { label: '', href: '' }],
                })
              }
            >
              + Add link
            </button>
          </Field>
        </>
      );
    }
    case 'partnership_tag': {
      const d = block.data as PartnershipTagBlockData;
      return (
        <>
          <Field label="Label">
            <input
              className="fieldInput"
              value={d.label}
              onChange={(e) => patch({ ...d, label: e.target.value })}
              placeholder="In partnership with"
            />
          </Field>
          <Field label="Partner logo">
            <ImageField
              value={d.logo_src}
              alt={d.logo_alt}
              onChange={(src, altVal) =>
                patch({ ...d, logo_src: src, logo_alt: altVal ?? d.logo_alt })
              }
              onAltChange={(altVal) => patch({ ...d, logo_alt: altVal })}
            />
          </Field>
          <Field label="Logo link URL">
            <input
              className="fieldInput"
              value={d.logo_href ?? ''}
              onChange={(e) =>
                patch({ ...d, logo_href: e.target.value || undefined })
              }
              placeholder="https://"
            />
          </Field>
        </>
      );
    }
    case 'book_promo': {
      const d = block.data as BookPromoBlockData;
      return (
        <>
          <Field label="Book cover">
            <ImageField
              value={d.cover_src}
              alt={d.cover_alt}
              onChange={(src, altVal) =>
                patch({
                  ...d,
                  cover_src: src,
                  cover_alt: altVal ?? d.cover_alt,
                })
              }
              onAltChange={(altVal) => patch({ ...d, cover_alt: altVal })}
            />
          </Field>
          <Field label="Book title">
            <input
              className="fieldInput"
              value={d.book_title}
              onChange={(e) => patch({ ...d, book_title: e.target.value })}
            />
          </Field>
          <Field label="Book URL">
            <input
              className="fieldInput"
              value={d.book_href}
              onChange={(e) => patch({ ...d, book_href: e.target.value })}
            />
          </Field>
          <Field label="Description">
            <RichTextEditor
              value={d.body}
              onChange={(body) => patch({ ...d, body })}
            />
          </Field>
        </>
      );
    }
    case 'author_bio': {
      const d = block.data as AuthorBioBlockData;
      return (
        <>
          <Field label="Photo">
            <ImageField
              value={d.photo_src}
              alt={d.photo_alt}
              onChange={(src, altVal) =>
                patch({
                  ...d,
                  photo_src: src,
                  photo_alt: altVal ?? d.photo_alt,
                })
              }
              onAltChange={(altVal) => patch({ ...d, photo_alt: altVal })}
            />
          </Field>
          <Field label="Name">
            <input
              className="fieldInput"
              value={d.name}
              onChange={(e) => patch({ ...d, name: e.target.value })}
            />
          </Field>
          <Field label="Bio paragraphs">
            <textarea
              className="fieldTextarea"
              value={d.bio_paragraphs.join('\n\n')}
              onChange={(e) =>
                patch({
                  ...d,
                  bio_paragraphs: e.target.value.split('\n\n').filter(Boolean),
                })
              }
            />
          </Field>
        </>
      );
    }
    case 'image_stack': {
      const d = block.data as ImageStackBlockData;
      return <ImageStackFields data={d} onChange={(data) => patch(data)} />;
    }
    case 'two_column': {
      const d = block.data as TwoColumnBlockData;
      return <TwoColumnFields data={d} onChange={(data) => patch(data)} />;
    }
    default:
      return null;
  }
}
