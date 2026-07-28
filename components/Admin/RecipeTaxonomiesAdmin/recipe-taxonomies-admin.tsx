"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { recipeTaxonomyGroups } from "@/data/recipe-taxonomies";
import type { RecipeTaxonomyKind } from "@/data/recipe-taxonomies";
import {
  RECIPE_STATUS_LABELS,
  getRecipeStatusBadgeClass,
  isRecipeDisabled,
  resolveRecipeStatus,
} from "@/lib/admin/recipe-status";
import { formatAdminListDate } from "@/lib/admin/format-admin-list";
import { fetchRecipes, updateRecipeApi } from "@/lib/admin/recipes-client";
import type { Recipe, RecipeTaxonomyRef } from "@/lib/recipes/types";
import editorStyles from "@/components/Admin/RecipeEditor/recipe-editor.module.css";
import styles from "./recipe-taxonomies-admin.module.css";

const ADD_PAGE_SIZE = 10;
const MAX_ERROR_LENGTH = 140;

/** Collapse noisy/raw backend errors into a short, actionable message for the admin UI. */
function friendlyPersistError(err: unknown, fallback: string): string {
  const raw = err instanceof Error ? err.message : fallback;

  if (/blob.*(suspended|storage limit|quota)/i.test(raw) || /storage limit/i.test(raw)) {
    return "Storage is unavailable: the Vercel Blob store has hit its limit. Free up space or upgrade the plan in Vercel, then try again.";
  }
  if (/BLOB_READ_WRITE_TOKEN/i.test(raw)) {
    return "Storage isn't configured: add BLOB_READ_WRITE_TOKEN in Vercel project settings, then redeploy.";
  }
  if (raw.length > MAX_ERROR_LENGTH) {
    return `${raw.slice(0, MAX_ERROR_LENGTH).trim()}…`;
  }
  return raw;
}

type RecipeTaxonomiesAdminProps = {
  recipes: Recipe[];
};

function hasTerm(recipe: Recipe, kind: RecipeTaxonomyKind, slug: string): boolean {
  return recipe.taxonomies.some((ref) => ref.kind === kind && ref.slug === slug);
}

function getTermRef(recipe: Recipe, kind: RecipeTaxonomyKind, slug: string) {
  return recipe.taxonomies.find((ref) => ref.kind === kind && ref.slug === slug);
}

function isTermHidden(recipe: Recipe, kind: RecipeTaxonomyKind, slug: string): boolean {
  return getTermRef(recipe, kind, slug)?.hidden === true;
}

function RecipeStatusBadge({ recipe }: { recipe: Recipe }) {
  const status = resolveRecipeStatus(recipe);
  return (
    <span className={`badge ${getRecipeStatusBadgeClass(status)}`}>
      {RECIPE_STATUS_LABELS[status]}
    </span>
  );
}

