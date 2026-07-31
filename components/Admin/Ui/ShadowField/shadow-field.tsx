'use client';

import {
  DS_SHADOW,
  SHADOW_PRESETS,
  type ShadowPreset,
} from '@/lib/design-system/tokens';
import styles from './shadow-field.module.css';

type ShadowFieldProps = {
  value?: ShadowPreset;
  onChange: (preset: ShadowPreset | undefined) => void;
};

export function ShadowField({ value, onChange }: ShadowFieldProps) {
  return (
    <div className={styles.root} role="radiogroup" aria-label="Box shadow">
      {SHADOW_PRESETS.map((preset) => {
        const token = DS_SHADOW[preset];
        const active = (value ?? 'none') === preset;
        return (
          <button
            key={preset}
            type="button"
            role="radio"
            aria-checked={active}
            className={`${styles.option} ${active ? styles.optionActive : ''}`}
            onClick={() => onChange(preset === 'none' ? undefined : preset)}
            title={token.label}
          >
            <span className={styles.disc} style={{ boxShadow: token.value }} />
            <span className={styles.label}>{token.label}</span>
          </button>
        );
      })}
    </div>
  );
}
