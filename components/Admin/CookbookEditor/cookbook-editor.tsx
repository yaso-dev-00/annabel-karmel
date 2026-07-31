'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { PreviewViewportHandle } from '@/components/Admin/BlockEditor/preview-viewport';
import { ArticleStatusField } from '@/components/Admin/Ui/ArticleStatusField';
import { CookbookBuyLinksEditor } from '@/components/Admin/CookbookEditor/cookbook-buy-links-editor';
import { CookbookCarouselEditor } from '@/components/Admin/CookbookEditor/cookbook-carousel-editor';
import { CookbookDetailCopyEditor } from '@/components/Admin/CookbookEditor/cookbook-detail-copy-editor';
import { CookbookListingCopyEditor } from '@/components/Admin/CookbookEditor/cookbook-listing-copy-editor';
import { CookbookLivePreview } from '@/components/Admin/CookbookEditor/cookbook-live-preview';
import {
  createCookbookApi,
  updateCookbookApi,
} from '@/lib/admin/cookbooks-client';
import {
  applyCookbookStatus,
  buildCookbookSavePayload,
  getCookbookStatusPatch,
  isCookbookDisabled,
  isCookbookPreviewable,
  resolveCookbookStatus,
} from '@/lib/admin/cookbook-status';
import { validateCookbookForPublish } from '@/lib/cookbooks/sanitize-cookbook';
import type { Cookbook, CookbookStatus } from '@/lib/cookbooks/types';
import blockStyles from '@/components/Admin/BlockEditor/block-editor.module.css';
import styles from './cookbook-editor.module.css';

