"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  createPartnerPageApi,
  updatePartnerPageApi,
} from "@/lib/admin/partners-client";
import {
  applyPartnerPageStatus,
  buildPartnerPageSavePayload,
  getPartnerPageStatusPatch,
  isPartnerPageDisabled,
  isPartnerPagePreviewable,
  isPartnerPagePublic,
  resolvePartnerPageStatus,
} from "@/lib/admin/partner-page-status";
import { ArticleStatusField } from "@/components/Admin/Ui/ArticleStatusField";
import { ImageField } from "@/components/Admin/Ui/ImageField";
import { MaxWidthField } from "@/components/Admin/Ui/MaxWidthField";
import { BlockEditorCanvas, BlockEditorLivePreview, BlockEditorRoot } from "@/components/Admin/BlockEditor/block-editor";
import styles from "@/components/Admin/BlockEditor/block-editor.module.css";
import type { PartnerPage, PartnerPageStatus } from "@/lib/content-blocks/types";

type PartnerPageEditorProps = {
  initialPartner: PartnerPage;
  isNew?: boolean;
};

export function PartnerPageEditor({ initialPartner, isNew }: PartnerPageEditorProps) {
  const router = useRouter();
  const [partner, setPartner] = useState(initialPartner);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const update = useCallback(<K extends keyof PartnerPage>(key: K, value: PartnerPage[K]) => {
    setPartner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }, []);

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = buildPartnerPageSavePayload(partner, { publish });
      if (isNew || !partner.id) {
        const created = await createPartnerPageApi(payload);
        setPartner(created);
        setDirty(false);
        setMessage(publish ? "Published!" : "Saved.");
        router.replace(`/admin/partners/${created.id}/edit`);
        router.refresh();
      } else {
        const updated = await updatePartnerPageApi(partner.id, payload);
        setPartner(updated);
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

  const handleStatusChange = async (status: PartnerPageStatus, scheduledAt?: string | null) => {
    const next = applyPartnerPageStatus(partner, status, scheduledAt);
    setPartner(next);

    if (!isNew && partner.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updatePartnerPageApi(partner.id, getPartnerPageStatusPatch(next));
        setPartner(updated);
        setDirty(false);
        setMessage(
          status === "disabled"
            ? "Partner page disabled."
            : status === "published"
              ? "Partner page published."
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
  const partnerStatus = resolvePartnerPageStatus(partner);
  const previewable = isPartnerPagePreviewable(partner);

  return (
    <BlockEditorRoot
      blocks={partner.content_blocks}
      onChange={(blocks) => update("content_blocks", blocks)}
      contentMaxWidth={partner.content_max_width ?? "default"}
      contentMaxWidthCustom={partner.content_max_width_custom}
      editorContext="partners"
    >
      <div className="editorSections">
        <div className="editorPageHeader">
          <div>
            <h1 className="cardTitle">{partner.title || "Untitled"}</h1>
            <p className={`statusBar ${dirty && !message ? "statusDirty" : ""}`}>
              {message ? message : dirty ? "Unsaved changes" : "All changes saved"}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {partner.id && partner.slug ? (
              previewable ? (
                <Link
                  href={
                    isPartnerPagePublic(partner)
                      ? `/${partner.slug}`
                      : `/admin/partners/${partner.id}/preview`
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
                  title="Preview is unavailable while this partner page is disabled"
                >
                  Preview
                </button>
              )
            ) : null}
            <button type="button" className="btn btnSecondary" onClick={saveDraft} disabled={saving}>
              Save draft
            </button>
            <button type="button" className="btn btnPrimary" onClick={publish} disabled={saving || isPartnerPageDisabled(partner)}>
              Publish
            </button>
          </div>
        </div>

        <div className={styles.editorWorkspace}>
          <div className={styles.editorWorkspaceMain}>
            <div className="card">
              <h2 className="cardSectionTitle">Page settings</h2>
              <ArticleStatusField
                value={partnerStatus}
                scheduledAt={partner.scheduled_at}
                onChange={handleStatusChange}
              />
              <div className="metaGrid">
                <div className="field">
                  <label className="fieldLabel">Title</label>
                  <input className="fieldInput" value={partner.title} onChange={(e) => update("title", e.target.value)} />
                </div>
                <div className="field">
                  <label className="fieldLabel">Slug</label>
                  <input className="fieldInput" value={partner.slug} onChange={(e) => update("slug", e.target.value)} placeholder="pampers-snacking" />
                </div>
                <div className="field">
                  <label className="fieldLabel" htmlFor="partner-content-max-width">
                    Content max width
                  </label>
                  <MaxWidthField
                    id="partner-content-max-width"
                    preset={partner.content_max_width ?? "default"}
                    customValue={partner.content_max_width_custom}
                    selectClassName="fieldSelect"
                    inputClassName="fieldInput"
                    onPresetChange={(preset) => {
                      if (!preset) return;
                      setPartner((prev) => ({
                        ...prev,
                        content_max_width: preset,
                        content_max_width_custom:
                          preset === "custom" ? prev.content_max_width_custom : undefined,
                      }));
                      setDirty(true);
                    }}
                    onCustomChange={(value) => {
                      setPartner((prev) => ({
                        ...prev,
                        content_max_width: "custom",
                        content_max_width_custom: value,
                      }));
                      setDirty(true);
                    }}
                  />
                </div>
                <div className="field" style={{ gridColumn: "1 / -1" }}>
                  <label className="fieldLabel">Listing image</label>
                  <ImageField
                    value={partner.listing_image}
                    alt={partner.listing_image_alt}
                    onChange={(src, altVal) => {
                      setPartner((prev) => ({
                        ...prev,
                        listing_image: src,
                        listing_image_alt: altVal ?? prev.listing_image_alt,
                      }));
                      setDirty(true);
                    }}
                    onAltChange={(altVal) => update("listing_image_alt", altVal)}
                  />
                </div>
                <div className="field">
                  <label className="fieldCheckbox">
                    <input
                      type="checkbox"
                      checked={partner.show_instagram_share}
                      onChange={(e) => update("show_instagram_share", e.target.checked)}
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
                  <input className="fieldInput" value={partner.seo_title} onChange={(e) => update("seo_title", e.target.value)} />
                </div>
                <div className="field">
                  <label className="fieldLabel">SEO description</label>
                  <textarea className="fieldTextarea" value={partner.seo_description} onChange={(e) => update("seo_description", e.target.value)} rows={3} />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="cardSectionTitle">Content blocks</h2>
              <div className="cardForm">
                {partner.content_blocks.length === 0 && isNew ? (
                  <p className="mutedNote">Start adding blocks below to build your partner page.</p>
                ) : null}
                <BlockEditorCanvas />
              </div>
            </div>
          </div>

          <aside className={styles.editorPreviewColumn} aria-label="Live preview">
            <BlockEditorLivePreview
              fullscreenActions={
                <>
                  <button type="button" className="btn btnSecondary" onClick={saveDraft} disabled={saving}>
                    Save draft
                  </button>
                  <button type="button" className="btn btnPrimary" onClick={publish} disabled={saving}>
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
