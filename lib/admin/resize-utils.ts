export type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export type ResizeDimensions = {
  width: number;
  height: number;
};

export const RESIZE_MIN_WIDTH = 120;
export const RESIZE_MIN_HEIGHT = 60;
export const RESIZE_MIN_IMAGE_WIDTH = 80;
export const RESIZE_MIN_IMAGE_HEIGHT = 80;

export function clampDimension(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function formatPx(value: number): string {
  return `${Math.round(value)}px`;
}

export function parsePx(value?: string): number | null {
  if (!value?.trim()) return null;
  const match = value.trim().match(/^([\d.]+)px$/i);
  return match ? Number(match[1]) : null;
}

export function getHandleCursor(handle: ResizeHandle): string {
  const map: Record<ResizeHandle, string> = {
    n: 'ns-resize',
    s: 'ns-resize',
    e: 'ew-resize',
    w: 'ew-resize',
    ne: 'nesw-resize',
    nw: 'nwse-resize',
    se: 'nwse-resize',
    sw: 'nesw-resize',
  };
  return map[handle];
}

export function computeResizedDimensions(
  handle: ResizeHandle,
  start: ResizeDimensions,
  deltaX: number,
  deltaY: number,
  constraints: {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
  },
): ResizeDimensions {
  let width = start.width;
  let height = start.height;

  if (handle.includes('e')) {
    width = start.width + deltaX;
  }
  if (handle.includes('w')) {
    width = start.width - deltaX;
  }
  if (handle.includes('s')) {
    height = start.height + deltaY;
  }
  if (handle.includes('n')) {
    height = start.height - deltaY;
  }

  return {
    width: clampDimension(width, constraints.minWidth, constraints.maxWidth),
    height: clampDimension(
      height,
      constraints.minHeight,
      constraints.maxHeight,
    ),
  };
}

export const SECTION_HANDLES: ResizeHandle[] = [
  'e',
  'w',
  'n',
  's',
  'ne',
  'nw',
  'se',
  'sw',
];
export const IMAGE_HANDLES: ResizeHandle[] = [
  'e',
  's',
  'se',
  'w',
  'n',
  'nw',
  'ne',
  'sw',
];
