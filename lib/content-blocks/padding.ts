import type { CSSProperties } from 'react';
import type { BlockSettings } from './types';
import { normalizeCssLength } from './css-length';

export type PaddingPatch = Pick<
  BlockSettings,
  | 'padding'
  | 'padding_top'
  | 'padding_right'
  | 'padding_bottom'
  | 'padding_left'
>;

function hasPaddingSideValue(value?: string): boolean {
  return value != null && value.trim() !== '';
}

export function hasIndividualPadding(settings?: BlockSettings): boolean {
  if (!settings) return false;
  return (
    hasPaddingSideValue(settings.padding_top) ||
    hasPaddingSideValue(settings.padding_right) ||
    hasPaddingSideValue(settings.padding_bottom) ||
    hasPaddingSideValue(settings.padding_left)
  );
}

export function hasCustomPadding(settings?: BlockSettings): boolean {
  if (!settings) return false;
  return (
    hasPaddingSideValue(settings.padding) || hasIndividualPadding(settings)
  );
}

/** Applies only the padding sides the editor explicitly set. */
export function applyBlockPaddingStyle(
  style: CSSProperties,
  settings?: BlockSettings,
): boolean {
  if (!settings) return false;

  if (hasIndividualPadding(settings)) {
    let applied = false;
    const top = settings.padding_top?.trim();
    const right = settings.padding_right?.trim();
    const bottom = settings.padding_bottom?.trim();
    const left = settings.padding_left?.trim();

    if (hasPaddingSideValue(top)) {
      style.paddingTop = normalizeCssLength(top!);
      applied = true;
    }
    if (hasPaddingSideValue(right)) {
      style.paddingRight = normalizeCssLength(right!);
      applied = true;
    }
    if (hasPaddingSideValue(bottom)) {
      style.paddingBottom = normalizeCssLength(bottom!);
      applied = true;
    }
    if (hasPaddingSideValue(left)) {
      style.paddingLeft = normalizeCssLength(left!);
      applied = true;
    }

    return applied;
  }

  const unified = settings.padding?.trim();
  if (hasPaddingSideValue(unified)) {
    style.padding = normalizeCssLength(unified!);
    return true;
  }

  return false;
}

export function clearPaddingFields(): PaddingPatch {
  return {
    padding: undefined,
    padding_top: undefined,
    padding_right: undefined,
    padding_bottom: undefined,
    padding_left: undefined,
  };
}

/** Resets intrinsic block padding when wrapper padding is customized. */
export function resetIntrinsicPaddingStyle(
  settings?: BlockSettings,
): CSSProperties | undefined {
  return hasCustomPadding(settings) ? { padding: 0 } : undefined;
}
