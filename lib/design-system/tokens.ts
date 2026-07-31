/** Annabel Karmel app design system tokens (colours, type, radius, shadow, grid). */

export const DS_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#B24A66',
  success: '#7DC242',
  warning: '#FFC222',
  error: '#FF1000',
  raspberry: {
    100: '#FDF1F3',
    200: '#F1C6CD',
    300: '#D897A4',
    400: '#C26F81',
    500: '#B24A66',
    600: '#A03D56',
    700: '#8E3046',
    800: '#7C2336',
    900: '#6A1626',
    1000: '#580916',
  },
  grey: {
    100: '#F9F9F9',
    200: '#E6E6E6',
    300: '#CCCCCC',
    400: '#B3B3B3',
    500: '#999999',
    600: '#808080',
    700: '#666666',
    800: '#4D4D4D',
    900: '#333333',
    1000: '#1A1A1A',
  },
  successScale: {
    100: '#C9F197',
    200: '#7DC242',
    300: '#3D7E00',
  },
  warningScale: {
    100: '#FFF382',
    200: '#FFC222',
    300: '#B07C00',
  },
  errorScale: {
    100: '#FF6161',
    200: '#FF1000',
    300: '#B20000',
  },
} as const;

export const DS_TYPOGRAPHY = {
  primary: {
    id: 'primary' as const,
    label: 'Primary',
    fontFamily: 'var(--font-montserrat), Montserrat, sans-serif',
    sample: 'Ag',
  },
  secondary: {
    id: 'secondary' as const,
    label: 'Secondary',
    fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
    sample: 'Ag',
  },
} as const;

export const DS_RADIUS = {
  sharp: { value: '0px', label: 'Sharp', size: 'xs' },
  xs: { value: '4px', label: 'xs', size: 'xs' },
  s: { value: '16px', label: 's', size: 's' },
  m: { value: '24px', label: 'm', size: 'm' },
  l: { value: '36px', label: 'l', size: 'l' },
  round: { value: '999px', label: 'Round', size: 'round' },
} as const;

export type RadiusPreset = keyof typeof DS_RADIUS;

export const DS_SHADOW = {
  none: { value: 'none', label: 'None' },
  '100': {
    value: '0 1px 3px rgba(26, 26, 26, 0.08), 0 1px 2px rgba(26, 26, 26, 0.06)',
    label: 'Shadow 100',
  },
  '200': {
    value: '0 4px 14px rgba(26, 26, 26, 0.1), 0 2px 6px rgba(26, 26, 26, 0.06)',
    label: 'Shadow 200',
  },
  '300': {
    value:
      '0 12px 32px rgba(26, 26, 26, 0.14), 0 4px 12px rgba(26, 26, 26, 0.08)',
    label: 'Shadow 300',
  },
} as const;

export type ShadowPreset = keyof typeof DS_SHADOW;

export type FontFamilyPreset = keyof typeof DS_TYPOGRAPHY;

export const DS_GRID = {
  mobile: { label: 'Mobile', maxWidth: '767px', minColumns: 1 },
  tablet: { label: 'Tablet', maxWidth: '1023px', minColumns: 2 },
  desktop: { label: 'Desktop', minWidth: '1024px', minColumns: 3 },
} as const;

export const RADIUS_PRESETS = Object.keys(DS_RADIUS) as RadiusPreset[];
export const SHADOW_PRESETS = Object.keys(DS_SHADOW) as ShadowPreset[];

export function resolveRadius(preset?: RadiusPreset): string | undefined {
  if (!preset) return undefined;
  return DS_RADIUS[preset]?.value;
}

export function resolveShadow(preset?: ShadowPreset): string | undefined {
  if (!preset || preset === 'none') return undefined;
  return DS_SHADOW[preset]?.value;
}

export function resolveFontFamily(
  preset?: FontFamilyPreset,
): string | undefined {
  if (!preset) return undefined;
  return DS_TYPOGRAPHY[preset]?.fontFamily;
}
