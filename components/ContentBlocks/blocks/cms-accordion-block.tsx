'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState, type CSSProperties, type ReactNode } from 'react';
import type {
  AccordionBlockData,
  BlockSettings,
} from '@/lib/content-blocks/types';
import {
  getProseParagraphGapStyle,
  hasParagraphGap,
} from '@/lib/content-blocks/block-prose';
import { resolveImageSrc } from '@/lib/content-blocks/image-src';
import styles from '../content-blocks.module.css';

type CmsAccordionProps = {
  data: AccordionBlockData;
  style?: CSSProperties;
  paragraphGapSettings?: BlockSettings;
};

export function CmsAccordionBlock({
  data,
  style,
  paragraphGapSettings,
}: CmsAccordionProps) {
  const defaultTitle = (() => {
    if (data.default_open === 'none') return null;
    if (data.default_open === 'first') return data.panels[0]?.title ?? null;
    const panelId = data.default_open.panel_id;
    return data.panels.find((p) => p.id === panelId)?.title ?? null;
  })();

  const [openTitle, setOpenTitle] = useState<string | null>(defaultTitle);
  const proseGapClass = hasParagraphGap(paragraphGapSettings)
    ? styles.blockProseParagraphGap
    : '';
  const proseGapStyle = getProseParagraphGapStyle(paragraphGapSettings);

  return (
    <div
      className={`${styles.accordion} border border-[#d7d7d7] bg-white`}
      style={style}
    >
      {data.panels.map((panel, index) => {
        const isOpen = openTitle === panel.title;
        const title = data.numbered_titles
          ? `${index + 1}. ${panel.title}`
          : panel.title;

        return (
          <div key={panel.id}>
            <button
              type="button"
              onClick={() => setOpenTitle(isOpen ? null : panel.title)}
              className={`${styles.accordionSummary} flex w-full cursor-pointer items-start gap-3 border-b border-[#d7d7d7] px-5 py-4 text-left font-semibold text-[#3d3d3d]`}
            >
              <span aria-hidden="true" className="text-[#b34769]">
                {isOpen ? '−' : '+'}
              </span>
              {title}
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key={panel.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-5 py-4 text-[18px] leading-relaxed text-[#3f3841]">
                    {resolveImageSrc(panel.image?.src) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resolveImageSrc(panel.image?.src)!}
                        alt={panel.image?.alt ?? ''}
                        className="mx-auto mb-4 max-w-[500px] w-full"
                      />
                    ) : null}
                    {panel.paragraphs ? (
                      <div
                        className={`${styles.blockProse} ${proseGapClass}`.trim()}
                        style={proseGapStyle}
                        dangerouslySetInnerHTML={{ __html: panel.paragraphs }}
                      />
                    ) : null}
                    {panel.list_items && panel.list_items.length > 0 ? (
                      <ul className={`${styles.list} !mt-4 !pl-6`}>
                        {panel.list_items
                          .map((item) => item.trim())
                          .filter(Boolean)
                          .map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                      </ul>
                    ) : null}
                    {panel.subsections?.map((sub) => (
                      <div key={sub.id} className="mt-4">
                        <h4
                          className={
                            sub.heading_variant === 'display'
                              ? styles.subTitle
                              : 'font-bold text-[16px] mt-3'
                          }
                        >
                          {sub.heading}
                        </h4>
                        {sub.paragraphs ? (
                          <div
                            className={`${styles.blockProse} ${proseGapClass}`.trim()}
                            style={proseGapStyle}
                            dangerouslySetInnerHTML={{ __html: sub.paragraphs }}
                          />
                        ) : null}
                        {sub.list_items && sub.list_items.length > 0 ? (
                          <ul className={`${styles.list} !mt-2 !pl-6`}>
                            {sub.list_items
                              .map((item) => item.trim())
                              .filter(Boolean)
                              .map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                    {panel.closing_paragraphs ? (
                      <div
                        className={`mt-4 ${styles.blockProse} ${proseGapClass}`.trim()}
                        style={proseGapStyle}
                        dangerouslySetInnerHTML={{
                          __html: panel.closing_paragraphs,
                        }}
                      />
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

function prefixIsDuplicateSignOff(text: string, preset: string) {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return false;
  if (preset === 'milk_making_mama') {
    return (
      /milkmakingmama/.test(normalized) &&
      /visit|for more advice/.test(normalized)
    );
  }
  if (preset === 'mother_box') {
    return (
      /mother_box|the_mother_box/.test(normalized) &&
      /visit|instagram|support/.test(normalized)
    );
  }
  return false;
}

export function CmsExpertAttributionBlock({
  preset,
  prefix,
  name,
  bio_paragraphs,
  links,
  style,
  previewMode,
}: {
  preset: string;
  prefix?: string;
  name?: string;
  bio_paragraphs?: string[];
  links?: { label: string; href: string }[];
  style?: CSSProperties;
  previewMode?: boolean;
}) {
  const prefixText = prefix?.trim() ?? '';
  const showPrefix =
    prefixText.length > 0 && !prefixIsDuplicateSignOff(prefixText, preset);
  const linkProps = previewMode
    ? { 'data-cms-interactive': 'true' as const }
    : {};

  let body: ReactNode = null;

  if (preset === 'milk_making_mama') {
    body = (
      <>
        {showPrefix ? (
          <p className={styles.expertSignOffBody}>{prefixText}</p>
        ) : null}
        <p className={styles.expertSignOffBody}>
          Visit{' '}
          <Link
            href="https://www.instagram.com/milkmakingmama/"
            className={styles.inlineLink}
            target="_blank"
            rel="noreferrer"
          >
            @milkmakingmama
          </Link>{' '}
          for more advice and support.
        </p>
      </>
    );
  } else if (preset === 'kerry_secker') {
    body = (
      <>
        {showPrefix ? (
          <p className={styles.expertSignOffBody}>{prefixText}</p>
        ) : null}
        <p className={`${styles.expertSignOffBody} ${styles.bodyBold}`}>
          For more sleep advice visit{' '}
          <Link
            href="https://www.careitout.com/"
            className={styles.inlineLink}
            target="_blank"
            rel="noreferrer"
          >
            Care It Out
          </Link>
          .
        </p>
      </>
    );
  } else if (preset === 'mother_box') {
    body = (
      <>
        {showPrefix ? (
          <p className={styles.expertSignOffBody}>{prefixText}</p>
        ) : null}
        <p className={styles.expertSignOffBody}>
          For lots more support and advice, visit{' '}
          <Link
            href="https://www.instagram.com/the_mother_box/"
            className={styles.inlineLink}
            target="_blank"
            rel="noreferrer"
          >
            @the_mother_box
          </Link>{' '}
          on Instagram.
        </p>
      </>
    );
  } else {
    body = (
      <>
        {showPrefix ? (
          <p className={styles.expertSignOffBody}>{prefixText}</p>
        ) : null}
        {name ? <p className={styles.expertSignOffTitle}>{name}</p> : null}
        {bio_paragraphs?.map((p) => (
          <p key={p} className={styles.expertSignOffBody}>
            {p}
          </p>
        ))}
        {links?.length ? (
          <div className={styles.expertSignOffLinks}>
            {links.map((link, index) => (
              <Link
                key={`expert-link-${index}`}
                href={link.href || '#'}
                className={styles.inlineLink}
                {...linkProps}
              >
                {link.label || 'Link'}
              </Link>
            ))}
          </div>
        ) : null}
      </>
    );
  }

  return (
    <aside className={styles.expertSignOff} style={style}>
      {body}
    </aside>
  );
}
