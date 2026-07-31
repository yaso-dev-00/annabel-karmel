'use client';

import type { RecipeSchema } from '@/lib/recipes/types';
import styles from './recipe-editor.module.css';

type RecipeSchemaFieldsProps = {
  schema?: RecipeSchema;
  onChange: (schema: RecipeSchema) => void;
};

export function RecipeSchemaFields({
  schema = {},
  onChange,
}: RecipeSchemaFieldsProps) {
  const patch = <K extends keyof RecipeSchema>(
    key: K,
    value: RecipeSchema[K],
  ) => {
    onChange({ ...schema, [key]: value });
  };

  return (
    <div className="cardForm">
      <div className="field">
        <label className="fieldLabel" htmlFor="schema-aggregate-rating">
          Aggregate Rating
        </label>
        <input
          id="schema-aggregate-rating"
          className="fieldInput"
          value={schema.aggregate_rating ?? ''}
          onChange={(e) => patch('aggregate_rating', e.target.value)}
        />
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="schema-keywords">
          Keywords
        </label>
        <input
          id="schema-keywords"
          className="fieldInput"
          value={schema.keywords ?? ''}
          onChange={(e) => patch('keywords', e.target.value)}
        />
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="schema-cooking-time">
          Cooking Time
        </label>
        <p className={styles.fieldHint}>
          Use format e.g. PT15M (indicates 15 min)
        </p>
        <input
          id="schema-cooking-time"
          className="fieldInput"
          value={schema.cooking_time ?? ''}
          onChange={(e) => patch('cooking_time', e.target.value)}
          placeholder="PT15M"
          spellCheck={false}
        />
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="schema-prep-time">
          Preparation Time
        </label>
        <p className={styles.fieldHint}>
          Use format e.g. PT15M (indicates 15 min)
        </p>
        <input
          id="schema-prep-time"
          className="fieldInput"
          value={schema.preparation_time ?? ''}
          onChange={(e) => patch('preparation_time', e.target.value)}
          placeholder="PT15M"
          spellCheck={false}
        />
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="schema-cuisine">
          Recipe Cuisine
        </label>
        <p className={styles.fieldHint}>
          The cuisine of the recipe (for example, French or Ethiopian).
        </p>
        <input
          id="schema-cuisine"
          className="fieldInput"
          value={schema.recipe_cuisine ?? ''}
          onChange={(e) => patch('recipe_cuisine', e.target.value)}
        />
      </div>
      <div className="field">
        <label className="fieldLabel" htmlFor="schema-nutrition">
          Nutrition
        </label>
        <p className={styles.fieldHint}>
          Nutrition information about the recipe or menu item.
        </p>
        <input
          id="schema-nutrition"
          className="fieldInput"
          value={schema.nutrition ?? ''}
          onChange={(e) => patch('nutrition', e.target.value)}
        />
      </div>
    </div>
  );
}