type CookbookEditorProps = {
  initialCookbook: Cookbook;
  isNew?: boolean;
};

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function CookbookEditor({
  initialCookbook,
  isNew,
}: CookbookEditorProps) {
  const router = useRouter();
  const previewRef = useRef<PreviewViewportHandle>(null);
  const [cookbook, setCookbook] = useState(initialCookbook);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(isNew && !initialCookbook.slug);
  const [editingSlug, setEditingSlug] = useState(false);

  const update = useCallback(
    <K extends keyof Cookbook>(key: K, value: Cookbook[K]) => {
      setCookbook((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
    },
    [],
  );

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      if (publish) {
        const error = validateCookbookForPublish(cookbook);
        if (error) {
          setMessage(error);
          setSaving(false);
          return;
        }
      }

      const payload = buildCookbookSavePayload(cookbook, { publish });
      if (isNew || !cookbook.id) {
        const created = await createCookbookApi(payload);
        setCookbook(created);
        setDirty(false);
        setMessage(publish ? 'Published!' : 'Saved.');
        router.replace(`/admin/cookbooks/${created.id}/edit`);
        router.refresh();
      } else {
        const updated = await updateCookbookApi(cookbook.id, payload);
        setCookbook(updated);
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
    status: CookbookStatus,
    scheduledAt?: string | null,
  ) => {
    const next = applyCookbookStatus(cookbook, status, scheduledAt);
    setCookbook(next);

    if (!isNew && cookbook.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updateCookbookApi(
          cookbook.id,
          getCookbookStatusPatch(next),
        );
        setCookbook(updated);
        setDirty(false);
        setMessage(
          status === 'disabled'
            ? 'Cookbook disabled.'
            : status === 'published'
              ? 'Cookbook published.'
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
  const cookbookStatus = resolveCookbookStatus(cookbook);
  const previewable = isCookbookPreviewable(cookbook);

  const seoTitleLen = cookbook.seo_title.length;
  const seoDescLen = cookbook.seo_description.length;

  const titleField = useMemo(
    () => (
      <div className="card">
        <div className="field">
          <label className="fieldLabel" htmlFor="cookbook-title">
            Cookbook title
          </label>
          <input
            id="cookbook-title"
            className="fieldInput"
            value={cookbook.title}
            onChange={(e) => {
              const title = e.target.value;
              setCookbook((prev) => ({
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
              htmlFor={editingSlug ? 'cookbook-slug' : undefined}
            >
              Page URL
            </label>
            {autoSlug ? (
              <span className={styles.slugAutoHint}>Synced from title</span>
            ) : null}
          </div>

          {editingSlug ? (
            <div className={`${styles.slugBar} ${styles.slugBarEditing}`}>
              <span className={styles.slugPrefix}>/apps-books/</span>
              <input
                id="cookbook-slug"
                className={styles.slugEditInput}
                value={cookbook.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  update('slug', e.target.value);
                }}
                onBlur={() => setEditingSlug(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === 'Escape') {
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
              <span className={styles.slugPrefix}>/apps-books/</span>
              <span className={styles.slugValue}>
                {cookbook.slug || 'your-book-slug'}
              </span>
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
    [autoSlug, editingSlug, cookbook.slug, cookbook.title, update],
  );

  return (
    <div className="editorSections">
      <div className="editorPageHeader">
        <div>
          <h1 className="cardTitle">{cookbook.title || 'Untitled'}</h1>
          <p className={`statusBar ${dirty && !message ? 'statusDirty' : ''}`}>
            {message
              ? message
              : dirty
                ? 'Unsaved changes'
                : 'All changes saved'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
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
              title="Preview is unavailable while this cookbook is disabled"
            >
              Preview
            </button>
          )}
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
            disabled={saving || isCookbookDisabled(cookbook)}
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
              value={cookbookStatus}
              scheduledAt={cookbook.scheduled_at}
              onChange={handleStatusChange}
            />
          </div>

          <div className="card">
            <h2 className="cardSectionTitle">Listing details</h2>
            <div className="cardForm">
              <div className="field">
                <label className="fieldLabel" htmlFor="cookbook-subtitle">
                  Subtitle
                </label>
                <input
                  id="cookbook-subtitle"
                  className="fieldInput"
                  value={cookbook.subtitle}
                  onChange={(e) => update('subtitle', e.target.value)}
                />
              </div>
              <div className="metaGrid">
                <div className="field">
                  <label className="fieldLabel" htmlFor="cookbook-year">
                    Year
                  </label>
                  <input
                    id="cookbook-year"
                    className="fieldInput"
                    type="number"
                    value={cookbook.year ?? ''}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      update('year', value ? Number(value) : null);
                    }}
                    placeholder="2018"
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel" htmlFor="cookbook-badge">
                    Badge
                  </label>
                  <input
                    id="cookbook-badge"
                    className="fieldInput"
                    value={cookbook.badge}
                    onChange={(e) => update('badge', e.target.value)}
                    placeholder="Bestseller"
                  />
                </div>
              </div>
              <div className="field">
                <label className="fieldLabel" htmlFor="cookbook-suitable">
                  Suitable for
                </label>
                <input
                  id="cookbook-suitable"
                  className="fieldInput"
                  value={cookbook.suitableFor}
                  onChange={(e) => update('suitableFor', e.target.value)}
                  placeholder="babies 6 months+ and toddlers"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <CookbookListingCopyEditor
              body={cookbook.body}
              bodyHighlights={cookbook.bodyHighlights}
              onChangeBody={(body) => update('body', body)}
              onChangeHighlights={(bodyHighlights) =>
                update('bodyHighlights', bodyHighlights)
              }
            />
          </div>

          <div className="card">
            <CookbookDetailCopyEditor
              detailBody={cookbook.detailBody}
              detailBodyHighlights={cookbook.detailBodyHighlights}
              onChangeBody={(detailBody) => update('detailBody', detailBody)}
              onChangeHighlights={(detailBodyHighlights) =>
                update('detailBodyHighlights', detailBodyHighlights)
              }
            />
          </div>

          <CookbookBuyLinksEditor
            buyLinks={cookbook.buyLinks}
            onChange={(buyLinks) => update('buyLinks', buyLinks)}
          />

          <CookbookCarouselEditor
            images={cookbook.carouselImages}
            onChange={(carouselImages) =>
              update('carouselImages', carouselImages)
            }
          />

          <div className="card">
            <div className={styles.sectionHeaderCol}>
              <h2 className="cardSectionTitle">SEO</h2>
              <p className={styles.sectionHint}>
                How this cookbook appears in search results
              </p>
            </div>
            <div className="cardForm">
              <div className="field">
                <div className={styles.sectionHeader}>
                  <label className="fieldLabel" htmlFor="seo-title">
                    SEO title
                  </label>
                  <span
                    className={`${styles.charCount} ${seoTitleLen > 60 ? styles.charCountWarn : ''}`}
                  >
                    {seoTitleLen}/60
                  </span>
                </div>
                <input
                  id="seo-title"
                  className="fieldInput"
                  value={cookbook.seo_title}
                  onChange={(e) => update('seo_title', e.target.value)}
                />
              </div>
              <div className="field">
                <div className={styles.sectionHeader}>
                  <label className="fieldLabel" htmlFor="seo-desc">
                    Meta description
                  </label>
                  <span
                    className={`${styles.charCount} ${seoDescLen > 160 ? styles.charCountWarn : ''}`}
                  >
                    {seoDescLen}/160
                  </span>
                </div>
                <textarea
                  id="seo-desc"
                  className="fieldTextarea"
                  rows={3}
                  value={cookbook.seo_description}
                  onChange={(e) => update('seo_description', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <aside
          className={blockStyles.editorPreviewColumn}
          aria-label="Live preview"
        >
          <CookbookLivePreview
            ref={previewRef}
            cookbook={cookbook}
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
                  disabled={saving || isCookbookDisabled(cookbook)}
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
