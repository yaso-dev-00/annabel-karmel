'use client';

import { useMemo, useState } from 'react';
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
import { StableDndContext } from '@/components/Admin/BlockEditor/stable-dnd-context';
import { ConfirmModal } from '@/components/Admin/Ui/ConfirmModal';
import type {
  RecipeTaxonomy,
  RecipeTaxonomyGroup,
} from '@/data/recipe-taxonomies';
import { saveCategoryGroupsApi } from '@/lib/admin/recipe-categories-client';
import styles from './recipe-categories-admin.module.css';

type RecipeCategoriesAdminProps = {
  initialGroups: RecipeTaxonomyGroup[];
};

function slugify(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function SortableTermRow({
  term,
  onCommit,
  onRemove,
  busy,
}: {
  term: RecipeTaxonomy;
  onCommit: (patch: Partial<RecipeTaxonomy>) => void;
  onRemove: () => void;
  busy: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: term.slug,
  });
  const [label, setLabel] = useState(term.label);
  const [slug, setSlug] = useState(term.slug);

  return (
    <li
      ref={setNodeRef}
      className={`${styles.termRow}${isDragging ? ` ${styles.termRowDragging}` : ''}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <button
        type="button"
        className={styles.dragHandle}
        aria-label={`Drag to reorder ${term.label}`}
        disabled={busy}
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>
      <input
        className={styles.termLabelInput}
        value={label}
        disabled={busy}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={() => {
          if (label.trim() && label.trim() !== term.label) {
            onCommit({ label: label.trim() });
          } else {
            setLabel(term.label);
          }
        }}
        aria-label="Category label"
      />
      <input
        className={styles.termSlugInput}
        value={slug}
        disabled={busy}
        onChange={(e) => setSlug(e.target.value)}
        onBlur={() => {
          const next = slugify(slug) || term.slug;
          if (next !== term.slug) {
            onCommit({
              slug: next,
              path: term.path.replace(/\/[^/]+$/, `/${next}`),
            });
          } else {
            setSlug(term.slug);
          }
        }}
        aria-label="Category slug"
        spellCheck={false}
      />
      <button
        type="button"
        className={styles.removeBtn}
        disabled={busy}
        onClick={onRemove}
        aria-label={`Remove ${term.label}`}
      >
        Remove
      </button>
    </li>
  );
}

export function RecipeCategoriesAdmin({
  initialGroups,
}: RecipeCategoriesAdminProps) {
  const [groups, setGroups] = useState(initialGroups);
  const [groupId, setGroupId] = useState(initialGroups[0]?.id ?? '');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [removeSlug, setRemoveSlug] = useState<string | null>(null);

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === groupId) ?? groups[0],
    [groups, groupId],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const persist = async (
    nextGroups: RecipeTaxonomyGroup[],
    successMessage: string,
  ) => {
    const previous = groups;
    setGroups(nextGroups);
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const saved = await saveCategoryGroupsApi(nextGroups);
      setGroups(saved);
      setMessage(successMessage);
    } catch (err) {
      setGroups(previous);
      setError(
        err instanceof Error ? err.message : 'Failed to save categories',
      );
    } finally {
      setBusy(false);
    }
  };

  const patchSelectedTerms = (
    terms: RecipeTaxonomy[],
    successMessage: string,
  ) => {
    if (!selectedGroup) return;
    const nextGroups = groups.map((group) =>
      group.id === selectedGroup.id ? { ...group, terms } : group,
    );
    void persist(nextGroups, successMessage);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!selectedGroup || busy) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = selectedGroup.terms.findIndex(
      (term) => term.slug === active.id,
    );
    const newIndex = selectedGroup.terms.findIndex(
      (term) => term.slug === over.id,
    );
    if (oldIndex < 0 || newIndex < 0) return;
    patchSelectedTerms(
      arrayMove(selectedGroup.terms, oldIndex, newIndex),
      'Order saved.',
    );
  };

  const updateTerm = (slug: string, patch: Partial<RecipeTaxonomy>) => {
    if (!selectedGroup) return;
    const next = selectedGroup.terms.map((term) =>
      term.slug === slug ? { ...term, ...patch } : term,
    );
    patchSelectedTerms(next, 'Category updated.');
  };

  const addTerm = () => {
    if (!selectedGroup || busy) return;
    const label = newLabel.trim();
    if (!label) return;
    let slug = slugify(label);
    if (!slug) slug = `category-${Date.now()}`;
    const existing = new Set(selectedGroup.terms.map((term) => term.slug));
    if (existing.has(slug)) {
      let i = 2;
      while (existing.has(`${slug}-${i}`)) i += 1;
      slug = `${slug}-${i}`;
    }
    const term: RecipeTaxonomy = {
      kind: selectedGroup.kind,
      slug,
      label,
      path: `/${selectedGroup.kind}/${slug}`,
      sourceUrl: `https://www.annabelkarmel.com/${selectedGroup.kind}/${slug}/`,
    };
    setNewLabel('');
    patchSelectedTerms([...selectedGroup.terms, term], 'Category added.');
  };

  const confirmRemove = () => {
    if (!selectedGroup || !removeSlug) return;
    const next = selectedGroup.terms.filter((term) => term.slug !== removeSlug);
    setRemoveSlug(null);
    patchSelectedTerms(next, 'Category removed.');
  };

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist" aria-label="Category groups">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={selectedGroup?.id === group.id}
            className={`${styles.tab}${selectedGroup?.id === group.id ? ` ${styles.tabActive}` : ''}`}
            onClick={() => {
              setGroupId(group.id);
              setError(null);
              setMessage(null);
            }}
          >
            {group.label}
          </button>
        ))}
      </div>

      {error ? (
        <div className={styles.bannerError} role="alert">
          {error}
        </div>
      ) : null}
      {message ? (
        <div className={styles.bannerOk} role="status">
          {message}
        </div>
      ) : null}

      {!selectedGroup ? (
        <p className={styles.empty}>No category groups configured.</p>
      ) : (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>{selectedGroup.label}</h2>
              <p className={styles.panelHint}>
                {selectedGroup.terms.length} categor
                {selectedGroup.terms.length === 1 ? 'y' : 'ies'} · drag to
                reorder
              </p>
            </div>
            <form
              className={styles.addForm}
              onSubmit={(e) => {
                e.preventDefault();
                addTerm();
              }}
            >
              <label
                className={styles.visuallyHidden}
                htmlFor="new-category-label"
              >
                New category label
              </label>
              <input
                id="new-category-label"
                className={styles.addInput}
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="New category name"
                disabled={busy}
              />
              <button
                type="submit"
                className="btn btnPrimary"
                disabled={busy || !newLabel.trim()}
              >
                + Add category
              </button>
            </form>
          </div>

          {selectedGroup.terms.length === 0 ? (
            <p className={styles.empty}>No categories yet. Add one above.</p>
          ) : (
            <StableDndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedGroup.terms.map((term) => term.slug)}
                strategy={verticalListSortingStrategy}
              >
                <ul className={styles.termList}>
                  {selectedGroup.terms.map((term) => (
                    <SortableTermRow
                      key={`${term.slug}:${term.label}`}
                      term={term}
                      busy={busy}
                      onCommit={(patch) => updateTerm(term.slug, patch)}
                      onRemove={() => setRemoveSlug(term.slug)}
                    />
                  ))}
                </ul>
              </SortableContext>
            </StableDndContext>
          )}
        </div>
      )}

      <ConfirmModal
        open={Boolean(removeSlug)}
        title="Remove category?"
        message="Recipes that used this category keep the reference, but it will no longer appear in the checklist until re-added."
        confirmLabel="Remove"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveSlug(null)}
      />
    </div>
  );
}
