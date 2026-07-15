"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createExpertApi, updateExpertApi } from "@/lib/admin/experts-client";
import {
  applyExpertStatus,
  buildExpertSavePayload,
  getExpertStatusPatch,
  isExpertDisabled,
  isExpertPreviewable,
  isExpertPublic,
  resolveExpertStatus,
} from "@/lib/admin/expert-status";
import { ArticleStatusField } from "@/components/Admin/Ui/ArticleStatusField";
import { ImageField } from "@/components/Admin/Ui/ImageField";
import { ExpertProfileShell } from "@/components/ContentBlocks/expert-profile-shell";
import { PreviewViewport } from "@/components/Admin/BlockEditor/preview-viewport";
import styles from "@/components/Admin/BlockEditor/block-editor.module.css";
import { ExpertTopicsEditor } from "@/components/Admin/ExpertEditor/expert-topics-editor";
import type { Expert, ExpertStatus } from "@/lib/experts/types";
import editorStyles from "./expert-editor.module.css";

type ExpertEditorProps = {
  initialExpert: Expert;
  isNew?: boolean;
};

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ExpertEditor({ initialExpert, isNew }: ExpertEditorProps) {
  const router = useRouter();
  const [expert, setExpert] = useState(initialExpert);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [autoSlug, setAutoSlug] = useState(isNew && !initialExpert.slug);

  const update = useCallback(<K extends keyof Expert>(key: K, value: Expert[K]) => {
    setExpert((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }, []);

  const save = async (publish = false) => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = buildExpertSavePayload(expert, { publish });
      if (isNew || !expert.id) {
        const created = await createExpertApi(payload);
        setExpert(created);
        setDirty(false);
        setMessage(publish ? "Published!" : "Saved.");
        router.replace(`/admin/experts/${created.id}/edit`);
        router.refresh();
      } else {
        const updated = await updateExpertApi(expert.id, payload);
        setExpert(updated);
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

  const handleStatusChange = async (status: ExpertStatus, scheduledAt?: string | null) => {
    const next = applyExpertStatus(expert, status, scheduledAt);
    setExpert(next);

    if (!isNew && expert.id) {
      setSaving(true);
      setMessage(null);
      try {
        const updated = await updateExpertApi(expert.id, getExpertStatusPatch(next));
        setExpert(updated);
        setDirty(false);
        setMessage(
          status === "disabled"
            ? "Expert disabled."
            : status === "published"
              ? "Expert published."
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
  const expertStatus = resolveExpertStatus(expert);
  const previewable = isExpertPreviewable(expert);

  const updateParagraph = (key: "introParagraphs" | "bioParagraphs", index: number, value: string) => {
    setExpert((prev) => {
      const next = [...prev[key]];
      next[index] = value;
      return { ...prev, [key]: next };
    });
    setDirty(true);
  };

  const addParagraph = (key: "introParagraphs" | "bioParagraphs") => {
    setExpert((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
    setDirty(true);
  };

  const removeParagraph = (key: "introParagraphs" | "bioParagraphs", index: number) => {
    setExpert((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
    setDirty(true);
  };

  return (
    <div className="editorSections">
      <div className="editorPageHeader">
        <div>
          <h1 className="cardTitle">{expert.name || "Untitled expert"}</h1>
          <p className={`statusBar ${dirty && !message ? "statusDirty" : ""}`}>
            {message ? message : dirty ? "Unsaved changes" : "All changes saved"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {expert.id && expert.slug ? (
            previewable ? (
              <Link
                href={
                  isExpertPublic(expert)
                    ? `/experts/${expert.slug}`
                    : `/admin/experts/${expert.id}/preview`
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
                title="Preview is unavailable while this expert is disabled"
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
            disabled={saving || isExpertDisabled(expert)}
          >
            Publish
          </button>
        </div>
      </div>

      <div className={styles.editorWorkspace}>
        <div className={styles.editorWorkspaceMain}>
          <div className="card">
            <h2 className="cardSectionTitle">Profile</h2>
            <ArticleStatusField
              value={expertStatus}
              scheduledAt={expert.scheduled_at}
              onChange={handleStatusChange}
            />
            <div className="metaGrid">
              <div className="field">
                <label className="fieldLabel">Name</label>
                <input
                  className="fieldInput"
                  value={expert.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setExpert((prev) => ({
                      ...prev,
                      name,
                      ...(autoSlug ? { slug: slugifyName(name) } : {}),
                    }));
                    setDirty(true);
                  }}
                />
              </div>
              <div className="field">
                <label className="fieldLabel">Slug</label>
                <input
                  className="fieldInput"
                  value={expert.slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    update("slug", e.target.value);
                  }}
                  placeholder="expert-slug"
                />
              </div>
              <div className="field">
                <label className="fieldLabel">Role</label>
                <input
                  className="fieldInput"
                  value={expert.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="e.g. Paediatric sleep consultant"
                />
              </div>
              <div className="field">
                <label className="fieldLabel">Sort order</label>
                <input
                  className="fieldInput"
                  type="number"
                  min={0}
                  value={expert.sort_order}
                  onChange={(e) => update("sort_order", Number(e.target.value) || 0)}
                />
              </div>
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label className="fieldLabel">Profile image</label>
                <ImageField
                  value={expert.image}
                  alt={expert.name}
                  showAlt={false}
                  onChange={(src) => update("image", src)}
                />
              </div>
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label className="fieldLabel">Source URL (topic link fallback)</label>
                <input
                  className="fieldInput"
                  value={expert.sourceUrl}
                  onChange={(e) => update("sourceUrl", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="cardSectionTitle">Intro paragraphs</h2>
            <div className="nestedList">
              {expert.introParagraphs.map((paragraph, index) => (
                <div key={`intro-${index}`} className={`nestedCard ${editorStyles.paragraphCard}`}>
                  <div className="field">
                    <label className="fieldLabel">Paragraph {index + 1}</label>
                    <textarea
                      className="fieldTextarea"
                      rows={3}
                      value={paragraph}
                      onChange={(e) => updateParagraph("introParagraphs", index, e.target.value)}
                    />
                  </div>
                  <div className="nestedCardAction">
                    <button
                      type="button"
                      className="btn btnGhost"
                      onClick={() => removeParagraph("introParagraphs", index)}
                      disabled={expert.introParagraphs.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btnSecondary nestedAddBtn" onClick={() => addParagraph("introParagraphs")}>
                + Add intro paragraph
              </button>
            </div>
          </div>

          <div className="card">
            <h2 className="cardSectionTitle">Bio paragraphs</h2>
            <div className="nestedList">
              {expert.bioParagraphs.map((paragraph, index) => (
                <div key={`bio-${index}`} className={`nestedCard ${editorStyles.paragraphCard}`}>
                  <div className="field">
                    <label className="fieldLabel">Paragraph {index + 1}</label>
                    <textarea
                      className="fieldTextarea"
                      rows={3}
                      value={paragraph}
                      onChange={(e) => updateParagraph("bioParagraphs", index, e.target.value)}
                    />
                  </div>
                  <div className="nestedCardAction">
                    <button
                      type="button"
                      className="btn btnGhost"
                      onClick={() => removeParagraph("bioParagraphs", index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btnSecondary nestedAddBtn" onClick={() => addParagraph("bioParagraphs")}>
                + Add bio paragraph
              </button>
            </div>
          </div>

          <div className="card">
            <h2 className="cardSectionTitle">Social link</h2>
            <div className="metaGrid">
              <div className="field">
                <label className="fieldLabel">Label</label>
                <input
                  className="fieldInput"
                  value={expert.socialLink?.label ?? ""}
                  onChange={(e) => {
                    const label = e.target.value;
                    setExpert((prev) => ({
                      ...prev,
                      socialLink:
                        !label && !prev.socialLink?.href
                          ? null
                          : { label, href: prev.socialLink?.href ?? "" },
                    }));
                    setDirty(true);
                  }}
                />
              </div>
              <div className="field">
                <label className="fieldLabel">URL</label>
                <input
                  className="fieldInput"
                  value={expert.socialLink?.href ?? ""}
                  onChange={(e) => {
                    const href = e.target.value;
                    setExpert((prev) => ({
                      ...prev,
                      socialLink:
                        !href && !prev.socialLink?.label
                          ? null
                          : { label: prev.socialLink?.label ?? "", href },
                    }));
                    setDirty(true);
                  }}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <ExpertTopicsEditor
            topics={expert.articleTopics}
            onChange={(articleTopics) => {
              setExpert((prev) => ({ ...prev, articleTopics }));
              setDirty(true);
            }}
          />
        </div>

        <aside className={styles.editorPreviewColumn} aria-label="Live preview">
          <div className={editorStyles.previewPane}>
            <div className={editorStyles.previewHeader}>
              <span className={editorStyles.previewLabel}>Live preview</span>
            </div>
            <PreviewViewport>
              <ExpertProfileShell expert={expert} />
            </PreviewViewport>
          </div>
        </aside>
      </div>
    </div>
  );
}
