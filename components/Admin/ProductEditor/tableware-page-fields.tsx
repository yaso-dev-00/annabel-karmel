"use client";

import { useEffect, useState } from "react";
import { ImageField } from "@/components/Admin/Ui/ImageField";
import { ColorField } from "@/components/Admin/Ui/ColorField";
import type { TablewareSwatchColor } from "@/data/tableware-page";
import type { TablewarePageContent } from "@/lib/products/types";
import { makeTablewareVariantKey } from "@/lib/products/tableware-variants";
import {
  CompleteSetPicker,
  SortableCareIconsEditor,
  SortableGalleryEditor,
  SortableTextList,
} from "@/components/Admin/ProductEditor/tableware-sortable-fields";
import blockStyles from "@/components/Admin/BlockEditor/block-editor.module.css";
import styles from "./product-editor.module.css";

type DistributorParts = {
  before: string;
  linkText: string;
  linkHref: string;
  after: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function stripTags(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function parseDistributorHtml(html: string): DistributorParts {
  const trimmed = html.trim();
  if (!trimmed) return { before: "", linkText: "", linkHref: "", after: "" };

  const match = trimmed.match(
    /^(.*?)<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>([\s\S]*)$/i,
  );
  if (!match) {
    return { before: stripTags(trimmed), linkText: "", linkHref: "", after: "" };
  }

  return {
    before: stripTags(match[1] ?? ""),
    linkHref: (match[2] ?? "").trim(),
    linkText: stripTags(match[3] ?? ""),
    after: stripTags(match[4] ?? ""),
  };
}

function composeDistributorHtml(parts: DistributorParts): string {
  const before = parts.before;
  const after = parts.after;
  const linkText = parts.linkText.trim();
  const linkHref = parts.linkHref.trim();

  if (!linkText || !linkHref) {
    return `${before}${linkText}${after}`.trim();
  }

  return `${before}<a href="${escapeHtml(linkHref)}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkText)}</a>${after}`;
}

function DistributorFields({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const [parts, setParts] = useState(() => parseDistributorHtml(value));

  useEffect(() => {
    if (composeDistributorHtml(parts) === value) return;
    setParts(parseDistributorHtml(value));
    // Only re-parse when the stored HTML changes from outside this editor.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- parts intentionally omitted
  }, [value]);

  const update = (patch: Partial<DistributorParts>) => {
    const next = { ...parts, ...patch };
    setParts(next);
    onChange(composeDistributorHtml(next));
  };

  const previewHtml = composeDistributorHtml(parts);

  return (
    <div className={styles.distributorFields}>
      <div className="field">
        <label className="fieldLabel" htmlFor="tw-distributor-before">
          Text before link
        </label>
        <input
          id="tw-distributor-before"
          className="fieldInput"
          value={parts.before}
          onChange={(e) => update({ before: e.target.value })}
          placeholder="The range is distributed exclusively in Australia by "
        />
      </div>
      <div className={styles.distributorLinkRow}>
        <div className="field">
          <label className="fieldLabel" htmlFor="tw-distributor-link-text">
            Link text
          </label>
          <input
            id="tw-distributor-link-text"
            className="fieldInput"
            value={parts.linkText}
            onChange={(e) => update({ linkText: e.target.value })}
            placeholder="Infa Group Pty LTD"
          />
        </div>
        <div className="field">
          <label className="fieldLabel" htmlFor="tw-distributor-link-url">
            Link URL
          </label>
          <input
            id="tw-distributor-link-url"
            className="fieldInput"
            value={parts.linkHref}
            onChange={(e) => update({ linkHref: e.target.value })}
            placeholder="https://"
          />
        </div>
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="tw-distributor-after">
          Text after link
        </label>
        <input
          id="tw-distributor-after"
          className="fieldInput"
          value={parts.after}
          onChange={(e) => update({ after: e.target.value })}
          placeholder="."
        />
      </div>
      {previewHtml ? (
        <div className={styles.distributorPreview}>
          <p className={styles.distributorPreviewLabel}>Preview</p>
          <p
            className={styles.distributorPreviewText}
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      ) : null}
    </div>
  );
}

const COLOR_OPTIONS: { value: TablewareSwatchColor; label: string; hex: string }[] = [
  { value: "soft-sage", label: "Soft Sage", hex: "#c3d2b6" },
  { value: "warm-stone", label: "Warm Stone", hex: "#f8f0ec" },
  { value: "blushberry", label: "Blushberry", hex: "#ca9591" },
];

const HEX_PRESETS = COLOR_OPTIONS.map((option) => ({
  value: option.hex,
  label: option.label,
}));

function colorFromHex(hex: string): TablewareSwatchColor {
  const normalized = hex.trim().toLowerCase();
  const match = COLOR_OPTIONS.find((option) => option.hex.toLowerCase() === normalized);
  return match?.value ?? "soft-sage";
}

function labelFromHex(hex: string, currentLabel: string): string {
  const normalized = hex.trim().toLowerCase();
  const match = COLOR_OPTIONS.find((option) => option.hex.toLowerCase() === normalized);
  if (!match) return currentLabel;
  const wasPresetLabel = COLOR_OPTIONS.some((option) => option.label === currentLabel.trim());
  if (!currentLabel.trim() || wasPresetLabel) return match.label;
  return currentLabel;
}

type TablewareFieldsProps = {
  page: TablewarePageContent;
  onChange: (page: TablewarePageContent) => void;
  onPreviewVariantChange?: (variantKey: string | null) => void;
  productSlug?: string;
};

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      className={blockStyles.iconBtn}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      ✕
    </button>
  );
}

function scrollToEditorItem(itemId: string) {
  const run = () => {
    const el = document.querySelector<HTMLElement>(`[data-editor-item="${itemId}"]`);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    const focusable = el.querySelector<HTMLElement>(
      "input:not([type='hidden']):not([type='checkbox']):not([type='file']), textarea, select",
    );
    focusable?.focus({ preventScroll: true });
    return true;
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!run()) window.setTimeout(run, 80);
    });
  });
}

