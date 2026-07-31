'use client';

import type { CookbookBuyLink } from '@/lib/cookbooks/types';
import styles from './cookbook-editor.module.css';

type CookbookBuyLinksEditorProps = {
  buyLinks: CookbookBuyLink[];
  onChange: (buyLinks: CookbookBuyLink[]) => void;
};

export function CookbookBuyLinksEditor({
  buyLinks,
  onChange,
}: CookbookBuyLinksEditorProps) {
  const updateLink = (index: number, patch: Partial<CookbookBuyLink>) => {
    onChange(
      buyLinks.map((link, i) => (i === index ? { ...link, ...patch } : link)),
    );
  };

  return (
    <div className="card">
      <div className={styles.sectionHeaderCol}>
        <h2 className="cardSectionTitle">Buy links</h2>
        <p className={styles.sectionHint}>
          Retailer URLs used for Buy Now buttons
        </p>
      </div>
      <div className={styles.stack}>
        {buyLinks.map((link, index) => (
          <div key={index} className={styles.buyLinkRow}>
            <input
              className="fieldInput"
              value={link.retailer}
              onChange={(e) => updateLink(index, { retailer: e.target.value })}
              placeholder="Retailer"
            />
            <input
              className="fieldInput"
              value={link.url}
              onChange={(e) => updateLink(index, { url: e.target.value })}
              placeholder="https://"
            />
            <button
              type="button"
              className={styles.iconRemove}
              aria-label="Remove buy link"
              onClick={() => onChange(buyLinks.filter((_, i) => i !== index))}
              disabled={buyLinks.length <= 1}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`btn btnGhost ${styles.addRowBtn}`}
        onClick={() => onChange([...buyLinks, { retailer: '', url: '' }])}
      >
        + Add retailer
      </button>
    </div>
  );
}
