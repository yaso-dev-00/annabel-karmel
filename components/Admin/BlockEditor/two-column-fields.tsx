"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
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
import { MaxWidthField } from "@/components/Admin/Ui/MaxWidthField";
import {
  createBlockId,
  ensureNestedMiniBlockId,
  normalizeTwoColumnData,
} from "@/lib/content-blocks/defaults";
import type {
  MaxWidthPreset,
  NestedMiniBlock,
  NestedMiniBlockStyle,
  TwoColumnBlockData,
} from "@/lib/content-blocks/types";
import { RichTextEditor } from "./rich-text-editor";
import styles from "./block-editor.module.css";
import { ExpandCollapseAllButtons } from "./expand-collapse-all-buttons";
import { StableDndContext } from "./stable-dnd-context";

const MINI_BLOCK_LABELS: Record<NestedMiniBlock["type"], string> = {
  rich_text: "Rich text",
  image: "Image",
  list: "List",
  cta_button: "CTA button",
};

function createMiniBlock(type: NestedMiniBlock["type"]): NestedMiniBlock & { id: string } {
  const id = createBlockId();
  switch (type) {
    case "rich_text":
      return { id, type: "rich_text", html: "<p></p>" };
    case "image":
      return { id, type: "image", src: "", alt: "" };
    case "list":
      return { id, type: "list", ordered: false, items: [] };
    case "cta_button":
      return { id, type: "cta_button", label: "Button", url: "/" };
  }
}

function miniBlockSummary(block: NestedMiniBlock): string {
  switch (block.type) {
    case "rich_text": {
      const text = block.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      return text.slice(0, 48) || "Empty text";
    }
    case "image":
      return block.src ? block.alt || "Image" : "No image";
    case "list":
      return `${block.items.length} item${block.items.length === 1 ? "" : "s"}`;
    case "cta_button":
      return block.label || "Button";
  }
}

function patchMiniStyle(
  block: NestedMiniBlock,
  patch: Partial<NestedMiniBlockStyle>,
): NestedMiniBlock {
  const next: NestedMiniBlockStyle = { ...block.style, ...patch };
  if (!next.text_align) delete next.text_align;
  if (!next.max_width) {
    delete next.max_width;
    delete next.max_width_custom;
  }
  if (next.max_width !== "custom") delete next.max_width_custom;
  const hasStyle = Boolean(next.text_align || next.max_width);
  return { ...block, style: hasStyle ? next : undefined };
}

function MiniBlockStyleFields({
  block,
  onChange,
}: {
  block: NestedMiniBlock;
  onChange: (block: NestedMiniBlock) => void;
}) {
  const style = block.style;
  return (
    <div className={styles.miniBlockStyleRow}>
      <div className={styles.miniBlockStyleField}>
        <label className={styles.miniBlockStyleLabel}>Text align</label>
        <select
          className="fieldSelect"
          value={style?.text_align ?? ""}
          onChange={(e) =>
            onChange(
              patchMiniStyle(block, {
                text_align: (e.target.value || undefined) as NestedMiniBlockStyle["text_align"],
              }),
            )
          }
        >
          <option value="">Default</option>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>
      <div className={styles.miniBlockStyleField}>
        <label className={styles.miniBlockStyleLabel}>Max width</label>
        <MaxWidthField
          id={`mini-max-width-${block.id ?? block.type}`}
          preset={style?.max_width ?? ""}
          customValue={style?.max_width_custom}
          inheritLabel="Column default"
          selectClassName="fieldSelect"
          inputClassName="fieldInput"
          onPresetChange={(preset) =>
            onChange(
              patchMiniStyle(block, {
                max_width: (preset || undefined) as MaxWidthPreset | undefined,
                max_width_custom: preset === "custom" ? style?.max_width_custom : undefined,
              }),
            )
          }
          onCustomChange={(value) =>
            onChange(patchMiniStyle(block, { max_width: "custom", max_width_custom: value }))
          }
        />
      </div>
    </div>
  );
}

