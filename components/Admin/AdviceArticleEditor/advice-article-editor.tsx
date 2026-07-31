'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  createAdviceArticleApi,
  updateAdviceArticleApi,
} from '@/lib/admin/advice-articles-client';
import {
  applyAdviceArticleStatus,
  buildAdviceArticleSavePayload,
  getAdviceArticleStatusPatch,
  isAdviceArticleDisabled,
  isAdviceArticlePreviewable,
  isAdviceArticlePublic,
  resolveAdviceArticleStatus,
} from '@/lib/admin/advice-article-status';
import { ArticleStatusField } from '@/components/Admin/Ui/ArticleStatusField';
import { ImageField } from '@/components/Admin/Ui/ImageField';
import { MaxWidthField } from '@/components/Admin/Ui/MaxWidthField';
import {
  BlockEditorCanvas,
  BlockEditorLivePreview,
  BlockEditorRoot,
} from '@/components/Admin/BlockEditor/block-editor';
import styles from '@/components/Admin/BlockEditor/block-editor.module.css';
import type {
  AdviceArticle,
  AdviceArticleStatus,
  MaxWidthPreset,
} from '@/lib/content-blocks/types';
import { SAMPLE_ARTICLE_ID } from '@/lib/content-blocks/types';

import { ADVICE_CATEGORY_OPTIONS } from '@/lib/content-blocks/advice-categories';

type AdviceArticleEditorProps = {
  initialArticle: AdviceArticle;
  isNew?: boolean;
};

