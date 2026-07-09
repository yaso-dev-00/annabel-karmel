"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import type { BlockSettings, ContentBlock } from "@/lib/content-blocks/types";
import { hasCustomPadding } from "@/lib/content-blocks/padding";
import { hasCustomMargin } from "@/lib/content-blocks/margin";
import { hasResponsiveFontSize } from "@/lib/content-blocks/responsive-font-size";
import {
  blockHasImageSource,
  blockHasResizableImage,
  getImageStackImageIndices,
  getTwoColumnImageTargets,
  patchBlockImageDimensions,
} from "@/lib/admin/block-image-resize";
import {
  formatPx,
  IMAGE_HANDLES,
  RESIZE_MIN_IMAGE_HEIGHT,
  RESIZE_MIN_IMAGE_WIDTH,
  RESIZE_MIN_HEIGHT,
  RESIZE_MIN_WIDTH,
  SECTION_HANDLES,
  type ResizeHandle,
} from "@/lib/admin/resize-utils";
import { PreviewResizeOverlay } from "./preview-resize-overlay";
import styles from "@/components/ContentBlocks/content-blocks.module.css";

type PreviewBlockWrapperProps = {
  block: ContentBlock;
  selected: boolean;
  previewMode: boolean;
  style?: CSSProperties;
  children: ReactNode;
  onSelect?: () => void;
  onSettingsChange?: (patch: Partial<BlockSettings>) => void;
  onDataChange?: (data: ContentBlock["data"]) => void;
};

export function PreviewBlockWrapper({
  block,
  selected,
  previewMode,
  style,
  children,
  onSelect,
  onSettingsChange,
  onDataChange,
}: PreviewBlockWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSectionResizeEnd = (dims: { width: number; height: number }, handle: ResizeHandle) => {
    const patch: Partial<BlockSettings> = {
      max_width: "custom",
      max_width_custom: formatPx(dims.width),
      width_custom: undefined,
      min_width_custom: undefined,
      height_custom: undefined,
    };
    if (handle === "n" || handle === "s" || handle.length === 2) {
      patch.min_height = formatPx(dims.height);
    }
    onSettingsChange?.(patch);
  };

  const handleImageResizeEnd = (dims: { width: number; height: number }, imageIndex = 0) => {
    if (!onDataChange) return;
    onDataChange(patchBlockImageDimensions(block, dims.width, dims.height, imageIndex));
  };

  const stackImageIndices = block.type === "image_stack" ? getImageStackImageIndices(block) : [];
  const twoColumnImageTargets =
    block.type === "two_column" ? getTwoColumnImageTargets(block) : [];

  const allowSectionResize =
    previewMode &&
    selected &&
    onSettingsChange &&
    !(block.type === "recipe_grid" && block.data.layout === "carousel");

  const isRecipeCarousel =
    block.type === "recipe_grid" && block.data.layout === "carousel";
  const isHidden = Boolean(block.settings?.hidden);
  const customMargin = hasCustomMargin(block.settings);
  const spacingClass =
    !customMargin && block.settings?.spacing === "compact"
      ? styles.blockWrapperSpacingCompact
      : !customMargin && block.settings?.spacing === "loose"
        ? styles.blockWrapperSpacingLoose
        : "";

  return (
    <div
      ref={wrapperRef}
      data-block-id={block.id}
      className={`${styles.blockWrapper} ${customMargin ? styles.blockWrapperHasMargin : ""} ${spacingClass} ${hasResponsiveFontSize(block.settings) ? styles.blockWrapperResponsiveFontSize : ""} ${hasCustomPadding(block.settings) || customMargin ? styles.blockWrapperCustomPadding : ""} ${previewMode ? styles.blockWrapperEditable : ""} ${selected ? styles.blockWrapperSelected : ""} ${previewMode && isHidden ? styles.blockWrapperHidden : ""}`}
      style={style}
      onClick={
        previewMode && onSelect
          ? (e) => {
              if ((e.target as HTMLElement).closest("[data-cms-interactive]")) return;
              e.stopPropagation();
              onSelect();
            }
          : undefined
      }
      onKeyDown={
        previewMode && onSelect && !isRecipeCarousel
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
      role={previewMode && !isRecipeCarousel ? "button" : undefined}
      tabIndex={previewMode && !isRecipeCarousel ? 0 : undefined}
      aria-label={previewMode && !isRecipeCarousel ? `Select ${block.type} block` : undefined}
    >
      {previewMode && isHidden ? (
        <span className={styles.blockHiddenBadge} aria-hidden>
          Hidden
        </span>
      ) : null}
      {children}
      {allowSectionResize ? (
        <PreviewResizeOverlay
          containerRef={wrapperRef}
          targetSelector=":scope"
          handles={SECTION_HANDLES}
          label="Section"
          minWidth={RESIZE_MIN_WIDTH}
          minHeight={RESIZE_MIN_HEIGHT}
          onResizeEnd={handleSectionResizeEnd}
        />
      ) : null}
      {previewMode && selected && onDataChange && block.type === "image_stack"
        ? stackImageIndices.map((imageIndex) => (
            <PreviewResizeOverlay
              key={imageIndex}
              containerRef={wrapperRef}
              targetSelector={`[data-cms-image-index="${imageIndex}"]`}
              handles={IMAGE_HANDLES}
              label={`Image ${imageIndex + 1}`}
              variant="image"
              minWidth={RESIZE_MIN_IMAGE_WIDTH}
              minHeight={RESIZE_MIN_IMAGE_HEIGHT}
              onResizeEnd={(dims, _handle) => handleImageResizeEnd(dims, imageIndex)}
            />
          ))
        : null}
      {previewMode && selected && onDataChange && block.type === "two_column"
        ? twoColumnImageTargets.map((target) => (
            <PreviewResizeOverlay
              key={target.flatIndex}
              containerRef={wrapperRef}
              targetSelector={`[data-cms-image-index="${target.flatIndex}"]`}
              handles={IMAGE_HANDLES}
              label={`Image ${target.flatIndex + 1}`}
              variant="image"
              minWidth={RESIZE_MIN_IMAGE_WIDTH}
              minHeight={RESIZE_MIN_IMAGE_HEIGHT}
              onResizeEnd={(dims, _handle) => handleImageResizeEnd(dims, target.flatIndex)}
            />
          ))
        : null}
      {previewMode &&
      selected &&
      onDataChange &&
      blockHasResizableImage(block.type) &&
      block.type !== "image_stack" &&
      block.type !== "two_column" &&
      blockHasImageSource(block) ? (
        <PreviewResizeOverlay
          containerRef={wrapperRef}
          targetSelector="[data-cms-resize-image]"
          handles={IMAGE_HANDLES}
          label="Image"
          variant="image"
          minWidth={RESIZE_MIN_IMAGE_WIDTH}
          minHeight={RESIZE_MIN_IMAGE_HEIGHT}
          onResizeEnd={(dims, _handle) => handleImageResizeEnd(dims)}
        />
      ) : null}
    </div>
  );
}
