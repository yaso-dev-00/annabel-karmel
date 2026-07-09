"use client";

import { useState } from "react";
import {
  DS_COLORS,
  DS_GRID,
  DS_RADIUS,
  DS_SHADOW,
  DS_TYPOGRAPHY,
  RADIUS_PRESETS,
  SHADOW_PRESETS,
} from "@/lib/design-system/tokens";
import styles from "./design-system-panel.module.css";

const RASPBERRY_STEPS = Object.entries(DS_COLORS.raspberry) as [string, string][];
const GREY_STEPS = Object.entries(DS_COLORS.grey) as [string, string][];

export function DesignSystemPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="card">
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={styles.toggleTitle}>Design system</span>
        <span className={styles.toggleHint}>Colours · Type · Radius · Shadow · Grid</span>
        <span className={styles.chevron}>{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <div className={styles.body}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Colours</h3>
            <div className={styles.coreRow}>
              {[
                { label: "Primary", color: DS_COLORS.primary },
                { label: "Success", color: DS_COLORS.success },
                { label: "Warning", color: DS_COLORS.warning },
                { label: "Error", color: DS_COLORS.error },
              ].map((item) => (
                <div key={item.label} className={styles.coreSwatch}>
                  <span className={styles.swatch} style={{ background: item.color }} />
                  <span className={styles.swatchLabel}>{item.label}</span>
                  <span className={styles.swatchHex}>{item.color}</span>
                </div>
              ))}
            </div>
            <p className={styles.scaleTitle}>Raspberry</p>
            <div className={styles.scaleRow}>
              {RASPBERRY_STEPS.map(([step, color]) => (
                <div key={step} className={styles.scaleSwatch} title={`Raspberry ${step}: ${color}`}>
                  <span className={styles.swatch} style={{ background: color }} />
                  <span className={styles.scaleStep}>{step}</span>
                </div>
              ))}
            </div>
            <p className={styles.scaleTitle}>Grey</p>
            <div className={styles.scaleRow}>
              {GREY_STEPS.map(([step, color]) => (
                <div key={step} className={styles.scaleSwatch} title={`Grey ${step}: ${color}`}>
                  <span className={styles.swatch} style={{ background: color }} />
                  <span className={styles.scaleStep}>{step}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Typography</h3>
            <div className={styles.typeRow}>
              {Object.values(DS_TYPOGRAPHY).map((font) => (
                <div key={font.id} className={styles.typeCard}>
                  <span className={styles.typeSample} style={{ fontFamily: font.fontFamily }}>
                    {font.sample}
                  </span>
                  <span className={styles.typeName}>{font.label}</span>
                  <span className={styles.typeHint}>
                    {font.id === "primary" ? "Montserrat" : "Playfair Display"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Radius</h3>
            <div className={styles.radiusRow}>
              {RADIUS_PRESETS.map((preset) => {
                const token = DS_RADIUS[preset];
                return (
                  <div key={preset} className={styles.radiusCard}>
                    <span
                      className={styles.radiusPreview}
                      style={{ borderRadius: token.value === "999px" ? "50%" : token.value }}
                    />
                    <span className={styles.radiusValue}>{token.value}</span>
                    <span className={styles.radiusLabel}>{token.label}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Shadows</h3>
            <div className={styles.shadowRow}>
              {SHADOW_PRESETS.filter((p) => p !== "none").map((preset) => (
                <div key={preset} className={styles.shadowCard}>
                  <span className={styles.shadowDisc} style={{ boxShadow: DS_SHADOW[preset].value }} />
                  <span className={styles.shadowLabel}>{DS_SHADOW[preset].label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Grid</h3>
            <div className={styles.gridRow}>
              <div className={styles.gridCard}>
                <span className={`${styles.gridShape} ${styles.gridMobile}`} />
                <span className={styles.gridLabel}>{DS_GRID.mobile.label}</span>
                <span className={styles.gridHint}>≤ {DS_GRID.mobile.maxWidth}</span>
              </div>
              <div className={styles.gridCard}>
                <span className={`${styles.gridShape} ${styles.gridTablet}`} />
                <span className={styles.gridLabel}>{DS_GRID.tablet.label}</span>
                <span className={styles.gridHint}>≤ {DS_GRID.tablet.maxWidth}</span>
              </div>
              <div className={styles.gridCard}>
                <span className={`${styles.gridShape} ${styles.gridDesktop}`} />
                <span className={styles.gridLabel}>{DS_GRID.desktop.label}</span>
                <span className={styles.gridHint}>≥ {DS_GRID.desktop.minWidth}</span>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
