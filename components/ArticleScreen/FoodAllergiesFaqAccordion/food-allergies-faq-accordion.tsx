"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { FallbackImage } from "@/components/UiPrimitives/FallbackImage";
import styles from "@/app/food-allergies-your-common-questions-concerns-answered/page.module.css";

export type FoodAllergiesFaqItem = {
  question: string;
  image: string;
  fallbackImage: string;
  paragraphs: string[];
};

type FoodAllergiesFaqAccordionProps = {
  items: FoodAllergiesFaqItem[];
};

const PANEL_TRANSITION = {
  height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const },
  opacity: { duration: 0.35, ease: "easeOut" as const },
};

function AnimatedAccordionPanel({ children }: { children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const measure = useCallback(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, []);

  useLayoutEffect(() => {
    measure();
    const node = innerRef.current;
    if (!node) return;

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, [measure, children]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: height > 0 ? height : "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={PANEL_TRANSITION}
      style={{ overflow: "hidden" }}
    >
      <div ref={innerRef}>{children}</div>
    </motion.div>
  );
}

export function FoodAllergiesFaqAccordion({ items }: FoodAllergiesFaqAccordionProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(items[0]?.question ?? null);

  const toggle = (question: string) => {
    setOpenQuestion((current) => (current === question ? null : question));
  };

  return (
    <section className={styles.accordionWrap}>
      {items.map((item) => {
        const isOpen = openQuestion === item.question;

        return (
          <div key={item.question} className={styles.item}>
            <button
              type="button"
              onClick={() => toggle(item.question)}
              className={`${styles.summary}${isOpen ? ` ${styles.summaryOpen}` : ""}`}
            >
              <span aria-hidden="true" className={styles.summaryMarker}>
                {isOpen ? "−" : "+"}
              </span>
              {item.question}
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <AnimatedAccordionPanel key={item.question}>
                  <div className={styles.panel}>
                    <FallbackImage
                      src={item.image}
                      fallbackSrc={item.fallbackImage}
                      alt={item.question}
                      className={styles.panelImage}
                    />
                    {item.paragraphs.map((paragraph, index) => (
                      <p key={index} className={styles.panelText}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </AnimatedAccordionPanel>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </section>
  );
}
