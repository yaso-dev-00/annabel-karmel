import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Top 10 baby-led weaning recipes | Annabel Karmel",
  description:
    "Annabel Karmel's popular baby-led weaning recipes, with finger food ideas, practical guidance, and nutritious family-friendly options.",
};

const relatedArticles = getRelatedArticles("/top-10-baby-led-weaning-recipes");
const IMG = "/articles/top-10-baby-led-weaning-recipes";

const GUIDE_URL = "https://annabelkarmel.com/ultimate-guide-finger-foods-baby/";
const BOOK_URL =
  "https://www.amazon.co.uk/gp/product/1786750848/ref=as_li_tl?ie=UTF8&tag=annabelkcom-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=1786750848&linkId=d578bc54a025fb74d5a02627fcc6c5fd";

type Recipe = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  postViews: string;
};

const recipes: Recipe[] = [
  {
    title: "Sweet Potato Frittata Fingers",
    href: "https://www.annabelkarmel.com/recipes/sweet-potato-frittata-fingers/",
    image: `${IMG}/sweet-potato-frittata-fingers.jpg`,
    imageAlt: "Sweet potato frittata fingers",
    excerpt:
      "These frittata fingers make for the best finger food for babies and are a great lunchbox filler or power-packed breakfast for toddlers & kids.",
    postViews: "24,316",
  },
  {
    title: "Yoghurt Pancakes With Berries",
    href: "https://www.annabelkarmel.com/recipes/yoghurt-pancakes-with-berries/",
    image: `${IMG}/yoghurt-pancakes-with-berries.jpg`,
    imageAlt: "Yoghurt pancakes with berries",
    excerpt:
      "These yoghurt pancakes with berries will tempt even the fussiest eaters to chomp away their breakfast. Plus, these pancakes are free from refined sugar and provide a host of nutrients.",
    postViews: "23,096",
  },
  {
    title: "Sweet Potato & Kale Croquettes",
    href: "https://www.annabelkarmel.com/recipes/sweet-potato-and-kale-croquettes/",
    image: `${IMG}/sweet-potato-kale-croquettes.jpg`,
    imageAlt: "Sweet potato and kale croquettes",
    excerpt:
      "Most babies are open to trying new foods. However, it can be tricky getting them to enjoy leafy green vegetables, so these sweet potato and kale croquettes are a super-tasty option.",
    postViews: "2,699",
  },
  {
    title: "French Toast with Berries",
    href: "https://www.annabelkarmel.com/recipes/french-toast-with-berries/",
    image: `${IMG}/french-toast-with-berries.jpg`,
    imageAlt: "French toast with berries",
    excerpt:
      "French toast with fruit makes for a tasty breakfast for your little ones. Blueberries contain more antioxidants than any other fruits due to the blue pigment in their skin.",
    postViews: "2,356",
  },
  {
    title: "Parmesan Roasted Sweet Potato Wedges",
    href: "https://www.annabelkarmel.com/recipes/parmesan-roasted-sweet-potato-wedges/",
    image: `${IMG}/parmesan-roasted-sweet-potato-wedges.png`,
    imageAlt: "Parmesan roasted sweet potato wedges",
    excerpt:
      "Babies love the flavour of these baked Parmesan roasted sweet potato wedges. Roasting sweet potato intensifies natural sweetness and makes these ideal for little hands.",
    postViews: "2,296",
  },
  {
    title: "Mini Energy Balls",
    href: "https://www.annabelkarmel.com/recipes/mini-energy-balls/",
    image: `${IMG}/mini-energy-balls.png`,
    imageAlt: "Mini energy balls",
    excerpt:
      "Try these delicious Mini Energy Balls. They make a healthy snack and are ideal for a mid-morning or afternoon energy boost for both kids and grown-ups.",
    postViews: "11,468",
  },
  {
    title: "Broccoli, Chicken & Potato Bites",
    href: "https://www.annabelkarmel.com/recipes/broccoli-chicken-potato-bites/",
    image: `${IMG}/broccoli-chicken-potato-bites.png`,
    imageAlt: "Broccoli chicken and potato bites",
    excerpt:
      "These Broccoli, Chicken & Potato Bites make a great soft finger food for little ones. A yummy combination of flavours to please your gurgling gourmet.",
    postViews: "13,138",
  },
];

export default function Top10BabyLedWeaningRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.introLead}>
            Once your baby has got to grips with those first finger foods when baby-led weaning, it's important to
            continue to introduce a wide variety of healthy foods, flavours and textures early on. And here are some of
            Annabel's most popular baby-led weaning recipes with young families.
          </p>
          <p className={styles.intro}>
            Remember, baby-led weaning doesn't have to be an all-or-nothing method. You can choose to feed your baby
            soft finger foods and small portions of family meals alongside spoon-feeding purees. The important thing is
            that both you and your baby feel content and comfortable in your routine.
          </p>
          <p className={styles.intro}>
            For lots more ideas, Annabel's{" "}
            <a href={BOOK_URL} className={styles.link} target="_blank" rel="noopener noreferrer">
              Baby-Led Weaning Recipe Book
            </a>{" "}
            is great, whether you're exclusively baby-led weaning or looking for food ideas to feed alongside purees.
          </p>

          <section className="mt-[50px] text-center px-4 py-6 md:px-8 md:py-8">
            <h2 className={styles.bannerTitle}>FREE Finger Food Guide</h2>
            <div className={styles.bannerGrid}>
              <img
                src={`${IMG}/finger-food-guide.jpg`}
                alt="Free finger food guide"
                width={790}
                height={792}
                className={styles.bannerImage}
              />
              <div className={styles.bannerContent}>
                <p className={styles.bannerText}>
                  Whether you're weaning with purees or taking a baby-led approach, finger foods will be an important
                  part of your baby's feeding journey. But where to start? What finger foods are best for baby?
                </p>
                <p className={styles.bannerText}>
                  Annabel's brand new 30-page guide provides you with everything you need to know for a flying start.
                  And it's FREE!
                </p>
                <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer" className={styles.bannerButton}>
                  GET MY FREE GUIDE
                </a>
              </div>
            </div>
          </section>

          <section className="mt-[56px]">
            <h2 className={styles.sectionTitle}>Top recipes to get you started on your baby-led weaning journey</h2>
            <div className="mt-[36px] space-y-[60px]">
              {recipes.map((recipe) => (
                <article key={recipe.title} className={`${styles.card} mt-[40px]`}>
                  <a href={recipe.href} className={styles.imageWrap} target="_blank" rel="noopener noreferrer">
                    <img src={recipe.image} alt={recipe.imageAlt} width={768} height={768} loading="lazy" />
                  </a>
                  <div className={`${styles.cardBody} text-center`}>
                    <h3 className={styles.cardTitle}>
                      <a href={recipe.href} className={styles.cardTitleLink} target="_blank" rel="noopener noreferrer">
                        {recipe.title}
                      </a>
                    </h3>
                    <p className={styles.excerpt}>
                      {recipe.excerpt}
                      <span className={styles.postViews}>Post Views: {recipe.postViews}</span>
                    </p>
                    <div className="mt-[20px] text-center">
                      <a href={recipe.href} className={styles.readMore} target="_blank" rel="noopener noreferrer">
                        Read More
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-[64px] rounded-[6px]  px-5 py-7 text-center md:px-8">
            <h2 className={styles.promoTitle}>Starting your weaning journey?</h2>
            <p className={styles.promoText}>
              Annabel Karmel's Baby-Led Weaning Recipe Book is filled with 120 quick, easy and nutritious recipes,
              essential advice and tips to let your baby take the lead.
            </p>
            
          </section>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[80px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
