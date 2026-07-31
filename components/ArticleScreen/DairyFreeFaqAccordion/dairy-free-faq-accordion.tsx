'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import styles from '@/app/dairy-free-diet-cows-milk-protein-allergy/page.module.css';

export type DairyFaqItem = {
  question: string;
  paragraphs?: Array<
    | string
    | {
        heading: string;
        text: string;
      }
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
  bullets?: Array<
    | string
    | {
        label: string;
        href: string;
      }
  >;
};

type DairyFreeFaqAccordionProps = {
  items: DairyFaqItem[];
};

export function DairyFreeFaqAccordion({ items }: DairyFreeFaqAccordionProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const toggledButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousButtonTopRef = useRef<number | null>(null);

  const onToggle = (question: string, button: HTMLButtonElement) => {
    toggledButtonRef.current = button;
    previousButtonTopRef.current = button.getBoundingClientRect().top;
    setOpenQuestion((current) => (current === question ? null : question));
  };

  useLayoutEffect(() => {
    if (!toggledButtonRef.current || previousButtonTopRef.current === null) {
      return;
    }

    const nextTop = toggledButtonRef.current.getBoundingClientRect().top;
    const delta = nextTop - previousButtonTopRef.current;

    if (Math.abs(delta) > 1) {
      window.scrollBy({ top: delta, left: 0, behavior: 'auto' });
    }

    toggledButtonRef.current = null;
    previousButtonTopRef.current = null;
  }, [openQuestion]);

  return (
    <div className="mt-[24px] border border-[#c8c8c8] bg-white">
      {items.map((item) => {
        const isOpen = openQuestion === item.question;
        return (
          <div key={item.question} className={styles.faqRow}>
            <button
              type="button"
              onClick={(event) => onToggle(item.question, event.currentTarget)}
              className={`${styles.faqSummary}${isOpen ? ` ${styles.faqSummaryOpen}` : ''}`}
            >
              <span className={styles.faqMarker}>{isOpen ? '-' : '+'}</span>
              {item.question}
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key={item.question}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={styles.faqBody}>
                    {item.paragraphs?.map((paragraph) => {
                      if (typeof paragraph === 'string') {
                        return (
                          <p key={paragraph} className={styles.faqText}>
                            {paragraph}
                          </p>
                        );
                      }

                      if ('heading' in paragraph) {
                        return (
                          <div
                            key={`${paragraph.heading}-${paragraph.text}`}
                            className={styles.faqSection}
                          >
                            <h4 className={styles.faqSubheading}>
                              {paragraph.heading}
                            </h4>
                            <p className={styles.faqText}>{paragraph.text}</p>
                          </div>
                        );
                      }

                      return (
                        <p
                          key={paragraph.segments
                            .map((segment) =>
                              typeof segment === 'string'
                                ? segment
                                : `${segment.label}-${segment.href}`,
                            )
                            .join('|')}
                          className={styles.faqText}
                        >
                          {paragraph.segments.map((segment) =>
                            typeof segment === 'string' ? (
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
                    {item.bullets ? (
                      <ul className={styles.faqList}>
                        {item.bullets.map((bullet) => {
                          if (typeof bullet === 'string') {
                            return <li key={bullet}>{bullet}</li>;
                          }

                          return (
                            <li key={bullet.href}>
                              <a
                                href={bullet.href}
                                target="_blank"
                                rel="noopener"
                                className={styles.link}
                              >
                                {bullet.label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
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
