"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
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
import { tablewareProducts, type TablewareProduct } from "@/data/tableware-page";
import blockStyles from "@/components/Admin/BlockEditor/block-editor.module.css";
import relatedStyles from "@/components/Admin/BlockEditor/related-articles-fields.module.css";
import styles from "./product-editor.module.css";

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      className={blockStyles.iconBtn}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      ✕
    </button>
  );
}

function useStableItemIds(length: number) {
  const idPrefix = useId();
  const seqRef = useRef(length);
  const createId = useCallback(() => {
    seqRef.current += 1;
    return `${idPrefix}-${seqRef.current}`;
  }, [idPrefix]);

  const [itemIds, setItemIds] = useState(() =>
    Array.from({ length }, (_, index) => `${idPrefix}-${index + 1}`),
  );

  useEffect(() => {
    setItemIds((prev) => {
      if (prev.length === length) return prev;
      if (prev.length < length) {
        return [
          ...prev,
          ...Array.from({ length: length - prev.length }, () => createId()),
        ];
      }
      return prev.slice(0, length);
    });
  }, [length, createId]);

  return { itemIds, setItemIds, createId };
}

function useListSensors() {
  return useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
}

function SortableTextRow({
  id,
  value,
  ariaLabel,
  onChange,
  onRemove,
}: {
  id: string;
  value: string;
  ariaLabel: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={styles.sortableTextRow}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <span
        className={blockStyles.dragHandle}
        {...attributes}
        {...listeners}
        aria-label={`Drag to reorder ${ariaLabel}`}
      >
        ⠿
      </span>
      <input
        className="fieldInput"
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value)}
      />
      <RemoveButton label={`Remove ${ariaLabel}`} onClick={onRemove} />
    </div>
  );
}