export function RecipeTaxonomiesAdmin({ recipes: initialRecipes }: RecipeTaxonomiesAdminProps) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [groupId, setGroupId] = useState(recipeTaxonomyGroups[0]?.id ?? "recipe-category");
  const [termSlug, setTermSlug] = useState(recipeTaxonomyGroups[0]?.terms[0]?.slug ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addQuery, setAddQuery] = useState("");
  const [addPage, setAddPage] = useState(0);
  const addRootRef = useRef<HTMLDivElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  useEffect(() => {
    if (!addOpen) return;
    addInputRef.current?.focus();
    const onPointerDown = (event: MouseEvent) => {
      if (!addRootRef.current?.contains(event.target as Node)) {
        setAddOpen(false);
        setAddQuery("");
        setAddPage(0);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAddOpen(false);
        setAddQuery("");
        setAddPage(0);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [addOpen]);

  const group =
    recipeTaxonomyGroups.find((item) => item.id === groupId) ?? recipeTaxonomyGroups[0];
  const selectedTerm = group?.terms.find((term) => term.slug === termSlug) ?? group?.terms[0];

  const termCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (!group) return counts;
    for (const term of group.terms) counts.set(term.slug, 0);
    for (const recipe of recipes) {
      for (const ref of recipe.taxonomies) {
        if (ref.kind !== group.kind) continue;
        counts.set(ref.slug, (counts.get(ref.slug) ?? 0) + 1);
      }
    }
    return counts;
  }, [group, recipes]);

  const termRecipes = useMemo(() => {
    if (!selectedTerm) return [];
    const list: Recipe[] = [];
    for (const recipe of recipes) {
      if (hasTerm(recipe, selectedTerm.kind, selectedTerm.slug)) list.push(recipe);
    }
    list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [recipes, selectedTerm]);

  const addChoices = useMemo(() => {
    if (!selectedTerm) return [];
    const list: { id: string; title: string; slug: string }[] = [];
    for (const recipe of recipes) {
      if (hasTerm(recipe, selectedTerm.kind, selectedTerm.slug)) continue;
      list.push({ id: recipe.id, title: recipe.title, slug: recipe.slug });
    }
    list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [recipes, selectedTerm]);

  const addMatches = useMemo(() => {
    const q = addQuery.trim().toLowerCase();
    if (!q) return addChoices;
    return addChoices.filter(
      (item) => item.title.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q),
    );
  }, [addChoices, addQuery]);

  const addPageCount = Math.max(1, Math.ceil(addMatches.length / ADD_PAGE_SIZE));
  const safeAddPage = Math.min(addPage, addPageCount - 1);
  const pagedAddMatches = useMemo(() => {
    const start = safeAddPage * ADD_PAGE_SIZE;
    return addMatches.slice(start, start + ADD_PAGE_SIZE);
  }, [addMatches, safeAddPage]);
  const showAddPagination = addMatches.length > ADD_PAGE_SIZE;

  useEffect(() => {
    setAddPage(0);
  }, [addQuery, selectedTerm?.slug, selectedTerm?.kind]);

  const selectGroup = (nextId: string) => {
    const nextGroup =
      recipeTaxonomyGroups.find((item) => item.id === nextId) ?? recipeTaxonomyGroups[0];
    setGroupId(nextGroup.id);
    setTermSlug(nextGroup.terms[0]?.slug ?? "");
    setError(null);
    setAddOpen(false);
    setAddQuery("");
    setAddPage(0);
  };

  const persistTaxonomies = async (
    recipeId: string,
    nextTaxonomies: RecipeTaxonomyRef[],
    failureMessage: string,
  ) => {
    const previous = recipes;
    const optimistic = previous.map((recipe) =>
      recipe.id === recipeId ? { ...recipe, taxonomies: nextTaxonomies } : recipe,
    );
    setError(null);
    setBusyId(recipeId);
    setRecipes(optimistic);

    try {
      await updateRecipeApi(recipeId, { taxonomies: nextTaxonomies });
      const nextRecipes = await fetchRecipes();
      setRecipes(nextRecipes);
    } catch (err) {
      setRecipes(previous);
      setError(friendlyPersistError(err, failureMessage));
    } finally {
      setBusyId(null);
    }
  };

  const removeFromTerm = (recipe: Recipe) => {
    if (!selectedTerm || busyId) return;
    const nextTaxonomies = recipe.taxonomies.filter(
      (ref) => !(ref.kind === selectedTerm.kind && ref.slug === selectedTerm.slug),
    );
    void persistTaxonomies(recipe.id, nextTaxonomies, "Failed to remove recipe");
  };

  const setTermHidden = (recipe: Recipe, hidden: boolean) => {
    if (!selectedTerm || busyId) return;
    const nextTaxonomies = recipe.taxonomies.map((ref) => {
      if (ref.kind !== selectedTerm.kind || ref.slug !== selectedTerm.slug) return ref;
      return hidden
        ? { kind: ref.kind, slug: ref.slug, hidden: true as const }
        : { kind: ref.kind, slug: ref.slug };
    });
    void persistTaxonomies(recipe.id, nextTaxonomies, "Failed to update visibility");
  };

  const addToTerm = (recipeId: string) => {
    if (!selectedTerm || !recipeId || busyId) return;
    const recipe = recipes.find((item) => item.id === recipeId);
    if (!recipe || hasTerm(recipe, selectedTerm.kind, selectedTerm.slug)) return;

    const nextTaxonomies: RecipeTaxonomyRef[] = [
      ...recipe.taxonomies,
      { kind: selectedTerm.kind, slug: selectedTerm.slug },
    ];
    setAddOpen(false);
    setAddQuery("");
    void persistTaxonomies(recipe.id, nextTaxonomies, "Failed to add recipe");
  };

  const hiddenCount = selectedTerm
    ? termRecipes.filter((r) => isTermHidden(r, selectedTerm.kind, selectedTerm.slug)).length
    : 0;

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist" aria-label="Taxonomy groups">
        {recipeTaxonomyGroups.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={groupId === item.id}
            className={`${styles.tab}${groupId === item.id ? ` ${styles.tabActive}` : ""}`}
            onClick={() => selectGroup(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {error ? (
        <div className={styles.errorBanner}>
          <span className={styles.errorBannerText}>{error}</span>
          <button
            type="button"
            className={styles.errorBannerDismiss}
            aria-label="Dismiss error"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      ) : null}

      <div className={styles.layout}>
        <div className={styles.termList} role="listbox" aria-label={`${group.label} categories`}>
          {group.terms.map((term) => {
            const active = selectedTerm?.slug === term.slug;
            return (
              <button
                key={term.slug}
                type="button"
                role="option"
                aria-selected={active}
                className={`${styles.termButton}${active ? ` ${styles.termButtonActive}` : ""}`}
                onClick={() => {
                  setTermSlug(term.slug);
                  setError(null);
                  setAddOpen(false);
                  setAddQuery("");
                }}
              >
                <span>{term.label}</span>
                <span className={styles.termCount}>{termCounts.get(term.slug) ?? 0}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>
                {selectedTerm ? selectedTerm.label : "Select a category"}
              </h2>
              <p className={styles.panelHint}>
                {termRecipes.length} recipe{termRecipes.length === 1 ? "" : "s"}
                {hiddenCount > 0 ? ` · ${hiddenCount} hidden` : ""}
              </p>
            </div>

            {selectedTerm ? (
              <div className={styles.addPicker} ref={addRootRef}>
                <button
                  type="button"
                  className={styles.addPickerBtn}
                  disabled={addChoices.length === 0 || Boolean(busyId)}
                  aria-expanded={addOpen}
                  onClick={() => {
                    setAddOpen((open) => !open);
                    setAddQuery("");
                    setAddPage(0);
                  }}
                >
                  + Add recipe
                </button>
                {addOpen ? (
                  <div className={styles.addPopover}>
                    <input
                      ref={addInputRef}
                      type="search"
                      className={styles.addPopoverInput}
                      placeholder="Search recipes…"
                      value={addQuery}
                      onChange={(event) => setAddQuery(event.target.value)}
                      autoComplete="off"
                    />
                    <div className={styles.addPopoverList}>
                      {addMatches.length === 0 ? (
                        <p className={styles.addPopoverHint}>
                          {addQuery.trim() ? "No matches" : "No recipes left to add"}
                        </p>
                      ) : (
                        pagedAddMatches.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={styles.addPopoverItem}
                            disabled={Boolean(busyId)}
                            onClick={() => addToTerm(item.id)}
                          >
                            <span className={styles.addPopoverTitle}>{item.title}</span>
                            <span className={styles.addPopoverSlug}>{item.slug}</span>
                          </button>
                        ))
                      )}
                    </div>
                    {showAddPagination ? (
                      <div className={styles.addPopoverPager}>
                        <button
                          type="button"
                          className={styles.addPagerBtn}
                          disabled={safeAddPage <= 0}
                          onClick={() => setAddPage((page) => Math.max(0, page - 1))}
                        >
                          Prev
                        </button>
                        <span className={styles.addPagerMeta}>
                          {safeAddPage + 1} / {addPageCount}
                          <span className={styles.addPagerCount}>
                            · {addMatches.length} recipes
                          </span>
                        </span>
                        <button
                          type="button"
                          className={styles.addPagerBtn}
                          disabled={safeAddPage >= addPageCount - 1}
                          onClick={() =>
                            setAddPage((page) => Math.min(addPageCount - 1, page + 1))
                          }
                        >
                          Next
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className={styles.panelBody}>
            {!selectedTerm ? (
              <p className={styles.empty}>Select a category on the left.</p>
            ) : termRecipes.length === 0 ? (
              <p className={styles.empty}>No recipes here yet. Use + Add recipe.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: 56 }} aria-hidden />
                    <th>Title</th>
                    <th>Status</th>
                    <th>Published</th>
                    <th style={{ width: 180 }} />
                  </tr>
                </thead>
                <tbody>
                  {termRecipes.map((recipe) => {
                    const isDisabled = isRecipeDisabled(recipe);
                    const busy = busyId === recipe.id;
                    const hiddenInTerm = isTermHidden(
                      recipe,
                      selectedTerm.kind,
                      selectedTerm.slug,
                    );
                    return (
                      <tr
                        key={recipe.id}
                        className={`${isDisabled ? "tableRowDisabled" : ""}${hiddenInTerm ? ` ${styles.hiddenRow}` : ""}${busy ? ` ${styles.busyRow}` : ""}`}
                      >
                        <td>
                          <div className={editorStyles.thumbCell}>
                            {recipe.featured_image ? (
                              <img src={recipe.featured_image} alt="" loading="lazy" />
                            ) : null}
                          </div>
                        </td>
                        <td className="tableTitleCell">
                          <Link
                            href={`/admin/recipes/${recipe.id}/edit`}
                            className="tableTitleMain"
                            prefetch={false}
                          >
                            {recipe.title}
                          </Link>
                          <span className="tableTitlePath">/recipes/{recipe.slug}</span>
                          {hiddenInTerm ? (
                            <span className="tableRowDisabledNote">Hidden in this category</span>
                          ) : null}
                        </td>
                        <td>
                          <RecipeStatusBadge recipe={recipe} />
                        </td>
                        <td>
                          {recipe.published_at
                            ? formatAdminListDate(recipe.published_at)
                            : "—"}
                        </td>
                        <td>
                          <div className={styles.rowActions}>
                            <button
                              type="button"
                              className={`btn btnSecondary ${styles.removeBtn}`}
                              disabled={Boolean(busyId)}
                              onClick={() => setTermHidden(recipe, !hiddenInTerm)}
                            >
                              {hiddenInTerm ? "Show" : "Hide"}
                            </button>
                            <button
                              type="button"
                              className={`btn btnSecondary ${styles.removeBtn}`}
                              disabled={Boolean(busyId)}
                              onClick={() => removeFromTerm(recipe)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
