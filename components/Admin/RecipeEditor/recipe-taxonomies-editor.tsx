"use client";

import { byAge, freeFrom, getTaxonomy, mealTimes } from "@/data/recipe-taxonomies";
import type { RecipeTaxonomyKind } from "@/data/recipe-taxonomies";
import type { RecipeTaxonomyRef } from "@/lib/recipes/types";
import styles from "./recipe-editor.module.css";

type RecipeTaxonomiesEditorProps = {
  taxonomies: RecipeTaxonomyRef[];
  onChange: (taxonomies: RecipeTaxonomyRef[]) => void;
};

const GROUPS: { kind: RecipeTaxonomyKind; label: string; options: { slug: string; label: string }[] }[] =
  [
    { kind: "recipe-category", label: "Ages", options: byAge },
    { kind: "meal-time", label: "Meal times", options: mealTimes },
    { kind: "allergen", label: "Free from", options: freeFrom },
  ];

export function RecipeTaxonomiesEditor({ taxonomies, onChange }: RecipeTaxonomiesEditorProps) {
  const isSelected = (kind: RecipeTaxonomyKind, slug: string) =>
    taxonomies.some((ref) => ref.kind === kind && ref.slug === slug);

  const toggle = (kind: RecipeTaxonomyKind, slug: string) => {
    if (isSelected(kind, slug)) {
      onChange(taxonomies.filter((ref) => !(ref.kind === kind && ref.slug === slug)));
      return;
    }
    onChange([...taxonomies, { kind, slug }]);
  };

  const remove = (kind: RecipeTaxonomyKind, slug: string) => {
    onChange(taxonomies.filter((ref) => !(ref.kind === kind && ref.slug === slug)));
  };

  return (
    <div className="card">
      <div className={styles.sectionHeaderCol}>
        <h2 className="cardSectionTitle">Taxonomies</h2>
        <p className={styles.sectionHint}>Drives website &amp; app filtering</p>
      </div>
      <div className={styles.taxonomyGroups}>
        {GROUPS.map((group) => {
          const selected = taxonomies.filter((ref) => ref.kind === group.kind);
          const available = group.options.filter((opt) => !isSelected(group.kind, opt.slug));

          return (
            <div key={group.kind} className="field">
              <label className="fieldLabel">{group.label}</label>
              <div className={styles.chipRow}>
                {selected.map((ref) => {
                  const taxonomy = getTaxonomy(ref.kind, ref.slug);
                  return (
                    <span key={`${ref.kind}:${ref.slug}`} className={styles.chip}>
                      {taxonomy?.label ?? ref.slug}
                      <button
                        type="button"
                        className={styles.chipRemove}
                        onClick={() => remove(ref.kind, ref.slug)}
                        aria-label={`Remove ${taxonomy?.label ?? ref.slug}`}
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
                {available.length > 0 ? (
                  <select
                    className={`fieldSelect ${styles.chipAddSelect}`}
                    value=""
                    onChange={(e) => {
                      const slug = e.target.value;
                      if (slug) toggle(group.kind, slug);
                    }}
                    aria-label={`Add ${group.label}`}
                  >
                    <option value="">+ Add</option>
                    {available.map((opt) => (
                      <option key={opt.slug} value={opt.slug}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