export function SortableTextList({
  items,
  onChange,
  itemLabel,
  addLabel,
  emptyHint,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  itemLabel: string;
  addLabel: string;
  emptyHint?: string;
}) {
  const { itemIds, setItemIds, createId } = useStableItemIds(items.length);
  const sensors = useListSensors();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = itemIds.indexOf(String(active.id));
    const newIndex = itemIds.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(arrayMove(items, oldIndex, newIndex));
    setItemIds((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  return (
    <div className={styles.sortableListBlock}>
      <div className={styles.sectionHeader}>
        <label className="fieldLabel">{itemLabel}</label>
        <button
          type="button"
          className="btn btnGhost"
          onClick={() => {
            setItemIds((prev) => [...prev, createId()]);
            onChange([...items, ""]);
          }}
        >
          {addLabel}
        </button>
      </div>
      {items.length === 0 ? (
        <p className={styles.sectionHint}>{emptyHint ?? "No items yet."}</p>
      ) : (
        <StableDndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            <div className={styles.listStack}>
              {items.map((item, index) => {
                const id = itemIds[index] ?? `${itemLabel}-${index}`;
                return (
                  <SortableTextRow
                    key={id}
                    id={id}
                    value={item}
                    ariaLabel={`${itemLabel} ${index + 1}`}
                    onChange={(value) => {
                      const next = items.slice();
                      next[index] = value;
                      onChange(next);
                    }}
                    onRemove={() => {
                      onChange(items.filter((_, i) => i !== index));
                      setItemIds((prev) => prev.filter((_, i) => i !== index));
                    }}
                  />
                );
              })}
            </div>
          </SortableContext>
        </StableDndContext>
      )}
    </div>
  );
}

function SortableCareIconRow({
  id,
  icon,
  index,
  expanded,
  onToggle,
  onChange,
  onRemove,
}: {
  id: string;
  icon: { src: string; label: string };
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onChange: (icon: { src: string; label: string }) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const title = icon.label.trim() || `Care icon ${index + 1}`;

  return (
    <div
      ref={setNodeRef}
      data-editor-item={id}
      className={`${styles.accordionEditorItem}${expanded ? ` ${styles.accordionEditorItemOpen}` : ""}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <div className={styles.accordionEditorItemHeader}>
        <span
          className={blockStyles.dragHandle}
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${title}`}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => {
            listeners?.onPointerDown?.(e);
            e.stopPropagation();
          }}
        >
          ⠿
        </span>
        <button
          type="button"
          className={styles.accordionEditorToggle}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          {icon.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={icon.src} alt="" className={styles.careIconThumb} />
          ) : (
            <span className={styles.careIconThumbPlaceholder} aria-hidden />
          )}
          <span className={styles.accordionEditorTitle}>{title}</span>
          <span className={styles.accordionEditorMeta}>{icon.src ? "Image set" : "No image"}</span>
        </button>
        <div className={styles.accordionEditorHeaderActions}>
          <button
            type="button"
            className={blockStyles.iconBtn}
            aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
            title={expanded ? "Collapse" : "Expand"}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {expanded ? "▲" : "▼"}
          </button>
          <RemoveButton label={`Remove ${title}`} onClick={onRemove} />
        </div>
      </div>
      {expanded ? (
        <div className={styles.accordionEditorBody}>
          <ImageField
            value={icon.src}
            alt={icon.label}
            onChange={(src, alt) => onChange({ src, label: alt ?? icon.label })}
            onAltChange={(label) => onChange({ ...icon, label })}
            altLabel="Label"
          />
        </div>
      ) : null}
    </div>
  );
}

export function SortableGalleryEditor({
  label,
  gallery,
  onChange,
  emptyHint,
}: {
  label: string;
  gallery: { src: string; alt: string }[];
  onChange: (gallery: { src: string; alt: string }[]) => void;
  emptyHint?: string;
}) {
  const { itemIds, setItemIds, createId } = useStableItemIds(gallery.length);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    itemIds.length > 0 ? new Set([itemIds[0]]) : new Set(),
  );
  const sensors = useListSensors();

  useEffect(() => {
    setExpandedIds((prev) => {
      const next = new Set([...prev].filter((id) => itemIds.includes(id)));
      if (next.size === prev.size && [...next].every((id) => prev.has(id))) return prev;
      return next;
    });
  }, [itemIds]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = itemIds.indexOf(String(active.id));
    const newIndex = itemIds.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(arrayMove(gallery, oldIndex, newIndex));
    setItemIds((prev) => arrayMove(prev, oldIndex, newIndex));
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
    <div className={styles.sortableListBlock}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderCol} style={{ marginBottom: 0 }}>
          <h3 className={styles.subSectionTitle}>Gallery — {label}</h3>
          <p className={styles.sectionHint}>Images for this colour. Drag to reorder.</p>
        </div>
        <div className={styles.accordionEditorToolbar}>
          {gallery.length > 0 ? (
            <ExpandCollapseAllButtons
              label="gallery images"
              onExpandAll={() => setExpandedIds(new Set(itemIds))}
              onCollapseAll={() => setExpandedIds(new Set())}
            />
          ) : null}
          <button
            type="button"
            className="btn btnGhost"
            onClick={() => {
              const id = createId();
              setItemIds((prev) => [...prev, id]);
              setExpandedIds((prev) => new Set(prev).add(id));
              onChange([...gallery, { src: "", alt: "" }]);
            }}
          >
            + Image
          </button>
        </div>
      </div>

      {gallery.length === 0 ? (
        <p className={styles.sectionHint}>
          {emptyHint ?? "No images for this colour yet."}
        </p>
      ) : (
        <StableDndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={() => setExpandedIds(new Set())}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            <div className={styles.accordionEditorList}>
              {gallery.map((image, index) => {
                const id = itemIds[index] ?? `gallery-${index}`;
                const title = image.alt.trim() || `Image ${index + 1}`;
                return (
                  <SortableGalleryImageRow
                    key={id}
                    id={id}
                    image={image}
                    title={title}
                    index={index}
                    expanded={expandedIds.has(id)}
                    onToggle={() => toggle(id)}
                    onChange={(next) => {
                      const galleryNext = gallery.slice();
                      galleryNext[index] = next;
                      onChange(galleryNext);
                    }}
                    onRemove={() => {
                      onChange(gallery.filter((_, i) => i !== index));
                      setItemIds((prev) => prev.filter((_, i) => i !== index));
                      setExpandedIds((prev) => {
                        const next = new Set(prev);
                        next.delete(id);
                        return next;
                      });
                    }}
                  />
                );
              })}
            </div>
          </SortableContext>
        </StableDndContext>
      )}
    </div>
  );
}