export function AdviceArticleEditor({
  initialArticle,
  isNew,
}: AdviceArticleEditorProps) {
  const router = useRouter();
  const [article, setArticle] = useState(initialArticle);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const update = useCallback(
    <K extends keyof AdviceArticle>(key: K, value: AdviceArticle[K]) => {
      setArticle((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
    },
    [],
  );

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = buildAdviceArticleSavePayload(article, { publish });
      if (isNew || !article.id) {
        const created = await createAdviceArticleApi(payload);
        setArticle(created);
        setDirty(false);
        setMessage(publish ? 'Published!' : 'Saved.');
        router.replace(`/admin/advice/${created.id}/edit`);
        router.refresh();
      } else {
        const updated = await updateAdviceArticleApi(article.id, payload);
        setArticle(updated);
        setDirty(false);
        setMessage(publish ? 'Published!' : 'Saved.');
        router.refresh();
      }
    } catch (error) {
      const detail =
        error instanceof Error
          ? error.message
          : 'Save failed. Please try again.';
      setMessage(detail);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (
    status: AdviceArticleStatus,
    scheduledAt?: string | null,
  ) => {
    const next = applyAdviceArticleStatus(article, status, scheduledAt);
    setArticle(next);

    if (!isNew && article.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updateAdviceArticleApi(
          article.id,
          getAdviceArticleStatusPatch(next),
        );
        setArticle(updated);
        setDirty(false);
        setMessage(
          status === 'disabled'
            ? 'Article disabled.'
            : status === 'published'
              ? 'Article published.'
              : 'Status saved.',
        );
        router.refresh();
      } catch (error) {
        setDirty(true);
        const detail =
          error instanceof Error
            ? error.message
            : 'Failed to save status. Try Save draft.';
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
  const articleStatus = resolveAdviceArticleStatus(article);
  const previewable = isAdviceArticlePreviewable(article);

  return (
    <BlockEditorRoot
      blocks={article.content_blocks}
      onChange={(blocks) => update('content_blocks', blocks)}
      contentMaxWidth={article.content_max_width ?? 'default'}
      contentMaxWidthCustom={article.content_max_width_custom}
      excludeArticleSlug={article.slug || undefined}
      editorContext="advice"
    >
      <div className="editorSections">
        <div className="editorPageHeader">
          <div>
            <h1 className="cardTitle">{article.title || 'Untitled'}</h1>
            <p
              className={`statusBar ${dirty && !message ? 'statusDirty' : ''}`}
            >
              {message
                ? message
                : dirty
                  ? 'Unsaved changes'
                  : 'All changes saved'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {article.id && article.slug ? (
              previewable ? (
                <Link
                  href={
                    isAdviceArticlePublic(article)
                      ? `/advice/${article.slug}`
                      : `/admin/advice/${article.id}/preview`
                  }
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
                  title="Preview is unavailable while this article is disabled"
                >
                  Preview
                </button>
              )
            ) : null}
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
              disabled={saving || isAdviceArticleDisabled(article)}
            >
              Publish
            </button>
          </div>
        </div>

        <div className={styles.editorWorkspace}>
          <div className={styles.editorWorkspaceMain}>
            <div className="card">
              <h2 className="cardSectionTitle">Page settings</h2>
              <ArticleStatusField
                value={articleStatus}
                scheduledAt={article.scheduled_at}
                onChange={handleStatusChange}
              />
              <div className="metaGrid">
                <div className="field">
                  <label className="fieldLabel">Title</label>
                  <input
                    className="fieldInput"
                    value={article.title}
                    onChange={(e) => update('title', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Slug</label>
                  <input
                    className="fieldInput"
                    value={article.slug}
                    onChange={(e) => update('slug', e.target.value)}
                    placeholder="my-article-slug"
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Category</label>
                  <select
                    className="fieldSelect"
                    value={article.category_slug}
                    onChange={(e) => update('category_slug', e.target.value)}
                  >
                    {ADVICE_CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="fieldLabel" htmlFor="content-max-width">
                    Content max width
                  </label>
                  <MaxWidthField
                    id="content-max-width"
                    preset={article.content_max_width ?? 'default'}
                    customValue={article.content_max_width_custom}
                    selectClassName="fieldSelect"
                    inputClassName="fieldInput"
                    onPresetChange={(preset) => {
                      if (!preset) return;
                      setArticle((prev) => ({
                        ...prev,
                        content_max_width: preset,
                        content_max_width_custom:
                          preset === 'custom'
                            ? prev.content_max_width_custom
                            : undefined,
                      }));
                      setDirty(true);
                    }}
                    onCustomChange={(value) => {
                      setArticle((prev) => ({
                        ...prev,
                        content_max_width: 'custom',
                        content_max_width_custom: value,
                      }));
                      setDirty(true);
                    }}
                  />
                </div>
                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label className="fieldLabel">Listing image</label>
                  <ImageField
                    value={article.listing_image}
                    alt={article.listing_image_alt}
                    onChange={(src, altVal) => {
                      setArticle((prev) => ({
                        ...prev,
                        listing_image: src,
                        listing_image_alt: altVal ?? prev.listing_image_alt,
                      }));
                      setDirty(true);
                    }}
                    onAltChange={(altVal) =>
                      update('listing_image_alt', altVal)
                    }
                  />
                </div>
                <div className="field">
                  <label className="fieldCheckbox">
                    <input
                      type="checkbox"
                      checked={article.show_instagram_share}
                      onChange={(e) =>
                        update('show_instagram_share', e.target.checked)
                      }
                    />
                    <span>Show Instagram share section</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="cardSectionTitle">SEO</h2>
              <div className="cardForm">
                <div className="field">
                  <label className="fieldLabel">SEO title</label>
                  <input
                    className="fieldInput"
                    value={article.seo_title}
                    onChange={(e) => update('seo_title', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">SEO description</label>
                  <textarea
                    className="fieldTextarea"
                    value={article.seo_description}
                    onChange={(e) => update('seo_description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="cardSectionTitle">Content blocks</h2>
              <div className="cardForm">
                {article.content_blocks.length === 0 && isNew ? (
                  <p className="mutedNote">
                    Start adding blocks below, or{' '}
                    <Link
                      href={`/admin/advice/${SAMPLE_ARTICLE_ID}/edit`}
                      className="inlineLink"
                      style={{ color: '#b34769' }}
                    >
                      view the sample article
                    </Link>
                    .
                  </p>
                ) : null}
                <BlockEditorCanvas />
              </div>
            </div>
          </div>

          <aside
            className={styles.editorPreviewColumn}
            aria-label="Live preview"
          >
            <BlockEditorLivePreview
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
                    disabled={saving}
                  >
                    Publish
                  </button>
                </>
              }
            />
          </aside>
        </div>
      </div>
    </BlockEditorRoot>
  );
}
