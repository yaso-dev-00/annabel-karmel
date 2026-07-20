"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import styles from "./block-editor.module.css";

export type PreviewViewportHandle = {
  openFullscreen: () => void;
  closeFullscreen: () => void;
};

export type PreviewViewportKey =
  | "mobile"
  | "tablet"
  | "landscape_tablet"
  | "desktop"
  | "large_desktop";

export const PREVIEW_VIEWPORTS: {
  key: PreviewViewportKey;
  label: string;
  width: number;
}[] = [
  { key: "mobile", label: "Mobile", width: 375 },
  { key: "tablet", label: "Tablet", width: 768 },
  { key: "landscape_tablet", label: "Landscape", width: 1024 },
  { key: "desktop", label: "Desktop", width: 1280 },
  { key: "large_desktop", label: "Large", width: 1440 },
];

const STORAGE_KEY = "admin-preview-viewport";
const DEFAULT_VIEWPORT: PreviewViewportKey = "desktop";

function readStoredViewport(): PreviewViewportKey {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY) as PreviewViewportKey | null;
    if (stored && PREVIEW_VIEWPORTS.some((v) => v.key === stored)) return stored;
  } catch {
    // sessionStorage unavailable
  }
  return DEFAULT_VIEWPORT;
}

type PreviewStyleToolbarSlot = ReactNode | ((ctx: { isFullscreen: boolean }) => ReactNode);

type PreviewViewportProps = {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  title?: string;
  styleToolbar?: PreviewStyleToolbarSlot;
  fullscreenActions?: ReactNode;
  blockMaxWidthLabel?: string | null;
  selectedBlockId?: string | null;
  /** Open in fullscreen overlay on first mount (e.g. dedicated preview pages). */
  defaultFullscreen?: boolean;
  /**
   * When set, the docked (right-side) preview always uses this device size and
   * hides the responsive toolbar. Fullscreen still shows all viewports.
   */
  dockedViewport?: PreviewViewportKey;
  /**
   * Overrides the docked preview frame width (in px). Useful to preview a
   * specific mobile device width without affecting the shared viewport presets.
   */
  dockedWidth?: number;
  /**
   * Per-device width overrides for both docked and fullscreen toolbars/frames.
   * e.g. `{ mobile: 400 }` for product previews.
   */
  viewportWidthOverrides?: Partial<Record<PreviewViewportKey, number>>;
};

