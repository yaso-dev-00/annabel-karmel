import type { CSSProperties } from 'react';
import type { BlockSettings } from './types';
import { normalizeCssLength } from './css-length';

export type MarginPatch = Pick<
  BlockSettings,
  'margin' | 'margin_top' | 'margin_right' | 'margin_bottom' | 'margin_left'
>;

export function hasIndividualMargin(settings?: BlockSettings): boolean {
  if (!settings) return false;
  return Boolean(
    settings.margin_top?.trim() ||
    settings.margin_right?.trim() ||
    settings.margin_bottom?.trim() ||
    settings.margin_left?.trim(),
  );
}

export function hasCustomMargin(settings?: BlockSettings): boolean {
  if (!settings) return false;
  return Boolean(settings.margin?.trim() || hasIndividualMargin(settings));
}

/** Applies custom margins, or leaves default wrapper spacing from CSS. */
export function applyBlockMarginStyle(
  style: CSSProperties,
  settings?: BlockSettings,
): void {
  if (!settings) return;

  if (hasIndividualMargin(settings)) {
    const top = settings.margin_top?.trim();
    const right = settings.margin_right?.trim();
    const bottom = settings.margin_bottom?.trim();
    const left = settings.margin_left?.trim();

    if (top) style.marginTop = normalizeCssLength(top);
    if (right) style.marginRight = normalizeCssLength(right);
    if (bottom) style.marginBottom = normalizeCssLength(bottom);
    if (left) style.marginLeft = normalizeCssLength(left);
    return;
  }

  const unified = settings.margin?.trim();
  if (unified) {
    style.margin = normalizeCssLength(unified);
  }
}

export function clearMarginFields(): MarginPatch {
  return {
    margin: undefined,
    margin_top: undefined,
    margin_right: undefined,
    margin_bottom: undefined,
    margin_left: undefined,
  };
}
