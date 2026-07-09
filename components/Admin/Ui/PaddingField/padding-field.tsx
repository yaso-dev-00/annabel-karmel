"use client";

import { useState } from "react";
import { CssLengthInput } from "@/components/Admin/Ui/CssLengthInput";
import type { BlockSettings } from "@/lib/content-blocks/types";
import { isCssLengthShorthand } from "@/lib/content-blocks/css-length";
import { hasIndividualPadding } from "@/lib/content-blocks/padding";
import styles from "./padding-field.module.css";

type PaddingFieldProps = {
  settings: BlockSettings;
  onChange: (patch: Partial<BlockSettings>) => void;
  inputClassName?: string;
};

export function PaddingField({ settings, onChange, inputClassName }: PaddingFieldProps) {
  const [mode, setMode] = useState<"unified" | "sides">(() =>
    hasIndividualPadding(settings) || isCssLengthShorthand(settings.padding) ? "sides" : "unified",
  );

  const switchToUnified = () => {
    setMode("unified");
    onChange({
      padding: settings.padding,
      padding_top: undefined,
      padding_right: undefined,
      padding_bottom: undefined,
      padding_left: undefined,
    });
  };

  const switchToSides = () => {
    setMode("sides");
    const fallback = settings.padding?.trim() || "";
    onChange({
      padding: undefined,
      padding_top: settings.padding_top ?? fallback,
      padding_right: settings.padding_right ?? fallback,
      padding_bottom: settings.padding_bottom ?? fallback,
      padding_left: settings.padding_left ?? fallback,
    });
  };

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

      {mode === "unified" ? (
        <>
          <CssLengthInput
            value={settings.padding}
            onChange={(padding) =>
              onChange({
                padding,
                padding_top: undefined,
                padding_right: undefined,
                padding_bottom: undefined,
                padding_left: undefined,
              })
            }
            placeholder="0"
            inputClassName={inputClassName}
          />
          <p className={styles.hint}>Same value on all sides. Choose unit from the dropdown (default px).</p>
        </>
      ) : (
        <>
          <div className={styles.sidesGrid}>
            <div className={`${styles.sideCell} ${styles.sideTop}`}>
              <span className={styles.sideLabel}>Top</span>
              <CssLengthInput
                value={settings.padding_top}
                onChange={(padding_top) => onChange({ padding_top, padding: undefined })}
                placeholder="0"
                compact
                ariaLabel="Padding top"
              />
            </div>
            <div className={`${styles.sideCell} ${styles.sideLeft}`}>
              <span className={styles.sideLabel}>Left</span>
              <CssLengthInput
                value={settings.padding_left}
                onChange={(padding_left) => onChange({ padding_left, padding: undefined })}
                placeholder="0"
                compact
                ariaLabel="Padding left"
              />
            </div>
            <div className={styles.sideCenter} aria-hidden />
            <div className={`${styles.sideCell} ${styles.sideRight}`}>
              <span className={styles.sideLabel}>Right</span>
              <CssLengthInput
                value={settings.padding_right}
                onChange={(padding_right) => onChange({ padding_right, padding: undefined })}
                placeholder="0"
                compact
                ariaLabel="Padding right"
              />
            </div>
            <div className={`${styles.sideCell} ${styles.sideBottom}`}>
              <span className={styles.sideLabel}>Bottom</span>
              <CssLengthInput
                value={settings.padding_bottom}
                onChange={(padding_bottom) => onChange({ padding_bottom, padding: undefined })}
                placeholder="0"
                compact
                ariaLabel="Padding bottom"
              />
            </div>
          </div>
          <p className={styles.hint}>Set top, right, bottom, and left independently.</p>
        </>
      )}
    </div>
  );
}
