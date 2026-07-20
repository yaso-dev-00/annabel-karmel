"use client";

import { useMemo, useState } from "react";
import {
  addHighlightPhrase,
  highlightExistsInText,
  renderHighlightedText,
  resolveHighlightPhrase,
} from "@/lib/cookbooks/highlight-text";
import styles from "./cookbook-editor.module.css";

type CookbookHighlightsEditorProps = {
  highlights: string[];
  onChange: (highlights: string[]) => void;
  label?: string;
  hint?: string;
  placeholder?: string;
  /** Full copy text — preview + missing-phrase checks. */
  sourceText?: string;
  /** Current selection from a related textarea (trimmed). */
  selectionText?: string;
  /** Bold the current text selection from the related copy field. */
  onBoldSelection?: () => void;
};

export function CookbookHighlightsEditor({
  highlights,
  onChange,
  label = "Bold phrases",
  hint,
  placeholder = "Phrase to bold in copy",
  sourceText = "",
  selectionText = "",
  onBoldSelection,
}: CookbookHighlightsEditorProps) {
  const [draft, setDraft] = useState("");

  const previewParagraphs = useMemo(() => {
    if (!sourceText.trim()) return [];
    return sourceText.split("\n\n").filter((p) => p.trim());
  }, [sourceText]);

  const canBoldSelection = Boolean(onBoldSelection && selectionText.trim());

  const addPhrase = (raw: string) => {
    const resolved = sourceText
      ? resolveHighlightPhrase(sourceText, raw)
      : raw.trim();
    if (!resolved) return;
    onChange(addHighlightPhrase(highlights, resolved));
  };

  const addFromDraft = () => {
    if (!draft.trim()) return;
    addPhrase(draft);
    setDraft("");
  };

  return (
    <div className={styles.boldPhrases}>
      <div className={styles.boldPhrasesHeader}>
        <div>
          <label className="fieldLabel">{label}</label>
          {hint ? <p className={styles.sectionHint}>{hint}</p> : null}
        </div>
        {highlights.length > 0 ? (
          <span className={styles.boldPhrasesCount}>
            {highlights.length} phrase{highlights.length === 1 ? "" : "s"}
          </span>
        ) : null}
      </div>

      <div className={styles.chipRow}>
        {highlights.length === 0 ? (
          <span className={styles.sectionHint}>
            Select words in the copy and press <kbd className={styles.kbd}>Ctrl</kbd>+
            <kbd className={styles.kbd}>B</kbd>, or type a phrase below.
          </span>
        ) : (
          highlights.map((item) => {
            const missing = sourceText.length > 0 && !highlightExistsInText(sourceText, item);
            return (
              <span
                key={item}
                className={`${styles.chip}${missing ? ` ${styles.chipMissing}` : ""}`}
                title={missing ? "Not found in copy — won’t bold anything" : "Bold on the live page"}
              >
                <strong>{item}</strong>
                {missing ? <span className={styles.chipBadge}>missing</span> : null}
                <button
                  type="button"
                  className={styles.chipRemove}
                  aria-label={`Remove ${item}`}
                  onClick={() =>
                    onChange(highlights.filter((h) => h.toLowerCase() !== item.toLowerCase()))
                  }
                >
                  ×
                </button>
              </span>
            );
          })
        )}
      </div>

      <div className={styles.highlightAdd}>
        <input
          className="fieldInput"
          style={{ flex: "1 1 220px", maxWidth: 360 }}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addFromDraft();
            }
          }}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="btn btnGhost"
          onClick={addFromDraft}
          disabled={!draft.trim()}
          aria-label="Add bold phrase"
        >
          +
        </button>
        {onBoldSelection ? (
          <button
            type="button"
            className={`btn ${canBoldSelection ? "btnPrimary" : "btnGhost"}`}
            onClick={onBoldSelection}
            disabled={!canBoldSelection}
            title={
              canBoldSelection
                ? `Bold “${selectionText.trim()}”`
                : "Select text in the copy first"
            }
          >
            {canBoldSelection ? `Bold “${truncate(selectionText.trim(), 28)}”` : "Bold selection"}
          </button>
        ) : null}
      </div>

      {previewParagraphs.length > 0 ? (
        <div className={styles.boldPreview} aria-live="polite">
          <div className={styles.boldPreviewLabel}>Preview</div>
          <div className={styles.boldPreviewBody}>
            {previewParagraphs.map((paragraph, index) => (
              <p key={index} className={styles.boldPreviewParagraph}>
                {renderHighlightedText(paragraph, highlights)}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function truncate(value: string, max: number) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}
