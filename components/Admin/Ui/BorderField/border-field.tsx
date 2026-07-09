"use client";

import { useState } from "react";
import { CssLengthInput } from "@/components/Admin/Ui/CssLengthInput";
import { ColorField } from "@/components/Admin/Ui/ColorField";
import type { BlockSettings } from "@/lib/content-blocks/types";
import { hasIndividualBorder } from "@/lib/content-blocks/border";
import { DS_BORDER_PRESETS } from "@/lib/design-system/color-presets";
import { DS_COLORS } from "@/lib/design-system/tokens";
import styles from "../PaddingField/padding-field.module.css";

type BorderFieldProps = {
  settings: BlockSettings;
  onChange: (patch: Partial<BlockSettings>) => void;
  inputClassName?: string;
};

export function BorderField({ settings, onChange, inputClassName }: BorderFieldProps) {
  const [mode, setMode] = useState<"unified" | "sides">(() =>
    hasIndividualBorder(settings) ? "sides" : "unified",
  );

  const switchToUnified = () => {
    setMode("unified");
    onChange({
      border_width: settings.border_width,
      border_top: undefined,
      border_right: undefined,
      border_bottom: undefined,
      border_left: undefined,
    });
  };

  const switchToSides = () => {
    setMode("sides");
    const fallback = settings.border_width?.trim() || "1";
    onChange({
      border_width: undefined,
      border_top: settings.border_top ?? fallback,
      border_right: settings.border_right ?? fallback,
      border_bottom: settings.border_bottom ?? fallback,
      border_left: settings.border_left ?? fallback,
    });
  };

  const unifiedClass = inputClassName ? `${styles.unifiedInput} ${inputClassName}` : styles.unifiedInput;

  return (
    <div className={styles.root}>
      <div className={styles.modeRow}>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === "unified" ? styles.modeBtnActive : ""}`}
          onClick={switchToUnified}
        >
          All sides
        </button>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === "sides" ? styles.modeBtnActive : ""}`}
          onClick={switchToSides}
        >
          Per side
        </button>
      </div>

      <div className={styles.fieldRow}>
        <label className={styles.sideLabel} htmlFor="border-style">
          Style
        </label>
        <select
          id="border-style"
          className={unifiedClass}
          value={settings.border_style ?? ""}
          onChange={(e) =>
            onChange({
              border_style: (e.target.value || undefined) as BlockSettings["border_style"],
            })
          }
        >
          <option value="">Default</option>
          <option value="none">None</option>
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </div>

      <ColorField
        label="Border colour"
        value={settings.border_color}
        defaultColor={DS_COLORS.grey[300]}
        presets={DS_BORDER_PRESETS}
        onChange={(border_color) => onChange({ border_color })}
        compact
      />

      {mode === "unified" ? (
        <div className={styles.fieldRow}>
          <label className={styles.sideLabel} htmlFor="border-width">
            Width
          </label>
          <CssLengthInput
            value={settings.border_width}
            onChange={(border_width) => onChange({ border_width })}
            placeholder="1"
            inputClassName={unifiedClass}
            ariaLabel="Border width"
          />
        </div>
      ) : (
        <div className={styles.sidesGrid}>
          {(
            [
              { side: "top", className: styles.sideTop },
              { side: "left", className: styles.sideLeft },
              { side: "right", className: styles.sideRight },
              { side: "bottom", className: styles.sideBottom },
            ] as const
          ).map(({ side, className }) => {
            const key = `border_${side}` as const;
            return (
              <div key={side} className={`${styles.sideCell} ${className}`}>
                <span className={styles.sideLabel}>{side}</span>
                <CssLengthInput
                  value={settings[key]}
                  onChange={(value) => onChange({ [key]: value })}
                  placeholder="1"
                  compact
                  ariaLabel={`Border ${side}`}
                />
              </div>
            );
          })}
          <div className={styles.sideCenter} aria-hidden />
        </div>
      )}
    </div>
  );
}
