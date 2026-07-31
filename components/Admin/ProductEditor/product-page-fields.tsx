'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExpandCollapseAllButtons } from '@/components/Admin/BlockEditor/expand-collapse-all-buttons';
import { StableDndContext } from '@/components/Admin/BlockEditor/stable-dnd-context';
import { ImageField } from '@/components/Admin/Ui/ImageField';
import type { ChilledProductAccordionItem } from '@/data/chilled-product-page';
import { descriptionParagraphs } from '@/lib/products/description-paragraphs';
import type {
  AustraliaFrozenPageContent,
  ChilledProductPageContent,
  FrozenProductPageContent,
  PlantPoweredBitesPageContent,
  ProductPageContent,
} from '@/lib/products/types';
import { TablewareFields } from '@/components/Admin/ProductEditor/tableware-page-fields';
import blockStyles from '@/components/Admin/BlockEditor/block-editor.module.css';
import styles from './product-editor.module.css';

type ProductPageFieldsProps = {
  page: ProductPageContent;
  onChange: (page: ProductPageContent) => void;
  onPreviewVariantChange?: (variantKey: string | null) => void;
  productSlug?: string;
};

function RemoveButton({
  onClick,
  label = 'Remove',
}: {
  onClick: () => void;
  label?: string;
}) {
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

function IconRemoveButton({
  onClick,
  label = 'Remove',
}: {
  onClick: () => void;
  label?: string;
}) {
  return <RemoveButton onClick={onClick} label={label} />;
}

function scrollToEditorItem(itemId: string) {
  const run = () => {
    const el = document.querySelector<HTMLElement>(
      `[data-editor-item="${itemId}"]`,
    );
    if (!el) return false;
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
    const focusable = el.querySelector<HTMLElement>(
      "input:not([type='hidden']):not([type='checkbox']):not([type='file']), textarea, select, [contenteditable='true']",
    );
    focusable?.focus({ preventScroll: true });
    return true;
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!run()) window.setTimeout(run, 80);
    });
  });
}

function addListItem<T>(
  items: T[],
  item: T,
  listKey: string,
  commit: (next: T[]) => void,
) {
  const index = items.length;
  commit([...items, item]);
  scrollToEditorItem(`${listKey}-${index}`);
}

