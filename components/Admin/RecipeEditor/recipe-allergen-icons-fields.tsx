'use client';

import { ImageField } from '@/components/Admin/Ui/ImageField';
import styles from './recipe-editor.module.css';

type RecipeAllergenIconsFieldsProps = {
  icon?: string;
  iconActive?: string;
  onIconChange: (src: string) => void;
  onIconActiveChange: (src: string) => void;
};

export function RecipeAllergenIconsFields({
  icon = '',
  iconActive = '',
  onIconChange,
  onIconActiveChange,
}: RecipeAllergenIconsFieldsProps) {
  return (
    <div className={styles.allergenIconsPanel}>
      <div className={styles.allergenIconRow}>
        <span className={styles.allergenIconLabel}>Icon</span>
        <ImageField value={icon} showAlt={false} onChange={onIconChange} />
      </div>
      <div className={styles.allergenIconRow}>
        <span className={styles.allergenIconLabel}>Hover / Active Icon</span>
        <ImageField
          value={iconActive}
          showAlt={false}
          onChange={onIconActiveChange}
        />
      </div>
    </div>
  );
}
