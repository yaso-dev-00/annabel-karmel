'use client';

import { useId, useRef } from 'react';
import styles from './color-field.module.css';

export type ColorPreset = {
  value: string;
  label: string;
};

type ColorFieldProps = {
  label: string;
  value?: string;
  defaultColor: string;
  presets: readonly ColorPreset[];
  onChange: (color: string | undefined) => void;
  allowDefault?: boolean;
  compact?: boolean;
  /** Highlights a preset when value is unset (e.g. pull quote variant default). */
  presetFallbackValue?: string;
};

function normalizeHex(color: string): string {
  return color.trim().toLowerCase();
}

function isLightColor(hex: string): boolean {
  const value = hex.replace('#', '');
  if (value.length !== 6) return true;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.72;
}

function resolveColor(value: string | undefined, defaultColor: string): string {
  if (value?.startsWith('#')) return value;
  return defaultColor;
}

function matchesPreset(
  value: string | undefined,
  presetValue: string,
): boolean {
  if (!presetValue) return !value;
  return normalizeHex(value ?? '') === normalizeHex(presetValue);
}

function findActivePreset(
  value: string | undefined,
  presets: readonly ColorPreset[],
): ColorPreset | undefined {
  return presets.find((preset) => matchesPreset(value, preset.value));
}

export function ColorThemePanel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`colorThemePanel ${styles.themePanel}`}>
      <div className={styles.themePanelHeader}>
        <span className={styles.themePanelTitle}>{title}</span>
        {hint ? <span className={styles.themePanelHint}>{hint}</span> : null}
      </div>
      <div className={styles.themePanelBody}>{children}</div>
    </div>
  );
}

export function ColorField({
  label,
  value,
  defaultColor,
  presets,
  onChange,
  allowDefault = true,
  compact = false,
  presetFallbackValue,
}: ColorFieldProps) {
  const pickerId = useId();
  const pickerRef = useRef<HTMLInputElement>(null);
  const displayValue = value ?? presetFallbackValue;
  const resolved = resolveColor(displayValue, defaultColor);
  const activePreset = findActivePreset(displayValue, presets);
  const isDefault = allowDefault && !value && !presetFallbackValue;
  const isCustom = !isDefault && !activePreset;

  const openPicker = () => pickerRef.current?.click();

  return (
    <div className={`field ${compact ? styles.compact : ''}`}>
      <div className={styles.fieldHeader}>
        <span className="fieldLabel">{label}</span>
        {allowDefault ? (
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => onChange(undefined)}
            disabled={isDefault}
          >
            Reset
          </button>
        ) : null}
      </div>

      <div className={styles.presetGrid}>
        {presets.map((preset) => {
          const active = matchesPreset(displayValue, preset.value);
          const isNonePreset = !preset.value;
          const swatchColor = preset.value || defaultColor;
          const showCheck =
            active && (!isLightColor(swatchColor) || isNonePreset);

          return (
            <button
              key={preset.value || 'default'}
              type="button"
              className={`${styles.presetBtn} ${isNonePreset ? styles.presetBtnNone : ''} ${active ? styles.presetBtnActive : ''}`}
              style={isNonePreset ? undefined : { background: swatchColor }}
              title={preset.label}
              aria-label={preset.label}
              aria-pressed={active}
              onClick={() => onChange(preset.value || undefined)}
            >
              {showCheck ? <span className={styles.check}>✓</span> : null}
            </button>
          );
        })}
        <button
          type="button"
          className={`${styles.customBtn} ${isCustom ? styles.customBtnActive : ''}`}
          style={isCustom ? { background: resolved } : undefined}
          title={
            isCustom ? `Custom: ${resolved.toUpperCase()}` : 'Custom color'
          }
          aria-label="Custom color"
          onClick={openPicker}
        >
          {isCustom ? null : '+'}
        </button>
      </div>

      <input
        ref={pickerRef}
        id={pickerId}
        type="color"
        className={styles.hiddenPicker}
        value={resolved.startsWith('#') ? resolved : defaultColor}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        aria-hidden
      />
    </div>
  );
}
