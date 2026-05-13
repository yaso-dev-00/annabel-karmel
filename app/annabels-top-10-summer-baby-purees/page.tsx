import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/annabels-top-10-summer-baby-purees");

const recipes = [
  {
    title: "Peach, Apple, Apricot & Pear Puree",
    href: "https://www.annabelkarmel.com/recipes/peach-apple-apricot-pear-puree/",
    image: "/articles/annabels-top-10-summer-baby-purees/peach-apple-apricot-pear-puree.jpg",
    excerpt: "This fruit puree can be made with just apples and pears when peaches aren't in season. Post Views: 411",
  },
  {
    title: "Porridge with Apple, Pear & Apricot Puree",
    href: "https://www.annabelkarmel.com/recipes/porridge-with-apple-pear-and-apricot-puree/",
    image: "/articles/annabels-top-10-summer-baby-purees/porridge-apple-pear-apricot-puree.jpg",
    excerpt:
      "Your baby will love this Porridge with Apple, Pear and Apricot Puree. Simply add portions of the fruit puree to your baby's porridge in the morning for breakfast. Post Views: 497",
  },
  {
    title: "Peach, Apple & Strawberry Puree",
    href: "https://www.annabelkarmel.com/recipes/peach-apple-strawberry-puree/",
    image: "/articles/annabels-top-10-summer-baby-purees/peach-apple-strawberry-puree.jpg",
    excerpt: "This fruit puree is best made in the summer when peaches are in season. Post Views: 285",
  },
  {
    title: "Apple, Blueberry & Pear Puree",
    href: "https://www.annabelkarmel.com/recipes/apple-blueberry-pear-puree/",
    image: "/articles/annabels-top-10-summer-baby-purees/apple-blueberry-pear-puree.jpg",
    excerpt:
      "This fruit puree makes for a lovely combination. Blueberries, which are very high in nutrients are mixed with a sweet eating apple and a ripe pear. Post Views: 561",
  },
  {
    title: "Nectarine & Apple Puree",
    href: "https://www.annabelkarmel.com/recipes/nectarine-apple-puree/",
    image: "/articles/annabels-top-10-summer-baby-purees/nectarine-apple-puree.jpg",
    excerpt: "A delicious fruit puree to make when sweet nectarines are in season. Post Views: 571",
  },
  {
    title: "Plum, Peach & Prunes",
    href: "https://www.annabelkarmel.com/recipes/plum-peach-prunes/",
    image: "/articles/annabels-top-10-summer-baby-purees/plum-peach-prunes.jpg",
    excerpt: "This Plum, Peach and Prunes puree is also good stirred into porridge for breakfast. Post Views: 558",
  },
  {
    title: "Blueberry, Pear & Banana Puree",
    href: "https://www.annabelkarmel.com/recipes/blueberry-pear-banana-puree/",
    image: "/articles/annabels-top-10-summer-baby-purees/blueberry-pear-banana-puree.jpg",
    excerpt:
      "This Blueberry, Pear & Banana Puree is tasty trio of pureed fruits. To introduce texture, add some baby cereal or crushed rusk to the bowl. Post Views: 3,301",
  },
  {
    title: "Aromatic Beef with Sweet Pepper & Apricots",
    href: "https://www.annabelkarmel.com/recipes/aromatic-beef-with-sweet-pepper-apricots/",
    image: "/articles/annabels-top-10-summer-baby-purees/aromatic-beef-sweet-pepper-apricots.jpg",
    excerpt:
      "This Aromatic Beef with Sweet Pepper & Apricots puree is a tasty intro to herbs & spices, guaranteed to excite your little one's taste-buds. This recipe calls for lean minced beef so it is full of protein and iron and other key nutrients. It is also Dairy Free, Egg Free, Gluten Free and Nut Free so it is ideal for little ones with food allergies and intolerances. Post Views: 837",
  },
  {
    title: "Salmon, Sweet Potato & Spinach",
    href: "https://www.annabelkarmel.com/recipes/salmon-sweet-potato-spinach/",
    image: "/articles/annabels-top-10-summer-baby-purees/salmon-sweet-potato-spinach.jpg",
    excerpt:
      "Blaze the flavour trail with this nutritious Salmon, Sweet Potato & Spinach puree, packed with lots of goodness to aid your baby's development. Post Views: 1,261",
  },
  // {
  //   title: "Tomato & Butternut Squash Pasta",
  //   href: "https://www.annabelkarmel.com/recipes/tomato-butternut-squash-pasta/",
  //   image: "/articles/annabels-top-10-summer-baby-purees/tomato-butternut-squash-pasta.jpg",
  //   excerpt:
  //     "Fill up tiny tums with this delicious and creamy Tomato & Butternut Squash Pasta recipe. This is an exclusive recipe from the 30th Anniversary Edition of my Global Bestselling Cookbook: The Complete Baby & Toddler Meal Planner. Post Views: 10,181",
  // },
];

export default function SummerBabyPureesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} md:text-left text-center`}>
            Summertime and the living is easy... especially with these easy, peasy baby purees!
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            Whether you and your little one are taking the spoon or baby-led weaning route, purees are a great way to
            up your little one's nutrients and introduce them to more lumpy textures.
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            Nutritious, delicious and oh-so easy, all you need to do is blend a bunch of ingredients together and
            you're good to go!
          </p>
          <p className={`${styles.intro} md:text-left text-center`}>
            <strong>Here are my top 10 baby purees for your little ones to try this summer:</strong>
          </p>

          <div className="mt-[60px]! space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#f3ebee" }} className=" mt-[40px]">
                <a href={recipe.href}>
                  <img src={recipe.image} alt={recipe.title} className="w-full" />
                </a>
                <div style={{ padding: "16px 21px" }} className="px-[16px] pb-[21px]! mt-[20px]!  pt-[10px] text-center">
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
