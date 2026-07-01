"use client";

import Image from "next/image";
import { useState } from "react";

import { recipeAppLinks, recipeAppPricing, recipeAppAssets } from "@/data/recipe-app-page";
import styles from "@/components/MarketingScreen/RecipeAppPage/recipe-app-page.module.css";

export function RecipeAppPricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className={styles.pricingSection} aria-labelledby="recipe-app-pricing-heading">
      <div className={styles.pricingGrid}>
        <div className={styles.pricingCopy}>
          <h2 id="recipe-app-pricing-heading" className={styles.pricingHeading}>
            {recipeAppPricing.title}
          </h2>
          <p className={styles.pricingBody}>{recipeAppPricing.body}</p>
          <div className={styles.pricingStoreBadges}>
            <a href={recipeAppLinks.appStore} aria-label="Download on the App Store">
              <Image src={recipeAppAssets.appStoreBadge} alt="" width={152} height={50} />
            </a>
            <a href={recipeAppLinks.playStore} aria-label="Get it on Google Play">
              <Image src={recipeAppAssets.googlePlayBadge} alt="" width={152} height={50} />
            </a>
          </div>
        </div>

        <div className={styles.pricingCardWrap}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingToggle}>
              <span className={!yearly ? styles.pricingToggleActive : undefined}>Monthly</span>
              <label className={styles.pricingSwitch}>
                <input
                  type="checkbox"
                  checked={yearly}
                  onChange={(event) => setYearly(event.target.checked)}
                  aria-label="Toggle yearly pricing"
                />
                <span className={styles.pricingSlider} />
              </label>
              <span className={yearly ? styles.pricingToggleActive : undefined}>Yearly</span>
            </div>
            <p className={styles.pricingPrice}>
              {yearly ? recipeAppPricing.yearlyPrice : recipeAppPricing.monthlyPrice}
            </p>
            <p className={styles.pricingTrialNote}>{recipeAppPricing.trialNote}</p>
            <p className={styles.pricingCancelNote}>{recipeAppPricing.cancelNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
