import type { CSSProperties } from "react";
import type { ContentBlock } from "@/lib/content-blocks/types";

function imageSizeStyle(maxWidth?: string, height?: string): CSSProperties | undefined {
  if (!maxWidth && !height) return undefined;
  return {
    width: "100%",
    maxWidth: maxWidth ?? "100%",
    height: height || "auto",
    objectFit: height ? "cover" : undefined,
  };
}

export function blockHasResizableImage(type: ContentBlock["type"]): boolean {
  return (
    type === "image" ||
    type === "image_text" ||
    type === "image_stack" ||
    type === "hero" ||
    type === "book_promo" ||
    type === "author_bio" ||
    type === "two_column"
  );
}

export function getImageStackImageIndices(block: ContentBlock): number[] {
  if (block.type !== "image_stack") return [];
  return block.data.images
    .map((img, index) => (img.src?.trim() ? index : -1))
    .filter((index) => index >= 0);
}

/** Flat indices into left_blocks then right_blocks for two_column image mini-blocks with src. */
export function getTwoColumnImageTargets(
  block: ContentBlock,
): { column: "left" | "right"; index: number; flatIndex: number }[] {
  if (block.type !== "two_column") return [];
  const targets: { column: "left" | "right"; index: number; flatIndex: number }[] = [];
  let flatIndex = 0;
  block.data.left_blocks.forEach((mini, index) => {
    if (mini.type === "image" && mini.src?.trim()) {
      targets.push({ column: "left", index, flatIndex });
      flatIndex += 1;
    }
  });
  block.data.right_blocks.forEach((mini, index) => {
    if (mini.type === "image" && mini.src?.trim()) {
      targets.push({ column: "right", index, flatIndex });
      flatIndex += 1;
    }
  });
  return targets;
}

export function blockHasImageSource(block: ContentBlock): boolean {
  switch (block.type) {
    case "image":
      return Boolean(block.data.src);
    case "image_text":
      return Boolean(block.data.image_src);
    case "image_stack":
      return block.data.images.some((img) => Boolean(img.src?.trim()));
    case "hero":
      return Boolean(block.data.image_url);
    case "book_promo":
      return Boolean(block.data.cover_src);
    case "author_bio":
      return Boolean(block.data.photo_src);
    case "two_column":
      return getTwoColumnImageTargets(block).length > 0;
    default:
      return false;
  }
}

export function patchBlockImageDimensions(
  block: ContentBlock,
  width: number,
  height: number,
  imageIndex = 0,
): ContentBlock["data"] {
  const w = `${Math.round(width)}px`;
  const h = `${Math.round(height)}px`;

  switch (block.type) {
    case "image":
      return { ...block.data, width: w, height: h, full_width: false };
    case "image_text":
      return { ...block.data, image_width: w, image_height: h };
    case "image_stack": {
      const images = block.data.images.map((img, index) =>
        index === imageIndex ? { ...img, width: w, height: h } : img,
      );
      return { ...block.data, images };
    }
    case "hero":
      return { ...block.data, image_width: w, image_height: h };
    case "book_promo":
      return { ...block.data, cover_width: w, cover_height: h };
    case "author_bio":
      return { ...block.data, photo_width: w, photo_height: h };
    case "two_column": {
      const targets = getTwoColumnImageTargets(block);
      const target = targets.find((t) => t.flatIndex === imageIndex) ?? targets[imageIndex];
      if (!target) return block.data;
      const key = target.column === "left" ? "left_blocks" : "right_blocks";
      const blocks = block.data[key].map((mini, index) => {
        if (index !== target.index || mini.type !== "image") return mini;
        return { ...mini, width: w, height: h };
      });
      return { ...block.data, [key]: blocks };
    }
    default:
      return block.data;
  }
}

export function getImageStackItemStyle(
  image: { width?: string; height?: string },
): CSSProperties | undefined {
  return imageSizeStyle(image.width, image.height);
}

export function getImageInlineStyle(block: ContentBlock): CSSProperties | undefined {
  switch (block.type) {
    case "image":
      return imageSizeStyle(block.data.width, block.data.height);
    case "image_text":
      return imageSizeStyle(block.data.image_width, block.data.image_height);
    case "hero":
      return imageSizeStyle(block.data.image_width, block.data.image_height);
    case "book_promo":
      return imageSizeStyle(block.data.cover_width, block.data.cover_height);
    case "author_bio":
      return imageSizeStyle(block.data.photo_width, block.data.photo_height);
    default:
      return undefined;
  }
}