function StringListEditor({
  label,
  values,
  onChange,
  rows = 3,
  hint,
  addLabel = '+ Add',
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  rows?: number;
  hint?: string;
  addLabel?: string;
}) {
  const listKey = `string-list-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="card">
      <div className={styles.sectionHeader}>
        <h2 className="cardSectionTitle">{label}</h2>
        <button
          type="button"
          className="btn btnGhost"
          onClick={() => addListItem(values, '', listKey, onChange)}
        >
          {addLabel}
        </button>
      </div>
      {hint ? <p className={styles.sectionHint}>{hint}</p> : null}
      <div className={styles.listStack}>
        {values.map((value, index) => (
          <div
            key={index}
            className={styles.listRow}
            data-editor-item={`${listKey}-${index}`}
          >
            <textarea
              className={`fieldTextarea${hint ? ` ${styles.descriptionTextarea}` : ''}`}
              rows={rows}
              value={value}
              placeholder={`${label} ${index + 1}`}
              onChange={(e) => {
                const next = values.slice();
                next[index] = e.target.value;
                onChange(next);
              }}
            />
            <RemoveButton
              onClick={() => onChange(values.filter((_, i) => i !== index))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDescriptionField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const length = value.trim().length;

  return (
    <div className="card">
      <div className={styles.sectionHeader}>
        <h2 className="cardSectionTitle">Description</h2>
        <span className={styles.charCount}>
          {length === 0 ? 'Empty' : `${length.toLocaleString()} characters`}
        </span>
      </div>
      <p className={styles.sectionHint}>
        Body copy shown next to the carousel in the product detail section.
      </p>
      <textarea
        className={`fieldTextarea ${styles.descriptionTextarea}`}
        rows={8}
        value={value}
        aria-label="Product description"
        placeholder="Annabel’s award-winning little curry combines tender chicken…"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function AustraliaFrozenFields({
  page,
  onChange,
}: {
  page: AustraliaFrozenPageContent;
  onChange: (page: AustraliaFrozenPageContent) => void;
}) {
  return (
    <>
      <div className="card">
        <h2 className="cardSectionTitle">Page title</h2>
        <div className="field">
          <input
            className="fieldInput"
            value={page.title}
            onChange={(e) => onChange({ ...page, title: e.target.value })}
          />
        </div>
      </div>

      <StringListEditor
        label="Description"
        hint="Body copy paragraphs shown on the product detail section."
        addLabel="+ Paragraph"
        rows={5}
        values={page.description}
        onChange={(description) => onChange({ ...page, description })}
      />

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Carousel</h2>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              addListItem(
                page.carousel,
                { src: '', alt: '' },
                'carousel',
                (carousel) => onChange({ ...page, carousel }),
              )
            }
          >
            + Slide
          </button>
        </div>
        <div className={styles.listStack}>
          {page.carousel.map((slide, index) => (
            <div
              key={index}
              className={styles.listRow}
              data-editor-item={`carousel-${index}`}
            >
              <div className={styles.listRowFields}>
                <ImageField
                  value={slide.src}
                  alt={slide.alt}
                  onChange={(src, alt) => {
                    const carousel = page.carousel.slice();
                    carousel[index] = { src, alt: alt ?? slide.alt };
                    onChange({ ...page, carousel });
                  }}
                  onAltChange={(alt) => {
                    const carousel = page.carousel.slice();
                    carousel[index] = { ...slide, alt };
                    onChange({ ...page, carousel });
                  }}
                />
              </div>
              <RemoveButton
                onClick={() =>
                  onChange({
                    ...page,
                    carousel: page.carousel.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="cardSectionTitle">Retailer links</h2>
        <div className="cardForm">
          {(['woolworths', 'coles', 'iga'] as const).map((key) => (
            <div className="field" key={key}>
              <label className="fieldLabel">{key}</label>
              <input
                className="fieldInput"
                value={page.retailers[key] ?? ''}
                onChange={(e) =>
                  onChange({
                    ...page,
                    retailers: {
                      ...page.retailers,
                      [key]: e.target.value || undefined,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Ingredients</h2>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              addListItem(
                page.ingredients,
                '',
                'au-ingredients',
                (ingredients) => onChange({ ...page, ingredients }),
              )
            }
          >
            + Paragraph
          </button>
        </div>
        <p className={styles.sectionHint}>
          Each box becomes its own paragraph in the Ingredients accordion. Use{' '}
          <strong>**double asterisks**</strong> around words to bold allergens
          (e.g. <code>**Milk**</code>).
        </p>
        <div className={styles.accordionParagraphs}>
          {page.ingredients.map((paragraph, index) => (
            <div
              key={index}
              className={styles.accordionParagraphRow}
              data-editor-item={`au-ingredients-${index}`}
            >
              <textarea
                className={`fieldTextarea ${styles.descriptionTextarea}`}
                rows={index === 0 ? 6 : 3}
                value={paragraph}
                placeholder={
                  index === 0
                    ? 'Full ingredients list…'
                    : index === 1
                      ? 'e.g. **CONTAINS: GLUTEN, WHEAT, MILK.**'
                      : `Paragraph ${index + 1}`
                }
                onChange={(e) => {
                  const ingredients = page.ingredients.slice();
                  ingredients[index] = e.target.value;
                  onChange({ ...page, ingredients });
                }}
              />
              <IconRemoveButton
                label={`Remove paragraph ${index + 1}`}
                onClick={() =>
                  onChange({
                    ...page,
                    ingredients: page.ingredients.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Nutrition</h2>
        </div>
        <p className={styles.sectionHint}>
          Edit column headers and cell values for the Nutrition accordion table.
        </p>
        <AccordionTableEditor
          sectionId="au-nutrition"
          showFootnote={false}
          table={{
            headers: [...page.nutrition.headers],
            rows: page.nutrition.rows,
          }}
          onChange={(table) =>
            onChange({
              ...page,
              nutrition: {
                headers: [
                  table.headers[0] ?? '',
                  table.headers[1] ?? '',
                  table.headers[2] ?? '',
                ],
                rows: table.rows,
              },
            })
          }
        />
      </div>
    </>
  );
}

function emptyAccordionTable(): NonNullable<
  ChilledProductAccordionItem['table']
> {
  return {
    headers: ['', '', ''],
    rows: [
      ['', '', ''],
      ['', '', ''],
    ],
  };
}

function AccordionTableEditor({
  table,
  sectionId,
  onChange,
  showFootnote = true,
}: {
  table: NonNullable<ChilledProductAccordionItem['table']>;
  sectionId: string;
  onChange: (table: NonNullable<ChilledProductAccordionItem['table']>) => void;
  showFootnote?: boolean;
}) {
  const colCount = Math.max(table.headers.length, 3);
  const rowListKey = `${sectionId}-table-row`;

  const setHeader = (col: number, value: string) => {
    const headers = Array.from(
      { length: colCount },
      (_, i) => table.headers[i] ?? '',
    );
    headers[col] = value;
    onChange({ ...table, headers });
  };

  const setCell = (rowIndex: number, col: number, value: string) => {
    const rows = table.rows.map((row) =>
      Array.from({ length: colCount }, (_, i) => row[i] ?? ''),
    );
    rows[rowIndex][col] = value;
    onChange({ ...table, rows });
  };

  return (
    <div className={styles.accordionTable}>
      <div
        className={styles.accordionTableGrid}
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: colCount }, (_, col) => (
          <input
            key={`h-${col}`}
            className={`fieldInput ${styles.accordionTableHeaderInput}`}
            value={table.headers[col] ?? ''}
            placeholder={`Header ${col + 1}`}
            aria-label={`Table header ${col + 1}`}
            onChange={(e) => setHeader(col, e.target.value)}
          />
        ))}
      </div>

      <div className={styles.accordionTableRows}>
        {table.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={styles.accordionTableRow}
            data-editor-item={`${rowListKey}-${rowIndex}`}
          >
            <div
              className={styles.accordionTableGrid}
              style={{
                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: colCount }, (_, col) => (
                <input
                  key={col}
                  className="fieldInput"
                  value={row[col] ?? ''}
                  placeholder={table.headers[col] || `Column ${col + 1}`}
                  aria-label={`Row ${rowIndex + 1}, column ${col + 1}`}
                  onChange={(e) => setCell(rowIndex, col, e.target.value)}
                />
              ))}
            </div>
            <IconRemoveButton
              label={`Remove row ${rowIndex + 1}`}
              onClick={() =>
                onChange({
                  ...table,
                  rows: table.rows.filter((_, i) => i !== rowIndex),
                })
              }
            />
          </div>
        ))}
      </div>

      <div className={styles.accordionTableActions}>
        <button
          type="button"
          className="btn btnGhost"
          onClick={() =>
            addListItem(
              table.rows,
              Array.from({ length: colCount }, () => ''),
              rowListKey,
              (rows) => onChange({ ...table, rows }),
            )
          }
        >
          + Row
        </button>
      </div>

      {showFootnote ? (
        <div className="field">
          <label className="fieldLabel">Footnote (optional)</label>
          <input
            className="fieldInput"
            value={table.footnote ?? ''}
            placeholder="e.g. Values are typical"
            onChange={(e) =>
              onChange({
                ...table,
                footnote: e.target.value || undefined,
              })
            }
          />
        </div>
      ) : null}
    </div>
  );
}

type SortableAccordionSectionProps = {
  id: string;
  item: ChilledProductAccordionItem;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<ChilledProductAccordionItem>) => void;
  onRemove: () => void;
};

function SortableAccordionSection({
  id,
  item,
  index,
  expanded,
  onToggle,
  onChange,
  onRemove,
}: SortableAccordionSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });
  const contentType = item.table ? 'table' : 'text';
  const paragraphs = item.paragraphs ?? [''];
  const preview =
    contentType === 'table'
      ? `${item.table?.rows.length ?? 0} table rows`
      : `${paragraphs.filter((p) => p.trim()).length || 0} paragraphs`;
  const title = item.title.trim() || `Section ${index + 1}`;

  const setContentType = (type: 'text' | 'table') => {
    if (type === 'table') {
      onChange({
        table: item.table ?? emptyAccordionTable(),
        paragraphs: undefined,
      });
      return;
    }
    onChange({
      paragraphs: item.paragraphs?.length ? item.paragraphs : [''],
      table: undefined,
    });
  };

  return (
    <div
      ref={setNodeRef}
      data-editor-item={id}
      className={`${styles.accordionEditorItem}${expanded ? ` ${styles.accordionEditorItemOpen}` : ''}`}
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
          <span className={styles.accordionEditorTitle}>{title}</span>
          <span className={styles.accordionEditorMeta}>{preview}</span>
        </button>
        <div className={styles.accordionEditorHeaderActions}>
          <button
            type="button"
            className={blockStyles.iconBtn}
            aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
            title={expanded ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {expanded ? '▲' : '▼'}
          </button>
          <IconRemoveButton
            label={`Remove ${title}`}
            onClick={() => {
              onRemove();
            }}
          />
        </div>
      </div>

      {expanded ? (
        <div className={styles.accordionEditorBody}>
          <div className="cardForm">
            <div className="field">
              <label className="fieldLabel">Section title</label>
              <input
                className="fieldInput"
                value={item.title}
                placeholder="e.g. Ingredients, Prepare, Storage"
                onChange={(e) => onChange({ title: e.target.value })}
              />
            </div>

            <div className="field">
              <span className="fieldLabel">Content type</span>
              <div className={styles.accordionContentType}>
                <div
                  className={styles.accordionTypeToggle}
                  role="group"
                  aria-label="Content type"
                >
                  <button
                    type="button"
                    className={`${styles.accordionTypeBtn}${contentType === 'text' ? ` ${styles.accordionTypeBtnActive}` : ''}`}
                    onClick={() => setContentType('text')}
                  >
                    Text paragraphs
                  </button>
                  <button
                    type="button"
                    className={`${styles.accordionTypeBtn}${contentType === 'table' ? ` ${styles.accordionTypeBtnActive}` : ''}`}
                    onClick={() => setContentType('table')}
                  >
                    Table
                  </button>
                </div>
                <p className={styles.sectionHint}>
                  {contentType === 'table'
                    ? 'Edit column headers and cell values for this section.'
                    : 'Each box becomes its own paragraph on the page.'}
                </p>
              </div>
            </div>
          </div>

          {contentType === 'table' && item.table ? (
            <AccordionTableEditor
              table={item.table}
              sectionId={id}
              onChange={(table) => onChange({ table, paragraphs: undefined })}
            />
          ) : (
            <div className={styles.accordionParagraphs}>
              {paragraphs.map((paragraph, pIndex) => (
                <div
                  key={pIndex}
                  className={styles.accordionParagraphRow}
                  data-editor-item={`${id}-paragraph-${pIndex}`}
                >
                  <textarea
                    className={`fieldTextarea ${styles.descriptionTextarea}`}
                    rows={4}
                    value={paragraph}
                    placeholder={`Paragraph ${pIndex + 1}`}
                    onChange={(e) => {
                      const nextParagraphs = paragraphs.slice();
                      nextParagraphs[pIndex] = e.target.value;
                      onChange({
                        paragraphs: nextParagraphs,
                        table: undefined,
                      });
                    }}
                  />
                  <IconRemoveButton
                    label={`Remove paragraph ${pIndex + 1}`}
                    onClick={() => {
                      const nextParagraphs = paragraphs.filter(
                        (_, i) => i !== pIndex,
                      );
                      onChange({
                        paragraphs: nextParagraphs.length
                          ? nextParagraphs
                          : [''],
                        table: undefined,
                      });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btnGhost"
                onClick={() => {
                  const nextIndex = paragraphs.length;
                  onChange({
                    paragraphs: [...paragraphs, ''],
                    table: undefined,
                  });
                  scrollToEditorItem(`${id}-paragraph-${nextIndex}`);
                }}
              >
                + Paragraph
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function AccordionEditor({
  accordion,
  onChange,
}: {
  accordion: ChilledProductPageContent['accordion'];
  onChange: (accordion: ChilledProductPageContent['accordion']) => void;
}) {
  const idPrefix = useId();
  const seqRef = useRef(accordion.length);

  const createId = useCallback(() => {
    seqRef.current += 1;
    return `${idPrefix}-acc-${seqRef.current}`;
  }, [idPrefix]);

  // Stable across SSR + hydration (unlike crypto.randomUUID).
  const [itemIds, setItemIds] = useState(() =>
    accordion.map((_, index) => `${idPrefix}-acc-${index + 1}`),
  );
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    itemIds.length > 0 ? new Set([itemIds[0]]) : new Set(),
  );

  useEffect(() => {
    queueMicrotask(() => {
      setItemIds((prev) => {
        if (prev.length === accordion.length) return prev;
        if (prev.length < accordion.length) {
          return [
            ...prev,
            ...Array.from({ length: accordion.length - prev.length }, () =>
              createId(),
            ),
          ];
        }
        return prev.slice(0, accordion.length);
      });
    });
  }, [accordion.length, createId]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = itemIds.indexOf(String(active.id));
    const newIndex = itemIds.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    onChange(arrayMove(accordion, oldIndex, newIndex));
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
        <h2 className="cardSectionTitle">Accordion</h2>
        <div className={styles.accordionEditorToolbar}>
          {accordion.length > 0 ? (
            <ExpandCollapseAllButtons
              label="sections"
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
              onChange([
                ...accordion,
                { title: 'New section', paragraphs: [''] },
              ]);
              scrollToEditorItem(id);
            }}
          >
            + Section
          </button>
        </div>
      </div>
      <p className={styles.sectionHint}>
        Drag to reorder. Each section can be either{' '}
        <strong>text paragraphs</strong> or a <strong>table</strong>.
      </p>

      <StableDndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={() => setExpandedIds(new Set())}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <div className={styles.accordionEditorList}>
            {accordion.map((item, index) => {
              const id = itemIds[index] ?? `accordion-${index}`;
              return (
                <SortableAccordionSection
                  key={id}
                  id={id}
                  item={item}
                  index={index}
                  expanded={expandedIds.has(id)}
                  onToggle={() => toggle(id)}
                  onChange={(patch) => {
                    const next = accordion.slice();
                    next[index] = { ...item, ...patch };
                    onChange(next);
                  }}
                  onRemove={() => {
                    onChange(accordion.filter((_, i) => i !== index));
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
    </div>
  );
}

function RelatedEditor({
  related,
  onChange,
}: {
  related: ChilledProductPageContent['related'];
  onChange: (related: ChilledProductPageContent['related']) => void;
}) {
  return (
    <div className="card">
      <div className={styles.sectionHeader}>
        <h2 className="cardSectionTitle">Related products</h2>
        <button
          type="button"
          className="btn btnGhost"
          onClick={() =>
            addListItem(related, { image: '', href: '' }, 'related', onChange)
          }
        >
          + Related
        </button>
      </div>
      <div className={styles.listStack}>
        {related.map((item, index) => (
          <div
            key={index}
            className={styles.listRow}
            data-editor-item={`related-${index}`}
          >
            <div className={styles.listRowFields}>
              <input
                className="fieldInput"
                placeholder="Href"
                value={item.href}
                onChange={(e) => {
                  const next = related.slice();
                  next[index] = { ...item, href: e.target.value };
                  onChange(next);
                }}
              />
              <ImageField
                value={item.image}
                showAlt={false}
                onChange={(src) => {
                  const next = related.slice();
                  next[index] = { ...item, image: src };
                  onChange(next);
                }}
              />
            </div>
            <RemoveButton
              onClick={() => onChange(related.filter((_, i) => i !== index))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlantPoweredFields({
  page,
  onChange,
}: {
  page: PlantPoweredBitesPageContent;
  onChange: (page: PlantPoweredBitesPageContent) => void;
}) {
  return (
    <>
      <div className="card">
        <h2 className="cardSectionTitle">Hero</h2>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Title</label>
            <textarea
              className="fieldTextarea"
              rows={2}
              value={page.hero.title}
              onChange={(e) =>
                onChange({
                  ...page,
                  hero: { ...page.hero, title: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Intro</label>
            <textarea
              className="fieldTextarea"
              rows={3}
              value={page.hero.intro}
              onChange={(e) =>
                onChange({
                  ...page,
                  hero: { ...page.hero, intro: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero alt text</label>
            <input
              className="fieldInput"
              value={page.heroAlt}
              onChange={(e) => onChange({ ...page, heroAlt: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero desktop image</label>
            <ImageField
              value={page.assets.heroDesktop}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, heroDesktop: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero mobile image</label>
            <ImageField
              value={page.assets.heroMobile}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, heroMobile: src },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="cardSectionTitle">Section backgrounds</h2>
        <p className={styles.sectionHint}>
          Detail, retailer, and related-products backgrounds
        </p>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Detail background (desktop)</label>
            <ImageField
              value={page.assets.detailBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, detailBg: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Detail background (mobile)</label>
            <ImageField
              value={page.assets.detailBgMobile}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, detailBgMobile: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Retailer section background</label>
            <ImageField
              value={page.assets.retailerBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, retailerBg: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Why not try background</label>
            <ImageField
              value={page.assets.whyNotTryBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, whyNotTryBg: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">ASDA logo</label>
            <ImageField
              value={page.assets.asdaLogo}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, asdaLogo: src },
                })
              }
            />
          </div>
        </div>
      </div>

      <StringListEditor
        label="Description"
        hint="Body copy paragraphs shown on the product detail section."
        addLabel="+ Paragraph"
        rows={5}
        values={descriptionParagraphs(page.description)}
        onChange={(description) => onChange({ ...page, description })}
      />

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Carousel</h2>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              addListItem(
                page.carousel,
                { src: '', alt: '', width: 800, height: 800 },
                'carousel',
                (carousel) => onChange({ ...page, carousel }),
              )
            }
          >
            + Slide
          </button>
        </div>
        <div className={styles.listStack}>
          {page.carousel.map((slide, index) => (
            <div
              key={index}
              className={styles.listRow}
              data-editor-item={`carousel-${index}`}
            >
              <div className={styles.listRowFields}>
                <ImageField
                  value={slide.src}
                  alt={slide.alt}
                  onChange={(src, alt) => {
                    const carousel = page.carousel.slice();
                    carousel[index] = { ...slide, src, alt: alt ?? slide.alt };
                    onChange({ ...page, carousel });
                  }}
                  onAltChange={(alt) => {
                    const carousel = page.carousel.slice();
                    carousel[index] = { ...slide, alt };
                    onChange({ ...page, carousel });
                  }}
                />
              </div>
              <RemoveButton
                onClick={() =>
                  onChange({
                    ...page,
                    carousel: page.carousel.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="cardSectionTitle">Badge strip</h2>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Desktop badges image</label>
            <ImageField
              value={page.badges.desktop}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  badges: { ...page.badges, desktop: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Mobile badges image</label>
            <ImageField
              value={page.badges.mobile}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  badges: { ...page.badges, mobile: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Alt text</label>
            <input
              className="fieldInput"
              value={page.badges.alt}
              onChange={(e) =>
                onChange({
                  ...page,
                  badges: { ...page.badges, alt: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <AccordionEditor
        accordion={page.accordion}
        onChange={(accordion) => onChange({ ...page, accordion })}
      />

      <div className="card">
        <h2 className="cardSectionTitle">Retailer</h2>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Heading</label>
            <input
              className="fieldInput"
              value={page.retailer.heading}
              onChange={(e) =>
                onChange({
                  ...page,
                  retailer: { ...page.retailer, heading: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Logo link URL</label>
            <input
              className="fieldInput"
              value={page.retailer.logoHref}
              onChange={(e) =>
                onChange({
                  ...page,
                  retailer: { ...page.retailer, logoHref: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Ways to serve</h2>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              addListItem(
                page.waysToServe,
                { title: '', href: '', image: '' },
                'ways-to-serve',
                (waysToServe) => onChange({ ...page, waysToServe }),
              )
            }
          >
            + Item
          </button>
        </div>
        <div className={styles.listStack}>
          {page.waysToServe.map((item, index) => (
            <div
              key={index}
              className={styles.listRow}
              data-editor-item={`ways-to-serve-${index}`}
            >
              <div className={styles.listRowFields}>
                <input
                  className="fieldInput"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) => {
                    const waysToServe = page.waysToServe.slice();
                    waysToServe[index] = { ...item, title: e.target.value };
                    onChange({ ...page, waysToServe });
                  }}
                />
                <input
                  className="fieldInput"
                  placeholder="Href"
                  value={item.href}
                  onChange={(e) => {
                    const waysToServe = page.waysToServe.slice();
                    waysToServe[index] = { ...item, href: e.target.value };
                    onChange({ ...page, waysToServe });
                  }}
                />
                <ImageField
                  value={item.image}
                  showAlt={false}
                  onChange={(src) => {
                    const waysToServe = page.waysToServe.slice();
                    waysToServe[index] = { ...item, image: src };
                    onChange({ ...page, waysToServe });
                  }}
                />
              </div>
              <RemoveButton
                onClick={() =>
                  onChange({
                    ...page,
                    waysToServe: page.waysToServe.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <RelatedEditor
        related={page.related}
        onChange={(related) => onChange({ ...page, related })}
      />
    </>
  );
}

function ChilledFields({
  page,
  onChange,
}: {
  page: ChilledProductPageContent;
  onChange: (page: ChilledProductPageContent) => void;
}) {
  return (
    <>
      <div className="card">
        <h2 className="cardSectionTitle">Hero</h2>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Title</label>
            <textarea
              className="fieldTextarea"
              rows={2}
              value={page.hero.title}
              onChange={(e) =>
                onChange({
                  ...page,
                  hero: { ...page.hero, title: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Intro</label>
            <textarea
              className="fieldTextarea"
              rows={3}
              value={page.hero.intro}
              onChange={(e) =>
                onChange({
                  ...page,
                  hero: { ...page.hero, intro: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero alt text</label>
            <input
              className="fieldInput"
              value={page.heroAlt}
              onChange={(e) => onChange({ ...page, heroAlt: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero desktop image</label>
            <ImageField
              value={page.assets.heroDesktop}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, heroDesktop: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero mobile image</label>
            <ImageField
              value={page.assets.heroMobile}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, heroMobile: src },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="cardSectionTitle">Section backgrounds</h2>
        <p className={styles.sectionHint}>
          Detail, retailer, and related-products backgrounds
        </p>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Detail background (desktop)</label>
            <ImageField
              value={page.assets.detailBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, detailBg: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Detail background (mobile)</label>
            <ImageField
              value={page.assets.detailBgMobile}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, detailBgMobile: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Retailer section background</label>
            <ImageField
              value={page.assets.retailerBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, retailerBg: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Why not try background</label>
            <ImageField
              value={page.assets.whyNotTryBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, whyNotTryBg: src },
                })
              }
            />
          </div>
          {'tescoLogo' in page.assets ? (
            <div className="field">
              <label className="fieldLabel">Tesco logo</label>
              <ImageField
                value={page.assets.tescoLogo ?? ''}
                showAlt={false}
                onChange={(src) =>
                  onChange({
                    ...page,
                    assets: { ...page.assets, tescoLogo: src },
                  })
                }
              />
            </div>
          ) : null}
        </div>
      </div>

      <ProductDescriptionField
        value={page.description}
        onChange={(description) => onChange({ ...page, description })}
      />

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Carousel</h2>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              addListItem(
                page.carousel,
                { src: '', alt: '' },
                'carousel',
                (carousel) => onChange({ ...page, carousel }),
              )
            }
          >
            + Slide
          </button>
        </div>
        <div className={styles.listStack}>
          {page.carousel.map((slide, index) => (
            <div
              key={index}
              className={styles.listRow}
              data-editor-item={`carousel-${index}`}
            >
              <div className={styles.listRowFields}>
                <ImageField
                  value={slide.src}
                  alt={slide.alt}
                  onChange={(src, alt) => {
                    const carousel = page.carousel.slice();
                    carousel[index] = { ...slide, src, alt: alt ?? slide.alt };
                    onChange({ ...page, carousel });
                  }}
                  onAltChange={(alt) => {
                    const carousel = page.carousel.slice();
                    carousel[index] = { ...slide, alt };
                    onChange({ ...page, carousel });
                  }}
                />
              </div>
              <RemoveButton
                onClick={() =>
                  onChange({
                    ...page,
                    carousel: page.carousel.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Badges</h2>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              addListItem(
                page.badges,
                { src: '', alt: '' },
                'badge',
                (badges) => onChange({ ...page, badges }),
              )
            }
          >
            + Badge
          </button>
        </div>
        <div className={styles.listStack}>
          {page.badges.map((badge, index) => (
            <div
              key={index}
              className={styles.listRow}
              data-editor-item={`badge-${index}`}
            >
              <div className={styles.listRowFields}>
                <ImageField
                  value={badge.src}
                  alt={badge.alt}
                  onChange={(src, alt) => {
                    const badges = page.badges.slice();
                    badges[index] = { src, alt: alt ?? badge.alt };
                    onChange({ ...page, badges });
                  }}
                  onAltChange={(alt) => {
                    const badges = page.badges.slice();
                    badges[index] = { ...badge, alt };
                    onChange({ ...page, badges });
                  }}
                />
              </div>
              <RemoveButton
                onClick={() =>
                  onChange({
                    ...page,
                    badges: page.badges.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <AccordionEditor
        accordion={page.accordion}
        onChange={(accordion) => onChange({ ...page, accordion })}
      />

      <div className="card">
        <h2 className="cardSectionTitle">Retailer</h2>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Heading</label>
            <input
              className="fieldInput"
              value={page.retailer.heading}
              onChange={(e) =>
                onChange({
                  ...page,
                  retailer: { ...page.retailer, heading: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Logo link URL</label>
            <input
              className="fieldInput"
              value={page.retailer.logoHref ?? ''}
              onChange={(e) =>
                onChange({
                  ...page,
                  retailer: { ...page.retailer, logoHref: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <RelatedEditor
        related={page.related}
        onChange={(related) => onChange({ ...page, related })}
      />
    </>
  );
}

function FrozenFields({
  page,
  onChange,
}: {
  page: FrozenProductPageContent;
  onChange: (page: FrozenProductPageContent) => void;
}) {
  return (
    <>
      <div className="card">
        <h2 className="cardSectionTitle">Hero</h2>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Title</label>
            <textarea
              className="fieldTextarea"
              rows={2}
              value={page.hero.title}
              onChange={(e) =>
                onChange({
                  ...page,
                  hero: { ...page.hero, title: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Intro</label>
            <textarea
              className="fieldTextarea"
              rows={3}
              value={page.hero.intro}
              onChange={(e) =>
                onChange({
                  ...page,
                  hero: { ...page.hero, intro: e.target.value },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero alt text</label>
            <input
              className="fieldInput"
              value={page.heroAlt}
              onChange={(e) => onChange({ ...page, heroAlt: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero desktop image</label>
            <ImageField
              value={page.assets.heroDesktop}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, heroDesktop: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Hero mobile image</label>
            <ImageField
              value={page.assets.heroMobile}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, heroMobile: src },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="cardSectionTitle">Section backgrounds</h2>
        <p className={styles.sectionHint}>
          Detail, retailer, and related-products backgrounds
        </p>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Detail background (desktop)</label>
            <ImageField
              value={page.assets.detailBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, detailBg: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Detail background (mobile)</label>
            <ImageField
              value={page.assets.detailBgMobile}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, detailBgMobile: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Retailer section background</label>
            <ImageField
              value={page.assets.retailerBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, retailerBg: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Why not try background</label>
            <ImageField
              value={page.assets.whyNotTryBg}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, whyNotTryBg: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Cloud left</label>
            <ImageField
              value={page.assets.cloudLeft ?? ''}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, cloudLeft: src },
                })
              }
            />
          </div>
          <div className="field">
            <label className="fieldLabel">Cloud right</label>
            <ImageField
              value={page.assets.cloudRight ?? ''}
              showAlt={false}
              onChange={(src) =>
                onChange({
                  ...page,
                  assets: { ...page.assets, cloudRight: src },
                })
              }
            />
          </div>
        </div>
      </div>

      <ProductDescriptionField
        value={page.description}
        onChange={(description) => onChange({ ...page, description })}
      />

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Carousel</h2>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              addListItem(
                page.carousel,
                { src: '', alt: '' },
                'carousel',
                (carousel) => onChange({ ...page, carousel }),
              )
            }
          >
            + Slide
          </button>
        </div>
        <div className={styles.listStack}>
          {page.carousel.map((slide, index) => (
            <div
              key={index}
              className={styles.listRow}
              data-editor-item={`carousel-${index}`}
            >
              <div className={styles.listRowFields}>
                <ImageField
                  value={slide.src}
                  alt={slide.alt}
                  onChange={(src, alt) => {
                    const carousel = page.carousel.slice();
                    carousel[index] = { ...slide, src, alt: alt ?? slide.alt };
                    onChange({ ...page, carousel });
                  }}
                  onAltChange={(alt) => {
                    const carousel = page.carousel.slice();
                    carousel[index] = { ...slide, alt };
                    onChange({ ...page, carousel });
                  }}
                />
              </div>
              <RemoveButton
                onClick={() =>
                  onChange({
                    ...page,
                    carousel: page.carousel.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className={styles.sectionHeader}>
          <h2 className="cardSectionTitle">Badges</h2>
          <button
            type="button"
            className="btn btnGhost"
            onClick={() =>
              addListItem(
                page.badges,
                { src: '', alt: '' },
                'badge',
                (badges) => onChange({ ...page, badges }),
              )
            }
          >
            + Badge
          </button>
        </div>
        <div className={styles.listStack}>
          {page.badges.map((badge, index) => (
            <div
              key={index}
              className={styles.listRow}
              data-editor-item={`badge-${index}`}
            >
              <div className={styles.listRowFields}>
                <ImageField
                  value={badge.src}
                  alt={badge.alt}
                  onChange={(src, alt) => {
                    const badges = page.badges.slice();
                    badges[index] = { src, alt: alt ?? badge.alt };
                    onChange({ ...page, badges });
                  }}
                  onAltChange={(alt) => {
                    const badges = page.badges.slice();
                    badges[index] = { ...badge, alt };
                    onChange({ ...page, badges });
                  }}
                />
              </div>
              <RemoveButton
                onClick={() =>
                  onChange({
                    ...page,
                    badges: page.badges.filter((_, i) => i !== index),
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <AccordionEditor
        accordion={page.accordion}
        onChange={(accordion) => onChange({ ...page, accordion })}
      />

      <div className="card">
        <h2 className="cardSectionTitle">Retailer</h2>
        <div className="cardForm">
          <div className="field">
            <label className="fieldLabel">Heading</label>
            <input
              className="fieldInput"
              value={page.retailer.heading}
              onChange={(e) =>
                onChange({
                  ...page,
                  retailer: { ...page.retailer, heading: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <RelatedEditor
        related={page.related}
        onChange={(related) => onChange({ ...page, related })}
      />
    </>
  );
}

export function ProductPageFields({
  page,
  onChange,
  onPreviewVariantChange,
  productSlug,
}: ProductPageFieldsProps) {
  if (page.kind === 'tableware') {
    return (
      <TablewareFields
        page={page}
        onChange={onChange}
        onPreviewVariantChange={onPreviewVariantChange}
        productSlug={productSlug}
      />
    );
  }
  if (page.kind === 'australia-frozen') {
    return <AustraliaFrozenFields page={page} onChange={onChange} />;
  }
  if (page.kind === 'plant-powered-bites') {
    return <PlantPoweredFields page={page} onChange={onChange} />;
  }
  if (page.kind === 'frozen-meals') {
    return <FrozenFields page={page} onChange={onChange} />;
  }
  return <ChilledFields page={page} onChange={onChange} />;
}
