"use client";

import { DS_TYPOGRAPHY, type FontFamilyPreset } from "@/lib/design-system/tokens";
import styles from "./font-family-field.module.css";

type FontFamilyFieldProps = {
  value?: FontFamilyPreset;
  onChange: (preset: FontFamilyPreset | undefined) => void;
};

export function FontFamilyField({ value, onChange }: FontFamilyFieldProps) {
  const presets = Object.values(DS_TYPOGRAPHY);

  return (
    <div className={styles.root} role="radiogroup" aria-label="Font family">
      <button
        type="button"
        role="radio"
        aria-checked={!value}
        className={`${styles.option} ${!value ? styles.optionActive : ""}`}
        onClick={() => onChange(undefined)}
      >
        <span className={styles.sampleDefault}>Aa</span>
        <span className={styles.name}>Default</span>
        <span className={styles.hint}>Inherit article</span>
      </button>
      {presets.map((preset) => {
        const active = value === preset.id;
        return (
          <button
            key={preset.id}
            type="button"
            role="radio"
            aria-checked={active}
            className={`${styles.option} ${active ? styles.optionActive : ""}`}
            onClick={() => onChange(active ? undefined : preset.id)}
          >
            <span className={styles.sample} style={{ fontFamily: preset.fontFamily }}>
              {preset.sample}
            </span>
            <span className={styles.name}>{preset.label}</span>
            <span className={styles.hint}>
              {preset.id === "primary" ? "Montserrat" : "Playfair Display"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
