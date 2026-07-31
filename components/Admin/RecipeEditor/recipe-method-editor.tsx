'use client';

import type { RecipeStep } from '@/lib/recipes/types';
import styles from './recipe-editor.module.css';

type RecipeMethodEditorProps = {
  steps: RecipeStep[];
  onChange: (steps: RecipeStep[]) => void;
  /** Prefix for input ids (e.g. "uk" / "us"). */
  idPrefix: string;
  /** Optional heading when not wrapped in locale tabs. */
  heading?: string;
};

function linesToSteps(text: string, previous: RecipeStep[]): RecipeStep[] {
  const lines = text.split(/\r?\n/);
  return lines.map((line, index) => {
    const prev = previous[index];
    return {
      text: line,
      ...(prev?.image ? { image: prev.image } : {}),
      ...(prev?.image_alt ? { image_alt: prev.image_alt } : {}),
    };
  });
}

export function RecipeMethodEditor({
  steps,
  onChange,
  idPrefix,
  heading,
}: RecipeMethodEditorProps) {
  const fieldId = `${idPrefix}-method-steps`;
  const value = steps.map((step) => step.text).join('\n');
  const stepCount = steps.filter((step) => step.text.trim()).length;

  return (
    <div className={styles.ingredientLocaleColumn}>
      {heading ? (
        <h3 className={styles.ingredientLocaleHeading}>{heading}</h3>
      ) : null}
      <div className="field">
        <label className="fieldLabel" htmlFor={fieldId}>
          Steps{' '}
          <span className={styles.requiredMark} aria-hidden>
            *
          </span>
        </label>
        <p className={styles.sectionHint}>Add method steps, one per line</p>
        <textarea
          id={fieldId}
          className="fieldTextarea"
          rows={12}
          value={value}
          onChange={(e) => onChange(linesToSteps(e.target.value, steps))}
          placeholder={
            'Preheat the oven to 180C Fan.\nBlend until smooth.\nBake for 10 minutes until pale golden.'
          }
          aria-required="true"
        />
        <p className={styles.sectionMeta}>{stepCount} steps</p>
      </div>
    </div>
  );
}

export function cloneSteps(list: RecipeStep[]): RecipeStep[] {
  return list.map((step) => ({ ...step }));
}

export function countMethodSteps(steps: RecipeStep[]): number {
  return steps.filter((step) => step.text.trim()).length;
}
