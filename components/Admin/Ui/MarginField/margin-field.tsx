"use client";

import { useState } from "react";
import { CssLengthInput } from "@/components/Admin/Ui/CssLengthInput";
import type { BlockSettings } from "@/lib/content-blocks/types";
import { isCssLengthShorthand } from "@/lib/content-blocks/css-length";
import { hasIndividualMargin } from "@/lib/content-blocks/margin";
import styles from "../PaddingField/padding-field.module.css";

type MarginFieldProps = {
  settings: BlockSettings;
  onChange: (patch: Partial<BlockSettings>) => void;
  inputClassName?: string;
};

export function MarginField({ settings, onChange, inputClassName }: MarginFieldProps) {
  const [mode, setMode] = useState<"unified" | "sides">(() =>
    hasIndividualMargin(settings) || isCssLengthShorthand(settings.margin) ? "sides" : "unified",
  );

  const switchToUnified = () => {
    setMode("unified");
    onChange({
      margin: settings.margin,
      margin_top: undefined,
      margin_right: undefined,
      margin_bottom: undefined,
      margin_left: undefined,
    });
  };

  const switchToSides = () => {
    setMode("sides");
    const fallback = settings.margin?.trim() || "";
    onChange({
      margin: undefined,
      margin_top: settings.margin_top ?? fallback,
      margin_right: settings.margin_right ?? fallback,
      margin_bottom: settings.margin_bottom ?? fallback,
      margin_left: settings.margin_left ?? fallback,
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
            value={settings.margin}
            onChange={(margin) =>
              onChange({
                margin,
                margin_top: undefined,
                margin_right: undefined,
                margin_bottom: undefined,
                margin_left: undefined,
              })
            }
            placeholder="0"
            inputClassName={inputClassName}
            allowAuto
          />
          <p className={styles.hint}>Outer space around the block. Use auto for horizontal centering.</p>
        </>
      ) : (
        <>
          <div className={styles.sidesGrid}>
            <div className={`${styles.sideCell} ${styles.sideTop}`}>
              <span className={styles.sideLabel}>Top</span>
              <CssLengthInput
                value={settings.margin_top}
                onChange={(margin_top) => onChange({ margin_top, margin: undefined })}
                placeholder="0"
                compact
                allowAuto
                ariaLabel="Margin top"
              />
            </div>
            <div className={`${styles.sideCell} ${styles.sideLeft}`}>
              <span className={styles.sideLabel}>Left</span>
              <CssLengthInput
                value={settings.margin_left}
                onChange={(margin_left) => onChange({ margin_left, margin: undefined })}
                placeholder="auto"
                compact
                allowAuto
                ariaLabel="Margin left"
              />
            </div>
            <div className={styles.sideCenter} aria-hidden />
            <div className={`${styles.sideCell} ${styles.sideRight}`}>
              <span className={styles.sideLabel}>Right</span>
              <CssLengthInput
                value={settings.margin_right}
                onChange={(margin_right) => onChange({ margin_right, margin: undefined })}
                placeholder="auto"
                compact
                allowAuto
                ariaLabel="Margin right"
              />
            </div>
            <div className={`${styles.sideCell} ${styles.sideBottom}`}>
              <span className={styles.sideLabel}>Bottom</span>
              <CssLengthInput
                value={settings.margin_bottom}
                onChange={(margin_bottom) => onChange({ margin_bottom, margin: undefined })}
                placeholder="0"
                compact
                allowAuto
                ariaLabel="Margin bottom"
              />
            </div>
          </div>
          <p className={styles.hint}>Set top, right, bottom, and left independently.</p>
        </>
      )}
    </div>
  );
}
