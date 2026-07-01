import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/budget-friendly-recipes-for-a-healthy-balanced-diet");

const recipes = [
  {
    title: "Plant-Based Veggie Croquettes",
    href: "https://www.annabelkarmel.com/recipes/plant-based-veggie-croquettes/",
    image: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/plant-based-veggie-croquettes.jpg",
    excerpt:
      "Easy to pick up with a soft texture & crispy coating, my Plant-Based Veggie Croquettes are packed with hidden veggies. A perfect finger food for babies & older kids too. You can make ahead & freeze them once cooked.",
    postViews: "8,596",
  },
  {
    title: "Tofu & Veggie Bites",
    href: "https://www.annabelkarmel.com/recipes/tofu-veggie-bites/",
    image: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/tofu-veggie-bites.jpg",
    excerpt:
      "Tofu can get a bit of a bad rep on the flavour charts, but the beauty of this versatile soy product is that it absorbs flavour like a sponge. What's more, tofu is a source of complete plant protein & protective antioxidants.",
    postViews: "11,471",
  },
  {
    title: "Veggie Frittata Muffins",
    href: "https://www.annabelkarmel.com/recipes/veggie-frittata-muffins/",
    image: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/veggie-frittata-muffins.jpg",
    excerpt:
      "Eggs are full of protein, vitamins and minerals, including vitamin D, folate, iodine and long-chain omega-3 fatty acids, so provide a nutritious and delicious meal at any time of the day. These Veggie Frittata Muffins are a nutritious, quick and easy recipe that you and your tot can enjoy together.",
    postViews: "11,811",
  },
  {
    title: "Tasty Meatless Bolognese",
    href: "https://www.annabelkarmel.com/recipes/tasty-meatless-bolognese/",
    image: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/tasty-meatless-bolognese.jpg",
    excerpt:
      "A rich, hearty & tasty meatless bolognese which utilises pea based protein mince for a boost - easy to knock up in a single pot!",
    postViews: "973",
  },
  {
    title: "Carrot, Coconut & Raisin Bites",
    href: "https://www.annabelkarmel.com/recipes/carrot-coconut-and-raisin-bites/",
    image: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/carrot-coconut-raisin-bites.jpg",
    excerpt:
      "These make the perfect healthy finger food for little ones. They contain no refined sugar and the natural sweetness comes from the dates, carrots and raisins.",
    postViews: "242",
  },
  {
    title: "Popeye Pasta",
    href: "https://www.annabelkarmel.com/recipes/popeye-pasta/",
    image: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/popeye-pasta.jpg",
    excerpt:
      "This pasta dish contains spinach which is a great source of various vitamins. Mixing tiny pasta shapes into your baby's food is also a good way to add texture to encourage your baby to eat more lumpy food.",
    postViews: "11,008",
  },
  {
    title: "Vegetable Fusilli",
    href: "https://www.annabelkarmel.com/recipes/vegetable-fusilli/",
    image: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/vegetable-fusilli.jpg",
    excerpt:
      "A tasty quick vegetable pasta dish. The light cheesy sauce couldn't be easier simply mix together some vegetable stock, creme fraiche and parmesan.",
    postViews: "740",
  },
  {
    title: "Lovely Lentils",
    href: "https://www.annabelkarmel.com/recipes/lovely-lentils/",
    image: "/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/lovely-lentils.jpg",
    excerpt:
      "This Lovely Lentils recipe is sweet, soft & smooth for babies. It's easy to make & is packed full of vital nutrients to help them grow up strong.",
    postViews: "15,011",
  },
];

