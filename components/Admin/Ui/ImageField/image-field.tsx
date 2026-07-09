"use client";

import { useCallback, useRef, useState } from "react";
import { uploadImage } from "@/lib/admin/upload-image";
import styles from "./image-field.module.css";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type ImageFieldProps = {
  value: string;
  alt?: string;
  onChange: (src: string, alt?: string) => void;
  onAltChange?: (alt: string) => void;
  altLabel?: string;
  showAlt?: boolean;
};

type Tab = "url" | "upload";

export function ImageField({
  value,
  alt = "",
  onChange,
  onAltChange,
  altLabel = "Alt text",
  showAlt = true,
}: ImageFieldProps) {
  const [tab, setTab] = useState<Tab>("url");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Use JPEG, PNG, WebP, or GIF.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError("Maximum file size is 5 MB.");
        return;
      }
      setUploading(true);
      try {
        const url = await uploadImage(file);
        onChange(url, alt);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [alt, onChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  return (
    <div className={styles.imageField}>
      <div className={styles.tabs} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "url"}
          className={`${styles.tab} ${tab === "url" ? styles.tabActive : ""}`}
          onClick={() => setTab("url")}
        >
          URL
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "upload"}
          className={`${styles.tab} ${tab === "upload" ? styles.tabActive : ""}`}
          onClick={() => setTab("upload")}
        >
          Upload
        </button>
      </div>

      {tab === "url" ? (
        <input
          type="url"
          className={styles.urlInput}
          placeholder="https://… or /path/to/image.jpg"
          value={value}
          onChange={(e) => onChange(e.target.value, alt)}
        />
      ) : (
        <>
          <div
            className={`${styles.dropZone} ${dragging ? styles.dropZoneDragging : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            role="button"
            tabIndex={0}
          >
            <p className={styles.dropZoneText}>
              {uploading ? "Uploading…" : "Drop an image here or click to browse"}
            </p>
            <p className={styles.dropZoneHint}>JPEG, PNG, WebP, GIF — max 5 MB</p>
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
        </>
      )}

      {uploading ? <p className={styles.uploading}>Uploading…</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}

      {value ? (
        <div className={styles.preview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={alt || "Preview"} className={styles.thumbnail} />
          <div className={styles.previewActions}>
            <span className={styles.previewUrl}>{value}</span>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => onChange("", alt)}
            >
              Remove
            </button>
          </div>
        </div>
      ) : null}

      {showAlt && onAltChange ? (
        <div className={styles.altField}>
          <label className={styles.altLabel}>{altLabel}</label>
          <input
            type="text"
            className={styles.altInput}
            value={alt}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Describe the image for accessibility"
          />
        </div>
      ) : null}
    </div>
  );
}
