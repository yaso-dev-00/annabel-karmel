import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

const IMG = "/articles/baby-led-weaning-pros-cons";

const BLW_RECIPE_BOOK_URL =
  "https://www.annabelkarmel.com/apps-books/baby-led-weaning-recipe-book/";
const MEAL_PLANNER_URL =
  "https://www.annabelkarmel.com/apps-books/new-complete-baby-toddler-meal-planner-25th-anniversary-edition/";

export const metadata: Metadata = {
  title: "Baby led weaning pros and cons | Baby Nutrition | Annabel Karmel",
  description:
    "Annabel Karmel shares the pros and cons of baby-led weaning, from self-feeding benefits to practical considerations for new parents.",
};

const relatedArticles = getRelatedArticles("/baby-led-weaning-pros-cons");

const prosPoints = [
  "Some research has found that babies who are offered a limited variety of foods could develop fussiness, whereas babies that are given the opportunity to explore a wide range of foods for themselves tend to accept new foods more willingly.",
  "For babies, play is about learning, and they can learn a lot from handling food; from finding out how to hold something without or dropping it, to getting to grips with different shapes, sizes, weights, tastes, and textures. Self-feeding involves all of the senses, helping babies to understand the world around them.",
  "Encouraging your baby to feed themselves gives them confidence in their own abilities. And the more they discover, the more they realise they are capable of making things happen; a great boost for baby\u2019s self-esteem.",
  "When babies are allowed to decide which foods to eat or leave, they may be more willing to try new foods as they know they won't have to eat if they don't like it.",
  "Whilst more research needs to be done into the connection between baby-led weaning and obesity, there are suggestions that a baby is less likely to overeat if they are allowed to choose what they eat from a range of nutritious foods, eat at their own pace and decide when they've had enough.",
  "Baby-led weaning encourages involvement in family mealtimes from the start which has a positive impact on their social skills. They learn how different foods are eaten, how to share and join in conversations. Plus, it means less time spent mashing and pureeing.",
];

const consPoints = [
  "Babies develop at their own pace and could be ready for very simple solids as early as 17 weeks once their digestive system has sufficiently developed to cope with food other than breast or formula milk. However, prior to six months, babies tend not to have developed the hand-to-eye coordination needed for baby-led weaning, so it's not an option if your baby is ready to wean earlier than six months. In this case, purees or well-mashed food are an obvious bridge between milk and solid foods.",
  "Premature babies are advised to begin weaning earlier than the recommended 26 weeks, so again, they are unlikely to be suitable for baby-led weaning from the outset. They often have delays in their development, which means that, by six months, they may not be able to sit up unassisted or be able to pick up and interact with food.",
  "Many babies take to self-feeding early and easily. But other babies, particularly those whose motor skills are slower to develop, will not be able to self-feed useful amounts of food until they are much older than six months; however, once babies get to six months they need essential nutrients such as iron which cannot be fully gained from breast or formula milk alone. This is where some form of pureeing or mashing of nutrient-rich food such as chicken or meat becomes important. Quite simply, some babies don't cope as well as others with lumpy food and need a more gradual transition from milk to solids.",
  "Baby-led weaning can be messy, which can become quite monotonous if you are clearing up after your baby two or three times a day. However, there are lots of ways to combat the mess. Try popping a cheap shower curtain on the floor – it'll save your carpets and will be easy to wipe clean.",
];

export default function BabyLedWeaningProsConsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.bodyFirst}>
            Baby-led weaning has never been more popular, yet, as a new parent, you wonder if self-feeding over
            spoon-fed weaning is the best choice for you and your baby.
          </p>
          <p className={styles.body}>
            With baby groups, parenting forums, friendship circles and experts banding around the merits of letting a
            child feed themselves from the very start of weaning, trusted feeding expert Annabel Karmel shares the pros
            and cons.
          </p>

          <h2 className={styles.sectionTitle}>What are the pros of baby-led weaning?</h2>
          <img
            src={`${IMG}/pros-food.jpg`}
            alt="Baby-led weaning finger foods"
            width={800}
            height={800}
            className={styles.contentImage}
          />
          <p className={styles.body}>
            Babies are naturally inquisitive – they are programmed to experiment and explore. It&apos;s how they learn.
            Self-feeding encourages hand-eye coordination and regularly handling foods improves their dexterity – all
            important skills for their future.
          </p>
          <ul className={styles.dotList}>
            {prosPoints.map((item) => (
              <li key={item} className={styles.dotItem}>
                {item}
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionTitle}>Are there any negatives to baby-led weaning?</h2>
          <img
            src={`${IMG}/top-10-recipes.jpg`}
            alt="Top 10 baby-led weaning recipes"
            width={800}
            height={800}
            className={styles.contentImage}
          />
          <ul className={styles.dotList}>
            {consPoints.map((item) => (
              <li key={item} className={styles.dotItem}>
                {item}
              </li>
            ))}
          </ul>

          <img
            src={`${IMG}/blw-header.jpg`}
            alt="Baby-led weaning"
            width={780}
            height={280}
            className={styles.contentImage}
          />

          <p className={styles.bookClosing}>
            Annabel&apos;s{" "}
            <a href={BLW_RECIPE_BOOK_URL} target="_blank" rel="noopener noreferrer">
              Baby-Led Weaning Recipe Book
            </a>{" "}
            equips families with the option to do what they feel is best. This book can be used on its own for exclusive
            baby-led weaning. Or it can be used as a companion cookbook to Annabel&apos;s original feeding guide, the{" "}
            <a href={MEAL_PLANNER_URL} target="_blank" rel="noopener noreferrer">
              New Complete Baby &amp; Toddler Meal Planner
            </a>
            , which is filled with her popular puree recipes.
          </p>
          <p className={styles.bookClosing}>
            As well as being packed with useful advice and top tips, the book is filled with 120 recipes which the whole
            family can enjoy together – from breakfast and snacks, to vegetables, poultry, fish, meat and more.
          </p>

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
