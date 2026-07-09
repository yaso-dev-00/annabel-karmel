"use client";

import { DS_RADIUS, RADIUS_PRESETS, type RadiusPreset } from "@/lib/design-system/tokens";
import styles from "./radius-field.module.css";

type RadiusFieldProps = {
  value?: RadiusPreset;
  onChange: (preset: RadiusPreset | undefined) => void;
};

export function RadiusField({ value, onChange }: RadiusFieldProps) {
  return (
    <div className={styles.root} role="radiogroup" aria-label="Border radius">
      {RADIUS_PRESETS.map((preset) => {
        const token = DS_RADIUS[preset];
        const active = value === preset;
        return (
          <button
            key={preset}
            type="button"
            role="radio"
            aria-checked={active}
            className={`${styles.option} ${active ? styles.optionActive : ""}`}
            onClick={() => onChange(active ? undefined : preset)}
            title={`${token.value} — ${token.label}`}
          >
            <span
              className={styles.preview}
              style={{ borderRadius: token.value === "999px" ? "50%" : token.value }}
            />
            <span className={styles.value}>{token.value}</span>
            <span className={styles.label}>{token.label}</span>
          </button>
        );
      })}
    </div>
  );
}
