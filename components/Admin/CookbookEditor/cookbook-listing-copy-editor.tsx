'use client';

import { useCallback, useRef, useState } from 'react';
import { CookbookHighlightsEditor } from '@/components/Admin/CookbookEditor/cookbook-highlights-editor';
import {
  addHighlightPhrase,
  resolveHighlightPhrase,
} from '@/lib/cookbooks/highlight-text';
import styles from './cookbook-editor.module.css';

type CookbookListingCopyEditorProps = {
  body: string;
  bodyHighlights: string[];
  onChangeBody: (body: string) => void;
  onChangeHighlights: (bodyHighlights: string[]) => void;
};

export function CookbookListingCopyEditor({
  body,
  bodyHighlights,
  onChangeBody,
  onChangeHighlights,
}: CookbookListingCopyEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectionText, setSelectionText] = useState('');

  const syncSelection = useCallback(() => {
    const el = textareaRef.current;
    if (!el) {
      setSelectionText('');
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    setSelectionText(start === end ? '' : el.value.slice(start, end));
  }, []);

  const boldSelection = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const selected = el.value.slice(el.selectionStart, el.selectionEnd);
    const phrase = resolveHighlightPhrase(body, selected);
    if (!phrase) return;
    onChangeHighlights(addHighlightPhrase(bodyHighlights, phrase));
  }, [body, bodyHighlights, onChangeHighlights]);

  return (
    <>
      <div className={styles.sectionHeaderCol}>
        <h2 className="cardSectionTitle">Listing copy</h2>
        <p className={styles.sectionHint}>
          Shown on Our Books. Select a phrase and press Ctrl/⌘+B to bold it.
        </p>
      </div>
      <div className="cardForm">
        <div className="field">
          <textarea
            ref={textareaRef}
            className="fieldTextarea"
            rows={5}
            value={body}
            onChange={(e) => onChangeBody(e.target.value)}
            onSelect={syncSelection}
            onKeyUp={syncSelection}
            onMouseUp={syncSelection}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
                e.preventDefault();
                const el = e.currentTarget;
                const selected = el.value.slice(
                  el.selectionStart,
                  el.selectionEnd,
                );
                const phrase = resolveHighlightPhrase(body, selected);
                if (!phrase) return;
                onChangeHighlights(addHighlightPhrase(bodyHighlights, phrase));
              }
            }}
            placeholder="Short listing description"
          />
        </div>
        <CookbookHighlightsEditor
          highlights={bodyHighlights}
          onChange={onChangeHighlights}
          hint="These phrases appear in bold on the Our Books listing card."
          placeholder="Or type a phrase to bold…"
          sourceText={body}
          selectionText={selectionText}
          onBoldSelection={boldSelection}
        />
      </div>
    </>
  );
}
