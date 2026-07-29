"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  fetchMediaLibrary,
  type CmsMediaItem,
} from "@/lib/admin/fetch-media-library";
import { uploadImage } from "@/lib/admin/upload-image";
import { normalizeCmsImageSrc } from "@/lib/content-blocks/image-src";
import styles from "./media-library-modal.module.css";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type MediaTab = "upload" | "library" | "url";

type MediaLibraryModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  initialUrl?: string;
  title?: string;
};

function formatBytes(size: number | null): string {
  if (size == null || size <= 0) return "—";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return value;
  }
}

function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ").trim() || filename;
}

export function MediaLibraryModal({
  open,
  onClose,
  onSelect,
  initialUrl = "",
  title = "Select Image",
}: MediaLibraryModalProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<MediaTab>("library");
  const [items, setItems] = useState<CmsMediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedUrl, setSelectedUrl] = useState(initialUrl);
  const [urlDraft, setUrlDraft] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const loadLibrary = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const next = await fetchMediaLibrary();
      setItems(next);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setTab("library");
    setSearch("");
    setSelectedUrl(initialUrl);
    setUrlDraft(initialUrl);
    setUploadError(null);
    void loadLibrary();
  }, [open, initialUrl, loadLibrary]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.filename.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q),
    );
  }, [items, search]);

  const selected = useMemo(
    () => items.find((item) => item.url === selectedUrl) ?? null,
    [items, selectedUrl],
  );

  const handleFile = useCallback(
    async (file: File) => {
      setUploadError(null);
      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError("Use JPEG, PNG, WebP, or GIF.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setUploadError("Maximum file size is 5 MB.");
        return;
      }
      setUploading(true);
      try {
        const url = await uploadImage(file);
        setSelectedUrl(url);
        setTab("library");
        await loadLibrary();
        setSelectedUrl(url);
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [loadLibrary],
  );

  const confirmSelection = () => {
    if (tab === "url") {
      const next = normalizeCmsImageSrc(urlDraft.trim());
      if (!next) return;
      onSelect(next);
      onClose();
      return;
    }
    if (!selectedUrl) return;
    onSelect(selectedUrl);
    onClose();
  };

  const canSelect =
    tab === "url" ? Boolean(normalizeCmsImageSrc(urlDraft.trim())) : Boolean(selectedUrl);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Media source">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "upload"}
            className={`${styles.tab}${tab === "upload" ? ` ${styles.tabActive}` : ""}`}
            onClick={() => setTab("upload")}
          >
            Upload files
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "library"}
            className={`${styles.tab}${tab === "library" ? ` ${styles.tabActive}` : ""}`}
            onClick={() => setTab("library")}
          >
            Media Library
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "url"}
            className={`${styles.tab}${tab === "url" ? ` ${styles.tabActive}` : ""}`}
            onClick={() => setTab("url")}
          >
            From URL
          </button>
        </div>

        <div className={styles.body}>
          {tab === "upload" ? (
            <div className={styles.uploadPane}>
              <div
                className={`${styles.dropZone}${dragging ? ` ${styles.dropZoneDragging}` : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file) void handleFile(file);
                }}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
                }}
                role="button"
                tabIndex={0}
              >
                <p className={styles.dropTitle}>
                  {uploading ? "Uploading…" : "Drop files to upload"}
                </p>
                <p className={styles.dropHint}>or</p>
                <span className={styles.browseBtn}>Select Files</span>
                <p className={styles.dropMeta}>JPEG, PNG, WebP, GIF — max 5 MB</p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className={styles.hiddenInput}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleFile(file);
                  e.target.value = "";
                }}
              />
              {uploadError ? <p className={styles.error}>{uploadError}</p> : null}
            </div>
          ) : null}

          {tab === "library" ? (
            <div className={styles.libraryLayout}>
              <div className={styles.libraryMain}>
                <div className={styles.toolbar}>
                  <input
                    type="search"
                    className={styles.search}
                    placeholder="Search media…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search media"
                  />
                  <button
                    type="button"
                    className={styles.refreshBtn}
                    onClick={() => void loadLibrary()}
                    disabled={loading}
                  >
                    Refresh
                  </button>
                </div>

                {loading ? <p className={styles.status}>Loading media…</p> : null}
                {loadError ? <p className={styles.error}>{loadError}</p> : null}

                {!loading && !loadError && filtered.length === 0 ? (
                  <p className={styles.status}>
                    {items.length === 0
                      ? "No uploads yet. Switch to Upload files to add images."
                      : "No media matches your search."}
                  </p>
                ) : null}

                <div className={styles.grid}>
                  {filtered.map((item) => {
                    const active = item.url === selectedUrl;
                    return (
                      <button
                        key={item.url}
                        type="button"
                        className={`${styles.card}${active ? ` ${styles.cardActive}` : ""}`}
                        onClick={() => setSelectedUrl(item.url)}
                        onDoubleClick={() => {
                          setSelectedUrl(item.url);
                          onSelect(item.url);
                          onClose();
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.url} alt="" className={styles.cardThumb} />
                        <span className={styles.cardLabel}>{titleFromFilename(item.filename)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <aside className={styles.details}>
                <h3 className={styles.detailsTitle}>Attachment Details</h3>
                {selected || selectedUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selected?.url ?? selectedUrl}
                      alt=""
                      className={styles.detailsPreview}
                    />
                    <dl className={styles.detailsList}>
                      <div>
                        <dt>File name</dt>
                        <dd>{selected?.filename ?? "External / current"}</dd>
                      </div>
                      <div>
                        <dt>Uploaded</dt>
                        <dd>{formatDate(selected?.uploadedAt ?? null)}</dd>
                      </div>
                      <div>
                        <dt>File size</dt>
                        <dd>{formatBytes(selected?.size ?? null)}</dd>
                      </div>
                      <div>
                        <dt>URL</dt>
                        <dd className={styles.detailsUrl}>{selected?.url ?? selectedUrl}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <p className={styles.detailsEmpty}>Select an image to see details.</p>
                )}
              </aside>
            </div>
          ) : null}

          {tab === "url" ? (
            <div className={styles.urlPane}>
              <label className={styles.urlLabel} htmlFor={`${titleId}-url`}>
                Image URL
              </label>
              <input
                id={`${titleId}-url`}
                type="url"
                className={styles.urlInput}
                placeholder="https://… or /cms-uploads/…"
                value={urlDraft}
                onChange={(e) => {
                  setUrlDraft(e.target.value);
                  setSelectedUrl(normalizeCmsImageSrc(e.target.value.trim()));
                }}
              />
              {urlDraft.trim() ? (
                <div className={styles.urlPreview}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={normalizeCmsImageSrc(urlDraft.trim()) || urlDraft.trim()}
                    alt=""
                    className={styles.detailsPreview}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.selectBtn}
            disabled={!canSelect}
            onClick={confirmSelection}
          >
            Select
          </button>
        </footer>
      </div>
    </div>
  );
}
