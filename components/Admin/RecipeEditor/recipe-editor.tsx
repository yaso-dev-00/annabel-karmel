"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ArticleStatusField } from "@/components/Admin/Ui/ArticleStatusField";
import { ImageField } from "@/components/Admin/Ui/ImageField";
import { RecipeAdditionalInfoFields } from "@/components/Admin/RecipeEditor/recipe-additional-info-fields";
import { RecipeAllergenIconsFields } from "@/components/Admin/RecipeEditor/recipe-allergen-icons-fields";
import { RecipeCategoriesEditor } from "@/components/Admin/RecipeEditor/recipe-categories-editor";
import { RecipeCollapsibleSection } from "@/components/Admin/RecipeEditor/recipe-collapsible-section";
import { RecipeGalleryField } from "@/components/Admin/RecipeEditor/recipe-gallery-field";
import {
  cloneIngredientSections,
  countIngredientLines,
  emptyIngredientSections,
  RecipeIngredientsEditor,
} from "@/components/Admin/RecipeEditor/recipe-ingredients-editor";
import {
  RecipeLocaleTabs,
  type RecipeLocale,
} from "@/components/Admin/RecipeEditor/recipe-locale-tabs";
import { RecipeMethodEditor, cloneSteps, countMethodSteps } from "@/components/Admin/RecipeEditor/recipe-method-editor";
import {
  RecipeRelationPicker,
  type RelationCatalogItem,
} from "@/components/Admin/RecipeEditor/recipe-relation-picker";
import { RecipeRichTextField } from "@/components/Admin/RecipeEditor/recipe-rich-text-field";
import { RecipeSchemaFields } from "@/components/Admin/RecipeEditor/recipe-schema-fields";
import { RecipeSponsorFields } from "@/components/Admin/RecipeEditor/recipe-sponsor-fields";
import { RecipeVideoField } from "@/components/Admin/RecipeEditor/recipe-video-field";
import {
  getRecipeAuthorById,
  RECIPE_AUTHORS,
} from "@/data/recipe-authors";
import type { RecipeTaxonomyGroup } from "@/data/recipe-taxonomies";
import type { AdviceArticleStatus } from "@/lib/content-blocks/types";
import { createRecipeApi, updateRecipeApi } from "@/lib/admin/recipes-client";
import {
  applyRecipeStatus,
  buildRecipeSavePayload,
  getRecipeStatusPatch,
  isRecipeDisabled,
  isRecipePreviewable,
  RECIPE_STATUS_HINTS,
  RECIPE_STATUS_LABELS,
  RECIPE_STATUSES,
  resolveRecipeStatus,
  recipeStatusDateMeta,
} from "@/lib/admin/recipe-status";
import { validateRecipeForPublish } from "@/lib/recipes/sanitize-recipe";
import {
  RECIPE_VISIBILITIES,
  type Recipe,
  type RecipeStatus,
  type RecipeVisibility,
} from "@/lib/recipes/types";
import styles from "./recipe-editor.module.css";

