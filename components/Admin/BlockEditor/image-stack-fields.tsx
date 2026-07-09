"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ImageField } from "@/components/Admin/Ui/ImageField";
import { ensureImageStackItemId } from "@/lib/content-blocks/defaults";
import type { ImageStackBlockData, ImageStackItem } from "@/lib/content-blocks/types";
import styles from "./block-editor.module.css";
import { ExpandCollapseAllButtons } from "./expand-collapse-all-buttons";

function imageSummary(item: ImageStackItem, index: number): string {
  if (item.alt?.trim()) return item.alt.trim();
  if (item.src?.trim()) {
    const parts = item.src.split("/");
    return parts[parts.length - 1] || `Image ${index + 1}`;
  }
  return `Image ${index + 1}`;
}

function SortableImageCard({
  item,
  index,
  expanded,
  onToggle,
  onChange,
  onRemove,
}: {
  item: ImageStackItem & { id: string };
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onChange: (item: ImageStackItem) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`card nestedCard ${styles.miniBlockCard}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <div className={styles.miniBlockHeader} onClick={onToggle}>
        <span
          className={styles.dragHandle}
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => {
            listeners?.onPointerDown?.(e);
            e.stopPropagation();
          }}
        >
          ⠿
        </span>
        <span className={styles.miniBlockType}>Image {index + 1}</span>
        <span className={styles.miniBlockSummary}>{imageSummary(item, index)}</span>
        <div className={styles.miniBlockActions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={expanded ? "Collapse" : "Expand"}
            title={expanded ? "Collapse" : "Expand"}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {expanded ? "▲" : "▼"}
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Remove image"
            title="Remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            ✕
          </button>
        </div>
      </div>
      {expanded ? (
        <div className={styles.miniBlockBody}>
          <ImageField
            value={item.src}
            alt={item.alt}
            onChange={(src, altVal) => onChange({ ...item, src, alt: altVal ?? item.alt })}
            onAltChange={(altVal) => onChange({ ...item, alt: altVal })}
          />
          <label className="field">
            <span className="fieldLabel">Caption</span>
            <input
              className="fieldInput"
              value={item.caption ?? ""}
              onChange={(e) => onChange({ ...item, caption: e.target.value })}
              placeholder="Optional caption"
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}

export function ImageStackFields({
  data,
  onChange,
}: {
  data: ImageStackBlockData;
  onChange: (data: ImageStackBlockData) => void;
}) {
  const normalized = useMemo(
    () => data.images.map((item) => ensureImageStackItemId(item)),
    [data.images],
  );
  const idsKey = normalized.map((item) => item.id).join("|");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const knownIdsRef = useRef(new Set<string>());

  useEffect(() => {
    const ids = normalized.map((item) => item.id);
    setExpandedIds((prev) => {
      const next = new Set<string>();
      const known = knownIdsRef.current;
      const isFirst = known.size === 0;
      for (const id of ids) {
        if (isFirst || !known.has(id) || prev.has(id)) next.add(id);
      }
      knownIdsRef.current = new Set(ids);
      return next;
    });
  }, [idsKey, normalized]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const patch = (images: ImageStackItem[]) => onChange({ ...data, images });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = normalized.findIndex((item) => item.id === active.id);
    const newIndex = normalized.findIndex((item) => item.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    patch(arrayMove(normalized, oldIndex, newIndex));
  };

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <label className="field">
        <span className="fieldLabel">Layout</span>
        <select
          className="fieldSelect"
          value={data.layout}
          onChange={(e) => onChange({ ...data, layout: e.target.value as ImageStackBlockData["layout"] })}
        >
          <option value="vertical">Vertical</option>
          <option value="grid">Grid</option>
        </select>
      </label>

      <p style={{ fontSize: 14, color: "#6d5757", margin: "0 0 12px" }}>
        Drag images to reorder. Collapse cards to keep the form tidy. Resize images in the preview.
      </p>

      <div className={`card nestedCard ${styles.columnEditor}`}>
        <div className={styles.columnEditorHeader}>
          <p className="fieldLabel" style={{ margin: 0 }}>
            Images
          </p>
          {normalized.length > 0 ? (
            <ExpandCollapseAllButtons
              label="Images"
              onExpandAll={() => setExpandedIds(new Set(normalized.map((item) => item.id)))}
              onCollapseAll={() => setExpandedIds(new Set())}
            />
          ) : null}
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={normalized.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            {normalized.map((item, index) => (
              <SortableImageCard
                key={item.id}
                item={item}
                index={index}
                expanded={expandedIds.has(item.id)}
                onToggle={() => toggle(item.id)}
                onChange={(updated) => patch(normalized.map((img) => (img.id === item.id ? updated : img)))}
                onRemove={() => patch(normalized.filter((img) => img.id !== item.id))}
              />
            ))}
          </SortableContext>
        </DndContext>

        <div className={styles.columnAddRow}>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() => {
              const created = ensureImageStackItemId({ src: "", alt: "" });
              setExpandedIds((prev) => new Set(prev).add(created.id));
              patch([...normalized, created]);
            }}
          >
            + Add image
          </button>
        </div>
      </div>
    </>
  );
}
