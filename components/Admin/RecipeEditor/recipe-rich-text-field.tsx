'use client';

import { RichTextEditor } from '@/components/Admin/BlockEditor/rich-text-editor';
import styles from './recipe-editor.module.css';

type RecipeRichTextFieldProps = {
  id?: string;
  label: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  hint?: string;
};

export function RecipeRichTextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
}: RecipeRichTextFieldProps) {
  return (
    <div className="field">
      <label className="fieldLabel" htmlFor={id}>
        {label}
      </label>
      {hint ? <p className={styles.fieldHint}>{hint}</p> : null}
      <div id={id}>
        <RichTextEditor
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
