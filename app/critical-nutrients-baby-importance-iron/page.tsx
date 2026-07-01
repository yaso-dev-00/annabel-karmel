import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

const IMG = "/articles/critical-nutrients-baby-importance-iron";

export const metadata: Metadata = {
  title: "Critical nutrients for your baby: the importance of iron | Annabel Karmel",
  description:
    "Why iron matters from six months, iron-rich foods for babies, vegetarian sources, and pairing vitamin C for better absorption.",
};

const relatedArticles = getRelatedArticles("/critical-nutrients-baby-importance-iron");

const meatIronSources = [
  {
    label: "Beef",
    text: "slow cooked pieces as a finger food, the classic Bolognese or with veggies as a puree",
  },
  {
    label: "Lamb",
    text: "mini koftas, meatballs or a slow cooked lamb tagine",
  },
  {
    label: "Chicken and turkey",
    text: "(use the darker meat such as the thigh or leg meat as those nice brown bits are slightly higher in iron) – chicken purees with fruit and vegetables, mini balls and burgers or why not try a chicken curry, blended or mashed until you reach the right consistency for your baby",
  },
];

const vegetarianIronSources = [
  {
    label: "Egg yolks",
    text: "boiled egg blended or mashed into a vegetable puree or dippy eggs",
  },
  {
    label: "Fortified breakfast cereals",
    text: "this is where iron is added to the cereal",
  },
  {
    label: "Wholegrain foods",
    text: "such as brown pasta, wholegrain bread, brown rice and even chia seeds",
  },
  { label: "Tofu", text: "mini croquettes are always a hit with tiny hands!" },
  {
    label: "Beans and pulses",
    text: "such as lentils, kidney beans and chickpeas) – lentil puree and homemade chickpea humus",
  },
  {
    label: "Dried fruit",
    text: "including dates, apricots and raisins) – add to porridge, stews and casseroles",
  },
  {
    label: "Dark green leafy veggies",
    text: "for example spinach and kale) – lightly cooked by steaming or stir frying",
  },
];

const vitaminCSources = [
  {
    label: "Fresh fruit",
    text: "for example strawberries, blueberries, mango and kiwi",
  },
  {
    label: "Raw and lightly cooked vegetables",
    text: "such as red peppers and tomatoes",
  },
  {
    label: "Green veggies",
    text: "like broccoli and spinach) – plus these contain iron too!",
  },
];

export default function CriticalNutrientsBabyIronPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.bodyFirst}>
            From the very start of weaning your baby will need a number of all-important essential nutrients to support
            their mental and physical development. As with all nutrients, these need to come from food. This article is
            all about iron for babies.
          </p>
          <p className={styles.body}>
            Iron is one of the most important critical nutrients you will need to introduce to your baby from six
            months. Though all nutrients are essential which is why a varied diet from the get-go is key.
          </p>
          <p className={styles.body}>
            As your baby approaches the six month mark, they&apos;ll be going through an amazing growth spurt.
            Here&apos;s a fact for you; in their first year, babies triple their birth weight. They grow more rapidly in
            their first year than at any other time in their life. And obviously, to grow that much, they&apos;ll need a
            stack of nutrients.
          </p>

          <h2 className={styles.sectionTitle}>Why does my baby need iron?</h2>
          <p className={styles.body}>
            Getting enough iron for babies is essential as it is needed for making haemoglobin in red blood cells.
            It&apos;s the micronutrient that enables the blood to carry oxygen around the body to your baby&apos;s organs
            and muscles. It&apos;s also important for the immune system – so as you can see it is vital for your baby.
          </p>
          <p className={styles.body}>
            Full term babies are born with a reserve of iron. Until six months, your baby will have been using the store
            of iron they&apos;ve inherited from mum. But it&apos;ll be starting to run low by this point, which is why
            from around six months is the ideal time to start introducing iron-rich foods into your baby&apos;s diet.
          </p>
          <p className={styles.body}>
            And for this reason, don&apos;t be tempted to delay introducing iron into your baby&apos;s diet beyond six
            months. If your baby was born small, early or if you had iron deficiency when you were pregnant then they
            might not even have the full six months&apos; worth of iron stored which is why it is so important that
            iron features in their diet. And it may even need to be introduced slightly earlier. If you think that this
            applies to your baby then speak to your GP or health visitor who can advise on whether you need to get
            started a little earlier.
          </p>
          <img
            src={`${IMG}/baby-iron.jpg`}
            alt="Baby eating with a spoon in a high chair"
            width={894}
            height={596}
            className={styles.contentImage}
          />

          <h2 className={styles.sectionTitle}>Can a lack of iron cause anaemia in babies?</h2>
          <p className={styles.body}>
            It&apos;s not uncommon for babies to develop an iron deficiency which can cause anaemia. There&apos;s so
            much development going on in their brains. And because of this, we know that an iron deficiency in babies
            between six and twelve months can affect their cognitive, motor and social development skills in the future.
            Though these affects might not become apparent until your baby is a child. Just think of the size of a
            baby&apos;s head in comparison to their bodies – it&apos;s much larger in proportion compared to adults.
          </p>
          <p className={styles.body}>
            Iron deficiency is most likely to occur in babies by prolonging the first fruit and vegetable only stage
            during weaning. By waiting until around six moths to introduce complementary foods, there&apos;s no need for
            a fruit and vegetable only stage.
          </p>
          <p className={styles.body}>
            Whilst fruit and veggies contain lots of important vitamins and minerals, iron should be introduced at six
            months. And by six and a half months, iron rich foods will need to feature quite heavily in their diet.
          </p>

          <h2 className={styles.sectionTitle}>How often should my baby have foods containing iron?</h2>
          <p className={styles.body}>
            As a guideline you should be giving your baby iron-rich foods twice a day once meals have been established.
          </p>

          <h2 className={styles.sectionTitle}>Which foods are high in Iron for babies?</h2>
         
          <img
            src={`${IMG}/iron-sources-infographic.jpg`}
            alt="Super duper sources of iron infographic"
            width={900}
            height={900}
            className={styles.contentImage}
          />
           <p className={styles.body}>
            If you&apos;re a meat-eating family, the best form of iron for babies is found in red meat. Your baby will
            absorb iron from meat more easily than iron from any other food source, and lean beef is packed with it. As a
            rough guide, the darker the flesh of the meat, the higher the iron content.
          </p>
          <p className={styles.subheading}>Good sources of iron for babies and how to serve them:</p>
          <ul className={styles.bulletList}>
            {meatIronSources.map((item) => (
              <li key={item.label} className={styles.bulletItem}>
                <strong className={styles.bulletItemLabel}>{item.label}</strong> – {item.text}
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionTitle}>How do vegetarian babies get iron?</h2>
          <p className={styles.body}>
            If you follow a vegetarian diet, there are plenty of non-meat sources of iron. However, as these are
            primarily plant-based, the absorption of this form of iron is lower, so the amount your baby will need is
            slightly higher.
          </p>
          <img
            src={`${IMG}/vegetarian-iron.jpg`}
            alt="Popeye pasta with spinach for babies"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <p className={styles.subheading}>Best vegetarian sources of iron:</p>
          <ul className={styles.bulletList}>
            {vegetarianIronSources.map((item) => (
              <li key={item.label} className={styles.bulletItem}>
                <strong className={styles.bulletItemLabel}>{item.label}</strong> – {item.text}
              </li>
            ))}
          </ul>

          <p className={styles.sectionTitle}>Why do I need to pair vitamin C with iron?</p>
          <p className={styles.body}>
            Did you know that vitamin C aids iron absorption? By pairing iron containing foods with a vitamin C rich
            food it will help with the absorption of iron. This is particularly important for those following a
            vegetarian or vegan diet.
          </p>
          <p className={styles.subheading}>Which foods are high in vitamin C?</p>
          <ul className={styles.bulletList}>
            {vitaminCSources.map((item) => (
              <li key={item.label} className={styles.bulletItem}>
                <strong className={styles.bulletItemLabel}>{item.label}</strong> ({item.text}
              </li>
            ))}
          </ul>
          <p className={styles.body}>
            And remember, if you are cooking your vegetables, be sure to only very lightly cook these as vitamin C is
            heat sensitive. Heating them for a prolonged time reduces the level of this nutrient. Stir frying or
            steaming is one of the best ways to cook veggies.
          </p>

          <h2 className={styles.sectionTitle}>Annabel&apos;s iron rich recipes:</h2>
          <p className={styles.recipeEmpty}>It seems we can&apos;t find what you&apos;re looking for.</p>

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
