import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import {
  ironRichFoodsContentImage,
  ironRichMeatRecipes,
  ironRichNonMeatRecipes,
} from "@/data/iron-rich-foods-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Iron Rich Foods | Annabel Karmel",
  description:
    "Why iron matters for babies from six months, how to include iron-rich foods twice daily, and meat and plant-based recipe ideas.",
};

const relatedArticles = getRelatedArticles("/iron-rich-foods");

export default function IronRichFoodsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.bodyFirst}>
            The best iron-rich food source is red meat, in fact, meat should be one of your babies first foods.
          </p>
          <p className={styles.body}>
            Other good sources of iron are egg yolks, dark poultry meat, fortified breakfast cereals and pulses such as
            lentils.
          </p>
          <p className={styles.body}>
            <strong>Iron is considered to be the most critical nutrient for babies</strong>, they need a lot more iron
            between <strong>six months to 2 years than any other time in their lives</strong>.{" "}
            <strong>Iron deficiency is the commonest deficiency in babies and toddlers.</strong> It&apos;s essential for{" "}
            <strong>brain growth</strong> and babies who don&apos;t get enough can be both sensory and cognitively
            impaired leading to learning issues. It can also affect their motor development.
          </p>
          <p className={styles.body}>
            Most babies are born with enough stored iron in their bodies to last them around 6 months. This is very
            helpful as breast milk contains only a small amount of iron and although infant formula is supplemented with
            iron, your baby&apos;s body does not easily absorb it.
          </p>
          <p className={styles.body}>
            Because your baby&apos;s built-in stores that they&apos;re born with are depleted by 6 months – or even
            earlier if you were iron deficient when pregnant or your baby was very small when she was born (less than
            2.5kg or 5lb 8 oz), iron has to be obtained through food. Furthermore, breast milk contains little iron and
            although formula is supplemented with iron it&apos;s not easily absorbed in your baby&apos;s body.{" "}
            <strong>
              Therefore it&apos;s really important that iron-rich foods are given at least twice a day from 6 months of
              age.
            </strong>
          </p>
          <p className={styles.body}>
            Iron is much better absorbed from a meat source but paring iron-rich food like pulses or dark leafy green veg
            with vitamin C food is a great idea as vitamin C helps your baby absorb the iron in non-meat sources . Vitamin
            C is found in fruit and vegetables.
          </p>

          <img
            src={ironRichFoodsContentImage}
            alt="Iron rich foods"
            width={900}
            height={600}
            className={styles.contentImage}
          />

          <h2 className={styles.recipeCarouselHeading}>Iron rich recipes containing meat:</h2>
          <ArticleRecipeCarousel
            items={ironRichMeatRecipes}
            className="mt-[40px]"
            perDesktopView={3}
            compact
          />

          <h2 className={styles.recipeCarouselHeading}>Non meat recipes containing iron:</h2>
          <ArticleRecipeCarousel
            items={ironRichNonMeatRecipes}
            className="mt-[40px]"
            perDesktopView={3}
            compact
          />

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
