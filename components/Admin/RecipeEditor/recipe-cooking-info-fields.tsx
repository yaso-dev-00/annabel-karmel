'use client';

import {
  formatRecipeTime,
  parseRecipeTime,
  type RecipeTimeUnit,
} from '@/lib/recipes/recipe-cooking-field-format';
import {
  RECIPE_DIFFICULTIES,
  type Recipe,
  type RecipeDifficulty,
} from '@/lib/recipes/types';
import styles from './recipe-editor.module.css';

type RecipeCookingInfoFieldsProps = {
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: RecipeDifficulty;
  suitableForFreezing: boolean;
  onChange: <K extends keyof Recipe>(key: K, value: Recipe[K]) => void;
};

function TimeField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const parsed = parseRecipeTime(value);

  const update = (amount: string, unit: RecipeTimeUnit) => {
    onChange(formatRecipeTime(amount, unit));
  };

  return (
    <div className="field">
      <label className="fieldLabel" htmlFor={id}>
        {label}
      </label>
      <div className={styles.quantityBar}>
        <input
          id={id}
          className={styles.quantityBarInput}
          type="number"
          min={0}
          step={1}
          inputMode="numeric"
          value={parsed.amount}
          onChange={(e) => update(e.target.value, parsed.unit)}
          placeholder="15"
          aria-label={label}
        />
        <select
          className={styles.quantityBarUnit}
          value={parsed.unit}
          onChange={(e) =>
            update(parsed.amount, e.target.value as RecipeTimeUnit)
          }
          aria-label={`${label} unit`}
        >
          <option value="mins">mins</option>
          <option value="hours">hours</option>
        </select>
      </div>
    </div>
  );
}

function ServingsField({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="field">
      <label className="fieldLabel" htmlFor="recipe-servings">
        Servings / portions
      </label>
      <input
        id="recipe-servings"
        className="fieldInput"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. 3 portions, Makes 12, Serves 4"
        aria-label="Servings or portions"
      />
    </div>
  );
}

export function RecipeCookingInfoFields({
  prepTime,
  cookTime,
  servings,
  difficulty,
  suitableForFreezing,
  onChange,
}: RecipeCookingInfoFieldsProps) {
  return (
    <div className={styles.cookingInfoSection}>
      <div className={styles.cookingInfoGrid}>
        <TimeField
          id="recipe-prep-time"
          label="Prep time"
          value={prepTime}
          onChange={(next) => onChange('prep_time', next)}
        />
        <TimeField
          id="recipe-cook-time"
          label="Cook time"
          value={cookTime}
          onChange={(next) => onChange('cook_time', next)}
        />
        <ServingsField
          value={servings}
          onChange={(next) => onChange('servings', next)}
        />
        <div className="field">
          <label className="fieldLabel" htmlFor="recipe-difficulty">
            Difficulty
          </label>
          <select
            id="recipe-difficulty"
            className="fieldSelect"
            value={difficulty}
            onChange={(e) =>
              onChange('difficulty', e.target.value as RecipeDifficulty)
            }
          >
            {RECIPE_DIFFICULTIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.cookingInfoFlags}>
        <label className={styles.cookingInfoFlag}>
          <input
            type="checkbox"
            checked={suitableForFreezing}
            onChange={(e) =>
              onChange('suitable_for_freezing', e.target.checked)
            }
          />
          <span>Suitable for freezing</span>
        </label>
      </div>
    </div>
  );
}
