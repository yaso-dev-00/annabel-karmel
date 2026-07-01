import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/foods-to-avoid-2");

const avoidSections = [
  {
    title: "Honey",
    body:
      "This is off limits until 12 months as it comes with a very small chance that it may contain the food poisoning bacteria botulism. Botulism is a very rare condition but one that makes your baby very sick and can be life-threatening.",
  },
  {
    title: "Rice milk",
    body:
      "Although it's unlikely that you'll be offering your baby rice milk in large quantities, you need to be careful of this dairy-free alternative as it contains a high level of arsenic. Don't worry about other rice products such as rice cakes and rice as these are perfectly safe for your baby to have before 12 months, it's just the rice milk you need to avoid as this is a more concentrated form and we don't yet know the long-term effects of this.",
  },
  {
    title: "High mercury fish",
    body:
      "Research shows that regularly feeding baby fish can boost IQ. Just avoid those with high levels of mercury (so, shark, swordfish and marlin, among others). Instead, stick to the many other varieties of fish, including salmon, haddock, pollock, cod and mackerel, to name some. Canned and fresh tuna also gets the thumbs up!",
  },
  {
    title: "Smoked or cured meats",
    body: "Meats such as bacon and ham are high in salt so should be avoided.",
  },
  {
    title: "Cow, goat or sheep's milk (as your baby's main drink)",
    body:
      "These milks don't contain all the nutrients (such as iron and vitamin E) a baby needs to grow and develop during their first year and can also be hard for them to digest, which is why breast or formula are the only milk drinks suitable under the age of one. Having said that, you can use regular milks in cooking no problem.",
  },
  {
    title: "Unpasteurised dairy products",
    body:
      "Dairy products such as brie, camembert and soft blue-veined cheese can contain dangerous bacteria called listeria so need o be avoided.",
  },
  {
    title: "Low-fat or diet versions of foods",
    body: "Avoid low-fat or diet versions of foods as these are low in nutrition and likely to include added sweeteners.",
  },
  {
    title: "Fruit juice",
    body:
      "Breast milk or formula should be the mainstay of a baby's diet in the first year of life, with water offered as a supplementary drink. Drinking juice regularly can also cause tooth decay, diarrhoea and other tummy troubles.",
  },
  {
    title: "Over-processed and sugar-laden foods",
    body:
      "There are a whole host of foods that are not technically harmful to your baby, but that are unhealthy, over-processed and filled with sugar - think sugary breakfast cereals, sweets, fizzy drinks, chocolate and battered food. Your baby doesn't need sugar. By avoiding sugary snacks and drinks (including fruit juice and other fruit drinks), you'll help to prevent tooth decay.",
  },
  {
    title: "Caffeine",
    body: "Caffeine such as tea and coffee should never be given to babies.",
  },
  {
    title: "Whole nuts and small foods",
    body:
      "Nutritious food like large blueberries, cherry tomatoes and grapes are all fine to offer, but they will need to be quartered before giving them to your baby. Whole nuts are off the cards until your baby is at least 5 years of age. Instead, serve these ground or in the form of smooth nut butters, so long as they don't contain any added salt or sugar.",
  },
  {
    title: "Salt",
    body:
      "Don't add salt to your baby's food and don't use your normal stock cubes or gravy, as they're often high in salt. Remember this when you're cooking for the family if you plan to give the same food to your baby. You can get special baby stock cubes, or make your own.",
  },
];

export default function FoodsToAvoidPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto mt-[40px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.lead}>
            Although weaning opens the floodgates to a whole host of new and exciting foods, tastes and textures, there
            are some foods you&apos;ll need to avoid during your baby&apos;s first year.
          </p>

          {avoidSections.map((section) => (
            <section key={section.title}>
              <p className={styles.sectionTitle}>{section.title}</p>
              <p className={styles.body}>{section.body}</p>
            </section>
          ))}

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
