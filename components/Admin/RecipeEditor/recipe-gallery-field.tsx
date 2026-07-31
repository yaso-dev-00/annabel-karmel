'use client';

import { ImageField } from '@/components/Admin/Ui/ImageField';
import type { RecipeMedia } from '@/lib/recipes/types';
import styles from './recipe-editor.module.css';

type RecipeGalleryFieldProps = {
  images: RecipeMedia[];
  onChange: (images: RecipeMedia[]) => void;
};

export function RecipeGalleryField({
  images,
  onChange,
}: RecipeGalleryFieldProps) {
  const update = (index: number, patch: Partial<RecipeMedia>) => {
    onChange(
      images.map((image, i) => (i === index ? { ...image, ...patch } : image)),
    );
  };

  const remove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const move = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;
    const next = [...images];
    const [item] = next.splice(index, 1);
    next.splice(nextIndex, 0, item);
    onChange(next);
  };

  const add = () => {
    onChange([...images, { src: '', alt: '' }]);
  };

  return (
    <div className={styles.stack}>
      {images.length === 0 ? (
        <p className={styles.emptyHint}>No additional images yet.</p>
      ) : (
        images.map((image, index) => (
          <div key={index} className={styles.galleryRow}>
            <div className={styles.galleryRowHeader}>
              <span className={styles.galleryIndex}>Image {index + 1}</span>
              <div className={styles.rowMoveActions}>
                <button
                  type="button"
                  className={styles.rowMoveBtn}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={`Move image ${index + 1} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.rowMoveBtn}
                  disabled={index === images.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={`Move image ${index + 1} down`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={styles.iconRemove}
                  onClick={() => remove(index)}
                  aria-label={`Remove image ${index + 1}`}
                >
                  ✕
                </button>
              </div>
            </div>
            <ImageField
              value={image.src}
              alt={image.alt}
              showAlt
              altLabel="Image alt text"
              onChange={(src, altVal) =>
                update(index, { src, alt: altVal ?? image.alt })
              }
              onAltChange={(altVal) => update(index, { alt: altVal })}
            />
          </div>
        ))
      )}
      <button
        type="button"
        className={`btn btnGhost ${styles.addRowBtn}`}
        onClick={add}
      >
        + Add image
      </button>
    </div>
  );
}
