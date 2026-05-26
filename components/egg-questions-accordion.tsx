"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "@/app/eggs-questions-answered/page.module.css";

export type EggQuestionItem = {
  title: string;
  paragraphs?: string[];
  /** Bold heading + body pairs (e.g. foods to avoid subsections). */
  subsections?: { heading: string; body: string }[];
};

type EggQuestionsAccordionProps = {
  items: EggQuestionItem[];
  /** Prefix items with "1.", "2.", etc. (matches advice-runny-eggs layout). */
  numbered?: boolean;
};

export function EggQuestionsAccordion({ items, numbered = false }: EggQuestionsAccordionProps) {
  const [openTitle, setOpenTitle] = useState<string | null>(() => items[0]?.title ?? null);

  const toggle = (title: string) => {
    setOpenTitle((current) => (current === title ? null : title));
  };

  return (
    <div className="mt-[28px] border border-[#d7d7d7] bg-white">
      {items.map((item, index) => {
        const isOpen = openTitle === item.title;
        const label = numbered ? `${index + 1}. ${item.title}` : item.title;

        return (
          <div key={item.title} className={styles.accordionRow}>
            <button
              type="button"
              onClick={() => toggle(item.title)}
              className={`${styles.accordionSummary}${isOpen ? ` ${styles.accordionSummaryOpen}` : ""}`}
            >
              <span aria-hidden="true" className={styles.accordionMarker}>
                {isOpen ? "−" : "+"}
              </span>
              {label}
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key={item.title}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className={styles.accordionBody}>
                    {item.subsections
                      ? item.subsections.map((section) => (
                          <div key={section.heading}>
                            <p className={`${styles.accordionBodyText} ${styles.accordionSubheading}`}>
                              <strong>{section.heading}</strong>
                            </p>
                            <p className={styles.accordionBodyText}>{section.body}</p>
                          </div>
                        ))
                      : item.paragraphs?.map((paragraph) => (
                          <p key={paragraph} className={styles.accordionBodyText}>
                            {paragraph}
                          </p>
                        ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
