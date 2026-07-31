import type { MultiColumnTableBlockData } from './types';

export const MULTI_COLUMN_TABLE_COUNTS = [2, 3, 4, 5] as const;

export const MULTI_COLUMN_COUNT_LABELS: Record<
  MultiColumnTableBlockData['column_count'],
  string
> = {
  2: '2 columns',
  3: '3 columns',
  4: '4 columns',
  5: '5 columns',
};

export function resizeMultiColumnTable(
  data: MultiColumnTableBlockData,
  columnCount: MultiColumnTableBlockData['column_count'],
): MultiColumnTableBlockData {
  const headers = Array.from({ length: columnCount }, (_, index) => {
    const existing = data.headers[index]?.trim();
    return existing || `Column ${index + 1}`;
  });

  const rows =
    data.rows.length > 0
      ? data.rows.map((row) =>
          Array.from({ length: columnCount }, (_, index) => row[index] ?? ''),
        )
      : [Array.from({ length: columnCount }, () => '')];

  return {
    ...data,
    column_count: columnCount,
    headers,
    rows,
  };
}

export function createEmptyMultiColumnRow(
  columnCount: MultiColumnTableBlockData['column_count'],
): string[] {
  return Array.from({ length: columnCount }, () => '');
}
