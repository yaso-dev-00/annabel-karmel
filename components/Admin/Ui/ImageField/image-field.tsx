'use client';

import { useState } from 'react';
import { MediaLibraryModal } from '@/components/Admin/Ui/MediaLibraryModal';
import styles from './image-field.module.css';

type ImageFieldProps = {
  value: string;
  alt?: string;
  onChange: (src: string, alt?: string) => void;
  onAltChange?: (alt: string) => void;
  altLabel?: string;
  showAlt?: boolean;
};

export function ImageField({
  value,
  alt = '',
  onChange,
  onAltChange,
  altLabel = 'Alt text',
  showAlt = true,
}: ImageFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.imageField}>
      {value ? (
        <div className={styles.preview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={alt || 'Preview'}
            className={styles.thumbnail}
          />
          <div className={styles.previewActions}>
            <span className={styles.previewUrl}>{value}</span>
            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.selectBtn}
                onClick={() => setOpen(true)}
              >
                Replace
              </button>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => onChange('', alt)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setOpen(true)}
        >
          <span className={styles.addBtnIcon} aria-hidden>
            +
          </span>
          Add Image
        </button>
      )}

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

      <MediaLibraryModal
        open={open}
        onClose={() => setOpen(false)}
        initialUrl={value}
        onSelect={(url) => onChange(url, alt)}
      />
    </div>
  );
}
