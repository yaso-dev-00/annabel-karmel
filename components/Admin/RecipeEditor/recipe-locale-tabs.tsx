'use client';

import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import styles from './recipe-editor.module.css';

export type RecipeLocale = 'uk' | 'us';

type RecipeLocaleTabsProps = {
  locale: RecipeLocale;
  onLocaleChange: (locale: RecipeLocale) => void;
  onCopyUkToUs?: () => void;
  copyLabel?: string;
  children: ReactNode;
  label?: string;
  /** Secondary line under the UK tab (e.g. "12 ingredients"). */
  ukMeta?: string;
  /** Secondary line under the US tab. */
  usMeta?: string;
};

const LOCALE_LABELS: Record<
  RecipeLocale,
  { code: string; name: string; hint: string }
> = {
  uk: { code: 'UK', name: 'United Kingdom', hint: 'Metric · UK spelling' },
  us: { code: 'US', name: 'United States', hint: 'US measures · spelling' },
};

export function RecipeLocaleTabs({
  locale,
  onLocaleChange,
  onCopyUkToUs,
  copyLabel = 'Copy UK → US',
  children,
  label = 'Locale',
  ukMeta,
  usMeta,
}: RecipeLocaleTabsProps) {
  const baseId = useId();
  const ukTabId = `${baseId}-uk`;
  const usTabId = `${baseId}-us`;
  const panelId = `${baseId}-panel`;
  const tablistRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return;
    }
    event.preventDefault();
    const next: RecipeLocale =
      event.key === 'Home'
        ? 'uk'
        : event.key === 'End'
          ? 'us'
          : event.key === 'ArrowLeft'
            ? locale === 'us'
              ? 'uk'
              : 'us'
            : locale === 'uk'
              ? 'us'
              : 'uk';
    onLocaleChange(next);
    const target = next === 'uk' ? ukTabId : usTabId;
    requestAnimationFrame(() => {
      document.getElementById(target)?.focus();
    });
  };

  const renderTab = (value: RecipeLocale, tabId: string, meta?: string) => {
    const active = locale === value;
    const labels = LOCALE_LABELS[value];
    return (
      <button
        type="button"
        role="tab"
        id={tabId}
        aria-selected={active}
        aria-controls={panelId}
        tabIndex={active ? 0 : -1}
        className={`${styles.localeTab}${active ? ` ${styles.localeTabActive}` : ''}`}
        onClick={() => onLocaleChange(value)}
      >
        <span className={styles.localeTabCode}>{labels.code}</span>
        <span className={styles.localeTabName}>{labels.name}</span>
        <span className={styles.localeTabMeta}>{meta || labels.hint}</span>
      </button>
    );
  };

  return (
    <div className={styles.localeTabs}>
      <div className={styles.localeTabsHeader}>
        <div
          ref={tablistRef}
          className={styles.localeTablist}
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
        >
          {renderTab('uk', ukTabId, ukMeta)}
          {renderTab('us', usTabId, usMeta)}
        </div>
        {onCopyUkToUs ? (
          <button
            type="button"
            className={styles.localeCopyBtn}
            onClick={onCopyUkToUs}
          >
            <span className={styles.localeCopyIcon} aria-hidden>
              ⇄
            </span>
            {copyLabel}
          </button>
        ) : null}
      </div>
      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={locale === 'uk' ? ukTabId : usTabId}
        className={styles.localePanel}
      >
        {children}
      </div>
    </div>
  );
}
