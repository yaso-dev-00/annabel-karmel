"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/Admin/Ui/AdminListToolbar/admin-list-toolbar";
import {
  RECIPE_STATUS_LABELS,
  RECIPE_STATUSES,
  getRecipeStatusBadgeClass,
  isRecipeDisabled,
  resolveRecipeStatus,
} from "@/lib/admin/recipe-status";
import {
  formatAdminListDate,
  matchesAdminListSearch,
} from "@/lib/admin/format-admin-list";
import { fetchRecipes } from "@/lib/admin/recipes-client";
import { useAdminListRefresh } from "@/lib/admin/use-admin-list-refresh";
import { getTaxonomy } from "@/data/recipe-taxonomies";
import type { Recipe } from "@/lib/recipes/types";
import styles from "@/components/Admin/RecipeEditor/recipe-editor.module.css";

type RecipeListProps = {
  recipes: Recipe[];
};

function primaryCategoryLabel(recipe: Recipe): string {
  const age = recipe.taxonomies.find((ref) => ref.kind === "recipe-category");
  if (age) {
    return getTaxonomy(age.kind, age.slug)?.label ?? age.slug;
  }
  const meal = recipe.taxonomies.find((ref) => ref.kind === "meal-time");
  if (meal) {
    return getTaxonomy(meal.kind, meal.slug)?.label ?? meal.slug;
  }
  const allergen = recipe.taxonomies.find((ref) => ref.kind === "allergen");
  if (allergen) {
    return getTaxonomy(allergen.kind, allergen.slug)?.label ?? allergen.slug;
  }
  return "—";
}

function RecipeStatusBadge({ recipe }: { recipe: Recipe }) {
  const status = resolveRecipeStatus(recipe);
  return (
    <span className={`badge ${getRecipeStatusBadgeClass(status)}`}>
      {RECIPE_STATUS_LABELS[status]}
    </span>
  );
}

function ClickableTableRow({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <tr
      className={`tableRowClickable${className ? ` ${className}` : ""}`}
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

export function RecipeList({ recipes: initialRecipes }: RecipeListProps) {
  const recipes = useAdminListRefresh(initialRecipes, fetchRecipes, "/admin/recipes");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "All statuses" },
      ...RECIPE_STATUSES.map((status) => ({
        value: status,
        label: RECIPE_STATUS_LABELS[status],
      })),
    ],
    [],
  );

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const status = resolveRecipeStatus(recipe);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch = matchesAdminListSearch(searchQuery, recipe.title, recipe.slug);
      return matchesStatus && matchesSearch;
    });
  }, [recipes, searchQuery, statusFilter]);

  return (
    <div className="card adminListCard">
      <AdminListToolbar
        searchPlaceholder="Search recipes…"
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        statusOptions={statusOptions}
      />
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 56 }} aria-hidden />
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecipes.length === 0 ? (
            <tr>
              <td colSpan={5} className="tableEmpty">
                No recipes match your search.
              </td>
            </tr>
          ) : (
            filteredRecipes.map((recipe) => {
              const isDisabled = isRecipeDisabled(recipe);

              return (
                <ClickableTableRow
                  key={recipe.id}
                  href={`/admin/recipes/${recipe.id}/edit`}
                  className={isDisabled ? "tableRowDisabled" : undefined}
                >
                  <td>
                    <div className={styles.thumbCell}>
                      {recipe.featured_image ? (
                        <img src={recipe.featured_image} alt="" />
                      ) : null}
                    </div>
                  </td>
                  <td className="tableTitleCell">
                    <span className="tableTitleMain">{recipe.title}</span>
                    <span className="tableTitlePath">/recipes/{recipe.slug}</span>
                    {isDisabled ? (
                      <span className="tableRowDisabledNote">Hidden from site</span>
                    ) : null}
                  </td>
                  <td>
                    <RecipeStatusBadge recipe={recipe} />
                  </td>
                  <td>{primaryCategoryLabel(recipe)}</td>
                  <td>{formatAdminListDate(recipe.updated_at)}</td>
                </ClickableTableRow>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
