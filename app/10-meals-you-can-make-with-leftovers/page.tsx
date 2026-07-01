import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/10-meals-you-can-make-with-leftovers");

const recipes = [
  {
    title: "Vroom Vroom Sandwiches",
    href: "https://www.annabelkarmel.com/recipes/vroom-vroom-sandwiches/",
    image: "/articles/10-meals-you-can-make-with-leftovers/vroom-vroom-sandwiches.jpg",
    excerpt:
      "Up your family's sandwich game with these fun, tasty and nutritious open rye bread sandwiches. Rye bread is such a fantastic source of fibre and Baker Street's Seeded Rye Bread is packed with sunflower seeds and linseeds for added goodness - and crunch! Post Views: 744",
  },
  {
    title: "Hidden Veg Chicken Sausages",
    href: "https://www.annabelkarmel.com/recipes/hidden-veg-chicken-sausages/",
    image: "/articles/10-meals-you-can-make-with-leftovers/hidden-veg-chicken-sausages.jpg",
    excerpt:
      "These chicken and veg hot dogs are perfect for a kid's party, BBQ or family Friday film night! Plus, they are so quick and easy to prepare - simply pop all the ingredients in a food processor and you're ready to roll! Post Views: 2,792",
  },
  {
    title: "Strata with Cheese, Bacon, Eggs & Tomatoes",
    href: "https://www.annabelkarmel.com/recipes/strata-with-cheese-bacon-eggs-tomatoes/",
    image: "/articles/10-meals-you-can-make-with-leftovers/strata-with-cheese-bacon-eggs-tomatoes.png",
    excerpt:
      "This savoury casserole baked with eggs, cheese, bacon and tomatoes is the most delicious way to use up any leftover bread. So, if you've got a few slices of leftover loaf hanging around please don't chuck it. Post Views: 1,718",
  },
  {
    title: "Roasted Vegetable Soup",
    href: "https://www.annabelkarmel.com/recipes/roasted-vegetable-soup/",
    image: "/articles/10-meals-you-can-make-with-leftovers/roasted-vegetable-soup.jpg",
    excerpt:
      "Revamp vegetables which are slightly past their best by roasting them in the oven, which brings out a lovely caramelisation. Packed with loads of nutrients from the different veggies, this soup is a winter warmer essential suitable for the whole family! Post Views: 3,288",
  },
  {
    title: "Banana & Carrot Bread",
    href: "https://www.annabelkarmel.com/recipes/banana-carrot-loaf/",
    image: "/articles/10-meals-you-can-make-with-leftovers/banana-carrot-bread.jpg",
    excerpt:
      "This recipe is the perfect energy boost, and a great way to use up those overripe bananas (the more brown spots the better!). Making this Banana & Carrot Bread is also a great after school activity for your keen little bakers. Post Views: 12,816",
  },
  {
    title: "Veggie Packed Frittata Muffins 4-ways",
    href: "https://www.annabelkarmel.com/recipes/veggie-packed-frittata-muffins/",
    image: "/articles/10-meals-you-can-make-with-leftovers/veggie-packed-frittata-muffins.jpg",
    excerpt:
      "These frittata muffins are so simple to make and very versatile, making them the ideal recipe for using up leftovers. With four different flavour combinations to choose from, there's a frittata muffin here for everyone! Post Views: 24,623",
  },
  {
    title: "4-Ingredient Cheesy Broccoli Pasta",
    href: "https://www.annabelkarmel.com/recipes/cheesy-broccoli-pasta/",
    image: "/articles/10-meals-you-can-make-with-leftovers/cheesy-broccoli-pasta.jpg",
    excerpt:
      "Wondering what to do with those few leftover broccoli florets? Looking for a quick and delicious meal for your baby? You're in luck! Using one-pot, 4-ingredients, and made in less than 15 minutes, what's not to love? Post Views: 69,591",
  },
  {
    title: "Chicken, Tomato & Corn Fritters",
    href: "https://www.annabelkarmel.com/recipes/chicken-tomato-corn-fritters/",
    image: "/articles/10-meals-you-can-make-with-leftovers/chicken-tomato-corn-fritters.jpg",
    excerpt:
      "You won't want to fritter away any more time not making these delicious chicken, sweetcorn and tomato buttermilk fritters. This is the perfect quick and easy meal to use up that leftover roast chicken from the weekend! Post Views: 10,331",
  },
  {
    title: "Salmon & Veggie Bites",
    href: "https://www.annabelkarmel.com/recipes/salmon-veggie-bites/",
    image: "/articles/10-meals-you-can-make-with-leftovers/salmon-veggie-bites.jpg",
    excerpt:
      "If you ever find yourself with leftover mashed potato, this Salmon & Veggie Bites recipe might just be your new go-to! Salmon contains many essential nutrients for babies and children including, omega-3 essential fatty acids so aim to feed your little ones two portions of fish per week to keep them swimming along nicely! Post Views: 16,199",
  },
  {
    title: "Herby Chicken Nuggets with Spiralized Sweet Potato Curls",
    href: "https://www.annabelkarmel.com/recipes/herby-chicken-nuggets-with-spiralized-sweet-potato-curls/",
    image: "/articles/10-meals-you-can-make-with-leftovers/herby-chicken-nuggets.jpg",
    excerpt:
      "The whole family will love this Herby Chicken Nuggets recipe. Enlisting the help of a sprializer will add some serious oomph to leftover veggies! Simply baking sweet potato curls in the oven with a little oil and salt and pepper or herbs turns them into the most delectable dish (and adds oodles of child appeal to everyday vegetables). If you don't have a spiralizer you can grate ribbons with a vegetable peeler instead. Post Views: 1,488",
  },
];

