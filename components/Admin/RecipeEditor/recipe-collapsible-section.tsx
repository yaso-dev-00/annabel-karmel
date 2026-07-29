"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./recipe-editor.module.css";

type RecipeCollapsibleSectionProps = {
  title: string;
  hint?: string;
  meta?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  id?: string;
};

export function RecipeCollapsibleSection({
  title,
  hint,
  meta,
  defaultOpen = true,
  children,
  id,
}: RecipeCollapsibleSectionProps) {
  const reactId = useId();
  const panelId = id ?? `recipe-section-${reactId}`;
  const headingId = `${panelId}-heading`;
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={`card ${styles.collapsibleCard}`} id={panelId}>
      <button
        type="button"
        className={styles.collapsibleHeader}
        aria-expanded={open}
        aria-controls={`${panelId}-panel`}
        id={headingId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.collapsibleHeaderText}>
          <span className={styles.collapsibleTitle}>{title}</span>
          {meta ? <span className={styles.sectionMetaInline}>{meta}</span> : null}
          {hint ? <span className={styles.collapsibleHint}>{hint}</span> : null}
        </span>
        <span className={styles.collapsibleChevron} aria-hidden>
          {open ? "▾" : "▸"}
        </span>
      </button>
      {open ? (
        <div
          id={`${panelId}-panel`}
          role="region"
          aria-labelledby={headingId}
          className={styles.collapsibleBody}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
