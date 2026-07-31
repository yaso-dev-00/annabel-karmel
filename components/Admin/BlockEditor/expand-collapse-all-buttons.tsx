'use client';

import styles from './block-editor.module.css';

type ExpandCollapseAllButtonsProps = {
  label: string;
  onExpandAll: () => void;
  onCollapseAll: () => void;
};

export function ExpandCollapseAllButtons({
  label,
  onExpandAll,
  onCollapseAll,
}: ExpandCollapseAllButtonsProps) {
  const name = label.toLowerCase();

  return (
    <div className={styles.expandCollapseAll}>
      <button
        type="button"
        className={styles.expandCollapseIconBtn}
        onClick={onExpandAll}
        title={`Expand all ${name}`}
        aria-label={`Expand all ${name}`}
      >
        <span className={styles.expandCollapseIconGlyph} aria-hidden>
          ▼
        </span>
      </button>
      <button
        type="button"
        className={styles.expandCollapseIconBtn}
        onClick={onCollapseAll}
        title={`Collapse all ${name}`}
        aria-label={`Collapse all ${name}`}
      >
        <span className={styles.expandCollapseIconGlyph} aria-hidden>
          ▲
        </span>
      </button>
    </div>
  );
}
