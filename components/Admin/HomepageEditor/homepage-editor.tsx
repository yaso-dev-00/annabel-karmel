'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArticleStatusField } from '@/components/Admin/Ui/ArticleStatusField';
import type { PreviewViewportHandle } from '@/components/Admin/BlockEditor/preview-viewport';
import blockStyles from '@/components/Admin/BlockEditor/block-editor.module.css';
import { HomepageLivePreview } from '@/components/Admin/HomepageEditor/homepage-live-preview';
import { HomepageSectionsEditor } from '@/components/Admin/HomepageEditor/homepage-sections-editor';
import { updateHomepageApi } from '@/lib/admin/homepage-client';
import {
  applyHomepageStatus,
  buildHomepageSavePayload,
  getHomepageStatusPatch,
  isHomepageDisabled,
  isHomepagePreviewable,
  resolveHomepageStatus,
} from '@/lib/admin/homepage-status';
import type {
  HomepageDocument,
  HomepageSection,
  HomepageStatus,
} from '@/lib/homepage/types';
import type { AdviceArticleStatus } from '@/lib/content-blocks/types';
import { useRouter } from 'next/navigation';

type HomepageEditorProps = {
  initialDocument: HomepageDocument;
};

function pinRecipeFinder(sections: HomepageSection[]): HomepageSection[] {
  const finder = sections.find((section) => section.type === 'recipe_finder');
  const without = sections.filter(
    (section) => section.type !== 'recipe_finder',
  );
  if (!finder) return sections;
  const heroIndex = without.findIndex((section) => section.type === 'hero');
  const insertAt = heroIndex >= 0 ? heroIndex + 1 : 0;
  return [...without.slice(0, insertAt), finder, ...without.slice(insertAt)];
}

export function HomepageEditor({ initialDocument }: HomepageEditorProps) {
  const router = useRouter();
  const previewRef = useRef<PreviewViewportHandle>(null);
  const [document, setDocument] = useState(initialDocument);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [focusRequest, setFocusRequest] = useState<{
    type: HomepageDocument['sections'][number]['type'];
    nonce: number;
  } | null>(null);

  useEffect(() => {
    if (dirty) return;
    queueMicrotask(() => setDocument(initialDocument));
  }, [initialDocument, dirty]);

  const updateSections = useCallback((sections: HomepageSection[]) => {
    setDocument((prev) => ({ ...prev, sections: pinRecipeFinder(sections) }));
    setDirty(true);
  }, []);

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = buildHomepageSavePayload(
        { ...document, sections: pinRecipeFinder(document.sections) },
        { publish },
      );
      const updated = await updateHomepageApi(payload);
      setDocument(updated);
      setDirty(false);
      setMessage(publish ? 'Published!' : 'Saved.');
      router.refresh();
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
    const next = applyHomepageStatus(
      document,
      status as HomepageStatus,
      scheduledAt,
    );
    setDocument(next);

    setSaving(true);
    setMessage(null);
    try {
      const updated = await updateHomepageApi(getHomepageStatusPatch(next));
      setDocument(updated);
      setDirty(false);
      setMessage(
        status === 'disabled'
          ? 'Homepage disabled.'
          : status === 'published'
            ? 'Homepage published.'
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
  };

  const homepageStatus = resolveHomepageStatus(document);
  const previewable = isHomepagePreviewable(document);

  return (
    <div className="editorSections">
      <div className="editorPageHeader">
        <div>
          <h1 className="cardTitle">{document.title || 'Homepage'}</h1>
          <p className={`statusBar ${dirty && !message ? 'statusDirty' : ''}`}>
            {message
              ? message
              : dirty
                ? 'Unsaved changes'
                : 'All changes saved'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
              title="Preview unavailable while disabled"
            >
              Preview
            </button>
          )}
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() => save(false)}
            disabled={saving}
          >
            Save draft
          </button>
          <button
            type="button"
            className="btn btnPrimary"
            onClick={() => save(true)}
            disabled={saving || isHomepageDisabled(document)}
          >
            Publish
          </button>
        </div>
      </div>

      <div className={blockStyles.editorWorkspace}>
        <div className={blockStyles.editorWorkspaceMain}>
          <div className="card">
            <h2 className="cardSectionTitle">Status &amp; visibility</h2>
            <ArticleStatusField
              value={homepageStatus}
              scheduledAt={document.scheduled_at}
              onChange={handleStatusChange}
            />
          </div>

          <HomepageSectionsEditor
            sections={document.sections}
            onChange={updateSections}
            onFocusSection={(type) =>
              setFocusRequest({ type, nonce: Date.now() })
            }
          />
        </div>

        <aside className={blockStyles.editorPreviewColumn}>
          <HomepageLivePreview
            ref={previewRef}
            document={document}
            focusRequest={focusRequest}
          />
        </aside>
      </div>
    </div>
  );
}
