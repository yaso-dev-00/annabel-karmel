import type { CSSProperties } from 'react';
import type { MultiColumnTableBlockData, TableBlockData } from './types';
import { DS_COLORS } from '@/lib/design-system/tokens';

export type TableAppearanceData = Pick<
  TableBlockData,
  | 'style'
  | 'border_style'
  | 'header_bg'
  | 'row_bg'
  | 'striped_row_bg'
  | 'header_text_color'
  | 'body_text_color'
  | 'border_color'
>;
export const TABLE_STYLE_LABELS: Record<TableBlockData['style'], string> = {
  default: 'Default',
  compact: 'Compact',
  striped: 'Striped',
  borderless: 'Borderless',
};

export const TABLE_BORDER_LABELS: Record<
  NonNullable<TableBlockData['border_style']>,
  string
> = {
  full: 'Full borders',
  horizontal: 'Horizontal only',
  none: 'No borders',
};

export const TABLE_LABEL_WIDTH_LABELS: Record<
  NonNullable<TableBlockData['label_width']>,
  string
> = {
  auto: 'Auto',
  '35': '35%',
  '45': '45%',
};

export const TABLE_HEADER_BG_PRESETS = [
  { value: '', label: 'Default (brand)' },
  { value: DS_COLORS.raspberry[100], label: 'Raspberry 100' },
  { value: DS_COLORS.raspberry[200], label: 'Raspberry 200' },
  { value: DS_COLORS.white, label: 'White' },
  { value: DS_COLORS.grey[100], label: 'Grey 100' },
  { value: DS_COLORS.grey[200], label: 'Grey 200' },
  { value: DS_COLORS.grey[900], label: 'Grey 900' },
] as const;

export const TABLE_ROW_BG_PRESETS = [
  { value: '', label: 'Default' },
  { value: DS_COLORS.white, label: 'White' },
  { value: DS_COLORS.grey[100], label: 'Grey 100' },
  { value: DS_COLORS.raspberry[100], label: 'Raspberry 100' },
  { value: DS_COLORS.grey[200], label: 'Grey 200' },
] as const;

export const TABLE_BORDER_PRESETS = [
  { value: '', label: 'Default' },
  { value: DS_COLORS.raspberry[200], label: 'Raspberry 200' },
  { value: DS_COLORS.grey[300], label: 'Grey 300' },
  { value: DS_COLORS.grey[400], label: 'Grey 400' },
  { value: DS_COLORS.primary, label: 'Primary' },
  { value: DS_COLORS.grey[800], label: 'Grey 800' },
] as const;

export const TABLE_TEXT_PRESETS = [
  { value: '', label: 'Default' },
  { value: DS_COLORS.grey[800], label: 'Grey 800' },
  { value: DS_COLORS.grey[1000], label: 'Grey 1000' },
  { value: DS_COLORS.grey[700], label: 'Grey 700' },
  { value: DS_COLORS.primary, label: 'Primary' },
  { value: DS_COLORS.white, label: 'White' },
] as const;

export const DEFAULT_TABLE_COLORS = {
  header_bg: DS_COLORS.raspberry[100],
  row_bg: DS_COLORS.white,
  striped_row_bg: DS_COLORS.grey[100],
  border_color: DS_COLORS.raspberry[200],
  header_text_color: DS_COLORS.grey[900],
  body_text_color: DS_COLORS.grey[800],
};

export function resolveTableInlineStyle(
  data: TableAppearanceData & { label_width?: TableBlockData['label_width'] },
): CSSProperties {
  return {
    ['--table-header-bg' as string]:
      data.header_bg ?? DEFAULT_TABLE_COLORS.header_bg,
    ['--table-row-bg' as string]: data.row_bg ?? DEFAULT_TABLE_COLORS.row_bg,
    ['--table-striped-bg' as string]:
      data.striped_row_bg ?? DEFAULT_TABLE_COLORS.striped_row_bg,
    ['--table-border-color' as string]:
      data.border_color ?? DEFAULT_TABLE_COLORS.border_color,
    ['--table-header-color' as string]:
      data.header_text_color ?? DEFAULT_TABLE_COLORS.header_text_color,
    ['--table-body-color' as string]:
      data.body_text_color ?? DEFAULT_TABLE_COLORS.body_text_color,
    ['--table-label-width' as string]:
      data.label_width === '35'
        ? '35%'
        : data.label_width === '45'
          ? '45%'
          : 'auto',
  };
}

export function getTableClassNames(
  data: TableAppearanceData,
  styles: Record<string, string>,
  options?: { multiColumn?: boolean },
): string {
  const classes = [styles.table];
  if (options?.multiColumn) classes.push(styles.tableMultiColumn);
  if (data.style === 'compact') classes.push(styles.tableCompact);
  if (data.style === 'striped') classes.push(styles.tableStriped);
  if (data.style === 'borderless') classes.push(styles.tableBorderless);

  const borderStyle =
    data.border_style ?? (data.style === 'borderless' ? 'none' : 'full');
  if (borderStyle === 'horizontal') classes.push(styles.tableBordersHorizontal);
  if (borderStyle === 'none') classes.push(styles.tableBordersNone);

  return classes.join(' ');
}
