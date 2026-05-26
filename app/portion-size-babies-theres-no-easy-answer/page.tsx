import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Portion size for babies: why there's no easy answer | Annabel Karmel",
  description:
    "Why recommended portion sizes for babies are hard to define, and how to tell if your little one is getting the right nutrition during weaning.",
};

const relatedArticles = getRelatedArticles("/portion-size-babies-theres-no-easy-answer");

const portionSizeReasons = [
  "Babies have different metabolic rates and activity levels.",
  "The food parents feed their babies varies wildly, even just day to day within the same household.",
  "Foods such as meat and fish are more nutrient dense than foods such as apples.",
  "A baby's nutritional needs will vary with growth spurts.",
  "Teething and illness can affect a baby's appetite.",
];

export default function PortionSizeBabiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={`${styles.body} mt-0!`}>
            Getting the right portion size is a worry for a lot of parents. Simply Google the term and you will see
            forums filled with questions about how much to feed your child.
          </p>
          <p className={styles.body}>
            How much we should feed babies is a very important question. Unfortunately, it doesn&apos;t have a simple
            answer. We can&apos;t say that the correct portion size for babies is a handful of this or 10 teaspoons of
            that.
          </p>

          <h2 className={styles.sectionTitle}>Why do we use portions anyway?</h2>
          <p className={styles.body}>
            Recommended food portion sizes for adults aren&apos;t used to make sure we&apos;ve eaten the right amount of
            food. They are there to help us eat the right amount of nutrients.
          </p>
          <p className={styles.body}>
            It&apos;s much easier for us to understand that we have eaten 5 portions of varied fruit and veg that day
            and are therefore likely to have had enough milligrams of fibre, Vitamin A, protein, Thiamin, Niacin,
            Vitamin A, Iron, Potassium etc. Or that we have eaten 2 portions of oily fish rather than enough Omega-3
            essential fatty acids. If we tried to calculate our nutritional intake in this way every day we wouldn&apos;t
            get a lot else done!
          </p>
          <p className={styles.body}>
            Following portion guidelines we can assume, that on average, we are getting enough (but not too much!) of
            the vitamins, minerals, and other key nutrients we need to be healthy.
          </p>

          <h2 className={styles.sectionTitle}>Why portion sizes don&apos;t work for babies</h2>
          <p className={styles.body}>
            Unlike with adults, it&apos;s very difficult to determine appropriate portion sizes for babies. This due to
            several reasons, including:
          </p>
          <ul className={styles.indentedList}>
            {portionSizeReasons.map((item) => (
              <li key={item} className={styles.indentedItem}>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            When babies are starting to wean they will show a lot of variation week on week as to how much they are
            eating. Rather than considering if a baby has eaten enough food, we can consider if the food that we are
            giving them is providing enough nutrition to allow them to grow and develop well.
          </p>

          <h2 className={styles.sectionTitle}>How we can tell if babies are getting the right amount of nutrition?</h2>
          <p className={styles.body}>
            Babies need the right nutrients to develop and grow. In the UK, this is tracked on Growth Charts in your
            little one&apos;s Red Book. Your baby&apos;s head, length and weight are measured and tracked on the chart
            which has curved lines. These curved, centile lines allow healthcare professionals to measure the growth of
            your baby in comparison to children of the same age who have shown optimum growth.
          </p>
          <p className={styles.body}>
            Most babies won&apos;t follow these lines exactly, and a baby&apos;s weight will likely fluctuate between two
            centile lines, known as a centile space. There may be a drop across a line if a baby gets ill but most babies
            will return to their normal centile within a few weeks. Sustained drops, where a child drops to a lower
            centile line and continues on that path can lead to abnormal growth and failure to fulfil their genetic
            potential. It is important to get your baby measured by your health visitor.
          </p>

          <h2 className={styles.sectionTitle}>Nutrition in weaning</h2>
          <p className={styles.body}>
            When you start weaning, it is very important to remember that breast/formula milk is still the most
            important source of nutrition for your baby. Between 6 an 12 months babies need 500-600ml of breast/formula
            milk each day. Cow&apos;s, goat&apos;s or sheep&apos;s milk is not suitable as your baby&apos;s main drink
            as it doesn&apos;t contain enough iron and other nutrients that your baby needs.
          </p>
          <p className={styles.body}>
            When your baby first tries solid food, remember that trying and experiencing these foods for the first time
            will be more important than the quantity. Later, by seven months, babies should ideally be having 3 solid
            meals a day. When a baby moves on to solid food, it is important to understand which foods they can eat to
            provide a balanced diet which meets their nutritional requirements each week.
          </p>

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
