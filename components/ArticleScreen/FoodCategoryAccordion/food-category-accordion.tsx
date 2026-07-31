'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import styles from '@/app/eggs-questions-answered/page.module.css';

export type FoodCategorySubsection = {
  heading: string;
  /** Section titles (e.g. "If a baby is choking:") use display font; steps stay on body font. */
  headingVariant?: 'display' | 'step';
  paragraphs?: (string | ReactNode)[];
  listItems?: string[];
};

export type FoodCategoryItem = {
  title: string;
  image?: { src: string; alt: string };
  paragraphs?: (string | ReactNode)[];
  listItems?: string[];
  subsections?: FoodCategorySubsection[];
  closingParagraphs?: (string | ReactNode)[];
};

type FoodCategoryAccordionProps = {
  items: FoodCategoryItem[];
  /** Omit to open first item; pass `null` to start with all panels closed. */
  defaultOpenTitle?: string | null;
};

export function FoodCategoryAccordion({
  items,
  defaultOpenTitle,
}: FoodCategoryAccordionProps) {
  const [openTitle, setOpenTitle] = useState<string | null>(() =>
    defaultOpenTitle !== undefined
      ? defaultOpenTitle
      : (items[0]?.title ?? null),
  );

  const toggle = (title: string) => {
    setOpenTitle((current) => (current === title ? null : title));
  };

  return (
    <div className="border border-[#d7d7d7] bg-white">
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
                    {item.image ? (
                      <div className="mb-[22px]">
                        <img
                          src={item.image.src}
                          alt={item.image.alt}
                          className="h-auto w-full max-w-[500px] mx-auto mt-4"
                        />
                      </div>
                    ) : null}
                    {(item.paragraphs ?? []).map((paragraph, index) => (
                      <p
                        key={
                          typeof paragraph === 'string'
                            ? paragraph
                            : `${item.title}-p-${index}`
                        }
                        className={styles.accordionBodyText}
                      >
                        {paragraph}
                      </p>
                    ))}
                    {item.listItems ? (
                      <ul className={styles.accordionList}>
                        {item.listItems.map((listItem) => (
                          <li
                            key={listItem}
                            className={styles.accordionListItem}
                          >
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {item.subsections?.map((section) => (
                      <div key={section.heading}>
                        <p
                          className={`${styles.accordionBodyText} ${styles.accordionSubheading}${
                            section.headingVariant === 'display'
                              ? ` ${styles.accordionSubheadingDisplay}`
                              : ''
                          }`}
                        >
                          <strong>{section.heading}</strong>
                        </p>
                        {(section.paragraphs ?? []).map((paragraph, index) => (
                          <p
                            key={
                              typeof paragraph === 'string'
                                ? paragraph
                                : `${section.heading}-p-${index}`
                            }
                            className={styles.accordionBodyText}
                          >
                            {paragraph}
                          </p>
                        ))}
                        {section.listItems ? (
                          <ul className={styles.accordionList}>
                            {section.listItems.map((listItem) => (
                              <li
                                key={listItem}
                                className={styles.accordionListItem}
                              >
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                    {(item.closingParagraphs ?? []).map((paragraph, index) => (
                      <p
                        key={
                          typeof paragraph === 'string'
                            ? paragraph
                            : `${item.title}-closing-${index}`
                        }
                        className={styles.accordionBodyText}
                      >
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
