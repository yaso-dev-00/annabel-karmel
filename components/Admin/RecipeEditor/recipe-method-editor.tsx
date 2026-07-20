"use client";

import { ImageField } from "@/components/Admin/Ui/ImageField";
import type { RecipeStep } from "@/lib/recipes/types";
import styles from "./recipe-editor.module.css";

type RecipeMethodEditorProps = {
  steps: RecipeStep[];
  onChange: (steps: RecipeStep[]) => void;
};

export function RecipeMethodEditor({ steps, onChange }: RecipeMethodEditorProps) {
  const updateStep = (index: number, patch: Partial<RecipeStep>) => {
    onChange(steps.map((step, i) => (i === index ? { ...step, ...patch } : step)));
  };

  const removeStep = (index: number) => {
    onChange(steps.filter((_, i) => i !== index));
  };

  const addStep = () => {
    onChange([...steps, { text: "" }]);
  };

  return (
    <div className="card">
      <div className={styles.sectionHeader}>
        <h2 className="cardSectionTitle">Method</h2>
        <span className={styles.sectionMeta}>
          {steps.length} steps · each step can carry its own photo
        </span>
      </div>
      <div className={styles.stack}>
        {steps.map((step, index) => (
          <div key={index} className={styles.methodRow}>
            <div className={styles.stepNumber} aria-hidden>
              {index + 1}
            </div>
            <div className={styles.methodBody}>
              <textarea
                className="fieldTextarea"
                rows={2}
                value={step.text}
                onChange={(e) => updateStep(index, { text: e.target.value })}
                placeholder="Describe this step…"
                aria-label={`Method step ${index + 1}`}
              />
              <ImageField
                value={step.image ?? ""}
                alt={step.image_alt}
                showAlt={Boolean(step.image)}
                altLabel="Step photo alt"
                onChange={(src, altVal) =>
                  updateStep(index, {
                    image: src || undefined,
                    image_alt: altVal || undefined,
                  })
                }
                onAltChange={(altVal) => updateStep(index, { image_alt: altVal })}
              />
            </div>
            <button
              type="button"
              className={styles.iconRemove}
              onClick={() => removeStep(index)}
              title="Remove step"
              aria-label={`Remove step ${index + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button type="button" className={`btn btnGhost ${styles.addRowBtn}`} onClick={addStep}>
        + Add step
      </button>
    </div>
  );
}
