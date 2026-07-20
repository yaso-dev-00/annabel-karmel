"use client";

import {
  closestCenter,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { ExpandCollapseAllButtons } from "@/components/Admin/BlockEditor/expand-collapse-all-buttons";
import { StableDndContext } from "@/components/Admin/BlockEditor/stable-dnd-context";
import blockStyles from "@/components/Admin/BlockEditor/block-editor.module.css";
import { ConfirmModal } from "@/components/Admin/Ui/ConfirmModal";
import { HomepageSectionFields } from "@/components/Admin/HomepageEditor/section-fields";
import {
  HOMEPAGE_SECTION_LABELS,
  isHomepageSectionLocked,
  type HomepageSection,
  type HomepageSectionType,
} from "@/lib/homepage/types";
import { createDefaultHomepageSections } from "@/lib/homepage/create-default-homepage";
import styles from "./homepage-editor.module.css";

type HomepageSectionsEditorProps = {
  sections: HomepageSection[];
  onChange: (sections: HomepageSection[]) => void;
  onFocusSection?: (type: HomepageSectionType) => void;
};

function sectionMeta(section: HomepageSection): string {
  switch (section.type) {
    case "hero":
      return `${section.data.slides.length} slides`;
    case "recipe_finder":
      return "Default";
    case "latest_recipes":
      return `${section.data.recipes.length} recipes`;
    case "recipe_app":
      return `${section.data.bullets.length} bullets`;
    case "expert_ranges":
      return `${section.data.cards.length} cards`;
    case "cookbooks":
      return `${section.data.books.length} books`;
    case "collabs":
      return `${section.data.cards.length} cards`;
    case "partners":
      return `${section.data.logos.length} logos`;
    case "instagram":
      return `${section.data.posts.length} posts`;
    default:
      return "";
  }
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    disabled: locked,
  });
  const title = HOMEPAGE_SECTION_LABELS[section.type];

  return (
    <div
      ref={setNodeRef}
      data-editor-item={section.id}
      className={`${styles.accordionEditorItem}${expanded ? ` ${styles.accordionEditorItemOpen}` : ""}${locked ? ` ${styles.accordionEditorItemLocked}` : ""}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <div className={styles.accordionEditorItemHeader}>
        {locked ? (
          <span className={`${blockStyles.dragHandle} ${styles.dragHandleDisabled}`} aria-hidden>
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
          <span className={styles.accordionEditorMeta}>{sectionMeta(section)}</span>
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
      {expanded ? (
        <div className={styles.accordionEditorBody}>
          <HomepageSectionFields section={section} onChange={onChange} />
        </div>
      ) : null}
    </div>
  );
}

export function HomepageSectionsEditor({
  sections,
  onChange,
  onFocusSection,
}: HomepageSectionsEditorProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const sortableIds = useMemo(() => sections.map((section) => section.id), [sections]);

  const missingTypes = useMemo(() => {
    const present = new Set(sections.map((section) => section.type));
    return (Object.keys(HOMEPAGE_SECTION_LABELS) as HomepageSectionType[]).filter(
      (type) => type !== "recipe_finder" && !present.has(type),
    );
  }, [sections]);

  const defaultsByType = useMemo(() => {
    const map = new Map<HomepageSectionType, HomepageSection>();
    for (const section of createDefaultHomepageSections()) {
      map.set(section.type, section);
    }
    return map;
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((section) => section.id === active.id);
    const newIndex = sections.findIndex((section) => section.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const activeSection = sections[oldIndex];
    const overSection = sections[newIndex];
    if (isHomepageSectionLocked(activeSection.type) || isHomepageSectionLocked(overSection.type)) {
      return;
    }
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

  const pendingSection = sections.find((section) => section.id === pendingDeleteId) ?? null;

  return (
    <div className="card">
      <div className={styles.sectionToolbar}>
        <div>
          <h2 className="cardSectionTitle">Homepage sections</h2>
          <p className={styles.sectionHint}>
            Drag to reorder. Search recipes stays locked in place. ✕ removes items; trash deletes a
            section.
          </p>
        </div>
        <ExpandCollapseAllButtons
          label="sections"
          onExpandAll={() => setExpandedIds(new Set(sections.map((section) => section.id)))}
          onCollapseAll={() => setExpandedIds(new Set())}
        />
      </div>

      <StableDndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
          <div className={styles.sectionList}>
            {sections.map((section) => (
              <SortableHomepageSection
                key={section.id}
                section={section}
                expanded={expandedIds.has(section.id)}
                onToggle={() => toggle(section.id)}
                onChange={(next) =>
                  onChange(sections.map((item) => (item.id === next.id ? next : item)))
                }
                onDelete={() => setPendingDeleteId(section.id)}
              />
            ))}
          </div>
        </SortableContext>
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
              e.target.value = "";
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
            : ""
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (!pendingDeleteId) return;
          onChange(sections.filter((section) => section.id !== pendingDeleteId));
          setPendingDeleteId(null);
        }}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
