'use client';

import { useMemo, useState } from 'react';
import {
  BLOCK_CATEGORIES,
  BLOCK_REGISTRY,
} from '@/lib/content-blocks/registry';
import {
  isBlockAllowedInEditor,
  type ContentEditorContext,
} from '@/lib/content-blocks/block-context';
import type { BlockType } from '@/lib/content-blocks/types';
import styles from './block-editor.module.css';

type BlockPickerProps = {
  onSelect: (type: BlockType) => void;
  onClose: () => void;
  editorContext?: ContentEditorContext;
};

export function BlockPicker({
  onSelect,
  onClose,
  editorContext = 'competition',
}: BlockPickerProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    return BLOCK_REGISTRY.filter((entry) => {
      if (!isBlockAllowedInEditor(entry.type, editorContext)) return false;
      const matchesSearch =
        !search ||
        entry.label.toLowerCase().includes(search.toLowerCase()) ||
        entry.description.toLowerCase().includes(search.toLowerCase()) ||
        entry.type.includes(search.toLowerCase());
      const matchesCategory = category === 'all' || entry.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category, editorContext]);

  return (
    <div className={styles.pickerOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.pickerPanel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Add block"
      >
        <div className={styles.pickerHeader}>
          <h2 className={styles.pickerTitle}>Add block</h2>
          <button
            type="button"
            className={styles.pickerClose}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <input
          type="search"
          placeholder="Search block types…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.pickerSearch}
        />
        <div className={styles.pickerTabs}>
          <button
            type="button"
            className={`${styles.pickerTab} ${category === 'all' ? styles.pickerTabActive : ''}`}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {BLOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.pickerTab} ${category === cat.id ? styles.pickerTabActive : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className={styles.pickerGrid}>
          {filtered.map((entry) => (
            <button
              key={entry.type}
              type="button"
              className={styles.pickerCard}
              onClick={() => {
                onSelect(entry.type);
                onClose();
              }}
            >
              <span className={styles.pickerIcon}>{entry.icon}</span>
              <span className={styles.pickerCardLabel}>{entry.label}</span>
              <span className={styles.pickerCardDesc}>{entry.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
