import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/baby-finger-foods");

const meltInTheMouth = [
  "Banana",
  "Pear",
  "Blueberries",
  "Mango",
  "Peach",
  "Strawberries",
  "Avocado",
  "Steamed soft carrot, sweet potato or parsnip sticks",
  "Steamed broccoli florets or cauliflower florets",
];

const biteAndDissolve = [
  "Mini Sandwiches with soft fillings",
  "Fingers of Toast",
  "Cooked pasta shapes",
  "Soft ready to eat dried apricots",
  "Ripe melon",
  "Halved peeled grapes",
  "Hardboiled egg cut into quarters",
  "Cooked pasta shapes",
  "Miniature Rice Cakes",
];

const biteAndChew = [
  "Cucumber Sticks",
  "Oven baked potato or sweet potato wedges",
  "Small pieces of fish or fish goujons",
  "Small pieces of chicken",
  "Mini Meatballs made of minced beef, chicken or lamb",
  "Sticks of cheese or mini cheese",
  "Raw carrot",
  "Sticks of sweet pepper",
  "Sugar Snap peas",
  "Slices of Apple",
  "Dried apple rings",
];

function FoodList({ title, items }: { title: string; items: string[] }) {
  return (
    <>
      <h3 className={styles.subHeading}>{title}</h3>
      <ul className={styles.bulletList}>
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className={styles.bulletItem}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function BabyFingerFoodsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            Finger foods are a fun way to encourage co-ordination and help your little one develop the skills necessary
            to bite, chew and self-feed. Finger foods need to be easy to pick up and hold, and free from pips, stones or
            bones. Once baby can pick things up with reasonable hand-eye coordination the fun can begin! Let them
            experiment with soft finger foods like banana or peach that can be &apos;gummed&apos; to a suitable
            consistency. The more your baby experiments with finger foods the quicker they will become proficient at
            feeding themself!
          </p>

          <h2 className={styles.sectionHeading}>Choking hazards</h2>
          <p className={styles.bodyText}>
            Just because your baby has teeth doesn&apos;t mean that they know how to chew. Sometimes babies can bite off
            a piece of food, try to swallow it whole and choke on it, so never leave your child alone while eating. Also
            they can often store food in their mouth like a hamster so always check that they have swallowed everything
            before leaving the room.
          </p>

          <h2 className={styles.sectionHeading}>What are the best baby finger foods?</h2>

          <FoodList title="Melt in the Mouth" items={meltInTheMouth} />
          <FoodList title="Bite and Dissolve" items={biteAndDissolve} />
          <FoodList title="Bite and Chew" items={biteAndChew} />

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
