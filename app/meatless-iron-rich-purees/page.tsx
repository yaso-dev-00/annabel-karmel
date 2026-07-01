import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/meatless-iron-rich-purees");

const recipes = [
  {
    title: "Sweet Potato & Lentil Puree",
    href: "https://www.annabelkarmel.com/recipes/sweet-potato-lentil-puree/",
    image: "/articles/meatless-iron-rich-purees/sweet-potato-lentil-puree.jpg",
    excerpt:
      "Iron is one of the most important nutrients to introduce to your baby from 6 months. Lentils are a super source of iron for little ones, as well as protein & zinc. Little taste buds will love this Sweet Potato & Lentil Puree combination due to the natural sweetness from the sweet potatoes.   Post Views: 2,405",
  },
  {
    title: "Banana, Avocado & Blueberry Puree",
    href: "https://www.annabelkarmel.com/recipes/banana-avocado-and-blueberry-puree/",
    image: "/articles/meatless-iron-rich-purees/banana-avocado-blueberry-puree.jpg",
    excerpt:
      "It is important to introduce iron-rich foods as soon as your baby starts solids, usually from around 6 months. There are plenty of meat-free sources of iron. Bananas & blueberries are both fruits that are high in iron. Avocados are also a great super food for babies as they are a fruit rich in nutrients. Babies will love the natural sweetness of this Banana, Avocado & Blueberry Puree, which you can blend up in minutes. Post Views: 1,205",
  },
  {
    title: "Porridge with Banana & Apricots",
    href: "https://www.annabelkarmel.com/recipes/porridge-with-banana-apricots/",
    image: "/articles/meatless-iron-rich-purees/porridge-banana-apricots.jpg",
    excerpt:
      "This Porridge with Banana & Apricots is a a great iron-rich breakfast. Iron is one of the most important nutrients for babies when you start introducing solids (usually from around 6 months). Porridge is a great food for babies and a super easy (and meat-free) source of iron. Top with fruits such as banana and apricots (both also a great source of iron & vitamin C!)    Post Views: 690",
  },
  {
    title: "Potato, Broccoli & Pea Puree",
    href: "https://www.annabelkarmel.com/recipes/potato-broccoli-and-pea-puree/",
    image: "/articles/meatless-iron-rich-purees/potato-broccoli-pea-puree.jpg",
    excerpt:
      "Iron is one of the most important critical nutrients to introduce to your baby from 6 months. There are lots of meat-free sources of iron that are great for baby. Potato, broccoli & peas are all super sources of iron, so this mean green Potato, Broccoli and Pea Puree is perfect for little ones. Post Views: 2,197",
  },
];

export default function MeatlessIronRichPureesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} md:text-left text-center`}>
            Iron is one of the most important critical nutrients you will need to introduce to your baby
            from six months.
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            Getting enough iron for babies is essential as it is needed for making haemoglobin in red blood
            cells. It’s the micronutrient that enables the blood to carry oxygen around the body to your baby’s
            organs and muscles. It’s also important for the immune system – so as you can see it is vital for
            your baby.
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            Full term babies are born with a reserve of iron. Until six months, your baby will have been using
            the store of iron they’ve inherited from mum. But it’ll be starting to run low by this point, which is
            why from around six months is the ideal time to start introducing iron-rich foods into your baby’s diet.
          </p>
          <p className={`${styles.intro} md:text-left text-center font-bold`}>
            How do vegetarian babies get iron?
          </p>
          <p className={`${styles.intro} md:text-left text-center `}>
            If you follow a vegetarian diet, there are plenty of non-meat sources of iron. However, as these are
            primarily plant-based, the absorption of this form of iron is lower, so the amount your baby will need is
            slightly higher.        </p>

            <p className={`${styles.intro} mt-[30px]! md:text-left text-center `}> Here are some of my favourite Meatless Iron Rich Puree Combos for you to try:
            </p>

          <div className="mt-[60px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#FEF3F4" }} className=" mt-[40px]">
                <a href={recipe.href}>
                  <img src={recipe.image} alt={recipe.title} className="w-full" />
                </a>
                <div
                  style={{ padding: "16px 21px" }}
                  className="px-[16px] pb-[21px]! mt-[20px]!  pt-[10px] text-center"
                >
                  <h2 className={styles.cardTitle}>{recipe.title}</h2>
                  <p className={`${styles.cardExcerpt} mt-[10px]!`}>{recipe.excerpt}</p>
                  <div className="mt-[20px] text-center">
                    <a href={recipe.href} className={styles.readMore}>
                      Read More
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[80px]! px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}

