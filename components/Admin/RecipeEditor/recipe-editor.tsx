"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import type { PreviewViewportHandle } from "@/components/Admin/BlockEditor/preview-viewport";
import { ArticleStatusField } from "@/components/Admin/Ui/ArticleStatusField";
import { ImageField } from "@/components/Admin/Ui/ImageField";
import { RecipeCookingInfoFields } from "@/components/Admin/RecipeEditor/recipe-cooking-info-fields";
import { RecipeIngredientsEditor } from "@/components/Admin/RecipeEditor/recipe-ingredients-editor";
import { RecipeLivePreview } from "@/components/Admin/RecipeEditor/recipe-live-preview";
import { RecipeMethodEditor } from "@/components/Admin/RecipeEditor/recipe-method-editor";
import { RecipeTaxonomiesEditor } from "@/components/Admin/RecipeEditor/recipe-taxonomies-editor";
import { createRecipeApi, updateRecipeApi } from "@/lib/admin/recipes-client";
import {
  applyRecipeStatus,
  buildRecipeSavePayload,
  getRecipeStatusPatch,
  isRecipeDisabled,
  isRecipePreviewable,
  resolveRecipeStatus,
} from "@/lib/admin/recipe-status";
import { validateRecipeForPublish } from "@/lib/recipes/sanitize-recipe";
import {
  type Recipe,
  type RecipeStatus,
} from "@/lib/recipes/types";
import blockStyles from "@/components/Admin/BlockEditor/block-editor.module.css";
import styles from "./recipe-editor.module.css";