export function TablewareFields({
  page,
  onChange,
  onPreviewVariantChange,
  productSlug,
}: TablewareFieldsProps) {
  const [editingVariantIndex, setEditingVariantIndex] = useState(0);

  const update = (patch: Partial<TablewarePageContent>) => onChange({ ...page, ...patch });

  const variants = page.colorVariants;
  const safeIndex = Math.min(editingVariantIndex, Math.max(variants.length - 1, 0));
  const activeVariant = variants[safeIndex];

  const selectVariant = (index: number) => {
    setEditingVariantIndex(index);
    if (!variants[index]) return;
    onPreviewVariantChange?.(makeTablewareVariantKey(index));
  };

  const updateVariant = (index: number, patch: Partial<(typeof variants)[number]>) => {
    const next = variants.slice();
    next[index] = { ...next[index]!, ...patch };
    update({ colorVariants: next });
  };

  return (
    <>
      <div className="card">
        <div className={styles.sectionHeaderCol}>
          <h2 className="cardSectionTitle">Colour variants</h2>
          <p className={styles.sectionHint}>
            Each colour variant has its own gallery, hex, and optional shop URL. Use{" "}
            <strong>+ Colour</strong> to add another variant — preview switches with the tabs.
          </p>
        </div>
        <div className="cardForm">
          <div className={styles.variantBlock}>
          <div className={styles.variantTabRow} role="tablist" aria-label="Colour variants">
            {variants.map((variant, index) => (
              <button
                key={`${variant.color}-${index}`}
                type="button"
                role="tab"
                aria-selected={index === safeIndex}
                className={`${styles.variantTab}${index === safeIndex ? ` ${styles.variantTabActive}` : ""}`}
                onClick={() => selectVariant(index)}
              >
                <span
                  className={styles.variantTabSwatch}
                  style={{ background: variant.hex || "#ddd" }}
                  aria-hidden
                />
                {variant.label || COLOR_OPTIONS.find((o) => o.value === variant.color)?.label || "Colour"}
                {variant.color === page.activeColor ? (
                  <span className={styles.variantTabDefault}>Default</span>
                ) : null}
              </button>
            ))}
            <button
              type="button"
              className={styles.variantTabAdd}
              title="Add another colour variant with its own gallery"
              onClick={() => {
                const unused = COLOR_OPTIONS.find(
                  (option) => !variants.some((variant) => variant.color === option.value),
                );
                const option = unused ?? COLOR_OPTIONS[0]!;
                const index = variants.length;
                update({
                  colorVariants: [
                    ...variants,
                    {
                      slug: "",
                      color: option.value,
                      label: unused ? option.label : `${option.label} ${index + 1}`,
                      hex: option.hex,
                      gallery: [{ src: "", alt: "" }],
                      shopHref: "",
                    },
                  ],
                });
                setEditingVariantIndex(index);
                onPreviewVariantChange?.(makeTablewareVariantKey(index));
                scrollToEditorItem("tw-variant-editor");
              }}
            >
              + Colour
            </button>
          </div>

          {activeVariant ? (
            <div data-editor-item="tw-variant-editor" className={styles.variantEditor}>
              <div className="metaGrid">
                <div className="field">
                  <label className="fieldLabel">Label</label>
                  <input
                    className="fieldInput"
                    value={activeVariant.label}
                    onChange={(e) => updateVariant(safeIndex, { label: e.target.value })}
                    placeholder="e.g. Soft Sage"
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Variant slug</label>
                  <input
                    className="fieldInput"
                    value={activeVariant.slug}
                    onChange={(e) => updateVariant(safeIndex, { slug: e.target.value })}
                    placeholder="catch-all-bib-set-soft-sage"
                  />
                </div>
              </div>

              <ColorField
                label="Colour (hex)"
                value={activeVariant.hex || undefined}
                defaultColor="#c3d2b6"
                presets={HEX_PRESETS}
                allowDefault={false}
                onChange={(hex) => {
                  const nextHex = hex?.trim() || "#c3d2b6";
                  const color = colorFromHex(nextHex);
                  const wasActive = activeVariant.color === page.activeColor;
                  const next = variants.slice();
                  next[safeIndex] = {
                    ...activeVariant,
                    hex: nextHex,
                    color,
                    label: labelFromHex(nextHex, activeVariant.label),
                  };
                  update({
                    colorVariants: next,
                    ...(wasActive ? { activeColor: color } : {}),
                  });
                }}
              />

              <div className="field">
                <label className="fieldLabel">Shop URL for this colour (optional)</label>
                <input
                  className="fieldInput"
                  value={activeVariant.shopHref}
                  onChange={(e) => updateVariant(safeIndex, { shopHref: e.target.value })}
                  placeholder="Leave blank to use the default retailer shop URL"
                />
              </div>

              <div className={styles.variantActions}>
                {activeVariant.color !== page.activeColor ? (
                  <button
                    type="button"
                    className="btn btnGhost"
                    onClick={() => update({ activeColor: activeVariant.color })}
                  >
                    Set as default colour
                  </button>
                ) : (
                  <p className={styles.sectionHint}>This is the default colour for this product.</p>
                )}
                {variants.length > 1 ? (
                  <button
                    type="button"
                    className="btn btnGhost"
                    onClick={() => {
                      const next = variants.filter((_, i) => i !== safeIndex);
                      const nextActive =
                        page.activeColor === activeVariant.color
                          ? next[0]!.color
                          : page.activeColor;
                      update({ colorVariants: next, activeColor: nextActive });
                      setEditingVariantIndex(Math.max(0, safeIndex - 1));
                    }}
                  >
                    Remove colour
                  </button>
                ) : null}
              </div>

              <SortableGalleryEditor
                key={`gallery-${safeIndex}-${activeVariant.color}`}
                label={activeVariant.label || "Colour"}
                gallery={activeVariant.gallery}
                onChange={(gallery) => updateVariant(safeIndex, { gallery })}
                emptyHint="No images for this colour yet. Add images, or set a variant slug that matches a live Grow PDP to auto-fill on save."
              />
            </div>
          ) : null}
          </div>
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderCol} style={{ marginBottom: 0 }}>
            <h2 className="cardSectionTitle">Description</h2>
            <p className={styles.sectionHint}>One box per paragraph on the product page.</p>
          </div>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() => {
              const index = page.description.length;
              update({ description: [...page.description, ""] });
              scrollToEditorItem(`tw-desc-${index}`);
            }}
          >
            + Paragraph
          </button>
        </div>
        <div className={styles.listStack}>
          {page.description.map((paragraph, index) => (
            <div
              key={index}
              className={styles.listRow}
              data-editor-item={`tw-desc-${index}`}
            >
              <textarea
                className={`fieldTextarea ${styles.descriptionTextarea}`}
                rows={3}
                value={paragraph}
                aria-label={`Description paragraph ${index + 1}`}
                onChange={(e) => {
                  const description = page.description.slice();
                  description[index] = e.target.value;
                  update({ description });
                }}
              />
              <RemoveButton
                label={`Remove paragraph ${index + 1}`}
                onClick={() =>
                  update({
                    description:
                      page.description.length <= 1
                        ? [""]
                        : page.description.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeaderCol}>
          <h2 className="cardSectionTitle">Features</h2>
          <p className={styles.sectionHint}>
            Two columns of benefit bullets under the description. Drag to reorder.
          </p>
        </div>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel" htmlFor="tw-features-heading">
              Heading
            </label>
            <input
              id="tw-features-heading"
              className="fieldInput"
              value={page.features.heading}
              onChange={(e) =>
                update({ features: { ...page.features, heading: e.target.value } })
              }
            />
          </div>
          {[0, 1].map((colIndex) => (
            <SortableTextList
              key={colIndex}
              items={page.features.columns[colIndex] ?? []}
              itemLabel={`Column ${colIndex + 1}`}
              addLabel="+ Bullet"
              emptyHint={`No bullets in column ${colIndex + 1} yet.`}
              onChange={(items) => {
                const columns = page.features.columns.map((col) => [...col]);
                while (columns.length < 2) columns.push([]);
                columns[colIndex] = items;
                update({ features: { ...page.features, columns } });
              }}
            />
          ))}
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeaderCol}>
          <h2 className="cardSectionTitle">Specs</h2>
          <p className={styles.sectionHint}>
            Materials and dimensions shown in the specs card. Drag to reorder.
          </p>
        </div>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel" htmlFor="tw-materials-heading">
              Materials heading
            </label>
            <input
              id="tw-materials-heading"
              className="fieldInput"
              value={page.materials.heading}
              onChange={(e) =>
                update({ materials: { ...page.materials, heading: e.target.value } })
              }
            />
          </div>
          <SortableTextList
            items={page.materials.items}
            itemLabel="Materials"
            addLabel="+ Item"
            emptyHint="No materials yet."
            onChange={(items) => update({ materials: { ...page.materials, items } })}
          />
          <SortableTextList
            items={page.dimensions.items}
            itemLabel="Dimensions"
            addLabel="+ Item"
            emptyHint="No dimensions yet."
            onChange={(items) => update({ dimensions: { items } })}
          />
        </div>
      </div>

      <SortableCareIconsEditor
        careHeading={page.careHeading}
        careIcons={page.careIcons}
        onHeadingChange={(careHeading) => update({ careHeading })}
        onIconsChange={(careIcons) => update({ careIcons })}
      />

      <div className="card">
        <div className={styles.sectionHeaderCol}>
          <h2 className="cardSectionTitle">Retailer</h2>
          <p className={styles.sectionHint}>Shop CTA and retailer logo on the product page.</p>
        </div>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel" htmlFor="tw-retailer-label">
              Label
            </label>
            <input
              id="tw-retailer-label"
              className="fieldInput"
              value={page.retailer.label}
              onChange={(e) =>
                update({ retailer: { ...page.retailer, label: e.target.value } })
              }
            />
          </div>
          <ImageField
            value={page.retailer.logo}
            onChange={(logo) => update({ retailer: { ...page.retailer, logo } })}
            showAlt={false}
          />
          <div className="metaGrid">
            <div className="field">
              <label className="fieldLabel" htmlFor="tw-shop-label">
                Shop button label
              </label>
              <input
                id="tw-shop-label"
                className="fieldInput"
                value={page.retailer.shopLabel}
                onChange={(e) =>
                  update({ retailer: { ...page.retailer, shopLabel: e.target.value } })
                }
              />
            </div>
            <div className="field">
              <label className="fieldLabel" htmlFor="tw-shop-href">
                Shop URL
              </label>
              <input
                id="tw-shop-href"
                className="fieldInput"
                value={page.retailer.shopHref}
                onChange={(e) =>
                  update({ retailer: { ...page.retailer, shopHref: e.target.value } })
                }
                placeholder="https://"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeaderCol}>
          <h2 className="cardSectionTitle">Distributor</h2>
          <p className={styles.sectionHint}>
            Optional. Shown below the specs card. Add a link without writing HTML.
          </p>
        </div>
        <DistributorFields
          value={page.distributorHtml}
          onChange={(distributorHtml) => update({ distributorHtml })}
        />
      </div>

      <CompleteSetPicker
        slugs={page.completeSetSlugs}
        excludeSlug={productSlug}
        onChange={(completeSetSlugs) => update({ completeSetSlugs })}
      />
    </>
  );
}
