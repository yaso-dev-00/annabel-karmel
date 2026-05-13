import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/annabels-top-10-finger-food-recipes");

const recipes = [
  {
    title: "Chicken & Veggie Shapes",
    href: "https://www.annabelkarmel.com/recipes/chicken-veggie-shapes/",
    image: "/articles/annabels-top-10-finger-food-recipes/chicken-veggie-shapes.jpg",
    excerpt:
      "A great recipe for using up leftover chicken, turkey or beef. These Chicken & Veggie shapes are loaded with veggies & are super easy to freeze. Post Views: 1,293",
  },
  {
    title: "Plant-Based Veggie Croquettes",
    href: "https://www.annabelkarmel.com/recipes/plant-based-veggie-croquettes/",
    image: "/articles/annabels-top-10-finger-food-recipes/plant-based-veggie-croquettes.jpg",
    excerpt:
      "Easy to pick up with a soft texture & crispy coating, my Plant-Based Veggie Croquettes are packed with hidden veggies. A perfect finger food for babies & older kids too. You can make ahead & freeze them once cooked. Post Views: 8,565",
  },
  {
    title: "Tofu & Veggie Bites",
    href: "https://www.annabelkarmel.com/recipes/tofu-veggie-bites/",
    image: "/articles/annabels-top-10-finger-food-recipes/tofu-veggie-bites.jpg",
    excerpt:
      "Tofu can get a bit of a bad rep on the flavour charts, but the beauty of this versatile soy product is that it absorbs flavour like a sponge. What’s more, tofu is a source of complete plant protein & protective antioxidants. Post Views: 11,434",
  },
  {
    title: "Salmon & Veggie Bites",
    href: "https://www.annabelkarmel.com/recipes/salmon-veggie-bites/",
    image: "/articles/annabels-top-10-finger-food-recipes/salmon-veggie-bites.jpg",
    excerpt:
      "If you ever find yourself with leftover mashed potato, this Salmon & Veggie Bites recipe might just be your new go-to! Salmon contains many essential nutrients for babies and children including, omega-3 essential fatty acids so aim to feed your little ones two portions of fish per week to keep them swimming along nicely! Post Views: 16,202",
  },
  {
    title: "Egg Free Chicken & Veggie Bites",
    href: "https://www.annabelkarmel.com/recipes/egg-free-chicken-veggie-bites/",
    image: "/articles/annabels-top-10-finger-food-recipes/egg-free-chicken-veggie-bites.jpg",
    excerpt:
      "Did you know that an allergy to eggs is much more common in young children than in adults? This is because most children outgrow an allergy to eggs. Parents often ask me for egg-free recipe inspiration, so here is a fantastic finger food idea. Whether your baby has an allergy, or you don’t eat eggs by choice, these yummy Egg Free Chicken & Veggie Bites are packed full of goodness and are perfect for little hands and taste buds. Its super easy and a great addition to your little ones lunchbox. For more egg-free recipes click here. Post Views: 12,149",
  },
  {
    title: "No-Sugar Chocolate Orange Energy Balls",
    href: "https://www.annabelkarmel.com/recipes/no-sugar-chocolate-orange-energy-balls/",
    image: "/articles/annabels-top-10-finger-food-recipes/no-sugar-chocolate-orange-energy-balls.jpg",
    excerpt:
      "These No-Sugar Chocolate Orange Energy Balls are a healthy twist on a chocolate truffle – sweet-toothed tots who think they’re raiding the chocolate box will be none the wiser! Post Views: 3,869",
  },
  {
    title: "Chicken, Quinoa, Apple & Sage Balls",
    href: "https://www.annabelkarmel.com/recipes/chicken-quinoa-apple-sage-balls/",
    image: "/articles/annabels-top-10-finger-food-recipes/chicken-quinoa-apple-sage-balls.png",
    excerpt:
      "Two for the price of one! Transform my Chicken, Quinoa, Apple & Sage Balls into a smooth or textured purée. I love cooking with sage as it adds a real depth of flavour to recipes. Post Views: 832",
  },
  {
    title: "Mini Energy Balls",
    href: "https://www.annabelkarmel.com/recipes/mini-energy-balls/",
    image: "/articles/annabels-top-10-finger-food-recipes/mini-energy-balls.png",
    excerpt:
      "Try these delicious Mini Energy Balls. They make a healthy snack and are ideal to give you or your child a mid-morning or afternoon energy boost. Its super easy and a great addition to your little ones lunchbox. Post Views: 11,200",
  },
  {
    title: "Broccoli, Chicken & Potato Bites",
    href: "https://www.annabelkarmel.com/recipes/broccoli-chicken-potato-bites/",
    image: "/articles/annabels-top-10-finger-food-recipes/broccoli-chicken-potato-bites.png",
    excerpt:
      "These Broccoli, Chicken & Potato Bites make a great soft finger food for little ones. A yummy combination of flavours to please your gurgling gourmet. Post Views: 13,012",
  },
];

export default function AnnabelsTop10FingerFoodRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.intro} md:text-left text-center`}>
            These finger food recipes are easy to make and tasty and convenient for when you’re on the go.
            There are so many combinations you can try. From sweet to savoury, veggie to energy balls, cast your
            eyes on my top ten ball finger food recipes for some fun weaning snack inspiration!
          </p>
          <h1 className="text-center font-(--font-display)! px-2 md:px-0 md:text-left text-[40px] font-[500]! text-[#3a3a3a] mt-[40px]">Annabel's top 10 finger food recipes</h1>    
          <div className="mt-0! space-y-[60px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} style={{ background: "#f3ebee" }} className=" mt-[40px]">
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