function SortableGalleryImageRow({
  id,
  image,
  title,
  index,
  expanded,
  onToggle,
  onChange,
  onRemove,
}: {
  id: string;
  image: { src: string; alt: string };
  title: string;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onChange: (image: { src: string; alt: string }) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      data-editor-item={id}
      className={`${styles.accordionEditorItem}${expanded ? ` ${styles.accordionEditorItemOpen}` : ""}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <div className={styles.accordionEditorItemHeader}>
        <span
          className={blockStyles.dragHandle}
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${title}`}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => {
            listeners?.onPointerDown?.(e);
            e.stopPropagation();
          }}
        >
          ⠿
        </span>
        <button
          type="button"
          className={styles.accordionEditorToggle}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          {image.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.src} alt="" className={styles.galleryThumb} />
          ) : (
            <span className={styles.galleryThumbPlaceholder} aria-hidden />
          )}
          <span className={styles.accordionEditorTitle}>{title}</span>
          <span className={styles.accordionEditorMeta}>
            {image.src ? `Image ${index + 1}` : "No image"}
          </span>
        </button>
        <div className={styles.accordionEditorHeaderActions}>
          <button
            type="button"
            className={blockStyles.iconBtn}
            aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
            title={expanded ? "Collapse" : "Expand"}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {expanded ? "▲" : "▼"}
          </button>
          <RemoveButton label={`Remove ${title}`} onClick={onRemove} />
        </div>
      </div>
      {expanded ? (
        <div className={styles.accordionEditorBody}>
          <ImageField
            value={image.src}
            alt={image.alt}
            onChange={(src, alt) => onChange({ src, alt: alt ?? image.alt })}
            onAltChange={(alt) => onChange({ ...image, alt })}
          />
        </div>
      ) : null}
    </div>
  );
}

