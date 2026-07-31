/** Supported CSS length units in admin spacing inputs. */
export const CSS_LENGTH_UNITS = ['px', '%', 'rem', 'em'] as const;
export type CssLengthUnit = (typeof CSS_LENGTH_UNITS)[number];

/** Normalize a single CSS length token (e.g. `40` → `40px`, `-12` → `-12px`, `auto` unchanged). */
export function normalizeCssLengthToken(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^-?[\d.]+$/.test(trimmed)) return `${trimmed}px`;
  if (/^(auto|inherit|initial|unset|0)$/i.test(trimmed))
    return trimmed.toLowerCase();
  if (/^-?[\d.]+(px|%|rem|em|vw|vh|ch)$/i.test(trimmed))
    return trimmed.toLowerCase();
  return trimmed;
}

/** Normalize a CSS length value, including shorthand with multiple tokens. */
export function normalizeCssLength(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const parts = trimmed.split(/\s+/);
  if (parts.length > 1) {
    return parts.map(normalizeCssLengthToken).join(' ');
  }
  return normalizeCssLengthToken(trimmed);
}

export function isCssLengthShorthand(value?: string): boolean {
  return Boolean(value?.trim() && value.trim().split(/\s+/).length > 1);
}

export function parseEditableCssLength(
  value?: string,
): { amount: string; unit: CssLengthUnit } | null {
  if (!value?.trim()) return null;

  const trimmed = value.trim();
  if (/^(auto|inherit|initial|unset|0)$/i.test(trimmed)) {
    return { amount: trimmed.toLowerCase(), unit: 'px' };
  }

  const match = trimmed.match(/^(-?[\d.]+)(px|%|rem|em)$/i);
  if (match) {
    return {
      amount: match[1],
      unit: match[2].toLowerCase() as CssLengthUnit,
    };
  }

  const numeric = trimmed.match(/^(-?[\d.]+)$/);
  if (numeric) {
    return { amount: numeric[1], unit: 'px' };
  }

  return null;
}

export function composeCssLength(
  amount: string,
  unit: CssLengthUnit,
  allowAuto = false,
): string | undefined {
  const trimmed = amount.trim();
  if (!trimmed) return undefined;
  if (allowAuto && /^(auto|inherit|initial|unset)$/i.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  if (trimmed === '0') return '0';
  if (/^-?[\d.]+$/.test(trimmed)) return `${trimmed}${unit}`;
  return trimmed;
}
