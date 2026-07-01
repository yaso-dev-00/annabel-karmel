import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { introductionToFingerFoodsRelatedArticles } from "@/data/introduction-to-finger-foods-page";
import styles from "./page.module.css";

const IMG = "/articles/fabulous-finger-food-2";

const recipes = [
  {
    title: "Mini Chicken Balls with Apple & Carrot",
    href: "https://www.annabelkarmel.com/recipes/mini-chicken-balls-with-apple-carrot/",
    image: `${IMG}/mini-chicken-apple-carrot.png`,
    imageAlt: "mini chicken balls with apple and carrot recipe by annabel karmel",
    body: "These signature chicken & apple balls are one of our most popular finger food recipes. Flavoured with basil, parmesan and a little sweet chilli sauce.",
  },
  {
    title: "Cod & Salmon Quinoa Balls",
    href: "https://www.annabelkarmel.com/recipes/cod-salmon-quinoa-balls/",
    image: `${IMG}/cod-salmon-quinoa.jpg`,
    imageAlt: "cod and salmon quinoa balls recipe by Annabel karmel",
    body: "This is a tasty dairy-free recipe and couldn't be simpler to make with everything whizzed up in a food processor.",
  },
  {
    title: "Veggie Balls",
    href: "https://www.annabelkarmel.com/recipes/veggie-balls/",
    image: `${IMG}/veggie-balls.jpg`,
    imageAlt: "Veggie balls recipe by annabel karmel",
    body: "These little balls are a fantastic way to pack in veggies and are ideal finger food. They are also ideal for batch-cooking and freezing, in readiness for those busy days. Just pop them in a plastic freezer box, separating each layer with greaseproof paper, and reheat from frozen in the oven or microwave.",
  },
  {
    title: "Chicken and Kale Balls",
    href: "https://www.annabelkarmel.com/recipes/chicken-and-kale-balls/",
    image: `${IMG}/chicken-kale.jpg`,
    imageAlt: "chicken and kale balls recipe by annabel karmel",
    body: "When my son Nicholas was little and very fussy, my solution to encourage him to eat chicken was to blitz it in a foods processor with other ingredients such as apple and form it into mini chicken balls. This is a twist on my signature Chicken and Apple Balls recipe in my New Complete Baby and Toddler Meal Planner, but this time using carrot and kale and adding some mild oriental flavors.",
  },
  {
    title: "Potato, carrot, and sweetcorn balls",
    href: "https://www.annabelkarmel.com/recipes/potato-carrot-sweetcorn-balls/",
    image: `${IMG}/potato-carrot-sweetcorn.jpg`,
    imageAlt: "potato, carrot and sweetcorn balls recipe by annabel karmel",
    body: "Root vegetables, such as potatoes and carrots, are firm favourites with babies, and the fruitiness of sweetcorn makes these yummy balls irresistible.",
  },
  {
    title: "Mini Meatballs",
    href: "https://www.annabelkarmel.com/recipes/mini-meatballs-2/",
    image: `${IMG}/mini-meatballs.png`,
    imageAlt: "Mini meatballs with broccoli and carrots",
    body: "They might be mini but they're mighty in taste. Serve these meatballs with a hidden veggie sauce or steamed veggies.",
  },
  {
    title: "Salmon Footballs",
    href: "https://www.annabelkarmel.com/recipes/salmon-footballs/",
    image: `${IMG}/salmon-footballs.jpg`,
    imageAlt: "salmon footballs recipe by annabel karmel",
    body: "When your child refuses to eat anything from a spoon, try making these nutritious finger food balls – perfect for tiny hands.",
  },
  {
    title: "Teriyaki Chicken Balls",
    href: "https://www.annabelkarmel.com/recipes/teriyaki-chicken-balls/",
    image: `${IMG}/teriyaki-chicken.jpg`,
    imageAlt: "teriyaki chicken balls recipe by annabel karmel",
    body: "These are so incredibly tasty and so easy to make. Serve with a side of veggies or on top of egg-fried rice or plain rice.",
  },
  {
    title: "Raw Cacao Energy Balls",
    href: "https://www.annabelkarmel.com/recipes/raw-cacao-energy-balls/",
    image: `${IMG}/raw-cacao-energy.jpg`,
    imageAlt: "raw cacao energy balls recipe by annabel karmel",
    body: "Try these delicious healthy treats. Unlike regular cocoa powder these balls are made from cold pressing cocoa beans to remove the fat. It's a good source of antioxidants, magnesium and iron.",
  },
  {
    title: "Mini Energy Balls",
    href: "https://www.annabelkarmel.com/recipes/mini-energy-balls/",
    image: `${IMG}/mini-energy.jpg`,
    imageAlt: "mini energy balls recipe by annabel karmel",
    body: "Try these delicious Mini Energy Balls. They make a healthy snack and are ideal to give you or your child a mid-morning or afternoon energy boost.",
  },
];

const videos = [
  {
    title: "No-Sugar Chocolate Orange Energy Balls",
    embedId: "oKxSdN0mN7Y",
  },
  {
    title: "Mini Chicken and Apple Balls with Binky Felstead",
    embedId: "vKFxhPvhA1M",
  },
];

export default function FabulousFingerFood2Page() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] mt-[30px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            These finger food recipes are easy to make and tasty and convenient for when you&apos;re on the go. My
            chicken and apple balls recipe are a weaning winner! But did you know there are so many more combinations
            you can try? From sweet to savoury, veggie to energy balls, cast your eyes on my top ten ball finger food
            recipes for some fun weaning snack inspiration!
          </p>

          <img
            src={`${IMG}/signature.png`}
            alt=""
            width={315}
            height={113}
            className={styles.signature}
          />

          {recipes.map((recipe) => (
            <section key={recipe.title} className={styles.recipeBlock}>
              <h2 className={styles.recipeHeading}>
                <a href={recipe.href} target="_blank" rel="noopener noreferrer">
                  {recipe.title}
                </a>
              </h2>
              <a href={recipe.href} target="_blank" rel="noopener noreferrer" className="block">
                <img src={recipe.image} alt={recipe.imageAlt} className={styles.recipeImage} />
              </a>
              <p className={styles.recipeBody}>{recipe.body}</p>
            </section>
          ))}

          <div className={styles.videoGrid}>
            {videos.map((video) => (
              <div key={video.embedId} className={styles.videoFrame}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={introductionToFingerFoodsRelatedArticles} />
        </div>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
