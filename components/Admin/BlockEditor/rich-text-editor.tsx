'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import type { Editor } from '@tiptap/core';
import { useEffect, useId, useRef, useState } from 'react';
import { DS_TEXT_PRESETS } from '@/lib/design-system/color-presets';
import { DS_COLORS } from '@/lib/design-system/tokens';
import styles from './rich-text-editor.module.css';

const DEFAULT_TEXT_COLOR = DS_COLORS.grey[800];

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function normalizeHex(color: string): string {
  return color.trim().toLowerCase();
}

function isLightColor(hex: string): boolean {
  const value = hex.replace('#', '');
  if (value.length !== 6) return true;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.72;
}

function matchesPreset(
  value: string | undefined,
  presetValue: string,
): boolean {
  if (!presetValue) return !value;
  return normalizeHex(value ?? '') === normalizeHex(presetValue);
}

function ToolbarButton({
  active,
  title,
  onClick,
  children,
}: {
  active?: boolean;
  title?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={Boolean(active)}
      className={`${styles.toolbarBtn} ${active ? styles.toolbarBtnActive : ''}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function getActiveTextAlign(editor: Editor): string {
  if (editor.isActive({ textAlign: 'center' })) return 'center';
  if (editor.isActive({ textAlign: 'right' })) return 'right';
  if (editor.isActive({ textAlign: 'justify' })) return 'justify';
  return 'left';
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const [revision, setRevision] = useState(0);
  const customColorRef = useRef<HTMLInputElement>(null);
  const customColorId = useId();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        // TipTap v3 TrailingNode breaks bullet/ordered list toggles (empty item + cursor jump).
        trailingNode: false,
        link: {
          openOnClick: false,
          autolink: false,
          linkOnPaste: true,
          HTMLAttributes: { class: styles.richLink },
        },
      }),
      Highlight.configure({ multicolor: false }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['paragraph'],
      }),
    ],
    content: value || '<p></p>',
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    onSelectionUpdate: () => setRevision((n) => n + 1),
    onTransaction: () => setRevision((n) => n + 1),
    editorProps: {
      attributes: {
        class: styles.richEditor,
        ...(placeholder ? { 'data-placeholder': placeholder } : {}),
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p></p>', { emitUpdate: false });
    }
  }, [editor, value]);

  void revision;

  if (!editor) return null;

  const activeColor = editor.getAttributes('textStyle').color as
    string | undefined;
  const activePreset = DS_TEXT_PRESETS.find((preset) =>
    matchesPreset(activeColor, preset.value),
  );
  const isDefaultColor = !activeColor;
  const isCustomColor = Boolean(activeColor && !activePreset);
  const resolvedCustomColor = activeColor?.startsWith('#')
    ? activeColor
    : DEFAULT_TEXT_COLOR;
  const activeAlign = getActiveTextAlign(editor);

  const handleLink = () => {
    const previousUrl = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt(
      'Link URL (leave empty to remove)',
      previousUrl ?? 'https://',
    );
    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url.trim() })
      .run();
  };

  return (
    <div className={styles.richRoot}>
      <div className={styles.richToolbar}>
        <div className={styles.richToolbarGroup}>
          <ToolbarButton
            active={editor.isActive('bold')}
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            B
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive('italic')}
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            I
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive('underline')}
            title="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            U
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive('bulletList')}
            title="Bullet list"
            onClick={() =>
              editor.chain().focus().unsetTextAlign().toggleBulletList().run()
            }
          >
            • List
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive('orderedList')}
            title="Numbered list"
            onClick={() =>
              editor.chain().focus().unsetTextAlign().toggleOrderedList().run()
            }
          >
            1. List
          </ToolbarButton>
          <ToolbarButton
            active={editor.isActive('highlight')}
            title="Highlight"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            HL
          </ToolbarButton>
        </div>

        <span className={styles.richToolbarDivider} aria-hidden />

        <div className={styles.richToolbarGroup}>
          <ToolbarButton
            active={activeAlign === 'left'}
            title="Align left"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            ⬅
          </ToolbarButton>
          <ToolbarButton
            active={activeAlign === 'center'}
            title="Align center"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            ↔
          </ToolbarButton>
          <ToolbarButton
            active={activeAlign === 'right'}
            title="Align right"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            ➡
          </ToolbarButton>
          <ToolbarButton
            active={activeAlign === 'justify'}
            title="Justify"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          >
            ≡
          </ToolbarButton>
        </div>

        <span className={styles.richToolbarDivider} aria-hidden />

        <div className={styles.richColorRow}>
          {DS_TEXT_PRESETS.map((preset) => {
            const swatchColor = preset.value || DEFAULT_TEXT_COLOR;
            const active = matchesPreset(activeColor, preset.value);
            const showCheck =
              active && (!isLightColor(swatchColor) || !preset.value);

            return (
              <button
                key={preset.value || 'default'}
                type="button"
                title={preset.label}
                aria-label={preset.label}
                aria-pressed={active}
                className={`${styles.richSwatch} ${active ? styles.richSwatchActive : ''}`}
                style={{
                  background: swatchColor,
                  border:
                    swatchColor.toLowerCase() === '#ffffff'
                      ? '1px solid #efd8d8'
                      : undefined,
                }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  if (!preset.value) {
                    editor.chain().focus().unsetColor().run();
                    return;
                  }
                  editor.chain().focus().setColor(preset.value).run();
                }}
              >
                {showCheck ? (
                  <span className={styles.richSwatchCheck}>✓</span>
                ) : null}
              </button>
            );
          })}
          <button
            type="button"
            title={
              isCustomColor ? `Custom: ${resolvedCustomColor}` : 'Custom color'
            }
            aria-label="Custom color"
            className={`${styles.richCustomColorBtn} ${isCustomColor ? styles.richSwatchActive : ''}`}
            style={
              isCustomColor ? { background: resolvedCustomColor } : undefined
            }
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => customColorRef.current?.click()}
          >
            {isCustomColor ? null : '+'}
          </button>
          <input
            ref={customColorRef}
            id={customColorId}
            type="color"
            className={styles.richHiddenPicker}
            value={resolvedCustomColor}
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            tabIndex={-1}
            aria-hidden
          />
          <ToolbarButton
            active={isDefaultColor}
            title="Reset text color"
            onClick={() => editor.chain().focus().unsetColor().run()}
          >
            A
          </ToolbarButton>
        </div>

        <span className={styles.richToolbarDivider} aria-hidden />

        <div className={styles.richToolbarGroup}>
          <ToolbarButton
            active={editor.isActive('link')}
            title="Add or edit link"
            onClick={handleLink}
          >
            Link
          </ToolbarButton>
          {editor.isActive('link') ? (
            <ToolbarButton
              active
              title="Remove link"
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
              Unlink
            </ToolbarButton>
          ) : null}
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
