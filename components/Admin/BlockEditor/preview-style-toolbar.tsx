"use client";

import { useEffect, useState } from "react";
import { BlockVisibilityIcon } from "@/components/Admin/Ui/BlockVisibilityIcon";
import { BorderField } from "@/components/Admin/Ui/BorderField";
import { ColorField } from "@/components/Admin/Ui/ColorField";
import { CssLengthInput } from "@/components/Admin/Ui/CssLengthInput";
import { FontFamilyField } from "@/components/Admin/Ui/FontFamilyField";
import { MaxWidthField } from "@/components/Admin/Ui/MaxWidthField";
import { PaddingField } from "@/components/Admin/Ui/PaddingField";
import { MarginField } from "@/components/Admin/Ui/MarginField";
import { RadiusField } from "@/components/Admin/Ui/RadiusField";
import { ResponsiveFontSizeField } from "@/components/Admin/Ui/ResponsiveFontSizeField";
import { ShadowField } from "@/components/Admin/Ui/ShadowField";
import type { BlockSettings, ContentBlock } from "@/lib/content-blocks/types";
import {
  resolveToolbarBackgroundPresetFallback,
  resolveToolbarBackgroundStoredValue,
} from "@/lib/content-blocks/block-background";
import { getBlockLabel } from "@/lib/content-blocks/registry";
import { blockSupportsParagraphGap } from "@/lib/content-blocks/block-prose";
import { DS_BACKGROUND_PRESETS, DS_TEXT_PRESETS } from "@/lib/design-system/color-presets";
import { DS_COLORS } from "@/lib/design-system/tokens";
import styles from "./preview-style-toolbar.module.css";

type TwoColumnStyleTarget = "block" | "left" | "right";

type PreviewStyleToolbarProps = {
  block: ContentBlock;
  onSettingsChange: (patch: Partial<BlockSettings>) => void;
  isFullscreen?: boolean;
  twoColumnTarget?: TwoColumnStyleTarget;
  onTwoColumnTargetChange?: (target: TwoColumnStyleTarget) => void;
};

function resolveToolbarSettings(
  block: ContentBlock,
  twoColumnTarget: TwoColumnStyleTarget,
): BlockSettings {
  if (block.type === "two_column") {
    if (twoColumnTarget === "left") return block.data.left_settings ?? {};
    if (twoColumnTarget === "right") return block.data.right_settings ?? {};
  }
  return block.settings ?? {};
}