type RecipeEditorProps = {
  initialRecipe: Recipe;
  isNew?: boolean;
};

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function RecipeEditor({ initialRecipe, isNew }: RecipeEditorProps) {
  const router = useRouter();
  const previewRef = useRef<PreviewViewportHandle>(null);
  const [recipe, setRecipe] = useState(initialRecipe);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(isNew && !initialRecipe.slug);
  const [editingSlug, setEditingSlug] = useState(false);

  const update = useCallback(<K extends keyof Recipe>(key: K, value: Recipe[K]) => {
    setRecipe((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }, []);

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      if (publish) {
        const error = validateRecipeForPublish(recipe);
        if (error) {
          setMessage(error);
          setSaving(false);
          return;
        }
      }

      const payload = buildRecipeSavePayload(recipe, { publish });
      if (isNew || !recipe.id) {
        const created = await createRecipeApi(payload);
        setRecipe(created);
        setDirty(false);
        setMessage(publish ? "Published!" : "Saved.");
        router.replace(`/admin/recipes/${created.id}/edit`);
        router.refresh();
      } else {
        const updated = await updateRecipeApi(recipe.id, payload);
        setRecipe(updated);
        setDirty(false);
        setMessage(publish ? "Published!" : "Saved.");
        router.refresh();
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Save failed. Please try again.";
      setMessage(detail);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (status: RecipeStatus, scheduledAt?: string | null) => {
    const next = applyRecipeStatus(recipe, status, scheduledAt);
    setRecipe(next);

    if (!isNew && recipe.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updateRecipeApi(recipe.id, getRecipeStatusPatch(next));
        setRecipe(updated);
        setDirty(false);
        setMessage(
          status === "disabled"
            ? "Recipe disabled."
            : status === "published"
              ? "Recipe published."
              : "Status saved.",
        );
        router.refresh();
      } catch (error) {
        setDirty(true);
        const detail = error instanceof Error ? error.message : "Failed to save status. Try Save draft.";
        setMessage(detail);
      } finally {
        setSaving(false);
      }
      return;
    }

    setDirty(true);
  };

  const saveDraft = () => save(false);
  const publish = () => save(true);
  const recipeStatus = resolveRecipeStatus(recipe);
  const previewable = isRecipePreviewable(recipe);

  const seoTitleLen = recipe.seo_title.length;
  const seoDescLen = recipe.seo_description.length;

  const titleField = useMemo(
    () => (
      <div className="card">
        <div className="field">
          <label className="fieldLabel" htmlFor="recipe-title">
            Recipe title
          </label>
          <input
            id="recipe-title"
            className="fieldInput"
            value={recipe.title}
            onChange={(e) => {
              const title = e.target.value;
              setRecipe((prev) => ({
                ...prev,
                title,
                slug: autoSlug ? slugifyTitle(title) : prev.slug,
              }));
              setDirty(true);
            }}
          />
        </div>
        <div className={styles.slugField}>
          <div className={styles.slugFieldHeader}>
            <label className={styles.slugFieldLabel} htmlFor={editingSlug ? "recipe-slug" : undefined}>
              Page URL
            </label>
            {autoSlug ? <span className={styles.slugAutoHint}>Synced from title</span> : null}
          </div>

          {editingSlug ? (
            <div className={`${styles.slugBar} ${styles.slugBarEditing}`}>
              <span className={styles.slugPrefix}>/recipes/</span>
              <input
                id="recipe-slug"
                className={styles.slugEditInput}
                value={recipe.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  update("slug", e.target.value);
                }}
                onBlur={() => setEditingSlug(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") {
                    e.preventDefault();
                    setEditingSlug(false);
                  }
                }}
                autoFocus
                spellCheck={false}
              />
              <button
                type="button"
                className={styles.slugDoneBtn}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setEditingSlug(false)}
              >
                Done
              </button>
            </div>
          ) : (
            <div className={styles.slugBar}>
              <span className={styles.slugPrefix}>/recipes/</span>
              <span className={styles.slugValue}>{recipe.slug || "your-recipe-slug"}</span>
              <button
                type="button"
                className={styles.slugEditBtn}
                onClick={() => setEditingSlug(true)}
              >
                <span className={styles.slugEditIcon} aria-hidden>
                  ✎
                </span>
                Change slug
              </button>
            </div>
          )}
        </div>
      </div>
    ),
    [autoSlug, editingSlug, recipe.slug, recipe.title, update],
  );

  return (
    <div className="editorSections">
      <div className="editorPageHeader">
        <div>
          <h1 className="cardTitle">{recipe.title || "Untitled"}</h1>
          <p className={`statusBar ${dirty && !message ? "statusDirty" : ""}`}>
            {message ? message : dirty ? "Unsaved changes" : "All changes saved"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {previewable ? (
            <button
              type="button"
              className="btn btnGhost"
              onClick={() => previewRef.current?.openFullscreen()}
            >
              Preview
            </button>
          ) : (
            <button
              type="button"
              className="btn btnGhost"
              disabled
              title="Preview is unavailable while this recipe is disabled"
            >
              Preview
            </button>
          )}
          <button type="button" className="btn btnSecondary" onClick={saveDraft} disabled={saving}>
            Save draft
          </button>
          <button
            type="button"
            className="btn btnPrimary"
            onClick={publish}
            disabled={saving || isRecipeDisabled(recipe)}
          >
            Publish
          </button>
        </div>
      </div>

      <div className={blockStyles.editorWorkspace}>
        <div className={blockStyles.editorWorkspaceMain}>
          {titleField}

          <div className="card">
            <h2 className="cardSectionTitle">Status &amp; visibility</h2>
            <ArticleStatusField
              value={recipeStatus}
              scheduledAt={recipe.scheduled_at}
              onChange={handleStatusChange}
            />
          </div>

          <div className="card">
            <h2 className="cardSectionTitle">Featured image</h2>
            <ImageField
              value={recipe.featured_image}
              alt={recipe.featured_image_alt}
              onChange={(src, altVal) => {
                setRecipe((prev) => ({
                  ...prev,
                  featured_image: src,
                  featured_image_alt: altVal ?? prev.featured_image_alt,
                }));
                setDirty(true);
              }}
              onAltChange={(altVal) => update("featured_image_alt", altVal)}
            />
            {recipe.featured_image ? (
              <button
                type="button"
                className="btn btnGhost"
                style={{ marginTop: 10 }}
                onClick={() => {
                  setRecipe((prev) => ({
                    ...prev,
                    featured_image: "",
                    featured_image_alt: "",
                  }));
                  setDirty(true);
                }}
              >
                Remove
              </button>
            ) : null}
          </div>

          <div className="card">
            <h2 className="cardSectionTitle">Description</h2>
            <div className="field">
              <textarea
                className="fieldTextarea"
                rows={4}
                value={recipe.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Intro copy shown under the title on the recipe page"
              />
            </div>
          </div>

          <div className="card">
            <h2 className="cardSectionTitle">Cooking info</h2>
            <RecipeCookingInfoFields
              prepTime={recipe.prep_time}
              cookTime={recipe.cook_time}
              servings={recipe.servings}
              difficulty={recipe.difficulty}
              suitableForFreezing={recipe.suitable_for_freezing}
              appExclusive={recipe.app_exclusive}
              onChange={update}
            />
          </div>

          <RecipeIngredientsEditor
            ingredients={recipe.ingredients}
            onChange={(ingredients) => update("ingredients", ingredients)}
          />

          <RecipeMethodEditor
            steps={recipe.method}
            onChange={(method) => update("method", method)}
          />

          <RecipeTaxonomiesEditor
            taxonomies={recipe.taxonomies}
            onChange={(taxonomies) => update("taxonomies", taxonomies)}
          />

          <div className="card">
            <div className={styles.sectionHeaderCol}>
              <h2 className="cardSectionTitle">SEO</h2>
              <p className={styles.sectionHint}>How this recipe appears in search results</p>
            </div>
            <div className="cardForm">
              <div className="field">
                <div className={styles.sectionHeader}>
                  <label className="fieldLabel" htmlFor="seo-title">
                    SEO title
                  </label>
                  <span
                    className={`${styles.charCount} ${seoTitleLen > 60 ? styles.charCountWarn : ""}`}
                  >
                    {seoTitleLen}/60
                  </span>
                </div>
                <input
                  id="seo-title"
                  className="fieldInput"
                  value={recipe.seo_title}
                  onChange={(e) => update("seo_title", e.target.value)}
                />
              </div>
              <div className="field">
                <div className={styles.sectionHeader}>
                  <label className="fieldLabel" htmlFor="seo-desc">
                    Meta description
                  </label>
                  <span
                    className={`${styles.charCount} ${seoDescLen > 160 ? styles.charCountWarn : ""}`}
                  >
                    {seoDescLen}/160
                  </span>
                </div>
                <textarea
                  id="seo-desc"
                  className="fieldTextarea"
                  rows={3}
                  value={recipe.seo_description}
                  onChange={(e) => update("seo_description", e.target.value)}
                />
              </div>
              <div className="field">
                <label className="fieldLabel" htmlFor="focus-keyphrase">
                  Focus keyphrase
                </label>
                <input
                  id="focus-keyphrase"
                  className="fieldInput"
                  value={recipe.focus_keyphrase ?? ""}
                  onChange={(e) => update("focus_keyphrase", e.target.value)}
                  placeholder="e.g. sweet potato puree"
                />
              </div>
              <label className={styles.seoToggle}>
                <input
                  type="checkbox"
                  checked={Boolean(recipe.noindex)}
                  onChange={(e) => update("noindex", e.target.checked)}
                />
                <span className={styles.seoToggleCopy}>
                  <span className={styles.seoToggleTitle}>Hide from search engines</span>
                  <span className={styles.seoToggleHint}>
                    Adds <code>noindex</code> so Google won&apos;t list this recipe
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <aside className={blockStyles.editorPreviewColumn} aria-label="Live preview">
          <RecipeLivePreview
            ref={previewRef}
            recipe={recipe}
            className={blockStyles.previewPanelDocked}
            fullscreenActions={
              <>
                <button
                  type="button"
                  className="btn btnSecondary"
                  onClick={saveDraft}
                  disabled={saving}
                >
                  Save draft
                </button>
                <button
                  type="button"
                  className="btn btnPrimary"
                  onClick={publish}
                  disabled={saving || isRecipeDisabled(recipe)}
                >
                  Publish
                </button>
              </>
            }
          />
        </aside>
      </div>
    </div>
  );
}
