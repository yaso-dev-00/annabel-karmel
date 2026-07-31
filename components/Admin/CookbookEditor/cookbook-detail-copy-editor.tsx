'use client';

import { useCallback, useRef, useState } from 'react';
import { CookbookHighlightsEditor } from '@/components/Admin/CookbookEditor/cookbook-highlights-editor';
import {
  addHighlightPhrase,
  resolveHighlightPhrase,
} from '@/lib/cookbooks/highlight-text';
import styles from './cookbook-editor.module.css';

type CookbookDetailCopyEditorProps = {
  detailBody: string;
  detailBodyHighlights: string[];
  onChangeBody: (detailBody: string) => void;
  onChangeHighlights: (detailBodyHighlights: string[]) => void;
};

function toParagraphs(value: string): string[] {
  if (value === '') return [''];
  return value.split('\n\n');
}

function fromParagraphs(paragraphs: string[]): string {
  // Keep empty trailing paragraphs while editing so "+ Paragraph" sticks.
  return paragraphs.map((p) => p.replace(/\n+$/g, '').trimEnd()).join('\n\n');
}

export function CookbookDetailCopyEditor({
  detailBody,
  detailBodyHighlights,
  onChangeBody,
  onChangeHighlights,
}: CookbookDetailCopyEditorProps) {
  const paragraphs = toParagraphs(detailBody);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectionText, setSelectionText] = useState('');
  const textareaRefs = useRef<Array<HTMLTextAreaElement | null>>([]);

  const updateParagraph = (index: number, next: string) => {
    const updated = paragraphs.slice();
    updated[index] = next;
    onChangeBody(fromParagraphs(updated));
  };

  const addParagraph = () => {
    const updated = [...paragraphs, ''];
    onChangeBody(fromParagraphs(updated));
    setActiveIndex(updated.length - 1);
    requestAnimationFrame(() => {
      textareaRefs.current[updated.length - 1]?.focus();
    });
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length <= 1) {
      onChangeBody('');
      return;
    }
    const updated = paragraphs.filter((_, i) => i !== index);
    onChangeBody(fromParagraphs(updated));
    setActiveIndex(Math.max(0, index - 1));
  };

  const syncSelection = useCallback((index: number) => {
    const el = textareaRefs.current[index];
    if (!el) {
      setSelectionText('');
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    setSelectionText(start === end ? '' : el.value.slice(start, end));
  }, []);

  const boldSelection = useCallback(() => {
    const el = textareaRefs.current[activeIndex];
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (start === end) return;
    const selected = el.value.slice(start, end);
    const phrase = resolveHighlightPhrase(detailBody, selected);
    if (!phrase) return;
    onChangeHighlights(addHighlightPhrase(detailBodyHighlights, phrase));
  }, [activeIndex, detailBody, detailBodyHighlights, onChangeHighlights]);

  return (
    <div className={styles.detailCopySection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderCol} style={{ marginBottom: 0 }}>
          <h2 className="cardSectionTitle">Detail copy</h2>
          <p className={styles.sectionHint}>
            One box per paragraph. Select a phrase and press Ctrl/⌘+B to bold
            it.
          </p>
        </div>
        <button type="button" className="btn btnGhost" onClick={addParagraph}>
          + Paragraph
        </button>
      </div>

      <div className={styles.detailParagraphStack}>
        {paragraphs.map((paragraph, index) => (
          <div key={index} className={styles.detailParagraphRow}>
            <div className={styles.detailParagraphMeta}>
              <span className={styles.detailParagraphLabel}>
                Paragraph {index + 1}
              </span>
              <div className={styles.detailParagraphActions}>
                {selectionText.trim() && activeIndex === index ? (
                  <button
                    type="button"
                    className={`btn btnPrimary ${styles.boldInlineBtn}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={boldSelection}
                  >
                    Bold selection
                  </button>
                ) : null}
                {paragraphs.length > 1 || paragraph.trim() ? (
                  <button
                    type="button"
                    className={styles.chipRemove}
                    aria-label={`Remove paragraph ${index + 1}`}
                    onClick={() => removeParagraph(index)}
                  >
                    ×
                  </button>
                ) : null}
              </div>
            </div>
            <textarea
              ref={(node) => {
                textareaRefs.current[index] = node;
              }}
              className={`fieldTextarea ${styles.detailParagraphInput}`}
              rows={index === 0 ? 5 : 4}
              value={paragraph}
              onChange={(e) => updateParagraph(index, e.target.value)}
              onFocus={() => {
                setActiveIndex(index);
                syncSelection(index);
              }}
              onSelect={() => {
                setActiveIndex(index);
                syncSelection(index);
              }}
              onKeyUp={() => syncSelection(index)}
              onMouseUp={() => syncSelection(index)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
                  e.preventDefault();
                  setActiveIndex(index);
                  // Selection is current before state updates; read from the element.
                  const el = e.currentTarget;
                  const selected = el.value.slice(
                    el.selectionStart,
                    el.selectionEnd,
                  );
                  const phrase = resolveHighlightPhrase(detailBody, selected);
                  if (!phrase) return;
                  onChangeHighlights(
                    addHighlightPhrase(detailBodyHighlights, phrase),
                  );
                }
              }}
              placeholder={
                index === 0
                  ? 'Opening paragraph for the book detail page…'
                  : `Paragraph ${index + 1}`
              }
            />
          </div>
        ))}
      </div>

      <div className={styles.detailBoldBlock}>
        <CookbookHighlightsEditor
          highlights={detailBodyHighlights}
          onChange={onChangeHighlights}
          label="Bold phrases"
          hint="These phrases appear in bold on the book detail page."
          placeholder="Or type a phrase to bold…"
          sourceText={detailBody}
          selectionText={selectionText}
          onBoldSelection={boldSelection}
        />
      </div>
    </div>
  );
}
