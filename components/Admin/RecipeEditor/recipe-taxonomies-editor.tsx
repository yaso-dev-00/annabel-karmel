"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getTaxonomy, recipeTaxonomyGroups } from "@/data/recipe-taxonomies";
import type { RecipeTaxonomyKind } from "@/data/recipe-taxonomies";
import type { RecipeTaxonomyRef } from "@/lib/recipes/types";
import styles from "./recipe-editor.module.css";

type RecipeTaxonomiesEditorProps = {
  taxonomies: RecipeTaxonomyRef[];
  onChange: (taxonomies: RecipeTaxonomyRef[]) => void;
};

type AddPickerProps = {
  label: string;
  options: { slug: string; label: string }[];
  onPick: (slug: string) => void;
};

function TaxonomyAddPicker({ label, options, onPick }: AddPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.addPicker} ref={rootRef}>
      <button
        type="button"
        className={styles.addPickerTrigger}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-label={`Add ${label}`}
        onClick={() => {
          setOpen((prev) => !prev);
          setQuery("");
        }}
      >
        <span>+ Add</span>
        <span className={styles.addPickerChevron} aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <div className={styles.addPickerMenu} role="presentation">
          <div className={styles.addPickerSearchWrap}>
            <input
              ref={searchRef}
              type="search"
              className={styles.addPickerSearch}
              value={query}
              placeholder={`Search ${label.toLowerCase()}…`}
              onChange={(event) => setQuery(event.target.value)}
              aria-label={`Search ${label}`}
            />
          </div>
          <ul id={listId} className={styles.addPickerList} role="listbox" aria-label={label}>
            {filtered.length === 0 ? (
              <li className={styles.addPickerEmpty}>No matches</li>
            ) : (
              filtered.map((opt) => (
                <li key={opt.slug} role="option">
                  <button
                    type="button"
                    className={styles.addPickerOption}
                    onClick={() => {
                      onPick(opt.slug);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

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

  const setHidden = (kind: RecipeTaxonomyKind, slug: string, hidden: boolean) => {
    onChange(
      taxonomies.map((ref) => {
        if (ref.kind !== kind || ref.slug !== slug) return ref;
        return hidden
          ? { kind: ref.kind, slug: ref.slug, hidden: true }
          : { kind: ref.kind, slug: ref.slug };
      }),
    );
  };

  return (
    <div className="card">
      <div className={styles.sectionHeaderCol}>
        <h2 className="cardSectionTitle">Taxonomies</h2>
        <p className={styles.sectionHint}>
          Drives website &amp; app filtering · hide keeps a category without showing it publicly
        </p>
      </div>
      <div className={styles.taxonomyGroups}>
        {recipeTaxonomyGroups.map((group) => {
          const selected = taxonomies.filter((ref) => ref.kind === group.kind);
          const available = group.terms.filter((opt) => !isSelected(group.kind, opt.slug));

          return (
            <div key={group.id} className="field">
              <label className="fieldLabel">{group.label}</label>
              <div className={styles.chipRow}>
                {selected.map((ref) => {
                  const taxonomy = getTaxonomy(ref.kind, ref.slug);
                  const label = taxonomy?.label ?? ref.slug;
                  const hidden = ref.hidden === true;
                  return (
                    <span
                      key={`${ref.kind}:${ref.slug}`}
                      className={`${styles.chip}${hidden ? ` ${styles.chipHidden}` : ""}`}
                    >
                      {label}
                      {hidden ? <span className={styles.chipHiddenLabel}>Hidden</span> : null}
                      <button
                        type="button"
                        className={styles.chipRemove}
                        onClick={() => setHidden(ref.kind, ref.slug, !hidden)}
                        aria-label={hidden ? `Show ${label}` : `Hide ${label}`}
                        title={hidden ? "Show in this category" : "Hide in this category"}
                      >
                        {hidden ? "Show" : "Hide"}
                      </button>
                      <button
                        type="button"
                        className={styles.chipRemove}
                        onClick={() => remove(ref.kind, ref.slug)}
                        aria-label={`Remove ${label}`}
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
                {available.length > 0 ? (
                  <TaxonomyAddPicker
                    label={group.label}
                    options={available}
                    onPick={(slug) => toggle(group.kind, slug)}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
