"use client";

import type { RecipeIngredient } from "@/lib/recipes/types";
import { RECIPE_INGREDIENT_UNITS } from "@/lib/recipes/types";
import styles from "./recipe-editor.module.css";

type RecipeIngredientsEditorProps = {
  ingredients: RecipeIngredient[];
  onChange: (ingredients: RecipeIngredient[]) => void;
};

export function RecipeIngredientsEditor({
  ingredients,
  onChange,
}: RecipeIngredientsEditorProps) {
  const updateRow = (index: number, patch: Partial<RecipeIngredient>) => {
    onChange(ingredients.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const removeRow = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  const addRow = () => {
    onChange([...ingredients, { qty: "", unit: "g", item: "" }]);
  };

  return (
    <div className="card">
      <div className={styles.sectionHeader}>
        <h2 className="cardSectionTitle">Ingredients</h2>
        <span className={styles.sectionMeta}>{ingredients.length} items</span>
      </div>
      <div className={styles.stack}>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientRow}>
            <input
              className="fieldInput"
              value={ingredient.qty}
              onChange={(e) => updateRow(index, { qty: e.target.value })}
              placeholder="Qty"
              aria-label={`Ingredient ${index + 1} quantity`}
            />
            <select
              className="fieldSelect"
              value={ingredient.unit}
              onChange={(e) => updateRow(index, { unit: e.target.value })}
              aria-label={`Ingredient ${index + 1} unit`}
            >
              {RECIPE_INGREDIENT_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            <input
              className="fieldInput"
              value={ingredient.item}
              onChange={(e) => updateRow(index, { item: e.target.value })}
              placeholder="Ingredient"
              aria-label={`Ingredient ${index + 1} name`}
            />
            <button
              type="button"
              className={styles.iconRemove}
              onClick={() => removeRow(index)}
              title="Remove ingredient"
              aria-label={`Remove ingredient ${index + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button type="button" className={`btn btnGhost ${styles.addRowBtn}`} onClick={addRow}>
        + Add ingredient
      </button>
    </div>
  );
}