export default function BudgetFriendlyRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <h1 className={styles.title}>Budget-Friendly Recipes for a Healthy, Balanced Diet</h1>

          <p className={`${styles.body} mt-[20px]`}>
            Rising costs have led to most of us feeling the pinch in many aspects of life, and now they're affecting
            what our kids are being served at school. I was shocked and disheartened by{" "}
            <a href="https://www.bbc.co.uk/news/education-61882652" target="_blank" rel="noopener" className="hover:text-[#e98c9a]! underline!">
              this BBC article
            </a>{" "}
            that revealed that rising food prices have resulted in some school catering bodies making the difficult
            decision to reduce, and in some cases, remove food staples such as beef from the menu.
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            The dispiriting news stated that substitutes are being made for more expensive cuts of meats, and that even
            the fruit and veg being served to our little ones isn't off limits!
          </p>

          <div className="flex justify-center w-full">
          <img
            src="/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/kitchen.jpg"
            alt="Children at a table with school meal plates"
            className="mt-[40px] w-full md:max-w-[1000px]!"
          />
          </div>
        

          <p className={`${styles.body} mt-[20px]`}>
            When we think of school and nursery menus, we think of hearty burgers or the trusty lasagne, but with the
            news that the cost of minced beef has risen by 11% in the past few days, we may have to wave goodbye to
            these, crucially, iron-rich meals as regular fixtures.
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            In a further bid to combat rising costs, imported cheaper cuts and processed meats are being used as an
            alternative to homegrown meat, as well as turkey meat being served in lieu of more expensive chicken. Even
            the humble potato will potentially play a less pivotal role in school meals due to a hike in prices (with
            10kg of prepared potatoes rising from £10.46 to £15.50) as a result of rising fertiliser and fuel costs.
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            With pantry basics such as oil, pasta, fish and frozen veg which have taken the worst hit, caterers are
            reporting weekly fluctuations and increases of 20-30% for a host of products.
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            The report also indicates that, devastatingly, rising costs prompted by the pandemic, war in Ukraine and
            burgeoning fuel prices, have also had a knock-on effect on staff budgeting in school kitchens, further
            reducing the quality (and quantity) of meals on offer.
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            This is particularly alarming when you consider that in some cases free school meals can be a child's only
            significant meal of the day and therefore make up the bulk of their nutritional intake.
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            A varied and versatile school menu also presents a great opportunity for little ones to be adventurous and
            explore new foods that they might not have otherwise tried at home.
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            With costs outrunning funding at a time when a hot meal at school can be life-affirming for families, this
            is a real problem that needs to be addressed now.
          </p>

<div className="flex justify-center w-full">
          <img
            src="/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/sources-of-iron.jpg"
            alt="Sources of iron infographic"
            className="mt-[40px] w-full"
          />
          </div>

          <p className={`${styles.body} mt-[18px]`}>
            It's for this reason that I have rounded up some budget-friendly recipes that won't break the bank and will
            ensure that, despite less accessibility of beef and minced meat, your child is getting enough iron.
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            Despite how it might currently seem, there are cost-efficient ways to ensure your little one is hitting
            their nutritional targets, especially when it comes to the all-important iron found in beef.
          </p>

          <h2 className={`${styles.subheading} mt-[36px]`}>Why do I need to pair vitamin C with iron?</h2>
          <p className={`${styles.body} mt-[20px]!`}>
            Did you know that vitamin C aids iron absorption? By pairing iron containing foods with a vitamin C rich
            food it will help with the absorption of iron. This is particularly important for those following a
            vegetarian or vegan diet.
          </p>

          <div className="mt-[40px]! p-4 grid grid-cols-1 gap-[18px] md:grid-cols-2">
            <img
              src="/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/plant-based-iron-rich-foods.jpg"
              alt="Plant based iron rich foods chart"
              className={styles.media}
            />
            <img
              src="/articles/budget-friendly-recipes-for-a-healthy-balanced-diet/vitamin-c-rich-foods.jpg"
              alt="Vitamin C rich foods chart"
              className={styles.media}
            />
          </div>

          <p className={`${styles.body} mt-[14px]!`}>
            As most know, iron is essential for your little one's brain development, especially from six months when
            the iron inherited from a baby's mother runs out. Iron deficiency in children is a common problem and can
            have a profound effect on learning in later life, so it's important that children of all ages are consuming
            adequate amounts, accompanied with Vitamin C to promote its absorption.
          </p>

          <h2 className={`${styles.subheading} mt-[36px]`}>
            Here are my top iron-laden and budget-friendly recipes for a healthy, balanced diet
          </h2>

          <div className="mt-[30px] grid grid-cols-1 gap-[22px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} className="bg-[#fff6f6]  pb-[14px] pt-0">
                <a href={recipe.href}>
                  <img src={recipe.image} alt={recipe.title} className={styles.media} />
                </a>
                <div className="pt-[30px] px-[16px] pb-[14px] text-center">
                  <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                  <p className={`${styles.recipeExcerpt} mt-[8px]`}>
                    {recipe.excerpt} Post Views: {recipe.postViews}
                  </p>
                  <a href={recipe.href} className={`${styles.readMore} mt-[20px]`}>
                    Read More
                  </a>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-[80px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[70px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
