"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  resolveRecipeStatus,
  recipeStatusDateMeta,
  isRecipePreviewable,
} from "@/lib/admin/recipe-status";
import { matchesAdminListSearch } from "@/lib/admin/format-admin-list";
import { fetchRecipes } from "@/lib/admin/recipes-client";
import { useAdminListRefresh } from "@/lib/admin/use-admin-list-refresh";
import { getRecipeAuthorById } from "@/data/recipe-authors";
import {
  getTaxonomy,
  type RecipeTaxonomyGroup,
  type RecipeTaxonomyKind,
} from "@/data/recipe-taxonomies";
import {
  RECIPE_VISIBILITIES,
  type Recipe,
  type RecipeStatus,
  type RecipeVisibility,
} from "@/lib/recipes/types";
import styles from "./recipe-list.module.css";

const PAGE_SIZE = 20;

type RecipeListProps = {
  recipes: Recipe[];
  categoryGroups?: RecipeTaxonomyGroup[];
};

type StatusSubview = "all" | RecipeStatus;
type SortColumn = "author" | "date" | "categories" | "visibility";
type SortDirection = "asc" | "desc";

function formatRecipeListDate(recipe: Recipe): string {
  const status = resolveRecipeStatus(recipe);
  const meta = recipeStatusDateMeta(recipe);
  if (!meta.iso) return "—";
  const d = new Date(meta.iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const prefix =
    status === "published"
      ? "Published"
      : status === "scheduled"
        ? "Scheduled"
        : status === "disabled"
          ? "Disabled"
          : "Draft";
  return `${prefix} ${y}/${m}/${day} at ${h}:${min}`;
}

function recipeVisibility(recipe: Recipe): RecipeVisibility {
  return recipe.visibility ?? "both";
}

function visibilityLabel(value: RecipeVisibility): string {
  return RECIPE_VISIBILITIES.find((option) => option.value === value)?.label ?? value;
}

function primaryRefForKind(
  taxonomies: Recipe["taxonomies"],
  kind: RecipeTaxonomyKind,
) {
  const refs = taxonomies.filter((ref) => ref.kind === kind);
  if (refs.length === 0) return null;
  return refs.find((ref) => ref.primary) ?? refs[0];
}

function primaryCategoryLabels(
  recipe: Recipe,
  categoryGroups: RecipeTaxonomyGroup[],
): string {
  const labels: string[] = [];
  const seenKinds = new Set<RecipeTaxonomyKind>();

  for (const group of categoryGroups) {
    if (seenKinds.has(group.kind)) continue;
    seenKinds.add(group.kind);

    const primary = primaryRefForKind(recipe.taxonomies, group.kind);
    if (!primary) continue;

    const taxonomy = getTaxonomy(primary.kind, primary.slug);
    if (taxonomy) labels.push(taxonomy.label);
  }

  return labels.length > 0 ? labels.join(", ") : "—";
}

function authorSortKey(recipe: Recipe): string {
  return getRecipeAuthorById(recipe.author_id)?.name?.toLowerCase() ?? "";
}

function dateSortKey(recipe: Recipe): number {
  const meta = recipeStatusDateMeta(recipe);
  if (!meta.iso) return 0;
  const time = new Date(meta.iso).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function categoriesSortKey(recipe: Recipe, categoryGroups: RecipeTaxonomyGroup[]): string {
  return primaryCategoryLabels(recipe, categoryGroups).toLowerCase();
}

function visibilitySortKey(recipe: Recipe): number {
  const order: Record<RecipeVisibility, number> = {
    mobile: 0,
    desktop: 1,
    both: 2,
  };
  return order[recipeVisibility(recipe)];
}

function compareRecipes(
  a: Recipe,
  b: Recipe,
  column: SortColumn,
  direction: SortDirection,
  categoryGroups: RecipeTaxonomyGroup[],
): number {
  let cmp = 0;
  switch (column) {
    case "author":
      cmp = authorSortKey(a).localeCompare(authorSortKey(b));
      break;
    case "date":
      cmp = dateSortKey(a) - dateSortKey(b);
      break;
    case "categories":
      cmp = categoriesSortKey(a, categoryGroups).localeCompare(
        categoriesSortKey(b, categoryGroups),
      );
      break;
    case "visibility":
      cmp = visibilitySortKey(a) - visibilitySortKey(b);
      break;
  }
  return direction === "asc" ? cmp : -cmp;
}

function SortHeader({
  label,
  column,
  activeColumn,
  direction,
  onSort,
}: {
  label: string;
  column: SortColumn;
  activeColumn: SortColumn | null;
  direction: SortDirection;
  onSort: (column: SortColumn) => void;
}) {
  const active = activeColumn === column;
  const arrow = active ? (direction === "asc" ? "↑" : "↓") : "↕";

  return (
    <button
      type="button"
      className={`${styles.sortBtn}${active ? ` ${styles.sortBtnActive}` : ""}`}
      onClick={() => onSort(column)}
      aria-sort={active ? (direction === "asc" ? "ascending" : "descending") : "none"}
    >
      <span>{label}</span>
      <span className={styles.sortArrow} aria-hidden="true">
        {arrow}
      </span>
    </button>
  );
}

function recipePreviewHref(recipe: Recipe): string | null {
  if (!recipe.id || !isRecipePreviewable(recipe)) return null;
  return `/admin/recipes/${recipe.id}/preview`;
}

function monthKey(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function ClickableTableRow({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <tr
      className="tableRowClickable"
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
      role="link"
      tabIndex={0}
    >
      {children}
    </tr>
  );
}

export function RecipeList({ recipes: initialRecipes, categoryGroups = [] }: RecipeListProps) {
  const { items: recipes } = useAdminListRefresh(initialRecipes, fetchRecipes, "/admin/recipes");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [statusSubview, setStatusSubview] = useState<StatusSubview>("all");
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [dateFilter, setDateFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const [allergenFilter, setAllergenFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [gatedFilter, setGatedFilter] = useState("all");
  const [seoFilter, setSeoFilter] = useState("all");
  const [readabilityFilter, setReadabilityFilter] = useState("all");

  const toggleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortColumn(column);
    setSortDirection("asc");
  };

  const ageGroup = categoryGroups.find((group) => group.kind === "recipe-category");
  const allergenGroup = categoryGroups.find((group) => group.kind === "allergen");

  const statusCounts = useMemo(() => {
    const counts: Record<StatusSubview, number> = {
      all: recipes.length,
      draft: 0,
      published: 0,
      scheduled: 0,
      disabled: 0,
    };
    for (const recipe of recipes) {
      const status = resolveRecipeStatus(recipe);
      counts[status] += 1;
    }
    return counts;
  }, [recipes]);

  const monthOptions = useMemo(() => {
    const keys = new Set<string>();
    for (const recipe of recipes) {
      const key =
        monthKey(recipe.published_at) ||
        monthKey(recipe.scheduled_at) ||
        monthKey(recipe.updated_at);
      if (key) keys.add(key);
    }
    return Array.from(keys).sort().reverse();
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    let list = recipes.filter((recipe) => {
      const status = resolveRecipeStatus(recipe);
      const matchesStatus = statusSubview === "all" || status === statusSubview;
      const matchesSearch = matchesAdminListSearch(
        appliedSearch,
        recipe.title,
        recipe.slug,
        getRecipeAuthorById(recipe.author_id)?.name ?? "",
      );
      if (!matchesStatus || !matchesSearch) return false;

      if (dateFilter !== "all") {
        const key =
          monthKey(recipe.published_at) ||
          monthKey(recipe.scheduled_at) ||
          monthKey(recipe.updated_at);
        if (key !== dateFilter) return false;
      }

      if (ageFilter !== "all") {
        const hasAge = recipe.taxonomies.some(
          (ref) => ref.kind === "recipe-category" && ref.slug === ageFilter,
        );
        if (!hasAge) return false;
      }

      if (allergenFilter !== "all") {
        const hasAllergen = recipe.taxonomies.some(
          (ref) => ref.kind === "allergen" && ref.slug === allergenFilter,
        );
        if (!hasAllergen) return false;
      }

      const visibility = recipeVisibility(recipe);
      if (visibilityFilter !== "all" && visibility !== visibilityFilter) return false;

      if (gatedFilter === "gated" && !recipe.app_exclusive) return false;
      if (gatedFilter === "public" && recipe.app_exclusive) return false;

      return true;
    });

    if (sortColumn) {
      list = [...list].sort((a, b) =>
        compareRecipes(a, b, sortColumn, sortDirection, categoryGroups),
      );
    }

    return list;
  }, [
    recipes,
    statusSubview,
    appliedSearch,
    dateFilter,
    ageFilter,
    allergenFilter,
    visibilityFilter,
    gatedFilter,
    sortColumn,
    sortDirection,
    categoryGroups,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRecipes = filteredRecipes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const applySearch = () => {
    setAppliedSearch(searchQuery.trim());
    setPage(1);
  };

  const hasActiveFilters =
    dateFilter !== "all" ||
    ageFilter !== "all" ||
    allergenFilter !== "all" ||
    visibilityFilter !== "all" ||
    gatedFilter !== "all" ||
    seoFilter !== "all" ||
    readabilityFilter !== "all";

  const clearFilters = () => {
    setDateFilter("all");
    setAgeFilter("all");
    setAllergenFilter("all");
    setVisibilityFilter("all");
    setGatedFilter("all");
    setSeoFilter("all");
    setReadabilityFilter("all");
    setPage(1);
  };

  const applyFilters = () => {
    setPage(1);
  };

  const subviewItems: { key: StatusSubview; label: string; count: number }[] = [
    { key: "all", label: "All", count: statusCounts.all },
    { key: "published", label: "Published", count: statusCounts.published },
    { key: "scheduled", label: "Scheduled", count: statusCounts.scheduled },
    { key: "draft", label: "Drafts", count: statusCounts.draft },
  ];

  return (
    <div className={`card ${styles.recipeListCard}`}>
      <div className={styles.subviewBar}>
        {subviewItems.map((item, index) => (
          <span key={item.key}>
            {index > 0 ? <span className={styles.subviewSep}>|</span> : null}
            <button
              type="button"
              className={`${styles.subviewLink}${statusSubview === item.key ? ` ${styles.subviewLinkActive}` : ""}`}
              onClick={() => {
                setStatusSubview(item.key);
                setPage(1);
              }}
            >
              {item.label} ({item.count})
            </button>
          </span>
        ))}
        <span className={styles.subviewSep}>|</span>
        <span className={styles.subviewStatic}>Cornerstone content (0)</span>
        <span className={styles.subviewSep}>|</span>
        <span className={styles.subviewStatic}>Orphaned content (1260)</span>
        <span className={styles.subviewSep}>|</span>
        <span className={styles.subviewStatic}>Stale cornerstone content (0)</span>
      </div>

      <div className={styles.filtersRow}>
        <select
          className={styles.filterSelect}
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
          aria-label="All dates"
        >
          <option value="all">All dates</option>
          {monthOptions.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={ageFilter}
          onChange={(event) => setAgeFilter(event.target.value)}
          aria-label="All By Age"
        >
          <option value="all">All By Age</option>
          {(ageGroup?.terms ?? []).map((term) => (
            <option key={term.slug} value={term.slug}>
              {term.label}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={allergenFilter}
          onChange={(event) => setAllergenFilter(event.target.value)}
          aria-label="All Allergens and Dietary Requirements"
        >
          <option value="all">All Allergens &amp; Dietary Req</option>
          {(allergenGroup?.terms ?? []).map((term) => (
            <option key={term.slug} value={term.slug}>
              {term.label}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={visibilityFilter}
          onChange={(event) => setVisibilityFilter(event.target.value)}
          aria-label="Filter by visibility"
        >
          <option value="all">Filter By Visibility</option>
          {RECIPE_VISIBILITIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={gatedFilter}
          onChange={(event) => setGatedFilter(event.target.value)}
          aria-label="Filter by gated"
        >
          <option value="all">Filter By Gated</option>
          <option value="public">Public</option>
          <option value="gated">App featured</option>
        </select>

        <select
          className={styles.filterSelect}
          value={seoFilter}
          onChange={(event) => setSeoFilter(event.target.value)}
          aria-label="All SEO Scores"
        >
          <option value="all">All SEO Scores</option>
        </select>

        <select
          className={styles.filterSelect}
          value={readabilityFilter}
          onChange={(event) => setReadabilityFilter(event.target.value)}
          aria-label="All Readability Scores"
        >
          <option value="all">All Readability Scores</option>
        </select>

        <button
          type="button"
          className={styles.filterBtn}
          onClick={hasActiveFilters ? clearFilters : applyFilters}
        >
          {hasActiveFilters ? "Clear filters" : "Filter"}
        </button>

        <form
          className={styles.searchForm}
          onSubmit={(event) => {
            event.preventDefault();
            applySearch();
          }}
        >
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search recipes"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search recipes"
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      </div>

      <div className={styles.listMetaBar}>
        <span className={styles.itemCount}>{filteredRecipes.length} items</span>
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage <= 1}
            onClick={() => setPage(1)}
            aria-label="First page"
          >
            «
          </button>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            ‹
          </button>
          <span className={styles.pageIndicator}>
            <input
              className={styles.pageInput}
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(event) => {
                const next = Number(event.target.value);
                if (!Number.isNaN(next)) {
                  setPage(Math.min(totalPages, Math.max(1, next)));
                }
              }}
              aria-label="Current page"
            />
            of {totalPages}
          </span>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Next page"
          >
            ›
          </button>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage >= totalPages}
            onClick={() => setPage(totalPages)}
            aria-label="Last page"
          >
            »
          </button>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>
                <SortHeader
                  label="Author"
                  column="author"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={toggleSort}
                />
              </th>
              <th>
                <SortHeader
                  label="Date"
                  column="date"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={toggleSort}
                />
              </th>
              <th>
                <SortHeader
                  label="Recipe Categories"
                  column="categories"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={toggleSort}
                />
              </th>
              <th>
                <SortHeader
                  label="Visibility"
                  column="visibility"
                  activeColumn={sortColumn}
                  direction={sortDirection}
                  onSort={toggleSort}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRecipes.length === 0 ? (
              <tr>
                <td colSpan={5} className="tableEmpty">
                  No recipes match your filters.
                </td>
              </tr>
            ) : (
              pageRecipes.map((recipe) => {
                const author = getRecipeAuthorById(recipe.author_id);
                const status = resolveRecipeStatus(recipe);
                const statusSuffix =
                  status === "scheduled"
                    ? " — Scheduled"
                    : status === "draft"
                      ? " — Draft"
                      : status === "disabled"
                        ? " — Disabled"
                        : "";

                const previewHref = recipePreviewHref(recipe);
                const showPreview = status === "draft" && previewHref;

                return (
                  <ClickableTableRow key={recipe.id} href={`/admin/recipes/${recipe.id}/edit`}>
                    <td className="tableTitleCell">
                      <span className={styles.titleCellMain}>
                        {recipe.title}
                        {statusSuffix}
                      </span>
                      {showPreview ? (
                        <span className={styles.titleRowActions}>
                          <Link
                            href={previewHref}
                            className={styles.rowActionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Preview
                          </Link>
                        </span>
                      ) : null}
                    </td>
                    <td>
                      {author ? (
                        <span className={styles.linkCell}>{author.name}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className={styles.dateCell}>{formatRecipeListDate(recipe)}</td>
                    <td className={styles.categoriesCell}>
                      {primaryCategoryLabels(recipe, categoryGroups)}
                    </td>
                    <td className={styles.visibilityCell}>
                      {visibilityLabel(recipeVisibility(recipe))}
                    </td>
                  </ClickableTableRow>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
