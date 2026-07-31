'use client';

import {
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import { ExpandCollapseAllButtons } from '@/components/Admin/BlockEditor/expand-collapse-all-buttons';
import { StableDndContext } from '@/components/Admin/BlockEditor/stable-dnd-context';
import blockStyles from '@/components/Admin/BlockEditor/block-editor.module.css';
import { ConfirmModal } from '@/components/Admin/Ui/ConfirmModal';
import { HomepageSectionFields } from '@/components/Admin/HomepageEditor/section-fields';
import {
  HOMEPAGE_SECTION_LABELS,
  isHomepageSectionLocked,
  type HomepageSection,
  type HomepageSectionType,
} from '@/lib/homepage/types';
import { createDefaultHomepageSections } from '@/lib/homepage/create-default-homepage';
import styles from './homepage-editor.module.css';

type HomepageSectionsEditorProps = {
  sections: HomepageSection[];
  onChange: (sections: HomepageSection[]) => void;
  onFocusSection?: (type: HomepageSectionType) => void;
};

function sectionMeta(section: HomepageSection): string {
  switch (section.type) {
    case 'hero':
      return `${section.data.slides.length} slides`;
    case 'recipe_finder':
      return 'Default';
    case 'latest_recipes':
      return `${section.data.recipes.length} recipes`;
    case 'recipe_app':
      return `${section.data.bullets.length} bullets`;
    case 'expert_ranges':
      return `${section.data.cards.length} cards`;
    case 'cookbooks':
      return `${section.data.books.length} books`;
    case 'collabs':
      return `${section.data.cards.length} cards`;
    case 'partners':
      return `${section.data.logos.length} logos`;
    case 'instagram':
      return `${section.data.posts.length} posts`;
    default:
      return '';
  }
}

function SectionDragChrome({
  title,
  meta,
  locked,
}: {
  title: string;
  meta: string;
  locked?: boolean;
}) {
  return (
    <div className={styles.accordionEditorItemHeader}>
      <span
        className={`${blockStyles.dragHandle}${locked ? ` ${styles.dragHandleDisabled}` : ''}`}
        aria-hidden
      >
        ⠿
      </span>
      <div className={styles.accordionEditorToggle}>
        <span className={styles.accordionEditorTitle}>{title}</span>
        <span className={styles.accordionEditorMeta}>{meta}</span>
      </div>
    </div>
  );
}

function SortableHomepageSection({
  section,
  expanded,
  onToggle,
  onChange,
  onDelete,
}: {
  section: HomepageSection;
  expanded: boolean;
  onToggle: () => void;
  onChange: (section: HomepageSection) => void;
  onDelete: () => void;
}) {
  const locked = isHomepageSectionLocked(section.type);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
    disabled: locked,
    animateLayoutChanges: () => false,
  });
  const title = HOMEPAGE_SECTION_LABELS[section.type];

  return (
    <div
      ref={setNodeRef}
      data-editor-item={section.id}
      className={`${styles.accordionEditorItem}${expanded ? ` ${styles.accordionEditorItemOpen}` : ''}${locked ? ` ${styles.accordionEditorItemLocked}` : ''}${isDragging ? ` ${styles.accordionEditorItemDragging}` : ''}`}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <div className={styles.accordionEditorItemHeader}>
        {locked ? (
          <span
            className={`${blockStyles.dragHandle} ${styles.dragHandleDisabled}`}
            aria-hidden
          >
            ⠿
          </span>
        ) : (
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
        )}
        <button
          type="button"
          className={styles.accordionEditorToggle}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          <span className={styles.accordionEditorTitle}>{title}</span>
          <span className={styles.accordionEditorMeta}>
            {sectionMeta(section)}
          </span>
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
          {!locked ? (
            <button
              type="button"
              className={blockStyles.iconBtn}
              aria-label={`Delete ${title} section`}
              title="Delete section"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              🗑
            </button>
          ) : null}
        </div>
      </div>
      {expanded && !isDragging ? (
        <div className={styles.accordionEditorBody}>
          <HomepageSectionFields section={section} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
}

/** Resolve drop index when the hover target is the locked Search recipes row. */
function resolveDropIndex(
  sections: HomepageSection[],
  oldIndex: number,
  overIndex: number,
): number | null {
  if (oldIndex < 0 || overIndex < 0) return null;
  if (isHomepageSectionLocked(sections[oldIndex].type)) return null;

  let newIndex = overIndex;
  if (isHomepageSectionLocked(sections[overIndex].type)) {
    // Dragging down past locked → land after it; dragging up → land before it.
    newIndex = oldIndex < overIndex ? overIndex + 1 : overIndex - 1;
  }

  if (newIndex < 0 || newIndex >= sections.length) return null;
  if (isHomepageSectionLocked(sections[newIndex].type)) return null;
  if (newIndex === oldIndex) return null;
  return newIndex;
}

export function HomepageSectionsEditor({
  sections,
  onChange,
  onFocusSection,
}: HomepageSectionsEditorProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const sortableIds = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );
  const activeSection = activeId
    ? (sections.find((section) => section.id === activeId) ?? null)
    : null;

  const missingTypes = useMemo(() => {
    const present = new Set(sections.map((section) => section.type));
    return (
      Object.keys(HOMEPAGE_SECTION_LABELS) as HomepageSectionType[]
    ).filter((type) => type !== 'recipe_finder' && !present.has(type));
  }, [sections]);

  const defaultsByType = useMemo(() => {
    const map = new Map<HomepageSectionType, HomepageSection>();
    for (const section of createDefaultHomepageSections()) {
      map.set(section.type, section);
    }
    return map;
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const id = String(event.active.id);
    setActiveId(id);
    // Collapse everything while dragging — expanded field editors make DnD laggy/inaccurate.
    setExpandedIds(new Set());
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((section) => section.id === active.id);
    const overIndex = sections.findIndex((section) => section.id === over.id);
    const newIndex = resolveDropIndex(sections, oldIndex, overIndex);
    if (newIndex == null) return;
    onChange(arrayMove(sections, oldIndex, newIndex));
  };

  const toggle = (id: string) => {
    const section = sections.find((item) => item.id === id);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (section) {
      onFocusSection?.(section.type);
    }
  };

  const pendingSection =
    sections.find((section) => section.id === pendingDeleteId) ?? null;

  return (
    <div className="card">
      <div className={styles.sectionToolbar}>
        <div>
          <h2 className="cardSectionTitle">Homepage sections</h2>
          <p className={styles.sectionHint}>
            Drag the handle to reorder. Search recipes stays locked after Hero.
            Trash deletes a section.
          </p>
        </div>
        <ExpandCollapseAllButtons
          label="sections"
          onExpandAll={() =>
            setExpandedIds(new Set(sections.map((section) => section.id)))
          }
          onCollapseAll={() => setExpandedIds(new Set())}
        />
      </div>

      <StableDndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={sortableIds}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.sectionList}>
            {sections.map((section) => (
              <SortableHomepageSection
                key={section.id}
                section={section}
                expanded={expandedIds.has(section.id)}
                onToggle={() => toggle(section.id)}
                onChange={(next) =>
                  onChange(
                    sections.map((item) => (item.id === next.id ? next : item)),
                  )
                }
                onDelete={() => setPendingDeleteId(section.id)}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={null}>
          {activeSection ? (
            <div
              className={`${styles.accordionEditorItem} ${styles.accordionEditorItemOverlay}`}
            >
              <SectionDragChrome
                title={HOMEPAGE_SECTION_LABELS[activeSection.type]}
                meta={sectionMeta(activeSection)}
              />
            </div>
          ) : null}
        </DragOverlay>
      </StableDndContext>

      {missingTypes.length > 0 ? (
        <div className={styles.addRow} style={{ marginTop: 16 }}>
          <label className="fieldLabel" htmlFor="add-homepage-section">
            Re-add section
          </label>
          <select
            id="add-homepage-section"
            className="fieldInput"
            defaultValue=""
            onChange={(e) => {
              const type = e.target.value as HomepageSectionType;
              e.target.value = '';
              if (!type) return;
              const template = defaultsByType.get(type);
              if (!template) return;
              onChange([
                ...sections,
                {
                  ...template,
                  id: `${template.id}-${crypto.randomUUID().slice(0, 6)}`,
                },
              ]);
            }}
          >
            <option value="" disabled>
              Choose section type…
            </option>
            {missingTypes.map((type) => (
              <option key={type} value={type}>
                {HOMEPAGE_SECTION_LABELS[type]}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <ConfirmModal
        open={Boolean(pendingSection)}
        title="Delete section"
        message={
          pendingSection
            ? `Remove “${HOMEPAGE_SECTION_LABELS[pendingSection.type]}” from the homepage? You can re-add it later.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (!pendingDeleteId) return;
          onChange(
            sections.filter((section) => section.id !== pendingDeleteId),
          );
          setPendingDeleteId(null);
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
