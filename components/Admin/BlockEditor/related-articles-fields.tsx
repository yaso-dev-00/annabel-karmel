'use client';

import { useEffect, useMemo } from 'react';
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
import {
  ADVICE_CATEGORY_OPTIONS,
  getAdviceCategoryLabel,
} from '@/lib/content-blocks/advice-categories';
import { getAdviceCategoryArticleOptions } from '@/lib/content-blocks/advice-category-articles';
import {
  ARTICLE_CATEGORY_OPTIONS,
  getArticleCategoryLabel,
} from '@/lib/content-blocks/article-categories';
import { getArticleCategoryArticleOptions } from '@/lib/content-blocks/article-category-articles';
import type { RelatedArticlesCatalog } from '@/lib/content-blocks/resolve-related-articles-block';
import type { RelatedArticlesBlockData } from '@/lib/content-blocks/types';
import editorStyles from './block-editor.module.css';
import styles from './related-articles-fields.module.css';
import { StableDndContext } from './stable-dnd-context';

type RelatedArticlesFieldsProps = {
  data: RelatedArticlesBlockData;
  onChange: (data: RelatedArticlesBlockData) => void;
  catalog?: RelatedArticlesCatalog;
};

type CategoryArticle = {
  slug: string;
  title: string;
  href: string;
  image: string;
};

function SortableArticleRow({
  article,
  onRemove,
}: {
  article: CategoryArticle;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: article.slug,
  });

  return (
    <div
      ref={setNodeRef}
      className={styles.selectedRow}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 2 : undefined,
      }}
    >
      <span
        className={editorStyles.dragHandle}
        {...attributes}
        {...listeners}
        aria-label={`Drag to reorder ${article.title}`}
      >
        ⠿
      </span>
      {article.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={article.image} alt="" className={styles.thumbnail} />
      ) : (
        <div className={styles.thumbnailPlaceholder} aria-hidden />
      )}
      <div className={styles.selectedCopy}>
        <strong>{article.title}</strong>
        <span>{article.href}</span>
      </div>
      <div className={styles.rowActions}>
        <button
          type="button"
          className="btn btnGhost"
          onClick={onRemove}
          aria-label={`Remove ${article.title}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function RelatedArticlesFields({
  data,
  onChange,
  catalog = 'advice',
}: RelatedArticlesFieldsProps) {
  const categoryOptions =
    catalog === 'article' ? ARTICLE_CATEGORY_OPTIONS : ADVICE_CATEGORY_OPTIONS;
  const getCategoryLabel =
    catalog === 'article' ? getArticleCategoryLabel : getAdviceCategoryLabel;
  const getCategoryArticles =
    catalog === 'article'
      ? getArticleCategoryArticleOptions
      : getAdviceCategoryArticleOptions;

  const categoryArticles = useMemo(
    () => getCategoryArticles(data.category_slug),
    [data.category_slug, getCategoryArticles],
  );
  const articlesBySlug = useMemo(
    () => new Map(categoryArticles.map((article) => [article.slug, article])),
    [categoryArticles],
  );

  const currentCategorySlugSet = useMemo(
    () => new Set(categoryArticles.map((article) => article.slug)),
    [categoryArticles],
  );

  const selectedArticles = data.article_slugs
    .map((slug) => articlesBySlug.get(slug))
    .filter((article): article is NonNullable<typeof article> =>
      Boolean(article),
    );

  const availableArticles = categoryArticles.filter(
    (article) => !data.article_slugs.includes(article.slug),
  );

  const patch = (next: Partial<RelatedArticlesBlockData>) =>
    onChange({ ...data, ...next });

  useEffect(() => {
    const valid = categoryOptions.some(
      (option) => option.value === data.category_slug,
    );
    if (!valid && categoryOptions[0]) {
      patch({ category_slug: categoryOptions[0].value });
    }
    // Only correct invalid category when catalog or slug changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, data.category_slug]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const categorySlugsInOrder = data.article_slugs.filter((slug) =>
      currentCategorySlugSet.has(slug),
    );
    const oldIndex = categorySlugsInOrder.indexOf(String(active.id));
    const newIndex = categorySlugsInOrder.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;

    const reorderedCategorySlugs = arrayMove(
      categorySlugsInOrder,
      oldIndex,
      newIndex,
    );
    const otherCategorySlugs = data.article_slugs.filter(
      (slug) => !currentCategorySlugSet.has(slug),
    );
    patch({
      article_slugs: [...reorderedCategorySlugs, ...otherCategorySlugs],
    });
  };

  const addArticle = (slug: string) => {
    if (data.article_slugs.includes(slug)) return;
    patch({ article_slugs: [...data.article_slugs, slug] });
  };

  const removeArticle = (slug: string) => {
    patch({
      article_slugs: data.article_slugs.filter((item) => item !== slug),
    });
  };

  const handleCategoryChange = (categorySlug: string) => {
    patch({ category_slug: categorySlug });
  };

  return (
    <>
      <div className="field">
        <label className="fieldLabel">Heading</label>
        <input
          className="fieldInput"
          value={data.heading}
          onChange={(event) => patch({ heading: event.target.value })}
        />
      </div>
      <div className="field">
        <label className="fieldLabel">Subtitle</label>
        <input
          className="fieldInput"
          value={data.subtitle ?? ''}
          onChange={(event) => patch({ subtitle: event.target.value })}
          placeholder="Some more articles you might enjoy..."
        />
      </div>
      <div className="field">
        <label className="fieldLabel">Category</label>
        <select
          className="fieldSelect"
          value={data.category_slug}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="fieldLabel">Selected articles</label>
        <p className={styles.helpText}>
          {selectedArticles.length > 0
            ? `Showing ${selectedArticles.length} chosen article${selectedArticles.length === 1 ? '' : 's'} from ${getCategoryLabel(data.category_slug)}. Drag to reorder.`
            : `No articles selected — the carousel will show all default articles from ${getCategoryLabel(data.category_slug)}.`}
        </p>
        {selectedArticles.length > 0 ? (
          <StableDndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedArticles.map((article) => article.slug)}
              strategy={verticalListSortingStrategy}
            >
              <div className={styles.selectedList}>
                {selectedArticles.map((article) => (
                  <SortableArticleRow
                    key={article.slug}
                    article={article}
                    onRemove={() => removeArticle(article.slug)}
                  />
                ))}
              </div>
            </SortableContext>
          </StableDndContext>
        ) : null}
      </div>

      <div className="field">
        <label className="fieldLabel">Add articles from category</label>
        {availableArticles.length === 0 ? (
          <p className={styles.helpText}>
            All articles from this category are already selected.
          </p>
        ) : (
          <div className={styles.availableList}>
            {availableArticles.map((article) => (
              <div key={article.slug} className={styles.availableRow}>
                {article.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.image}
                    alt=""
                    className={styles.thumbnail}
                  />
                ) : (
                  <div className={styles.thumbnailPlaceholder} aria-hidden />
                )}
                <div className={styles.selectedCopy}>
                  <strong>{article.title}</strong>
                  <span>{article.href}</span>
                </div>
                <button
                  type="button"
                  className="btn btnSecondary"
                  onClick={() => addArticle(article.slug)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