type RecipeEditorProps = {
  initialRecipe: Recipe;
  isNew?: boolean;
  recipeCatalog?: RelationCatalogItem[];
  cookbookCatalog?: RelationCatalogItem[];
  categoryGroups?: RecipeTaxonomyGroup[];
};

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function RecipeEditor({
  initialRecipe,
  isNew,
  recipeCatalog = [],
  cookbookCatalog = [],
  categoryGroups = [],
}: RecipeEditorProps) {
  const router = useRouter();
  const [recipe, setRecipe] = useState(initialRecipe);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(isNew && !initialRecipe.slug);
  const [editingSlug, setEditingSlug] = useState(false);
  const [ingredientsLocale, setIngredientsLocale] = useState<RecipeLocale>("uk");
  const [methodLocale, setMethodLocale] = useState<RecipeLocale>("uk");
  const [infoLocale, setInfoLocale] = useState<RecipeLocale>("uk");
  const [editingVisibility, setEditingVisibility] = useState(false);

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

  const handleStatusChange = async (
    status: AdviceArticleStatus,
    scheduledAt?: string | null,
  ) => {
    const recipeStatusNext: RecipeStatus =
      status === "private" ? "draft" : (status as RecipeStatus);
    const next = applyRecipeStatus(recipe, recipeStatusNext, scheduledAt);
    setRecipe(next);

    if (!isNew && recipe.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updateRecipeApi(recipe.id, getRecipeStatusPatch(next));
        setRecipe(updated);
        setDirty(false);
        setMessage(
          recipeStatusNext === "disabled"
            ? "Recipe disabled."
            : recipeStatusNext === "published"
              ? "Recipe published."
              : "Status saved.",
        );
        router.refresh();
      } catch (error) {
        setDirty(true);
        const detail =
          error instanceof Error ? error.message : "Failed to save status. Try Save draft.";
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
  const dateMeta = recipeStatusDateMeta(recipe);
  const visibility = recipe.visibility ?? "both";
  const visibilityLabel =
    RECIPE_VISIBILITIES.find((item) => item.value === visibility)?.label ?? "Both";

  const formatStatusDateTime = (iso: string | null) => {
    if (!iso) return "—";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const seoTitleLen = recipe.seo_title.length;
  const seoDescLen = recipe.seo_description.length;

  const ukIngredients = recipe.ingredients;
  const usIngredients = recipe.ingredients_us ?? [];
  const ukIngredientCount = countIngredientLines(ukIngredients);
  const usIngredientCount = countIngredientLines(usIngredients);
  const ukMethod = recipe.method;
  const usMethod = recipe.method_us ?? [];
  const ukMethodCount = countMethodSteps(ukMethod);
  const usMethodCount = countMethodSteps(usMethod);
  const selectedAuthor = getRecipeAuthorById(recipe.author_id);
  const authorInitials = selectedAuthor
    ? selectedAuthor.name
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const headerActions = (
    <div className={styles.headerActions}>
      {recipe.id && recipe.slug ? (
        previewable ? (
          <Link
            href={`/admin/recipes/${recipe.id}/preview`}
            className="btn btnGhost"
            target="_blank"
          >
            Preview
          </Link>
        ) : (
          <button
            type="button"
            className="btn btnGhost"
            disabled
            title="Preview is unavailable while this recipe is disabled"
          >
            Preview
          </button>
        )
      ) : null}
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
  );

  return (
    <div className="editorSections">
      <div className="editorPageHeader">
        <div>
          <h1 className="cardTitle">{recipe.title || "Untitled"}</h1>
          <p
            className={`statusBar ${dirty && !message ? "statusDirty" : ""}`}
            role="status"
            aria-live="polite"
          >
            {message ? message : dirty ? "Unsaved changes" : "All changes saved"}
          </p>
        </div>
        {headerActions}
      </div>

      <div className={styles.recipeLayout}>
        <div className={styles.recipeMain}>
          <RecipeCollapsibleSection title="Basics" defaultOpen id="section-basics">
            <div className="cardForm">
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
                  <label
                    className={styles.slugFieldLabel}
                    htmlFor={editingSlug ? "recipe-slug" : undefined}
                  >
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

              <div className="field">
                <label className="fieldLabel" htmlFor="recipe-description">
                  Description
                </label>
                <textarea
                  id="recipe-description"
                  className="fieldTextarea"
                  rows={4}
                  value={recipe.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Intro copy shown under the title on the recipe page"
                />
              </div>
            </div>
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="Ingredients"
            meta={`${ukIngredientCount} UK · ${usIngredientCount} US`}
            defaultOpen
            id="section-ingredients"
          >
            <RecipeLocaleTabs
              label="Ingredients locale"
              locale={ingredientsLocale}
              onLocaleChange={setIngredientsLocale}
              ukMeta={`${Math.max(ukIngredients.length, 1)} sections · ${ukIngredientCount} lines`}
              usMeta={`${Math.max(usIngredients.length, 1)} sections · ${usIngredientCount} lines`}
              onCopyUkToUs={() => {
                update("ingredients_us", cloneIngredientSections(ukIngredients));
                setIngredientsLocale("us");
              }}
            >
              {ingredientsLocale === "uk" ? (
                <RecipeIngredientsEditor
                  idPrefix="uk"
                  sections={ukIngredients.length > 0 ? ukIngredients : emptyIngredientSections()}
                  onChange={(sections) => update("ingredients", sections)}
                />
              ) : (
                <RecipeIngredientsEditor
                  idPrefix="us"
                  sections={usIngredients.length > 0 ? usIngredients : emptyIngredientSections()}
                  onChange={(sections) => update("ingredients_us", sections)}
                />
              )}
            </RecipeLocaleTabs>
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="Method"
            meta={`${ukMethodCount} UK · ${usMethodCount} US steps`}
            defaultOpen
            id="section-method"
          >
            <RecipeLocaleTabs
              label="Method locale"
              locale={methodLocale}
              onLocaleChange={setMethodLocale}
              ukMeta={`${ukMethodCount} steps`}
              usMeta={`${usMethodCount} steps`}
              onCopyUkToUs={() => {
                update("method_us", cloneSteps(ukMethod));
                setMethodLocale("us");
              }}
            >
              {methodLocale === "uk" ? (
                <RecipeMethodEditor
                  idPrefix="uk"
                  steps={ukMethod.length > 0 ? ukMethod : [{ text: "" }]}
                  onChange={(method) => update("method", method)}
                />
              ) : (
                <RecipeMethodEditor
                  idPrefix="us"
                  steps={usMethod.length > 0 ? usMethod : [{ text: "" }]}
                  onChange={(method) => update("method_us", method)}
                />
              )}
            </RecipeLocaleTabs>
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection title="Info" defaultOpen={false} id="section-info">
            <RecipeLocaleTabs
              label="Info locale"
              locale={infoLocale}
              onLocaleChange={setInfoLocale}
              ukMeta="Storage & tips"
              usMeta="Storage & tips"
              onCopyUkToUs={() => {
                update("info_us", recipe.info_uk ?? "");
                setInfoLocale("us");
              }}
            >
              {infoLocale === "uk" ? (
                <RecipeRichTextField
                  id="info-uk"
                  label="Info"
                  value={recipe.info_uk ?? ""}
                  onChange={(html) => update("info_uk", html)}
                  placeholder="How to store, freeze, defrost…"
                />
              ) : (
                <RecipeRichTextField
                  id="info-us"
                  label="Info"
                  value={recipe.info_us ?? ""}
                  onChange={(html) => update("info_us", html)}
                  placeholder="How to store, freeze, defrost…"
                />
              )}
            </RecipeLocaleTabs>
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="Additional Info"
            defaultOpen={false}
            id="section-additional-info"
          >
            <RecipeAdditionalInfoFields
              prepTime={recipe.prep_time}
              cookTime={recipe.cook_time}
              servings={recipe.servings}
              difficulty={recipe.difficulty}
              suitableForFreezing={recipe.suitable_for_freezing}
              yieldType={recipe.yield_type}
              yieldValue={recipe.yield_value}
              onChange={update}
            />
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="Allergens & Dietary Requirements"
            defaultOpen={false}
            id="section-allergen-icons"
          >
            <RecipeAllergenIconsFields
              icon={recipe.allergen_icon}
              iconActive={recipe.allergen_icon_active}
              onIconChange={(src) => update("allergen_icon", src || undefined)}
              onIconActiveChange={(src) => update("allergen_icon_active", src || undefined)}
            />
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection title="Video" defaultOpen={false} id="section-video">
            <RecipeVideoField
              video={recipe.video}
              vimeoEmbed={recipe.vimeo_embed}
              onVideoChange={(video) => update("video", video)}
              onVimeoEmbedChange={(embed) => update("vimeo_embed", embed)}
            />
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="Additional Images"
            meta={`${recipe.additional_images?.length ?? 0} images`}
            defaultOpen={false}
            id="section-additional-images"
          >
            <RecipeGalleryField
              images={recipe.additional_images ?? []}
              onChange={(additional_images) => update("additional_images", additional_images)}
            />
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="Related Recipes"
            defaultOpen={false}
            id="section-related-recipes"
          >
            <div className={styles.stack}>
              <RecipeRelationPicker
                label="Recipes in this Book"
                hint="Related recipes shown alongside this recipe"
                selectedIds={recipe.related_recipes ?? []}
                catalog={recipeCatalog}
                excludeId={recipe.id || undefined}
                onChange={(ids) => update("related_recipes", ids)}
                emptyLabel="No related recipes selected"
              />
              <RecipeRelationPicker
                label="Book — Related Recipes"
                hint="Recipes featured together in a book context"
                selectedIds={recipe.book_related_recipes ?? []}
                catalog={recipeCatalog}
                excludeId={recipe.id || undefined}
                onChange={(ids) => update("book_related_recipes", ids)}
                emptyLabel="No book-related recipes selected"
              />
            </div>
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="Apps & Books"
            hint="The apps & books the recipe features in (if applicable)."
            defaultOpen={false}
            id="section-apps-books"
          >
            <RecipeRelationPicker
              label="Apps & Books"
              selectedIds={recipe.apps_and_books ?? []}
              catalog={cookbookCatalog}
              onChange={(ids) => update("apps_and_books", ids)}
              emptyLabel="No apps or books selected"
            />
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection title="Schema Data" defaultOpen={false} id="section-schema">
            <RecipeSchemaFields
              schema={recipe.schema}
              onChange={(schema) => update("schema", schema)}
            />
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="Sponsor Information"
            defaultOpen={false}
            id="section-sponsor"
          >
            <RecipeSponsorFields
              sponsor={recipe.sponsor}
              onChange={(sponsor) => update("sponsor", sponsor)}
            />
          </RecipeCollapsibleSection>

          <RecipeCollapsibleSection
            title="US Content"
            hint="US title, description, and body content"
            defaultOpen={false}
            id="section-us-content"
          >
            <div className="cardForm">
              <div className="field">
                <label className="fieldLabel" htmlFor="recipe-title-us">
                  Recipe Title US
                </label>
                <input
                  id="recipe-title-us"
                  className="fieldInput"
                  value={recipe.title_us ?? ""}
                  onChange={(e) => update("title_us", e.target.value)}
                />
              </div>
              <div className="field">
                <label className="fieldLabel" htmlFor="recipe-description-us">
                  Description US
                </label>
                <textarea
                  id="recipe-description-us"
                  className="fieldTextarea"
                  rows={3}
                  value={recipe.description_us ?? ""}
                  onChange={(e) => update("description_us", e.target.value)}
                />
              </div>
              <RecipeRichTextField
                id="recipe-content-us"
                label="Recipe Content US"
                value={recipe.content_us ?? ""}
                onChange={(html) => update("content_us", html)}
                placeholder="US recipe body content…"
              />
            </div>
          </RecipeCollapsibleSection>

          <div className="card">
            <h2 className="cardSectionTitle">Nutrition Categories</h2>
            <p className={styles.sectionHint}>Category image for nutrition listings</p>
            <ImageField
              value={recipe.nutrition_category_image ?? ""}
              showAlt={false}
              onChange={(src) => update("nutrition_category_image", src)}
            />
            {recipe.nutrition_category_image ? (
              <button
                type="button"
                className={`btn btnGhost ${styles.removeImageBtn}`}
                onClick={() => update("nutrition_category_image", "")}
              >
                Remove
              </button>
            ) : null}
          </div>

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
            </div>
          </div>
        </div>

        <aside className={styles.recipeSidebar} aria-label="Recipe settings">
          <div className="card">
            <h2 className="cardSectionTitle">Publish</h2>
            <div className={styles.publishMeta}>
              <div className={styles.publishMetaRow}>
                <span className={styles.publishMetaIcon} aria-hidden>
                  ◉
                </span>
                <div className={styles.publishMetaBody}>
                  {editingVisibility ? (
                    <fieldset className={styles.visibilityFieldset}>
                      <legend className={styles.visibilityLegend}>Visibility</legend>
                      <div className={styles.visibilityOptions} role="radiogroup">
                        {RECIPE_VISIBILITIES.map((option) => (
                          <label key={option.value} className={styles.visibilityOption}>
                            <input
                              type="radio"
                              name="recipe-visibility"
                              value={option.value}
                              checked={visibility === option.value}
                              onChange={() => {
                                update("visibility", option.value as RecipeVisibility);
                                setEditingVisibility(false);
                              }}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                      <button
                        type="button"
                        className={styles.textAction}
                        onClick={() => setEditingVisibility(false)}
                      >
                        Done
                      </button>
                    </fieldset>
                  ) : (
                    <p className={styles.publishMetaText}>
                      Visibility: <strong>{visibilityLabel}</strong>{" "}
                      <button
                        type="button"
                        className={styles.publishMetaEdit}
                        onClick={() => setEditingVisibility(true)}
                      >
                        Edit
                      </button>
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.publishMetaRow}>
                <span className={styles.publishMetaIcon} aria-hidden>
                  📅
                </span>
                <p className={styles.publishMetaText}>
                  {dateMeta.label}: <strong>{formatStatusDateTime(dateMeta.iso)}</strong>
                </p>
              </div>
            </div>
            <ArticleStatusField
              value={recipeStatus}
              scheduledAt={recipe.scheduled_at}
              onChange={handleStatusChange}
              statuses={[...RECIPE_STATUSES] as AdviceArticleStatus[]}
              labels={RECIPE_STATUS_LABELS}
              hints={RECIPE_STATUS_HINTS}
              disableConfirmTitle="Disable this recipe?"
              disableConfirmMessage="The recipe will be hidden from the public site until you change the status again."
              disableConfirmLabel="Disable recipe"
            />
          </div>

          <section className={styles.metaCard} aria-labelledby="app-featured-heading">
            <div className={styles.metaCardHeader}>
              <div>
                <h2 id="app-featured-heading" className={styles.metaCardTitle}>
                  App Featured
                </h2>
                <p className={styles.metaCardSubtitle}>Promote this recipe in the app</p>
              </div>
              <span
                className={`${styles.featuredStatus}${recipe.app_exclusive ? ` ${styles.featuredStatusOn}` : ""}`}
              >
                {recipe.app_exclusive ? "Featured" : "Not featured"}
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={recipe.app_exclusive}
              className={`${styles.featuredToggle}${recipe.app_exclusive ? ` ${styles.featuredToggleOn}` : ""}`}
              onClick={() => update("app_exclusive", !recipe.app_exclusive)}
            >
              <span className={styles.featuredToggleCopy}>
                <span className={styles.featuredToggleLabel}>Featured Recipe</span>
                <span className={styles.featuredToggleHint}>
                  Show this recipe as featured in the app
                </span>
              </span>
              <span className={styles.featuredSwitch} aria-hidden>
                <span className={styles.featuredSwitchThumb} />
              </span>
            </button>
          </section>

          <section className={styles.metaCard} aria-labelledby="recipe-author-heading">
            <div className={styles.metaCardHeader}>
              <div>
                <h2 id="recipe-author-heading" className={styles.metaCardTitle}>
                  Author
                </h2>
                <p className={styles.metaCardSubtitle}>Who owns this recipe in the CMS</p>
              </div>
            </div>
            <div className={styles.authorPicker}>
              <div className={styles.authorPreview}>
                <span
                  className={`${styles.authorAvatar}${selectedAuthor ? ` ${styles.authorAvatarFilled}` : ""}`}
                  aria-hidden
                >
                  {authorInitials}
                </span>
                <div className={styles.authorPreviewCopy}>
                  <span className={styles.authorPreviewName}>
                    {selectedAuthor?.name ?? "No author selected"}
                  </span>
                  <span className={styles.authorPreviewEmail}>
                    {selectedAuthor?.email ?? "Choose someone from the list"}
                  </span>
                </div>
              </div>
              <label className={styles.authorSelectLabel} htmlFor="recipe-author">
                Assign author
              </label>
              <div className={styles.authorSelectWrap}>
                <select
                  id="recipe-author"
                  className={styles.authorSelect}
                  value={recipe.author_id ?? ""}
                  onChange={(e) => update("author_id", e.target.value || undefined)}
                >
                  <option value="">Select author…</option>
                  {RECIPE_AUTHORS.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name} — {author.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

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
                className={`btn btnGhost ${styles.removeImageBtn}`}
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
            <h2 className="cardSectionTitle">Categories</h2>
            <RecipeCategoriesEditor
              embedded
              groups={categoryGroups}
              taxonomies={recipe.taxonomies}
              onChange={(taxonomies) => update("taxonomies", taxonomies)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
