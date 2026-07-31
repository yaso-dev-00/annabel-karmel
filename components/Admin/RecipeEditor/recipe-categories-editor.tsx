'use client';

import type {
  RecipeTaxonomyGroup,
  RecipeTaxonomyKind,
} from '@/data/recipe-taxonomies';
import type { RecipeTaxonomyRef } from '@/lib/recipes/types';
import styles from './recipe-editor.module.css';

type RecipeCategoriesEditorProps = {
  taxonomies: RecipeTaxonomyRef[];
  onChange: (taxonomies: RecipeTaxonomyRef[]) => void;
  groups: RecipeTaxonomyGroup[];
  /** Skip outer card chrome when nested in the editor sidebar. */
  embedded?: boolean;
};

function stripPrimary(ref: RecipeTaxonomyRef): RecipeTaxonomyRef {
  if (!ref.primary && !ref.hidden) return { kind: ref.kind, slug: ref.slug };
  const next: RecipeTaxonomyRef = { kind: ref.kind, slug: ref.slug };
  if (ref.hidden) next.hidden = true;
  return next;
}

function refsForKind(
  taxonomies: RecipeTaxonomyRef[],
  kind: RecipeTaxonomyKind,
) {
  return taxonomies.filter((ref) => ref.kind === kind);
}

function ensurePrimary(
  list: RecipeTaxonomyRef[],
  kind: RecipeTaxonomyKind,
): RecipeTaxonomyRef[] {
  const kindRefs = list.filter((ref) => ref.kind === kind);
  const others = list.filter((ref) => ref.kind !== kind);
  if (kindRefs.length <= 1) {
    return [...others, ...kindRefs.map(stripPrimary)];
  }
  if (kindRefs.some((ref) => ref.primary)) {
    let seen = false;
    return [
      ...others,
      ...kindRefs.map((ref) => {
        if (ref.primary && !seen) {
          seen = true;
          return { ...stripPrimary(ref), primary: true as const };
        }
        return stripPrimary(ref);
      }),
    ];
  }
  return [
    ...others,
    { ...stripPrimary(kindRefs[0]), primary: true },
    ...kindRefs.slice(1).map(stripPrimary),
  ];
}

export function RecipeCategoriesEditor({
  taxonomies,
  onChange,
  groups,
  embedded = false,
}: RecipeCategoriesEditorProps) {
  const isSelected = (kind: RecipeTaxonomyKind, slug: string) =>
    taxonomies.some((ref) => ref.kind === kind && ref.slug === slug);

  const isPrimary = (kind: RecipeTaxonomyKind, slug: string) =>
    taxonomies.some(
      (ref) => ref.kind === kind && ref.slug === slug && ref.primary === true,
    );

  const toggle = (kind: RecipeTaxonomyKind, slug: string) => {
    if (isSelected(kind, slug)) {
      const next = taxonomies.filter(
        (ref) => !(ref.kind === kind && ref.slug === slug),
      );
      onChange(ensurePrimary(next, kind));
      return;
    }
    const next = [...taxonomies, { kind, slug }];
    onChange(ensurePrimary(next, kind));
  };

  const makePrimary = (kind: RecipeTaxonomyKind, slug: string) => {
    onChange(
      taxonomies.map((ref) => {
        if (ref.kind !== kind) return ref;
        if (ref.slug === slug) return { ...stripPrimary(ref), primary: true };
        return stripPrimary(ref);
      }),
    );
  };

  const body = (
    <>
      {!embedded ? (
        <div className={styles.sectionHeaderCol}>
          <h2 className="cardSectionTitle">Categories</h2>
          <p className={styles.sectionHint}>
            Select categories for this recipe. With two or more in a group,
            choose a primary.
          </p>
        </div>
      ) : (
        <p className={styles.sectionHint}>
          With two or more selected in a group, choose which is primary.
        </p>
      )}
      <div className={styles.categoryGroups}>
        {groups.map((group) => {
          const selectedInGroup = refsForKind(taxonomies, group.kind);
          const showPrimaryUi = selectedInGroup.length >= 2;

          return (
            <section key={group.id} className={styles.categoryGroup}>
              <h3 className={styles.categoryGroupTitle}>{group.label}</h3>
              <ul className={styles.categoryChecklist}>
                {group.terms.map((term) => {
                  const checked = isSelected(group.kind, term.slug);
                  const primary = isPrimary(group.kind, term.slug);
                  const id = `cat-${group.kind}-${term.slug}`;
                  return (
                    <li key={term.slug} className={styles.categoryCheckItem}>
                      <label className={styles.categoryCheckLabel} htmlFor={id}>
                        <input
                          id={id}
                          type="checkbox"
                          className={styles.categoryCheckbox}
                          checked={checked}
                          onChange={() => toggle(group.kind, term.slug)}
                        />
                        <span>{term.label}</span>
                      </label>
                      {showPrimaryUi && checked ? (
                        primary ? (
                          <span className={styles.primaryBadge}>Primary</span>
                        ) : (
                          <button
                            type="button"
                            className={styles.makePrimaryBtn}
                            onClick={() => makePrimary(group.kind, term.slug)}
                          >
                            Make primary
                          </button>
                        )
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );

  if (embedded) return <div className={styles.embeddedSection}>{body}</div>;
  return <div className="card">{body}</div>;
}

/** @deprecated Use RecipeCategoriesEditor */
export const RecipeTaxonomiesEditor = RecipeCategoriesEditor;
