'use client';

import {
  GRID_IMAGE_ASPECT_OPTIONS,
  RESPONSIVE_GRID_COLUMN_OPTIONS,
  RESPONSIVE_GRID_DEFAULT_COLUMNS,
  RESPONSIVE_GRID_DEFAULT_IMAGE_ASPECT,
  resolveGridImageAspect,
  type GridImageAspect,
  type ResponsiveGridColumnCount,
  type ResponsiveGridColumns,
} from '@/lib/content-blocks/responsive-grid-columns';
import { DS_GRID } from '@/lib/design-system/tokens';

type ResponsiveGridColumnsFieldProps = {
  value: ResponsiveGridColumns;
  onChange: (patch: ResponsiveGridColumns) => void;
  /** Override default aspect shown when value.image_aspect is unset. */
  defaultImageAspect?: GridImageAspect;
};

export function ResponsiveGridColumnsField({
  value,
  onChange,
  defaultImageAspect = RESPONSIVE_GRID_DEFAULT_IMAGE_ASPECT,
}: ResponsiveGridColumnsFieldProps) {
  const setColumns = (
    key: 'columns_desktop' | 'columns_tablet' | 'columns_mobile',
    next: ResponsiveGridColumnCount,
  ) => {
    onChange({ ...value, [key]: next });
  };

  const imageAspect = value.image_aspect ?? defaultImageAspect;
  const resolvedAspect = resolveGridImageAspect(imageAspect);
  const aspectHint =
    GRID_IMAGE_ASPECT_OPTIONS.find((option) => option.value === resolvedAspect)
      ?.hint ?? '';

  return (
    <>
      <div className="field">
        <span className="fieldLabel">Grid columns</span>
        <p style={{ fontSize: 13, color: '#6d5757', margin: '0 0 10px' }}>
          Desktop is the primary layout. Tablet and mobile default to responsive
          values — change them anytime.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 10,
          }}
        >
          <label className="field" style={{ margin: 0 }}>
            <span className="fieldLabel">
              {DS_GRID.desktop.label}{' '}
              <span style={{ fontWeight: 400, color: '#8a7070' }}>
                (≥ {DS_GRID.desktop.minWidth})
              </span>
            </span>
            <select
              className="fieldSelect"
              value={
                value.columns_desktop ?? RESPONSIVE_GRID_DEFAULT_COLUMNS.desktop
              }
              onChange={(e) =>
                setColumns(
                  'columns_desktop',
                  Number(e.target.value) as ResponsiveGridColumnCount,
                )
              }
            >
              {RESPONSIVE_GRID_COLUMN_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'column' : 'columns'}
                </option>
              ))}
            </select>
          </label>
          <label className="field" style={{ margin: 0 }}>
            <span className="fieldLabel">
              {DS_GRID.tablet.label}{' '}
              <span style={{ fontWeight: 400, color: '#8a7070' }}>
                (768–{DS_GRID.tablet.maxWidth})
              </span>
            </span>
            <select
              className="fieldSelect"
              value={
                value.columns_tablet ?? RESPONSIVE_GRID_DEFAULT_COLUMNS.tablet
              }
              onChange={(e) =>
                setColumns(
                  'columns_tablet',
                  Number(e.target.value) as ResponsiveGridColumnCount,
                )
              }
            >
              {RESPONSIVE_GRID_COLUMN_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'column' : 'columns'}
                </option>
              ))}
            </select>
          </label>
          <label className="field" style={{ margin: 0 }}>
            <span className="fieldLabel">
              {DS_GRID.mobile.label}{' '}
              <span style={{ fontWeight: 400, color: '#8a7070' }}>
                (≤ {DS_GRID.mobile.maxWidth})
              </span>
            </span>
            <select
              className="fieldSelect"
              value={
                value.columns_mobile ?? RESPONSIVE_GRID_DEFAULT_COLUMNS.mobile
              }
              onChange={(e) =>
                setColumns(
                  'columns_mobile',
                  Number(e.target.value) as ResponsiveGridColumnCount,
                )
              }
            >
              {RESPONSIVE_GRID_COLUMN_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'column' : 'columns'}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <label className="field">
        <span className="fieldLabel">Match image heights</span>
        <select
          className="fieldSelect"
          value={resolvedAspect}
          onChange={(e) =>
            onChange({
              ...value,
              image_aspect: (e.target.value ||
                defaultImageAspect) as GridImageAspect,
            })
          }
        >
          {GRID_IMAGE_ASPECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          style={{
            display: 'block',
            fontSize: 13,
            color: '#6d5757',
            marginTop: 6,
          }}
        >
          {aspectHint}. Prefer this instead of dragging image resize handles —
          fixed px heights break on tablet and mobile.
        </span>
      </label>
    </>
  );
}
