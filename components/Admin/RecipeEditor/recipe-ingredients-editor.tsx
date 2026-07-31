'use client';

import type { RecipeIngredientSection } from '@/lib/recipes/types';
import styles from './recipe-editor.module.css';

const EMPTY_SECTION: RecipeIngredientSection = { title: '', items: [] };

type RecipeIngredientsEditorProps = {
  sections: RecipeIngredientSection[];
  onChange: (sections: RecipeIngredientSection[]) => void;
  /** Prefix for input ids (e.g. "uk" / "us"). */
  idPrefix: string;
  /** Optional heading when not wrapped in locale tabs. */
  heading?: string;
};

function ensureSections(
  sections: RecipeIngredientSection[],
): RecipeIngredientSection[] {
  return sections.length > 0 ? sections : [{ ...EMPTY_SECTION, items: [] }];
}

export function RecipeIngredientsEditor({
  sections,
  onChange,
  idPrefix,
  heading,
}: RecipeIngredientsEditorProps) {
  const list = ensureSections(sections);

  const updateSection = (
    index: number,
    patch: Partial<RecipeIngredientSection>,
  ) => {
    onChange(
      list.map((section, i) =>
        i === index ? { ...section, ...patch } : section,
      ),
    );
  };

  const setItemsFromText = (index: number, text: string) => {
    updateSection(index, { items: text.split(/\r?\n/) });
  };

  const removeSection = (index: number) => {
    const next = list.filter((_, i) => i !== index);
    onChange(next.length > 0 ? next : [{ ...EMPTY_SECTION, items: [] }]);
  };

  const addSection = () => {
    onChange([...list, { ...EMPTY_SECTION, items: [] }]);
  };

  return (
    <div className={styles.ingredientLocaleColumn}>
      {heading ? (
        <h3 className={styles.ingredientLocaleHeading}>{heading}</h3>
      ) : null}
      <div className={styles.stack}>
        {list.map((section, index) => {
          const titleId = `${idPrefix}-ingredient-section-${index}-title`;
          const itemsId = `${idPrefix}-ingredient-section-${index}-items`;
          return (
            <div
              key={`${idPrefix}-section-${index}`}
              className={styles.ingredientSectionRow}
            >
              <div className={styles.stepNumber} aria-hidden>
                {index + 1}
              </div>
              <div className={styles.ingredientSectionBody}>
                <div className="field">
                  <label className="fieldLabel" htmlFor={titleId}>
                    Title
                  </label>
                  <input
                    id={titleId}
                    className="fieldInput"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(index, { title: e.target.value })
                    }
                    placeholder="e.g. For the sauce"
                  />
                </div>
                <div className="field">
                  <label className="fieldLabel" htmlFor={itemsId}>
                    Ingredients{' '}
                    <span className={styles.requiredMark} aria-hidden>
                      *
                    </span>
                  </label>
                  <p className={styles.sectionHint}>
                    Add ingredients, one per line
                  </p>
                  <textarea
                    id={itemsId}
                    className="fieldTextarea"
                    rows={8}
                    value={section.items.join('\n')}
                    onChange={(e) => setItemsFromText(index, e.target.value)}
                    placeholder={
                      '1 ripe banana\n2 tbsp peanut butter\n30g oats'
                    }
                    aria-required="true"
                  />
                </div>
                {list.length > 1 ? (
                  <button
                    type="button"
                    className={styles.iconRemove}
                    onClick={() => removeSection(index)}
                    title="Remove ingredient section"
                    aria-label={`Remove ingredient section ${index + 1}`}
                  >
                    ✕
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className={`btn btnGhost ${styles.addRowBtn}`}
        onClick={addSection}
      >
        + Add Ingredient Section
      </button>
    </div>
  );
}

export function emptyIngredientSections(): RecipeIngredientSection[] {
  return [{ title: '', items: [] }];
}

export function cloneIngredientSections(
  sections: RecipeIngredientSection[],
): RecipeIngredientSection[] {
  return sections.map((section) => ({
    title: section.title,
    items: [...section.items],
  }));
}

export function countIngredientLines(
  sections: RecipeIngredientSection[],
): number {
  return sections.reduce(
    (sum, section) => sum + section.items.filter((line) => line.trim()).length,
    0,
  );
}
