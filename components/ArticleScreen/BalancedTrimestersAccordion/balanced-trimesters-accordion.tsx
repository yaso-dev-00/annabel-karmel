"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "@/app/balanced-diet-throughout-trimesters/page.module.css";

export type TrimesterAccordionItem = {
  title: string;
  paragraphs: Array<
    | string
    | {
        segments: Array<
          | string
          | {
              label: string;
              href: string;
            }
        >;
      }
  >;
};

type BalancedTrimestersAccordionProps = {
  items: TrimesterAccordionItem[];
};

export function BalancedTrimestersAccordion({ items }: BalancedTrimestersAccordionProps) {
  const [openTitle, setOpenTitle] = useState<string | null>(() => items[0]?.title ?? null);

  const toggle = (title: string) => {
    setOpenTitle((current) => (current === title ? null : title));
  };

  return (
    <div className="mt-[14px] border border-[#d7d7d7] bg-white">
      {items.map((item) => {
        const isOpen = openTitle === item.title;

        return (
          <div key={item.title} className={styles.accordionRow}>
            <button
              type="button"
              onClick={() => toggle(item.title)}
              className={`${styles.accordionSummary}${isOpen ? ` ${styles.accordionSummaryOpen}` : ""}`}
            >
              <span aria-hidden="true" className={styles.accordionMarker}>
                {isOpen ? "-" : "+"}
              </span>
              {item.title}
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
                    {item.paragraphs.map((paragraph) => {
                      if (typeof paragraph === "string") {
                        return (
                          <p key={paragraph} className={styles.body}>
                            {paragraph}
                          </p>
                        );
                      }

                      return (
                        <p
                          key={paragraph.segments
                            .map((segment) => (typeof segment === "string" ? segment : `${segment.label}-${segment.href}`))
                            .join("|")}
                          className={styles.body}
                        >
                          {paragraph.segments.map((segment) =>
                            typeof segment === "string" ? (
                              segment
                            ) : (
                              <a
                                key={`${segment.label}-${segment.href}`}
                                href={segment.href}
                                target="_blank"
                                rel="noopener"
                                className={styles.link}
                              >
                                {segment.label}
                              </a>
                            ),
                          )}
                        </p>
                      );
                    })}
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