function MiniBlockEditor({
  block,
  onChange,
}: {
  block: NestedMiniBlock;
  onChange: (block: NestedMiniBlock) => void;
}) {
  const content = (() => {
    switch (block.type) {
      case "rich_text":
        return (
          <RichTextEditor value={block.html} onChange={(html) => onChange({ ...block, html })} />
        );
      case "image":
        return (
          <ImageField
            value={block.src}
            alt={block.alt}
            onChange={(src, altVal) => onChange({ ...block, src, alt: altVal ?? block.alt })}
            onAltChange={(altVal) => onChange({ ...block, alt: altVal })}
          />
        );
      case "list":
        return (
          <>
            <label className="fieldCheckbox">
              <input
                type="checkbox"
                checked={block.ordered}
                onChange={(e) => onChange({ ...block, ordered: e.target.checked })}
              />
              Numbered list
            </label>
            <textarea
              className="fieldTextarea"
              value={block.items.join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  // Keep empty lines while typing so Enter can start the next item.
                  items: e.target.value.split("\n"),
                })
              }
              onBlur={() =>
                onChange({
                  ...block,
                  items: block.items.map((item) => item.trim()).filter(Boolean),
                })
              }
              placeholder="One item per line"
            />
          </>
        );
      case "cta_button":
        return (
          <>
            <input
              className="fieldInput"
              placeholder="Button label"
              value={block.label}
              onChange={(e) => onChange({ ...block, label: e.target.value })}
            />
            <input
              className="fieldInput"
              placeholder="URL"
              value={block.url}
              onChange={(e) => onChange({ ...block, url: e.target.value })}
            />
          </>
        );
    }
  })();

  return (
    <>
      {content}
      <MiniBlockStyleFields block={block} onChange={onChange} />
    </>
  );
}

function SortableMiniBlockCard({
  block,
  expanded,
  onToggle,
  onChange,
  onRemove,
}: {
  block: NestedMiniBlock & { id: string };
  expanded: boolean;
  onToggle: () => void;
  onChange: (block: NestedMiniBlock) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
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
        <span className={styles.miniBlockType}>{MINI_BLOCK_LABELS[block.type]}</span>
        <span className={styles.miniBlockSummary}>{miniBlockSummary(block)}</span>
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
            aria-label="Remove block"
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
          <MiniBlockEditor block={block} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
}

function ColumnEditor({
  label,
  columnKey,
  blocks,
  onChange,
}: {
  label: string;
  columnKey: "left" | "right";
  blocks: NestedMiniBlock[];
  onChange: (blocks: NestedMiniBlock[]) => void;
}) {
  const normalized = useMemo(
    () => blocks.map((b) => ensureNestedMiniBlockId(b)),
    [blocks],
  );
  const idsKey = normalized.map((b) => b.id).join("|");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const knownIdsRef = useRef(new Set<string>());

  useEffect(() => {
    const ids = normalized.map((b) => b.id);
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = normalized.findIndex((b) => b.id === active.id);
    const newIndex = normalized.findIndex((b) => b.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(arrayMove(normalized, oldIndex, newIndex));
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
    <div className={`card nestedCard ${styles.columnEditor}`}>
      <div className={styles.columnEditorHeader}>
        <p className="fieldLabel" style={{ margin: 0 }}>
          {label}
        </p>
        {normalized.length > 0 ? (
          <ExpandCollapseAllButtons
            label={label}
            onExpandAll={() => setExpandedIds(new Set(normalized.map((b) => b.id)))}
            onCollapseAll={() => setExpandedIds(new Set())}
          />
        ) : null}
      </div>

      <StableDndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={normalized.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {normalized.map((mini) => (
            <SortableMiniBlockCard
              key={`${columnKey}-${mini.id}`}
              block={mini}
              expanded={expandedIds.has(mini.id)}
              onToggle={() => toggle(mini.id)}
              onChange={(updated) => {
                onChange(normalized.map((b) => (b.id === mini.id ? updated : b)));
              }}
              onRemove={() => onChange(normalized.filter((b) => b.id !== mini.id))}
            />
          ))}
        </SortableContext>
      </StableDndContext>

      <div className={styles.columnAddRow}>
        {(Object.keys(MINI_BLOCK_LABELS) as NestedMiniBlock["type"][]).map((type) => (
          <button
            key={type}
            type="button"
            className="btn btnGhost"
            onClick={() => {
              const created = createMiniBlock(type);
              setExpandedIds((prev) => new Set(prev).add(created.id));
              onChange([...normalized, created]);
            }}
          >
            + {MINI_BLOCK_LABELS[type]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TwoColumnFields({
  data,
  onChange,
}: {
  data: TwoColumnBlockData;
  onChange: (data: TwoColumnBlockData) => void;
}) {
  const normalized = useMemo(() => normalizeTwoColumnData(data), [data]);

  return (
    <>
      <p style={{ fontSize: 14, color: "#6d5757", marginBottom: 12 }}>
        Drag nested blocks to reorder. In the live preview, click the block, a column, or use the
        style toolbar tabs (Block / Left / Right) to style each column separately — padding,
        background, and typography can differ per side. Columns stack on mobile preview.
      </p>
      <ColumnEditor
        label="Left column"
        columnKey="left"
        blocks={normalized.left_blocks}
        onChange={(left_blocks) => onChange({ ...normalized, left_blocks })}
      />
      <ColumnEditor
        label="Right column"
        columnKey="right"
        blocks={normalized.right_blocks}
        onChange={(right_blocks) => onChange({ ...normalized, right_blocks })}
      />
    </>
  );
}
