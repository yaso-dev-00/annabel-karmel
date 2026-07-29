"use client";

import { RecipeCookingInfoFields } from "@/components/Admin/RecipeEditor/recipe-cooking-info-fields";
import {
  RECIPE_YIELD_TYPES,
  type Recipe,
  type RecipeDifficulty,
  type RecipeYieldType,
} from "@/lib/recipes/types";
import styles from "./recipe-editor.module.css";

type RecipeAdditionalInfoFieldsProps = {
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: RecipeDifficulty;
  suitableForFreezing: boolean;
  yieldType?: RecipeYieldType;
  yieldValue?: string;
  onChange: <K extends keyof Recipe>(key: K, value: Recipe[K]) => void;
};

export function RecipeAdditionalInfoFields({
  prepTime,
  cookTime,
  servings,
  difficulty,
  suitableForFreezing,
  yieldType = "serves",
  yieldValue = "",
  onChange,
}: RecipeAdditionalInfoFieldsProps) {
  return (
    <div className={styles.stack}>
      <RecipeCookingInfoFields
        prepTime={prepTime}
        cookTime={cookTime}
        servings={servings}
        difficulty={difficulty}
        suitableForFreezing={suitableForFreezing}
        onChange={onChange}
      />
      <div className={styles.yieldRow}>
        <div className="field">
          <label className="fieldLabel" htmlFor="recipe-yield-type">
            Serves / Makes
          </label>
          <select
            id="recipe-yield-type"
            className="fieldSelect"
            value={yieldType}
            onChange={(e) => onChange("yield_type", e.target.value as RecipeYieldType)}
          >
            {RECIPE_YIELD_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="fieldLabel" htmlFor="recipe-yield-value">
            Yield <span className={styles.requiredMark} aria-hidden>*</span>
          </label>
          <input
            id="recipe-yield-value"
            className="fieldInput"
            value={yieldValue}
            onChange={(e) => onChange("yield_value", e.target.value)}
            placeholder="e.g. 20 cookies"
            aria-required="true"
          />
        </div>
      </div>
    </div>
  );
}
