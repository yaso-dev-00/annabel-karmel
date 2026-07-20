"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { ExpandCollapseAllButtons } from "@/components/Admin/BlockEditor/expand-collapse-all-buttons";
import { StableDndContext } from "@/components/Admin/BlockEditor/stable-dnd-context";
import { ImageField } from "@/components/Admin/Ui/ImageField";
import blockStyles from "@/components/Admin/BlockEditor/block-editor.module.css";
import type { CookbookCarouselImage } from "@/lib/cookbooks/types";
import styles from "./cookbook-editor.module.css";

type CarouselImageWithId = CookbookCarouselImage & { id: string };

function ensureImageId(image: CookbookCarouselImage): CarouselImageWithId {
  return {
    ...image,
    id: image.id || crypto.randomUUID(),
  };
}

function imageSummary(image: CookbookCarouselImage, index: number): string {
  if (image.alt?.trim()) return image.alt.trim();
  if (image.src?.trim()) {
    const parts = image.src.split("/");
    return parts[parts.length - 1] || `Image ${index + 1}`;
  }
  return `Untitled image ${index + 1}`;
}

type SortableCarouselCardProps = {
  image: CarouselImageWithId;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<CookbookCarouselImage>) => void;
  onRemove: () => void;
  canRemove: boolean;
};

function SortableCarouselCard({
  image,
  index,
  expanded,
  onToggle,
  onChange,
  onRemove,
  canRemove,
}: SortableCarouselCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.carouselCard}${expanded ? ` ${styles.carouselCardExpanded}` : ""}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <div className={styles.carouselHeader} onClick={onToggle}>
        <span
          className={blockStyles.dragHandle}
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${imageSummary(image, index)}`}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => {
            listeners?.onPointerDown?.(e);
            e.stopPropagation();
          }}
        >
          ⠿
        </span>
        <div className={styles.carouselThumb}>
          {image.src ? <img src={image.src} alt="" /> : <span className={styles.carouselThumbEmpty}>—</span>}
        </div>
        <span className={styles.carouselIndex}>Image {index + 1}</span>
        <span className={styles.carouselSummary}>{imageSummary(image, index)}</span>
        <div className={styles.carouselHeaderActions}>
          <button
            type="button"
            className={blockStyles.iconBtn}
            aria-label={expanded ? "Collapse image" : "Expand image"}
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
            className={blockStyles.iconBtn}
            aria-label="Remove image"
            title="Remove"
            disabled={!canRemove}
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
        <div className={styles.carouselBody}>
          <ImageField
            value={image.src}
            alt={image.alt}
            onChange={(src, altVal) => {
              onChange({
                src,
                alt: altVal ?? image.alt,
              });
            }}
            onAltChange={(altVal) => onChange({ alt: altVal })}
          />
        </div>
      ) : null}
    </div>
  );
}

type CookbookCarouselEditorProps = {
  images: CookbookCarouselImage[];
  onChange: (images: CookbookCarouselImage[]) => void;
};

export function CookbookCarouselEditor({ images, onChange }: CookbookCarouselEditorProps) {
  const normalized = useMemo(() => images.map(ensureImageId), [images]);
  const idsKey = normalized.map((image) => image.id).join("|");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const knownIdsRef = useRef(new Set<string>());

  useEffect(() => {
    const ids = normalized.map((image) => image.id);
    setExpandedIds((prev) => {
      const next = new Set<string>();
      const known = knownIdsRef.current;
      const isFirst = known.size === 0;
      for (const id of ids) {
        // Collapse by default; keep newly added images expanded.
        if (!isFirst && !known.has(id)) next.add(id);
        else if (!isFirst && prev.has(id)) next.add(id);
      }
      knownIdsRef.current = new Set(ids);
      return next;
    });
  }, [idsKey, normalized]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const patchImages = useCallback(
    (next: CookbookCarouselImage[]) => {
      onChange(next.map(ensureImageId));
    },
    [onChange],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = normalized.findIndex((image) => image.id === active.id);
    const newIndex = normalized.findIndex((image) => image.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    patchImages(arrayMove(normalized, oldIndex, newIndex));
  };

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addImage = () => {
    const created = ensureImageId({ src: "", alt: "" });
    setExpandedIds((prev) => new Set(prev).add(created.id));
    patchImages([...normalized, created]);
  };

  return (
    <div className="card">
      <div className={styles.carouselSectionHeader}>
        <div>
          <h2 className="cardSectionTitle" style={{ margin: 0 }}>
            Carousel images
          </h2>
          <p className={styles.sectionHint}>
            {normalized.length} image{normalized.length === 1 ? "" : "s"} · drag to reorder ·
            expand to edit
          </p>
        </div>
        {normalized.length > 0 ? (
          <ExpandCollapseAllButtons
            label="Carousel images"
            onExpandAll={() => setExpandedIds(new Set(normalized.map((image) => image.id)))}
            onCollapseAll={() => setExpandedIds(new Set())}
          />
        ) : null}
      </div>

      <div className="nestedList">
        <StableDndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={normalized.map((image) => image.id)}
            strategy={verticalListSortingStrategy}
          >
            {normalized.map((image, index) => (
              <SortableCarouselCard
                key={image.id}
                image={image}
                index={index}
                expanded={expandedIds.has(image.id)}
                onToggle={() => toggle(image.id)}
                onChange={(patch) =>
                  patchImages(
                    normalized.map((item) =>
                      item.id === image.id ? { ...item, ...patch } : item,
                    ),
                  )
                }
                onRemove={() =>
                  patchImages(normalized.filter((item) => item.id !== image.id))
                }
                canRemove={normalized.length > 1}
              />
            ))}
          </SortableContext>
        </StableDndContext>

        <button type="button" className={`btn btnGhost ${styles.addRowBtn}`} onClick={addImage}>
          + Add image
        </button>
      </div>
    </div>
  );
}
