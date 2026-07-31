'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styles from '@/app/allergies-with-professor-adam-fox/page.module.css';

type Segment = string | { label: string; href: string };

type Paragraph =
  | string
  | { segments: Segment[] }
  | { intro: string; bullets: string[]; compact?: boolean }
  | { emphasis: string; compact?: boolean };

export type AdamFoxAccordionItem = {
  title: string;
  paragraphs: Paragraph[];
};

type AdamFoxAllergiesAccordionProps = {
  items: AdamFoxAccordionItem[];
};

export function AdamFoxAllergiesAccordion({
  items,
}: AdamFoxAllergiesAccordionProps) {
  const [openTitle, setOpenTitle] = useState<string | null>(
    () => items[0]?.title ?? null,
  );

  const toggle = (title: string) => {
    setOpenTitle((current) => (current === title ? null : title));
  };

  return (
    <div className="mt-[20px] border border-[#d7d7d7] bg-white">
      {items.map((item) => {
        const isOpen = openTitle === item.title;

        return (
          <div key={item.title} className={styles.accordionRow}>
            <button
              type="button"
              onClick={() => toggle(item.title)}
              className={`${styles.accordionSummary}${isOpen ? ` ${styles.accordionSummaryOpen}` : ''}`}
            >
              <span aria-hidden="true" className={styles.accordionMarker}>
                {isOpen ? '-' : '+'}
              </span>
              {item.title}
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key={item.title}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={styles.accordionBody}>
                    {item.paragraphs.map((paragraph, index) => {
                      if (typeof paragraph === 'string') {
                        return (
                          <p
                            key={`${item.title}-${index}`}
                            className={styles.accordionBodyText}
                          >
                            {paragraph}
                          </p>
                        );
                      }

                      if ('segments' in paragraph) {
                        return (
                          <p
                            key={`${item.title}-${index}`}
                            className={styles.accordionBodyText}
                          >
                            {paragraph.segments.map((segment) =>
                              typeof segment === 'string' ? (
                                segment
                              ) : (
                                <a
                                  key={`${segment.href}-${segment.label}`}
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
                      }

                      if ('intro' in paragraph) {
                        const compact = paragraph.compact === true;
                        const textClass = compact
                          ? `${styles.accordionBodyText} ${styles.symptomsText20}`
                          : styles.accordionBodyText;
                        const listClass = compact
                          ? `${styles.bulletList} ${styles.symptomsText20}`
                          : styles.bulletList;
                        return (
                          <div key={`${item.title}-${index}`}>
                            {paragraph.intro.trim() ? (
                              <p
                                className={`${textClass} text-[22px]! mb-[30px]!`}
                              >
                                {paragraph.intro}
                              </p>
                            ) : null}
                            <ul className={listClass}>
                              {paragraph.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      }

                      return (
                        <p
                          key={`${item.title}-${index}`}
                          className={`${styles.emphasis}${paragraph.compact ? ` ${styles.symptomsText20}` : ''} text-[22px]! mb-[30px]! mt-[30px]!`}
                        >
                          {paragraph.emphasis}
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
