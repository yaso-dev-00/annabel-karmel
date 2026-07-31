'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { createAdApi, deleteAdApi, updateAdApi } from '@/lib/admin/ads-client';
import {
  applyAdStatus,
  buildAdSavePayload,
  getAdStatusPatch,
  isAdDisabled,
  resolveAdStatus,
} from '@/lib/admin/ad-status';
import { ArticleStatusField } from '@/components/Admin/Ui/ArticleStatusField';
import { ConfirmModal } from '@/components/Admin/Ui/ConfirmModal';
import { ImageField } from '@/components/Admin/Ui/ImageField';
import type { AdPlacementId, AdStatus, SiteAd } from '@/lib/ads/types';
import type { AdviceArticleStatus } from '@/lib/content-blocks/types';

type AdEditorProps = {
  initialAd: SiteAd;
  isNew?: boolean;
};

const PLACEMENT_OPTIONS: { value: AdPlacementId; label: string }[] = [
  { value: 'header', label: 'Header' },
  { value: 'footer', label: 'Footer' },
];

export function AdEditor({ initialAd, isNew }: AdEditorProps) {
  const router = useRouter();
  const [ad, setAd] = useState(initialAd);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [widthInput, setWidthInput] = useState(String(initialAd.width));
  const [heightInput, setHeightInput] = useState(String(initialAd.height));
  const [sortOrderInput, setSortOrderInput] = useState(
    String(initialAd.sortOrder),
  );

  const update = useCallback(
    <K extends keyof SiteAd>(key: K, value: SiteAd[K]) => {
      setAd((prev) => ({ ...prev, [key]: value }));
      setDirty(true);
    },
    [],
  );

  const syncNumericInputs = (next: SiteAd) => {
    setWidthInput(String(next.width));
    setHeightInput(String(next.height));
    setSortOrderInput(String(next.sortOrder));
  };

  const commitNumericField = (
    key: 'width' | 'height' | 'sortOrder',
    raw: string,
    fallback: number,
    setInput: (value: string) => void,
  ) => {
    const parsed = raw.trim() === '' ? fallback : Number.parseInt(raw, 10);
    const next = Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
    setInput(String(next));
    update(key, next);
  };

  const togglePlacement = (placement: AdPlacementId) => {
    setAd((prev) => {
      const has = prev.placements.includes(placement);
      const next = has
        ? prev.placements.filter((item) => item !== placement)
        : [...prev.placements, placement];
      return {
        ...prev,
        placements: next.length > 0 ? next : prev.placements,
      };
    });
    setDirty(true);
  };

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = buildAdSavePayload(ad, { publish });
      if (isNew || !ad.id) {
        const created = await createAdApi(payload);
        setAd(created);
        syncNumericInputs(created);
        setDirty(false);
        setMessage(publish ? 'Published!' : 'Saved.');
        router.replace(`/admin/ads/${created.id}/edit`);
        router.refresh();
      } else {
        const updated = await updateAdApi(ad.id, payload);
        setAd(updated);
        syncNumericInputs(updated);
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
    const next = applyAdStatus(ad, status as AdStatus, scheduledAt);
    setAd(next);

    if (!isNew && ad.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updateAdApi(ad.id, getAdStatusPatch(next));
        setAd(updated);
        syncNumericInputs(updated);
        setDirty(false);
        setMessage(
          status === 'disabled'
            ? 'Advertisement disabled.'
            : status === 'published'
              ? 'Advertisement published.'
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

  const handleDelete = async () => {
    if (!ad.id) return;
    setSaving(true);
    setMessage(null);
    try {
      await deleteAdApi(ad.id);
      router.push('/admin/ads');
      router.refresh();
    } catch (error) {
      const detail =
        error instanceof Error
          ? error.message
          : 'Failed to delete advertisement.';
      setMessage(detail);
      setSaving(false);
      setConfirmDelete(false);
    }
  };

  const saveDraft = () => save(false);
  const publish = () => save(true);
  const adStatus = resolveAdStatus(ad);

  return (
    <div className="editorSections">
      <div className="editorPageHeader">
        <div>
          <h1 className="cardTitle">{ad.title || 'Untitled'}</h1>
          <p className={`statusBar ${dirty && !message ? 'statusDirty' : ''}`}>
            {message
              ? message
              : dirty
                ? 'Unsaved changes'
                : 'All changes saved'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {!isNew && ad.id ? (
            <button
              type="button"
              className="btn btnGhost"
              onClick={() => setConfirmDelete(true)}
              disabled={saving}
            >
              Delete
            </button>
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
            disabled={saving || isAdDisabled(ad)}
          >
            Publish
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="cardSectionTitle">Advertisement settings</h2>
        <ArticleStatusField
          value={adStatus}
          scheduledAt={ad.scheduled_at}
          onChange={handleStatusChange}
        />

        <div className="metaGrid">
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label className="fieldLabel" htmlFor="ad-title">
              Title
            </label>
            <input
              id="ad-title"
              className="fieldInput"
              value={ad.title}
              onChange={(e) => update('title', e.target.value)}
            />
          </div>

          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label className="fieldLabel">Banner image</label>
            <ImageField
              value={ad.image}
              showAlt={false}
              onChange={(src) => update('image', src)}
            />
            {ad.image ? (
              <div style={{ marginTop: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ad.image}
                  alt=""
                  width={ad.width || 728}
                  height={ad.height || 200}
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 8,
                    background: '#f3f1f2',
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label className="fieldLabel" htmlFor="ad-href">
              Link URL
            </label>
            <input
              id="ad-href"
              className="fieldInput"
              value={ad.href}
              onChange={(e) => update('href', e.target.value)}
              placeholder="https://… or /relative-path"
            />
          </div>

          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label className="fieldLabel" htmlFor="ad-aria-label">
              Accessible label
            </label>
            <input
              id="ad-aria-label"
              className="fieldInput"
              value={ad.ariaLabel}
              onChange={(e) => update('ariaLabel', e.target.value)}
              placeholder="Short description for screen readers"
            />
          </div>

          <div className="field">
            <label className="fieldLabel" htmlFor="ad-width">
              Width (px)
            </label>
            <input
              id="ad-width"
              className="fieldInput"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={widthInput}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw !== '' && !/^\d+$/.test(raw)) return;
                setWidthInput(raw);
                setDirty(true);
                if (raw !== '') update('width', Number.parseInt(raw, 10));
              }}
              onBlur={() =>
                commitNumericField('width', widthInput, 728, setWidthInput)
              }
            />
          </div>

          <div className="field">
            <label className="fieldLabel" htmlFor="ad-height">
              Height (px)
            </label>
            <input
              id="ad-height"
              className="fieldInput"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={heightInput}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw !== '' && !/^\d+$/.test(raw)) return;
                setHeightInput(raw);
                setDirty(true);
                if (raw !== '') update('height', Number.parseInt(raw, 10));
              }}
              onBlur={() =>
                commitNumericField('height', heightInput, 200, setHeightInput)
              }
            />
          </div>

          <div className="field">
            <label className="fieldLabel" htmlFor="ad-sort-order">
              Sort order
            </label>
            <input
              id="ad-sort-order"
              className="fieldInput"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={sortOrderInput}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw !== '' && !/^\d+$/.test(raw)) return;
                setSortOrderInput(raw);
                setDirty(true);
                if (raw !== '') update('sortOrder', Number.parseInt(raw, 10));
              }}
              onBlur={() =>
                commitNumericField(
                  'sortOrder',
                  sortOrderInput,
                  0,
                  setSortOrderInput,
                )
              }
            />
          </div>

          <div className="field">
            <span className="fieldLabel">Placements</span>
            <div
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 8,
                flexWrap: 'wrap',
              }}
            >
              {PLACEMENT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={ad.placements.includes(option.value)}
                    onChange={() => togglePlacement(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmDelete}
        title="Delete advertisement"
        message="This permanently removes the advertisement from the CMS. This cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
