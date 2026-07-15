"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  computeResizedDimensions,
  formatPx,
  getHandleCursor,
  type ResizeDimensions,
  type ResizeHandle,
} from "@/lib/admin/resize-utils";
import styles from "./preview-resize-overlay.module.css";

const HANDLE_POSITION_CLASS: Record<ResizeHandle, string> = {
  n: styles.handleN,
  s: styles.handleS,
  e: styles.handleE,
  w: styles.handleW,
  ne: styles.handleNE,
  nw: styles.handleNW,
  se: styles.handleSE,
  sw: styles.handleSW,
};

function handleAffectsHeight(handle: ResizeHandle): boolean {
  return handle === "n" || handle === "s" || handle.length === 2;
}

type PreviewResizeOverlayProps = {
  containerRef: React.RefObject<HTMLElement | null>;
  targetSelector?: string;
  handles: ResizeHandle[];
  label: string;
  variant?: "section" | "image";
  minWidth?: number;
  minHeight?: number;
  onResizeLive?: (dims: ResizeDimensions) => void;
  onResizeEnd: (dims: ResizeDimensions, handle: ResizeHandle) => void;
};

function getTargetElement(
  container: HTMLElement,
  targetSelector?: string,
): HTMLElement | null {
  if (!targetSelector || targetSelector === ":scope") {
    return container;
  }
  const matches = container.querySelectorAll<HTMLElement>(targetSelector);
  if (matches.length === 0) return null;
  if (matches.length === 1) return matches[0];

  // Prefer the visible image (desktop vs mobile swap).
  for (const el of matches) {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const style = window.getComputedStyle(el);
      if (style.display !== "none" && style.visibility !== "hidden") {
        return el;
      }
    }
  }
  return matches[0];
}

export function PreviewResizeOverlay({
  containerRef,
  targetSelector = ":scope",
  handles,
  label,
  variant = "section",
  minWidth = 120,
  minHeight = 60,
  onResizeLive,
  onResizeEnd,
}: PreviewResizeOverlayProps) {
  const [box, setBox] = useState<{ top: number; left: number; width: number; height: number } | null>(
    null,
  );
  const [liveDims, setLiveDims] = useState<ResizeDimensions | null>(null);
  const dragRef = useRef<{
    handle: ResizeHandle;
    startX: number;
    startY: number;
    startDims: ResizeDimensions;
    target: HTMLElement;
    maxWidth: number;
    maxHeight: number;
  } | null>(null);

  const syncOverlay = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const target = getTargetElement(container, targetSelector);
    if (!target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setBox({
      top: targetRect.top - containerRect.top + container.scrollTop,
      left: targetRect.left - containerRect.left + container.scrollLeft,
      width: targetRect.width,
      height: targetRect.height,
    });
  }, [containerRef, targetSelector]);

  useEffect(() => {
    syncOverlay();
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(syncOverlay);
    observer.observe(container);
    const target = getTargetElement(container, targetSelector);
    if (target && target !== container) observer.observe(target);

    window.addEventListener("scroll", syncOverlay, true);
    window.addEventListener("resize", syncOverlay);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncOverlay, true);
      window.removeEventListener("resize", syncOverlay);
    };
  }, [containerRef, targetSelector, syncOverlay]);

  const applyLiveSize = (target: HTMLElement, handle: ResizeHandle, dims: ResizeDimensions) => {
    if (variant === "section") {
      target.style.width = "100%";
      target.style.maxWidth = formatPx(dims.width);
      if (handleAffectsHeight(handle)) {
        target.style.minHeight = formatPx(dims.height);
      }
    } else {
      target.style.width = "100%";
      target.style.maxWidth = formatPx(dims.width);
      if (handleAffectsHeight(handle)) {
        target.style.height = formatPx(dims.height);
      }
      target.style.objectFit = "cover";
    }
  };

  const startDrag = (handle: ResizeHandle, event: React.PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const container = containerRef.current;
    if (!container) return;
    const target = getTargetElement(container, targetSelector);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const parent = container.closest("[data-preview-frame]") ?? container.parentElement;
    const maxWidth = parent?.clientWidth ?? rect.width;
    const maxHeight = Math.max(rect.height * 3, 1200);

    dragRef.current = {
      handle,
      startX: event.clientX,
      startY: event.clientY,
      startDims: { width: rect.width, height: rect.height },
      target,
      maxWidth,
      maxHeight,
    };

    const onMove = (ev: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      const dims = computeResizedDimensions(
        drag.handle,
        drag.startDims,
        ev.clientX - drag.startX,
        ev.clientY - drag.startY,
        {
          minWidth,
          maxWidth: drag.maxWidth,
          minHeight,
          maxHeight: drag.maxHeight,
        },
      );

      applyLiveSize(drag.target, drag.handle, dims);
      setLiveDims(dims);
      onResizeLive?.(dims);
      syncOverlay();
    };

    const onUp = (ev: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      const dims = computeResizedDimensions(
        drag.handle,
        drag.startDims,
        ev.clientX - drag.startX,
        ev.clientY - drag.startY,
        {
          minWidth,
          maxWidth: drag.maxWidth,
          minHeight,
          maxHeight: drag.maxHeight,
        },
      );

      onResizeEnd(dims, drag.handle);
      dragRef.current = null;
      setLiveDims(null);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = getHandleCursor(handle);
    document.body.style.userSelect = "none";
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  if (!box) return null;

  const displayDims = liveDims ?? { width: Math.round(box.width), height: Math.round(box.height) };
  const isImage = variant === "image";

  return (
    <div
      className={`${styles.overlay} ${isImage ? styles.overlayImage : ""}`}
      style={{
        top: box.top,
        left: box.left,
        width: box.width,
        height: box.height,
      }}
    >
      <span className={`${styles.label} ${isImage ? styles.labelImage : ""}`}>{label}</span>
      <span className={`${styles.sizeBadge} ${isImage ? styles.sizeBadgeImage : ""}`}>
        {displayDims.width} × {displayDims.height}
      </span>

      {handles.map((handle) => (
        <button
          key={handle}
          type="button"
          aria-label={`Resize ${handle}`}
          className={`${styles.handle} ${HANDLE_POSITION_CLASS[handle]} ${isImage ? styles.handleImage : ""}`}
          style={{ cursor: getHandleCursor(handle) }}
          onPointerDown={(e) => startDrag(handle, e)}
        />
      ))}

      {handles.includes("n") ? (
        <div
          className={`${styles.edgeHandle} ${styles.edgeN}`}
          style={{ cursor: "ns-resize" }}
          onPointerDown={(e) => startDrag("n", e)}
        />
      ) : null}
      {handles.includes("s") ? (
        <div
          className={`${styles.edgeHandle} ${styles.edgeS}`}
          style={{ cursor: "ns-resize" }}
          onPointerDown={(e) => startDrag("s", e)}
        />
      ) : null}
      {handles.includes("e") ? (
        <div
          className={`${styles.edgeHandle} ${styles.edgeE}`}
          style={{ cursor: "ew-resize" }}
          onPointerDown={(e) => startDrag("e", e)}
        />
      ) : null}
      {handles.includes("w") ? (
        <div
          className={`${styles.edgeHandle} ${styles.edgeW}`}
          style={{ cursor: "ew-resize" }}
          onPointerDown={(e) => startDrag("w", e)}
        />
      ) : null}
    </div>
  );
}