export default function LeftoversRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro}  text-center`}>
            Food waste is a real problem & together with my friends at{" "}
            <strong>
              <a className={styles.partnerLinkText} href="https://lovebakerstreet.com/food-waste/" target="_blank" rel="noreferrer">
                Baker Street
              </a>
            </strong>{" "}
            we're passionate about doing something about it. With the cost-of-living crisis surging on, there's no
            time like the present to take the steps to reduce waste, cut costs and help the environment!
          </p>
          <p className={`${styles.intro}  text-center`}>
            Don't let anything go to waste with our top 10 leftover recipes. Make use of your leftover bread with
            Annabel's delicious Strata recipe, use up leftover chicken to make satisfying pies or try our hidden veg &
            chicken sausages. We've also got tons of recipes to use up your leftover veggies, try Annabel's hidden veg
            tomato sauce or roasted veg soup.
          </p>
          <p className={`${styles.intro}  text-center`}>
            Without further ado, here are Annabel's top 10 recipes to rustle up a delicious family meal with just the
            leftover ingredients from your fridge and pantry.
          </p>
          <p className={`${styles.intro} text-center`}>
            For more top tips on how to maximise your leftovers and reduce food waste at home{" "}
            <em>
              <strong>
                <a
                className={styles.partnerLinkText}
                  href="https://www.annabelkarmel.com/top-10-tip-to-reduce-food-waste/"
                  target="_blank"
                  rel="noreferrer"
                >
                  click here.
                </a>
              </strong>
            </em>
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

          <p className={`${styles.intro} mt-[24px]! text-center`}>
            Follow Baker Street{" "}
            <em>
              for more ways to use their cleverly packed range of products that last longer to help you and your
              family tackle food waste.
            </em>
          </p>
          <div className="mt-[50px] flex justify-center gap-[28px]">
            <a
              href="https://www.facebook.com/LoveBakerStreet/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-[7px] bg-black"
              aria-label="Baker Street on Facebook"
            >
              <svg aria-hidden="true" viewBox="0 0 512 512" className="h-[31px] w-[31px]" fill="#fff">
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/lovebakerstreet/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-[7px] bg-black"
              aria-label="Baker Street on Instagram"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[29px] w-[29px]" fill="none" stroke="#fff">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5.2" strokeWidth="2.1" />
                <circle cx="12" cy="12" r="4.4" strokeWidth="2.1" />
                <circle cx="17.7" cy="6.3" r="1.15" fill="white" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@lovebakerstreet"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-[7px] bg-black"
              aria-label="Baker Street on TikTok"
            >
              <svg aria-hidden="true" viewBox="0 0 448 512" className="h-[31px] w-[31px]" fill="#fff">
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
              </svg>
            </a>
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
