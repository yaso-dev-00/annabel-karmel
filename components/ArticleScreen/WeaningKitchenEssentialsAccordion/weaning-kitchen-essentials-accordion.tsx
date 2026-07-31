'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styles from '@/app/weaning-equipment-getting-kitchen-ready-weaning/page.module.css';

export type WeaningKitchenEssentialItem = {
  title: string;
  text: string;
};

type WeaningKitchenEssentialsAccordionProps = {
  items: WeaningKitchenEssentialItem[];
};

export function WeaningKitchenEssentialsAccordion({
  items,
}: WeaningKitchenEssentialsAccordionProps) {
  const [openTitle, setOpenTitle] = useState<string | null>(
    () => items[0]?.title ?? null,
  );

  const toggle = (title: string) => {
    setOpenTitle((current) => (current === title ? null : title));
  };

  return (
    <div className="mt-[28px] border border-[#c8c8c8] bg-white">
      {items.map((item) => {
        const isOpen = openTitle === item.title;

        return (
          <div key={item.title} className={styles.accordionRow}>
            <button
              type="button"
              onClick={() => toggle(item.title)}
              className={`${styles.accordionSummary}${isOpen ? ` ${styles.accordionSummaryOpen}` : ''}`}
            >
              <span aria-hidden="true" className={styles.marker}>
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
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={styles.accordionBody}>
                    <p className={styles.accordionText}>{item.text}</p>
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