export function PreviewStyleToolbar({
  block,
  onSettingsChange,
  isFullscreen = false,
  twoColumnTarget = "block",
  onTwoColumnTargetChange,
}: PreviewStyleToolbarProps) {
  const [expanded, setExpanded] = useState(false);
  const settings = resolveToolbarSettings(block, twoColumnTarget);
  const isTwoColumn = block.type === "two_column";
  const isColumnTarget = isTwoColumn && twoColumnTarget !== "block";
  const backgroundStoredValue = isColumnTarget
    ? settings.background_color
    : resolveToolbarBackgroundStoredValue(block);
  const backgroundPresetFallback = isColumnTarget
    ? undefined
    : resolveToolbarBackgroundPresetFallback(block);
  const showBody = isFullscreen || expanded;

  useEffect(() => {
    if (!isFullscreen) {
      setExpanded(false);
    }
  }, [block.id, isFullscreen, twoColumnTarget]);

  const toolbarTitle =
    isTwoColumn && twoColumnTarget === "left"
      ? "Two column · Left"
      : isTwoColumn && twoColumnTarget === "right"
        ? "Two column · Right"
        : getBlockLabel(block.type);

  return (
    <div
      className={`${styles.panel} ${showBody ? styles.panelExpanded : ""} ${isFullscreen ? styles.panelSidebar : ""}`}
      role="toolbar"
      aria-label="Block layout"
    >
      <div className={styles.header}>
        {isFullscreen ? (
          <span className={styles.headerTitle}>{toolbarTitle}</span>
        ) : (
          <button
            type="button"
            className={styles.headerToggle}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <span className={styles.blockType}>{toolbarTitle}</span>
            <span className={styles.chevron}>{expanded ? "▾" : "▸"}</span>
          </button>
        )}
        {!isColumnTarget ? (
          <button
            type="button"
            className={`${styles.visibilityBtn} ${settings.hidden ? styles.visibilityBtnHidden : ""}`}
            onClick={() => onSettingsChange({ hidden: settings.hidden ? undefined : true })}
            aria-pressed={Boolean(settings.hidden)}
            aria-label={settings.hidden ? "Show on published page" : "Hide from published page"}
            title={settings.hidden ? "Show on published page" : "Hide from published page"}
          >
            <BlockVisibilityIcon visible={!settings.hidden} className={styles.visibilityIcon} />
          </button>
        ) : null}
      </div>

      {isTwoColumn && onTwoColumnTargetChange ? (
        <div className={styles.targetRow} role="group" aria-label="Two column style target">
          {(["block", "left", "right"] as const).map((target) => (
            <button
              key={target}
              type="button"
              className={`${styles.targetBtn} ${twoColumnTarget === target ? styles.targetBtnActive : ""}`}
              onClick={() => onTwoColumnTargetChange(target)}
              aria-pressed={twoColumnTarget === target}
            >
              {target === "block" ? "Block" : target === "left" ? "Left" : "Right"}
            </button>
          ))}
        </div>
      ) : null}

      {showBody ? (
        <div className={styles.body}>
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Colors</p>
            <div className={styles.colorRow}>
              <div className={styles.colorFieldCard}>
                <ColorField
                  label="Background"
                  value={backgroundStoredValue}
                  presetFallbackValue={backgroundPresetFallback}
                  defaultColor={backgroundPresetFallback ?? DS_COLORS.white}
                  presets={DS_BACKGROUND_PRESETS}
                  onChange={(background_color) => onSettingsChange({ background_color })}
                  compact={isFullscreen}
                />
              </div>
              <div className={styles.colorFieldCard}>
                <ColorField
                  label="Text"
                  value={settings.text_color}
                  defaultColor={DS_COLORS.grey[800]}
                  presets={DS_TEXT_PRESETS}
                  onChange={(text_color) => onSettingsChange({ text_color })}
                  compact={isFullscreen}
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <p className={styles.sectionTitle}>Design system</p>
            <div className={styles.field}>
              <label className={styles.label}>Typography</label>
              <FontFamilyField
                value={settings.font_family}
                onChange={(font_family) => onSettingsChange({ font_family })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Font size by device</label>
              <ResponsiveFontSizeField
                settings={settings}
                onChange={onSettingsChange}
              />
            </div>
            <div className={styles.rowGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`preview-font-weight-${block.id}`}>
                  Font weight
                </label>
                <select
                  id={`preview-font-weight-${block.id}`}
                  className={styles.input}
                  value={settings.font_weight ?? ""}
                  onChange={(e) =>
                    onSettingsChange({
                      font_weight: (e.target.value || undefined) as BlockSettings["font_weight"],
                    })
                  }
                >
                  <option value="">Default</option>
                  <option value="400">Normal</option>
                  <option value="600">Semi-bold</option>
                  <option value="700">Bold</option>
                  <option value="900">Black</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`preview-line-height-${block.id}`}>
                  Line height
                </label>
                <input
                  id={`preview-line-height-${block.id}`}
                  className={styles.input}
                  value={settings.line_height ?? ""}
                  placeholder="1.42"
                  onChange={(e) =>
                    onSettingsChange({
                      line_height: e.target.value.trim() || undefined,
                    })
                  }
                />
              </div>
            </div>
            {blockSupportsParagraphGap(block.type) || isColumnTarget ? (
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`preview-paragraph-gap-${block.id}`}>
                  Paragraph gap
                </label>
                <CssLengthInput
                  value={settings.paragraph_gap}
                  onChange={(paragraph_gap) => onSettingsChange({ paragraph_gap })}
                  placeholder="20"
                  inputClassName={styles.input}
                  ariaLabel="Paragraph gap"
                />
              </div>
            ) : null}
            <div className={styles.field}>
              <label className={styles.label}>Border radius</label>
              <RadiusField
                value={settings.border_radius}
                onChange={(border_radius) => onSettingsChange({ border_radius })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Shadow</label>
              <ShadowField
                value={settings.box_shadow}
                onChange={(box_shadow) => onSettingsChange({ box_shadow })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Border</label>
              <BorderField settings={settings} onChange={onSettingsChange} inputClassName={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`preview-text-align-${block.id}`}>
                Text align
              </label>
              <select
                id={`preview-text-align-${block.id}`}
                className={styles.input}
                value={settings.text_align ?? ""}
                onChange={(e) =>
                  onSettingsChange({
                    text_align: (e.target.value || undefined) as BlockSettings["text_align"],
                  })
                }
              >
                <option value="">Default</option>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          </div>

          <div className={styles.section}>
            <p className={styles.sectionTitle}>Layout</p>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`preview-max-width-${block.id}`}>
                Max width
              </label>
              <MaxWidthField
                id={`preview-max-width-${block.id}`}
                preset={settings.max_width ?? ""}
                customValue={settings.max_width_custom}
                inheritLabel="Inherit article default"
                selectClassName={styles.input}
                inputClassName={styles.input}
                onPresetChange={(preset) => {
                  if (!preset) {
                    onSettingsChange({
                      max_width: undefined,
                      max_width_custom: undefined,
                      width_custom: undefined,
                    });
                    return;
                  }
                  onSettingsChange({
                    max_width: preset,
                    max_width_custom: preset === "custom" ? settings.max_width_custom : undefined,
                    width_custom: undefined,
                  });
                }}
                onCustomChange={(custom) =>
                  onSettingsChange({
                    max_width: "custom",
                    max_width_custom: custom || undefined,
                    width_custom: undefined,
                  })
                }
              />
            </div>

            <div className={styles.rowGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`preview-height-${block.id}`}>
                  Min height
                </label>
                <CssLengthInput
                  value={settings.min_height}
                  onChange={(min_height) =>
                    onSettingsChange({
                      min_height,
                      height_custom: undefined,
                    })
                  }
                  placeholder="40"
                  allowAuto
                  inputClassName={styles.input}
                  ariaLabel="Min height"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Margin</label>
              <MarginField settings={settings} onChange={onSettingsChange} inputClassName={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Padding</label>
              <PaddingField settings={settings} onChange={onSettingsChange} inputClassName={styles.input} />
            </div>

            {!isColumnTarget ? (
              <div className={styles.field}>
                <label className={styles.label} htmlFor={`preview-spacing-${block.id}`}>
                  Spacing
                </label>
                <select
                  id={`preview-spacing-${block.id}`}
                  className={styles.input}
                  value={settings.spacing ?? ""}
                  onChange={(e) =>
                    onSettingsChange({
                      spacing: (e.target.value || undefined) as BlockSettings["spacing"],
                    })
                  }
                >
                  <option value="">Normal</option>
                  <option value="compact">Compact</option>
                  <option value="loose">Loose</option>
                </select>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
