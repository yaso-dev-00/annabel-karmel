import type { CSSProperties } from 'react';
import { DS_COLORS } from '@/lib/design-system/tokens';
import type { BlockSettings } from './types';
import { normalizeCssLength } from './css-length';

export type BorderStyle = NonNullable<BlockSettings['border_style']>;

export type BorderPatch = Pick<
  BlockSettings,
  | 'border_width'
  | 'border_top'
  | 'border_right'
  | 'border_bottom'
  | 'border_left'
  | 'border_color'
  | 'border_style'
>;

export function hasIndividualBorder(settings?: BlockSettings): boolean {
  if (!settings) return false;
  return Boolean(
    settings.border_top?.trim() ||
    settings.border_right?.trim() ||
    settings.border_bottom?.trim() ||
    settings.border_left?.trim(),
  );
}

export function hasCustomBorder(settings?: BlockSettings): boolean {
  if (!settings) return false;
  return Boolean(
    settings.border_width?.trim() ||
    hasIndividualBorder(settings) ||
    settings.border_color?.trim() ||
    (settings.border_style && settings.border_style !== 'none'),
  );
}

function resolveBorderStyle(settings?: BlockSettings): BorderStyle | undefined {
  if (!settings) return undefined;
  if (settings.border_style) return settings.border_style;
  if (
    settings.border_width?.trim() ||
    hasIndividualBorder(settings) ||
    settings.border_color?.trim()
  ) {
    return 'solid';
  }
  return undefined;
}

function borderColor(settings?: BlockSettings): string {
  return settings?.border_color?.trim() || DS_COLORS.grey[300];
}

/** Applies border sides the editor explicitly set (longhand only — no `border` shorthand). */
export function applyBlockBorderStyle(
  style: CSSProperties,
  settings?: BlockSettings,
): void {
  if (!settings) return;

  const borderStyle = resolveBorderStyle(settings);
  if (!borderStyle || borderStyle === 'none') return;

  const color = borderColor(settings);
  delete style.border;

  if (hasIndividualBorder(settings)) {
    const top = settings.border_top?.trim();
    const right = settings.border_right?.trim();
    const bottom = settings.border_bottom?.trim();
    const left = settings.border_left?.trim();

    if (top)
      style.borderTop = `${normalizeCssLength(top)} ${borderStyle} ${color}`;
    if (right)
      style.borderRight = `${normalizeCssLength(right)} ${borderStyle} ${color}`;
    if (bottom)
      style.borderBottom = `${normalizeCssLength(bottom)} ${borderStyle} ${color}`;
    if (left)
      style.borderLeft = `${normalizeCssLength(left)} ${borderStyle} ${color}`;
    return;
  }

  const unified = settings.border_width?.trim();
  if (unified) {
    style.borderWidth = normalizeCssLength(unified);
    style.borderStyle = borderStyle;
    style.borderColor = color;
    return;
  }

  if (settings.border_color?.trim()) {
    style.borderWidth = '1px';
    style.borderStyle = borderStyle;
    style.borderColor = color;
  }
}