export const PreviewViewport = forwardRef<PreviewViewportHandle, PreviewViewportProps>(
  function PreviewViewport(
    {
      children,
      className,
      bodyClassName,
      title = "Live preview",
      styleToolbar,
      fullscreenActions,
      blockMaxWidthLabel,
      selectedBlockId,
      defaultFullscreen = false,
      dockedViewport,
      dockedWidth,
      viewportWidthOverrides,
    },
    ref,
  ) {
  const [viewport, setViewport] = useState<PreviewViewportKey>(
    dockedViewport ?? DEFAULT_VIEWPORT,
  );
  const [isFullscreen, setIsFullscreen] = useState(defaultFullscreen);
  const [styleSidebarOpen, setStyleSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setViewport(dockedViewport ?? readStoredViewport());
    setMounted(true);
  }, [dockedViewport]);

  useEffect(() => {
    if (isFullscreen) {
      setStyleSidebarOpen(true);
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (isFullscreen && selectedBlockId) {
      setStyleSidebarOpen(true);
    }
  }, [isFullscreen, selectedBlockId]);

  useEffect(() => {
    if (!isFullscreen) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const adminRoot = document.querySelector(".adminRoot");
    const savedHtmlOverflow = html.style.overflow;
    const savedBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    html.style.overflow = "hidden";
    body.classList.add("admin-preview-fullscreen");
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    if (adminRoot instanceof HTMLElement) {
      adminRoot.setAttribute("inert", "");
      adminRoot.setAttribute("aria-hidden", "true");
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = savedHtmlOverflow;
      body.classList.remove("admin-preview-fullscreen");
      body.style.overflow = savedBody.overflow;
      body.style.position = savedBody.position;
      body.style.top = savedBody.top;
      body.style.left = savedBody.left;
      body.style.right = savedBody.right;
      body.style.width = savedBody.width;
      window.scrollTo(0, scrollY);

      if (adminRoot instanceof HTMLElement) {
        adminRoot.removeAttribute("inert");
        adminRoot.removeAttribute("aria-hidden");
      }

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFullscreen]);

  const select = (key: PreviewViewportKey) => {
    setViewport(key);
    sessionStorage.setItem(STORAGE_KEY, key);
  };

  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
    setStyleSidebarOpen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => {
      const next = !prev;
      if (next) setStyleSidebarOpen(true);
      return next;
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      openFullscreen,
      closeFullscreen,
    }),
    [openFullscreen, closeFullscreen],
  );

  const viewports = PREVIEW_VIEWPORTS.map((v) => ({
    ...v,
    width: viewportWidthOverrides?.[v.key] ?? v.width,
  }));

  const activeViewport =
    !isFullscreen && dockedViewport ? dockedViewport : viewport;
  const presetWidth =
    viewports.find((v) => v.key === activeViewport)?.width ?? 1280;
  const width =
    !isFullscreen && dockedViewport && dockedWidth ? dockedWidth : presetWidth;
  const showViewportToolbar = isFullscreen || !dockedViewport;

  const dockedClass = !isFullscreen ? className : undefined;

  const styleToolbarContent = styleToolbar
    ? typeof styleToolbar === "function"
      ? styleToolbar({ isFullscreen })
      : styleToolbar
    : null;

  const previewHeader = (
    <div className={styles.previewHeader}>
      <span>{title}</span>
      <div className={styles.previewHeaderActions}>
        {isFullscreen && fullscreenActions ? (
          <div className={styles.previewFullscreenActions}>{fullscreenActions}</div>
        ) : null}
        <button
          type="button"
          className={styles.previewFullscreenBtn}
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen preview" : "Open fullscreen preview"}
          title={isFullscreen ? "Exit fullscreen (Esc)" : "Fullscreen"}
        >
          {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );

  const previewToolbar = showViewportToolbar ? (
    <div className={styles.previewToolbar} role="toolbar" aria-label="Preview device size">
      {viewports.map((v) => (
        <button
          key={v.key}
          type="button"
          className={`${styles.previewViewportBtn} ${activeViewport === v.key ? styles.previewViewportBtnActive : ""}`}
          onClick={() => select(v.key)}
          title={`${v.label} (${v.width}px)`}
        >
          <span className={styles.previewViewportLabel}>{v.label}</span>
          <span className={styles.previewViewportSize}>{v.width}px</span>
        </button>
      ))}
      {isFullscreen && blockMaxWidthLabel ? (
        <div className={styles.previewBlockMaxWidth} title="Selected block max width">
          <span className={styles.previewBlockMaxWidthLabel}>Block max</span>
          <span className={styles.previewBlockMaxWidthValue}>{blockMaxWidthLabel}</span>
        </div>
      ) : null}
    </div>
  ) : null;

  const previewScroll = (
    <div className={styles.previewScroll} data-preview-scroll="true">
      <div
        className={styles.previewFrame}
        data-preview-frame="true"
        data-preview-fullscreen={isFullscreen ? "true" : "false"}
        data-preview-viewport={activeViewport}
        data-preview-width={String(width)}
        style={{ "--preview-width": `${width}px` } as React.CSSProperties}
      >
        <div className={`${styles.previewBody}${bodyClassName ? ` ${bodyClassName}` : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );

  const styleSidebar =
    isFullscreen && styleToolbarContent ? (
      <aside
        className={`${styles.previewStyleSidebar} ${styleSidebarOpen ? "" : styles.previewStyleSidebarCollapsed}`}
        aria-label="Block layout"
      >
        <button
          type="button"
          className={styles.previewStyleSidebarToggle}
          onClick={() => setStyleSidebarOpen((open) => !open)}
          aria-expanded={styleSidebarOpen}
          aria-label={styleSidebarOpen ? "Collapse layout panel" : "Expand layout panel"}
          title={styleSidebarOpen ? "Collapse layout panel" : "Layout"}
        >
          <span className={styles.previewStyleSidebarToggleIcon} aria-hidden>
            {styleSidebarOpen ? "›" : "‹"}
          </span>
          {styleSidebarOpen ? (
            <span className={styles.previewStyleSidebarToggleLabel}>Layout</span>
          ) : null}
        </button>
        {styleSidebarOpen ? (
          <div className={styles.previewStyleSidebarContent}>{styleToolbarContent}</div>
        ) : null}
      </aside>
    ) : null;

  const dockedStyleBar =
    !isFullscreen && styleToolbarContent ? (
      <div className={styles.previewStyleBar}>{styleToolbarContent}</div>
    ) : null;

  const panel = (
    <div
      className={`${styles.previewPanel} ${isFullscreen ? styles.previewFullscreenPanel : ""} ${dockedClass ?? ""}`}
    >
      {isFullscreen ? (
        <div className={styles.previewFullscreenBody}>
          <div className={styles.previewFullscreenMain}>
            {previewHeader}
            {previewToolbar}
            {previewScroll}
          </div>
          {styleSidebar}
        </div>
      ) : (
        <>
          {previewHeader}
          {previewToolbar}
          {dockedStyleBar}
          {previewScroll}
        </>
      )}
    </div>
  );

  if (mounted && isFullscreen) {
    return createPortal(<div className={styles.previewFullscreenRoot}>{panel}</div>, document.body);
  }

  return panel;
});
