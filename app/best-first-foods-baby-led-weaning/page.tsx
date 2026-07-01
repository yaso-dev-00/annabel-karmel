import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Best first foods for baby led weaning | Annabel Karmel",
  description:
    "Annabel Karmel's guide to the best starter foods for baby-led weaning, including finger foods and family meals to introduce from six months.",
};

const relatedArticles = getRelatedArticles("/best-first-foods-baby-led-weaning");

const starterFoods = [
  "Batons of banana, avocado, pear, mango and apple",
  "Steamed broccoli (they can hold the stem)",
  "Steamed carrot, cut into batons",
  "Steamed baby sweetcorn",
  "Thick strips of roasted sweet potato or butternut squash",
  "Fingers of bread, toast or pitta",
  "Yoghurt",
  "Soft pasteurised cheeses cut into chunks",
  "Cooked eggs, cut in half",
  "Unsalted rice cakes",
];

const familyFoods = [
  "Pieces of cooked fish (be careful to remove any bones)",
  "Pieces of roast chicken (the dark parts are the most nutritious)",
  "Cottage pie",
  "Lasagne",
  "Spaghetti Bolognese",
  "Pasta dishes (wholegrain pasta is best)",
  "Omelette cut into strips",
];

export default function BestFirstFoodsBabyLedWeaningPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.bodyFirst}>
            It&apos;s absolutely normal to feel a little anxious when first starting out with first foods for
            baby-led weaning.
          </p>
          <p className={styles.body}>
            That&apos;s why Annabel Karmel has rounded up a simple guide to the best first foods – and those ingredients
            to avoid.
          </p>
          <p className={styles.body}>
            Remember, don&apos;t worry about how much or how little your baby eats at the beginning; the best thing you
            can do is serve a variety of tastes and textures to get their journey to fuss-free eating off to a flying
            start.
          </p>

          <h2 className={styles.sectionTitle}>What are the best starter foods for baby-led weaning?</h2>
          <p className={styles.body}>
            As a general rule of thumb, first foods should be of a size that your baby can manage. Babies around six
            months tend to use their whole hand to pick things up. They need to be able to close their hand around the
            food, so avoid making the pieces too wide. Fairly long pieces stand a better chance of being picked up. I
            would suggest cutting food into 5–6cm batons or sticks so that half is held in a baby&apos;s hand and the
            other half sticks out.
          </p>
          <p className={styles.body}>
            First foods should be cooked until soft, but not too mushy so that they can grab it with their fist.
            It&apos;s best to wait until your baby has teeth before you offer harder foods like raw carrot.
          </p>
          <ul className={styles.bulletList}>
            {starterFoods.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionTitle}>Is it easy to introduce family foods into baby-led weaning?</h2>
          <p className={styles.body}>
            You may also want to offer your baby the same meals eaten by the rest of the family. This is fine, providing
            you keep a close eye on potential allergens and limit the addition of salt and sugar, especially if using
            ready-made ingredients such pasta sauces.
          </p>
          <ul className={styles.bulletList}>
            {familyFoods.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-[90px] text-center">
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