export function SortableCareIconsEditor({
  careHeading,
  careIcons,
  onHeadingChange,
  onIconsChange,
}: {
  careHeading: string;
  careIcons: { src: string; label: string }[];
  onHeadingChange: (heading: string) => void;
  onIconsChange: (icons: { src: string; label: string }[]) => void;
}) {
  const { itemIds, setItemIds, createId } = useStableItemIds(careIcons.length);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    itemIds.length > 0 ? new Set([itemIds[0]]) : new Set(),
  );
  const sensors = useListSensors();

  useEffect(() => {
    setExpandedIds((prev) => {
      const next = new Set([...prev].filter((id) => itemIds.includes(id)));
      if (next.size === prev.size && [...next].every((id) => prev.has(id))) return prev;
      return next;
    });
  }, [itemIds]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = itemIds.indexOf(String(active.id));
    const newIndex = itemIds.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    onIconsChange(arrayMove(careIcons, oldIndex, newIndex));
    setItemIds((prev) => arrayMove(prev, oldIndex, newIndex));
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
    <div className="card">
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderCol} style={{ marginBottom: 0 }}>
          <h2 className="cardSectionTitle">Care</h2>
          <p className={styles.sectionHint}>Care icons under “Looking after me”. Drag to reorder.</p>
        </div>
        <div className={styles.accordionEditorToolbar}>
          {careIcons.length > 0 ? (
            <ExpandCollapseAllButtons
              label="care icons"
              onExpandAll={() => setExpandedIds(new Set(itemIds))}
              onCollapseAll={() => setExpandedIds(new Set())}
            />
          ) : null}
          <button
            type="button"
            className="btn btnGhost"
            onClick={() => {
              const id = createId();
              setItemIds((prev) => [...prev, id]);
              setExpandedIds((prev) => new Set(prev).add(id));
              onIconsChange([...careIcons, { src: "", label: "" }]);
            }}
          >
            + Icon
          </button>
        </div>
      </div>
      <div className="cardForm">
        <div className="field">
          <label className="fieldLabel" htmlFor="tw-care-heading">
            Heading
          </label>
          <input
            id="tw-care-heading"
            className="fieldInput"
            value={careHeading}
            onChange={(e) => onHeadingChange(e.target.value)}
          />
        </div>
        {careIcons.length === 0 ? (
          <p className={styles.sectionHint}>No care icons yet.</p>
        ) : (
          <StableDndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={() => setExpandedIds(new Set())}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
              <div className={styles.accordionEditorList}>
                {careIcons.map((icon, index) => {
                  const id = itemIds[index] ?? `care-${index}`;
                  return (
                    <SortableCareIconRow
                      key={id}
                      id={id}
                      icon={icon}
                      index={index}
                      expanded={expandedIds.has(id)}
                      onToggle={() => toggle(id)}
                      onChange={(next) => {
                        const careIconsNext = careIcons.slice();
                        careIconsNext[index] = next;
                        onIconsChange(careIconsNext);
                      }}
                      onRemove={() => {
                        onIconsChange(careIcons.filter((_, i) => i !== index));
                        setItemIds((prev) => prev.filter((_, i) => i !== index));
                        setExpandedIds((prev) => {
                          const next = new Set(prev);
                          next.delete(id);
                          return next;
                        });
                      }}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </StableDndContext>
        )}
      </div>
    </div>
  );
}

function SortableCompleteSetRow({
  product,
  onRemove,
}: {
  product: TablewareProduct;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: product.slug,
  });

  return (
    <div
      ref={setNodeRef}
      className={relatedStyles.selectedRow}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <span
        className={blockStyles.dragHandle}
        {...attributes}
        {...listeners}
        aria-label={`Drag to reorder ${product.title}`}
      >
        ⠿
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.defaultImage} alt="" className={relatedStyles.thumbnail} />
      <div className={relatedStyles.selectedCopy}>
        <strong>{product.title}</strong>
        <span>{product.href}</span>
      </div>
      <div className={relatedStyles.rowActions}>
        <button
          type="button"
          className="btn btnGhost"
          onClick={onRemove}
          aria-label={`Remove ${product.title}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function CompleteSetPicker({
  slugs,
  excludeSlug,
  onChange,
}: {
  slugs: string[];
  excludeSlug?: string;
  onChange: (slugs: string[]) => void;
}) {
  const catalog = useMemo(() => {
    const excludeFamily = excludeSlug?.replace(/-(soft-sage|warm-stone|blushberry)$/, "") ?? excludeSlug;
    return tablewareProducts.filter((product) => {
      if (!excludeSlug) return true;
      const productFamily = product.slug.replace(/-(soft-sage|warm-stone|blushberry)$/, "");
      return product.slug !== excludeSlug && productFamily !== excludeFamily;
    });
  }, [excludeSlug]);

  const bySlug = useMemo(() => new Map(catalog.map((product) => [product.slug, product])), [catalog]);

  const selected = slugs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is TablewareProduct => Boolean(product));

  const available = catalog.filter((product) => !slugs.includes(product.slug));

  const sensors = useListSensors();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const orderedKnown = slugs.filter((slug) => bySlug.has(slug));
    const oldIndex = orderedKnown.indexOf(String(active.id));
    const newIndex = orderedKnown.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(orderedKnown, oldIndex, newIndex);
    const unknown = slugs.filter((slug) => !bySlug.has(slug));
    onChange([...reordered, ...unknown]);
  };

  return (
    <div className="card">
      <div className={styles.sectionHeaderCol}>
        <h2 className="cardSectionTitle">Complete your set</h2>
        <p className={styles.sectionHint}>
          Choose Grow products for the “Complete your set” carousel. Drag to reorder.
        </p>
      </div>
      <div className="cardForm">
        <div className="field">
          <label className="fieldLabel">Selected products</label>
          <p className={relatedStyles.helpText}>
            {selected.length > 0
              ? `${selected.length} product${selected.length === 1 ? "" : "s"} in the carousel.`
              : "No products selected yet."}
          </p>
          {selected.length > 0 ? (
            <StableDndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext
                items={selected.map((product) => product.slug)}
                strategy={verticalListSortingStrategy}
              >
                <div className={relatedStyles.selectedList}>
                  {selected.map((product) => (
                    <SortableCompleteSetRow
                      key={product.slug}
                      product={product}
                      onRemove={() => onChange(slugs.filter((slug) => slug !== product.slug))}
                    />
                  ))}
                </div>
              </SortableContext>
            </StableDndContext>
          ) : null}
          {slugs.some((slug) => !bySlug.has(slug)) ? (
            <div className={styles.chipRow} style={{ marginTop: 10 }}>
              {slugs
                .filter((slug) => !bySlug.has(slug))
                .map((slug) => (
                  <span key={slug} className={styles.chip}>
                    {slug}
                    <button
                      type="button"
                      className={styles.chipRemove}
                      aria-label={`Remove ${slug}`}
                      onClick={() => onChange(slugs.filter((item) => item !== slug))}
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
          ) : null}
        </div>

        <div className="field">
          <label className="fieldLabel">Add products</label>
          {available.length === 0 ? (
            <p className={relatedStyles.helpText}>All Grow products are already selected.</p>
          ) : (
            <div className={relatedStyles.availableList}>
              {available.map((product) => (
                <div key={product.slug} className={relatedStyles.availableRow}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.defaultImage} alt="" className={relatedStyles.thumbnail} />
                  <div className={relatedStyles.selectedCopy}>
                    <strong>{product.title}</strong>
                    <span>{product.href}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btnSecondary"
                    onClick={() => {
                      if (slugs.includes(product.slug)) return;
                      onChange([...slugs, product.slug]);
                    }}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
