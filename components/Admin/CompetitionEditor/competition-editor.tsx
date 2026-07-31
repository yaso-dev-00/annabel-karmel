'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  createCompetitionApi,
  updateCompetitionApi,
} from '@/lib/admin/competitions-client';
import {
  applyCompetitionStatus,
  buildCompetitionSavePayload,
  getCompetitionStatusPatch,
  isCompetitionDisabled,
  isCompetitionPreviewable,
  isCompetitionPublic,
  resolveCompetitionStatus,
} from '@/lib/admin/competition-status';
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
  Competition,
  CompetitionStatus,
} from '@/lib/content-blocks/types';

type CompetitionEditorProps = {
  initialCompetition: Competition;
  isNew?: boolean;
};

export function CompetitionEditor({
  initialCompetition,
  isNew,
}: CompetitionEditorProps) {
  const router = useRouter();
  const [competition, setCompetition] = useState(initialCompetition);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const update = useCallback(
    <K extends keyof Competition>(key: K, value: Competition[K]) => {
      setCompetition((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
    },
    [],
  );

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = buildCompetitionSavePayload(competition, { publish });
      if (isNew || !competition.id) {
        const created = await createCompetitionApi(payload);
        setCompetition(created);
        setDirty(false);
        setMessage(publish ? 'Published!' : 'Saved.');
        router.replace(`/admin/competitions/${created.id}/edit`);
        router.refresh();
      } else {
        const updated = await updateCompetitionApi(competition.id, payload);
        setCompetition(updated);
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
    status: CompetitionStatus,
    scheduledAt?: string | null,
  ) => {
    const next = applyCompetitionStatus(competition, status, scheduledAt);
    setCompetition(next);

    if (!isNew && competition.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updateCompetitionApi(
          competition.id,
          getCompetitionStatusPatch(next),
        );
        setCompetition(updated);
        setDirty(false);
        setMessage(
          status === 'disabled'
            ? 'Competition disabled.'
            : status === 'published'
              ? 'Competition published.'
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
  const competitionStatus = resolveCompetitionStatus(competition);
  const previewable = isCompetitionPreviewable(competition);

  return (
    <BlockEditorRoot
      blocks={competition.content_blocks}
      onChange={(blocks) => update('content_blocks', blocks)}
      contentMaxWidth={competition.content_max_width ?? 'default'}
      contentMaxWidthCustom={competition.content_max_width_custom}
      editorContext="competition"
    >
      <div className="editorSections">
        <div className="editorPageHeader">
          <div>
            <h1 className="cardTitle">{competition.title || 'Untitled'}</h1>
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
            {competition.id && competition.slug ? (
              previewable ? (
                <Link
                  href={
                    isCompetitionPublic(competition)
                      ? `/competitions/${competition.slug}`
                      : `/admin/competitions/${competition.id}/preview`
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
                  title="Preview is unavailable while this competition is disabled"
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
              disabled={saving || isCompetitionDisabled(competition)}
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
                value={competitionStatus}
                scheduledAt={competition.scheduled_at}
                onChange={handleStatusChange}
              />
              <div className="metaGrid">
                <div className="field">
                  <label className="fieldLabel">Title</label>
                  <input
                    className="fieldInput"
                    value={competition.title}
                    onChange={(e) => update('title', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">Slug</label>
                  <input
                    className="fieldInput"
                    value={competition.slug}
                    onChange={(e) => update('slug', e.target.value)}
                    placeholder="win-an-amazing-prize"
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel" htmlFor="competition-closes-at">
                    Closes at
                  </label>
                  <input
                    id="competition-closes-at"
                    className="fieldInput"
                    type="datetime-local"
                    value={
                      competition.closes_at
                        ? competition.closes_at.slice(0, 16)
                        : ''
                    }
                    onChange={(e) =>
                      update(
                        'closes_at',
                        e.target.value
                          ? new Date(e.target.value).toISOString()
                          : null,
                      )
                    }
                  />
                </div>
                <div className="field">
                  <label
                    className="fieldLabel"
                    htmlFor="competition-content-max-width"
                  >
                    Content max width
                  </label>
                  <MaxWidthField
                    id="competition-content-max-width"
                    preset={competition.content_max_width ?? 'default'}
                    customValue={competition.content_max_width_custom}
                    selectClassName="fieldSelect"
                    inputClassName="fieldInput"
                    onPresetChange={(preset) => {
                      if (!preset) return;
                      setCompetition((prev) => ({
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
                      setCompetition((prev) => ({
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
                    value={competition.listing_image}
                    alt={competition.listing_image_alt}
                    onChange={(src, altVal) => {
                      setCompetition((prev) => ({
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
                      checked={competition.show_instagram_share}
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
                    value={competition.seo_title}
                    onChange={(e) => update('seo_title', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel">SEO description</label>
                  <textarea
                    className="fieldTextarea"
                    value={competition.seo_description}
                    onChange={(e) => update('seo_description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="cardSectionTitle">Content blocks</h2>
              <div className="cardForm">
                {competition.content_blocks.length === 0 && isNew ? (
                  <p className="mutedNote">
                    Start adding blocks below to build your competition page.
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
