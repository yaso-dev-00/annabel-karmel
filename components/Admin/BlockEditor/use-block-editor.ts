'use client';

import { useCallback } from 'react';
import {
  createBlock,
  createBlockId,
  normalizeBlockOrder,
} from '@/lib/content-blocks/defaults';
import type {
  BlockSettings,
  BlockType,
  ContentBlock,
  MaxWidthPreset,
} from '@/lib/content-blocks/types';

export function useBlockEditor(
  blocks: ContentBlock[],
  onChange: (blocks: ContentBlock[]) => void,
) {
  const setBlocks = useCallback(
    (updater: (prev: ContentBlock[]) => ContentBlock[]) => {
      onChange(normalizeBlockOrder(updater(blocks)));
    },
    [blocks, onChange],
  );

  const addBlock = useCallback(
    (type: BlockType, position: 'start' | 'end' = 'end') => {
      const block = createBlock(type, position === 'start' ? 0 : blocks.length);
      const next =
        position === 'start' ? [block, ...blocks] : [...blocks, block];
      onChange(normalizeBlockOrder(next));
      return block.id;
    },
    [blocks, onChange],
  );

  const removeBlock = useCallback(
    (id: string) => {
      onChange(normalizeBlockOrder(blocks.filter((b) => b.id !== id)));
    },
    [blocks, onChange],
  );

  const duplicateBlock = useCallback(
    (id: string) => {
      const index = blocks.findIndex((b) => b.id === id);
      if (index === -1) return;
      const source = blocks[index];
      const copy = {
        ...source,
        id: createBlockId(),
        data: structuredClone(source.data),
      } as ContentBlock;
      const next = [...blocks];
      next.splice(index + 1, 0, copy);
      onChange(normalizeBlockOrder(next));
    },
    [blocks, onChange],
  );

  const updateBlock = useCallback(
    (id: string, data: ContentBlock['data']) => {
      onChange(
        normalizeBlockOrder(
          blocks.map((b) =>
            b.id === id ? ({ ...b, data } as ContentBlock) : b,
          ),
        ),
      );
    },
    [blocks, onChange],
  );

  const reorderBlocks = useCallback(
    (activeId: string, overId: string) => {
      const oldIndex = blocks.findIndex((b) => b.id === activeId);
      const newIndex = blocks.findIndex((b) => b.id === overId);
      if (oldIndex === -1 || newIndex === -1) return;
      const next = [...blocks];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      onChange(normalizeBlockOrder(next));
    },
    [blocks, onChange],
  );

  const updateBlockSettings = useCallback(
    (id: string, settingsPatch: Partial<BlockSettings>) => {
      onChange(
        normalizeBlockOrder(
          blocks.map((b) => {
            if (b.id !== id) return b;
            const merged: BlockSettings = { ...(b.settings ?? {}) };
            for (const [key, val] of Object.entries(settingsPatch) as [
              keyof BlockSettings,
              BlockSettings[keyof BlockSettings] | undefined,
            ][]) {
              if (val === undefined) {
                delete merged[key];
              } else {
                (merged as Record<string, unknown>)[key] = val;
              }
            }
            const hasSettings = Object.keys(merged).length > 0;
            let nextBlock = {
              ...b,
              settings: hasSettings ? merged : undefined,
            } as ContentBlock;
            if (
              b.type === 'hero' &&
              'background_color' in settingsPatch &&
              'background_color' in b.data
            ) {
              const { background_color: _legacy, ...heroData } = b.data;
              nextBlock = { ...nextBlock, data: heroData } as ContentBlock;
            }
            return nextBlock;
          }),
        ),
      );
    },
    [blocks, onChange],
  );

  const updateTwoColumnColumnSettings = useCallback(
    (
      id: string,
      column: 'left' | 'right',
      settingsPatch: Partial<BlockSettings>,
    ) => {
      const settingsKey =
        column === 'left' ? 'left_settings' : 'right_settings';
      onChange(
        normalizeBlockOrder(
          blocks.map((b) => {
            if (b.id !== id || b.type !== 'two_column') return b;
            const merged: BlockSettings = { ...(b.data[settingsKey] ?? {}) };
            for (const [key, val] of Object.entries(settingsPatch) as [
              keyof BlockSettings,
              BlockSettings[keyof BlockSettings] | undefined,
            ][]) {
              if (val === undefined) {
                delete merged[key];
              } else {
                (merged as Record<string, unknown>)[key] = val;
              }
            }
            const hasSettings = Object.keys(merged).length > 0;
            return {
              ...b,
              data: {
                ...b.data,
                [settingsKey]: hasSettings ? merged : undefined,
              },
            };
          }),
        ),
      );
    },
    [blocks, onChange],
  );

  return {
    blocks,
    addBlock,
    removeBlock,
    duplicateBlock,
    updateBlock,
    reorderBlocks,
    updateBlockSettings,
    updateTwoColumnColumnSettings,
  };
}
