'use client';

import { useId } from 'react';
import { DndContext, type DndContextProps } from '@dnd-kit/core';

/**
 * DndContext with a stable React `useId()` so aria-describedby IDs stay consistent
 * across remounts / multiple contexts (avoids hydration mismatch warnings).
 */
export function StableDndContext({ id, ...props }: DndContextProps) {
  const reactId = useId();
  return <DndContext id={id ?? reactId} {...props} />;
}
