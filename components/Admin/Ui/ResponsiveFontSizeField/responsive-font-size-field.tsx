'use client';

import { CssLengthInput } from '@/components/Admin/Ui/CssLengthInput';
import { DS_GRID } from '@/lib/design-system/tokens';
import { FONT_SIZE_PRESETS } from '@/lib/design-system/font-sizes';
import type { BlockSettings } from '@/lib/content-blocks/types';
import styles from './responsive-font-size-field.module.css';

type ResponsiveFontSizeFieldProps = {
  settings: BlockSettings;
  onChange: (patch: Partial<BlockSettings>) => void;
};

const BREAKPOINTS = ['mobile', 'tablet', 'desktop'] as const;

const BREAKPOINT_KEYS: Record<
  (typeof BREAKPOINTS)[number],
  keyof Pick<
    BlockSettings,
    'font_size_mobile' | 'font_size_tablet' | 'font_size_desktop'
  >
> = {
  mobile: 'font_size_mobile',
  tablet: 'font_size_tablet',
  desktop: 'font_size_desktop',
};

function isPresetValue(value: string): boolean {
  return FONT_SIZE_PRESETS.some(
    (preset) => preset.value && preset.value === value,
  );
}

/** Default starter when entering custom mode — not in preset list so the custom input stays visible. */
const CUSTOM_FONT_SIZE_STARTER = '21px';

function breakpointHint(breakpoint: (typeof BREAKPOINTS)[number]): string {
  if (breakpoint === 'mobile') return `≤ ${DS_GRID.mobile.maxWidth}`;
  if (breakpoint === 'tablet') return `768–${DS_GRID.tablet.maxWidth}`;
  return `≥ ${DS_GRID.desktop.minWidth}`;
}

export function ResponsiveFontSizeField({
  settings,
  onChange,
}: ResponsiveFontSizeFieldProps) {
  return (
    <div className={styles.root}>
      {BREAKPOINTS.map((breakpoint) => {
        const key = BREAKPOINT_KEYS[breakpoint];
        const value = settings[key] ?? '';
        const isCustom = Boolean(value && !isPresetValue(value));
        const selectValue = !value ? '' : isCustom ? 'custom' : value;
        const isActive = Boolean(value);

        return (
          <div
            key={breakpoint}
            className={`${styles.row} ${styles[`row_${breakpoint}`]} ${isActive ? styles.rowActive : ''}`}
          >
            <div className={styles.rowHeader}>
              <span className={styles.deviceLabel}>
                {DS_GRID[breakpoint].label}
              </span>
              <span className={styles.deviceHint}>
                {breakpointHint(breakpoint)}
              </span>
            </div>
            <select
              className={styles.select}
              value={selectValue}
              onChange={(e) => {
                const next = e.target.value;
                if (!next) {
                  onChange({ [key]: undefined });
                  return;
                }
                if (next === 'custom') {
                  onChange({
                    [key]: isCustom ? value : CUSTOM_FONT_SIZE_STARTER,
                  });
                  return;
                }
                onChange({ [key]: next });
              }}
            >
              {FONT_SIZE_PRESETS.map((preset) => (
                <option key={preset.label} value={preset.value}>
                  {preset.label}
                </option>
              ))}
              <option value="custom">Custom size…</option>
            </select>
            {selectValue === 'custom' ? (
              <CssLengthInput
                value={value}
                onChange={(next) => onChange({ [key]: next })}
                placeholder="18"
                compact
                ariaLabel={`${DS_GRID[breakpoint].label} font size`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
