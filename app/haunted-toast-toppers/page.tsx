import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./haunted.module.css";

const relatedArticles = getRelatedArticles("/haunted-toast-toppers");

const recipes = [
  {
    title: "Breakfast with a Boo",
    image: "/articles/haunted-toast-toppers/breakfast-with-a-boo.jpg",
    imageAlt: "Breakfast with a Boo toast",
    ingredients: ["3 slices brown bread", "Sunflower oil", "2 medium British Lion eggs"],
    method: [
      "Toast the slices of bread until lightly golden.",
      "To make the letter B in 'Boo', stamp out two small circles on one slice using a small round cutter. Then trim the crust to make a B shape.",
      "Stamp out two larger circles from the remaining two pieces of toast. Heat a little oil in a frying pan. Crack the eggs into the hot pan and fry for 4-5 minutes over a medium heat until the white is cooked and set, but the yolk is still runny.",
      "Place a large round cutter over the eggs and press down to make a neat round shape. Place the eggs on top of the circles of bread and make the word BOO.",
    ],
    suitable: "Suitable from 12 months (serves 2).",
    imageRight: false,
  },
  {
    title: "Boo-nana Toast Ghosts",
    image: "/articles/haunted-toast-toppers/boo-nana-toast-ghosts.jpg",
    imageAlt: "Boo-nana Toast Ghosts",
    ingredients: ["1 slice brown bread", "2 tbsp smooth peanut butter", "1 small banana"],
    method: [
      "Toast the bread until lightly golden and spread the peanut butter over the toast.",
      "Peel the banana and slice each in half lengthways. Using a sharp knife (grown-ups only), cut out a zig zag at the bottom of each one to make ghost shapes.",
      "Using a straw, stamp out two eyes and a mouth. Now place on top of the toast.",
    ],
    suitable: "Suitable from 12 months (serves 1).",
    imageRight: true,
  },
  {
    title: "Alien Avocado Toast",
    image: "/articles/haunted-toast-toppers/alien-avocado-toast.jpg",
    imageAlt: "Alien Avocado Toast",
    ingredients: [
      "1 large British Lion egg",
      "1/2 large avocado",
      "1 slice brown bread",
      "1 small carrot, peeled",
      "1/4 red pepper",
      "1/2 black pitted olive",
    ],
    method: [
      "Boil the egg for 6 minutes. Peel and cut into thick slices.",
      "Keep aside one slice of egg for the alien's eye and combine the rest with the avocado and mash together. Lightly season.",
      "Toast the bread until lightly golden, then spread with the avocado egg mixture.",
      "To decorate, shred the carrot and arrange to make the hair. Place the egg slice in the centre and top with half an olive for the eye. Slice the pepper to make a mouth and 2 small triangles to make the eyebrows.",
    ],
    suitable: "Suitable from 12 months (serves 1).",
    imageRight: false,
  },
  {
    title: "Mummy's Cheesy Tomato Toast",
    image: "/articles/haunted-toast-toppers/mummys-cheesy-tomato-toast.jpg",
    imageAlt: "Mummy's Cheesy Tomato Toast",
    ingredients: [
      "1 slice bread",
      "2 tbsp passata",
      "2 tbsp sundried tomato paste",
      "String cheese",
      "2 mini mozzarella balls",
      "1 black olive, halved",
    ],
    method: [
      "Toast the bread until lightly golden.",
      "Mix the passata and sundried tomato paste together in a small bowl. Spread over the toast.",
      "Pull the string cheese apart and arrange it over the tomato to make a mummy bandage effect.",
      "Slice off a third of each mozzarella ball and place onto the mummy. Top with half an olive for the eyeballs.",
    ],
    suitable: "Suitable from 12 months (serves 1).",
    imageRight: true,
  },
  {
    title: "Frankenstein Toast",
    image: "/articles/haunted-toast-toppers/frankenstein-toast.jpg",
    imageAlt: "Frankenstein Toast",
    ingredients: [
      "1 medium British Lion egg",
      "2 tbsp mayonnaise",
      "1 slice brown bread",
      "1/4 cucumber",
      "1/2 small carrot",
      "1 black pitted olive",
      "1 pea",
      "1/4 red pepper",
      "1 slice cheese",
      "3 tortilla crisps",
    ],
    method: [
      "Boil the egg for 6 minutes. Peel and mash with the mayo in a bowl. Season lightly.",
      "Toast the bread until lightly golden. Spread with the egg mixture.",
      "Slice a round from the cucumber and slice in half to make the ears, set aside.",
      "Using a potato peeler, peel thin ribbons from the remaining cucumber and place down over the egg mayo.",
      "Slice two rounds from the carrot and place on the cucumber. Top with two halved olives to make the eyes. Add the pea for the nose and make a mouth from the pepper. Using the cheese, make fangs and a scar and arrange on the face.",
      "Place three tortilla chips at the top of the bread for Frankenstein's hair.",
    ],
    suitable: "Suitable from 12 months (serves 1).",
    imageRight: false,
  },
];

export default function HauntedToastToppersPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[14px] md:px-[14px]">
          <div className="mb-[60px]">
            <img src="/articles/haunted-toast-toppers/hero.png" alt="Haunted Toast Toppers" />
          </div>

          <h1 className={styles.title}>Haunted Toast Toppers</h1>
          <p className={styles.partnerLine}>
            In partnership with{" "}
            <a href="https://www.egginfo.co.uk/">
              <img src="/articles/haunted-toast-toppers/british-lion-logo.png" alt="British Lion eggs" width={102}  height={102} />
            </a>
          </p>
         <div className="md:min-w-[1020px] mx-auto">
         <p className={styles.introText}>
            Your breakfast staple but make it SPOOKY! These easy ideas in partnership with{" "}
            <a className={styles.partnerLinkText} href="https://www.egginfo.co.uk/">British Lion eggs</a> make for the scariest wake-up call.
          </p>
          <p className={`${styles.introText} mt-[40px]!`}>
            Eggs are the BEST fuel as they're packed with protein, vitamins + minerals - ideal for growing little
            ghosts and ghouls. Always look for the British Lion mark on the shell and pack as these are perfectly safe
            for babies, kids and mums-to-be to enjoy runny.
          </p>
         </div>

          <div className="mt-[40px] space-y-[70px]">
            {recipes.map((recipe) => (
              <section key={recipe.title} className="bg-[#F7CDB9]  px-[6px] py-[50px]">
                <h2 className={`${styles.recipeTitle} max-[900px]:text-center!`}>{recipe.title}</h2>
                <div className="grid grid-cols-2 gap-[20px] mt-[40px] ml-[10px] max-[900px]:m-0 max-[900px]:p-[10px] max-[900px]:mt-[35px]! max-[900px]:grid-cols-1">
                  <div
                    className={`overflow-hidden ${recipe.imageRight ? "order-1 max-[420px]:order-1" : "order-1"}`}
                  >
                    <img src={recipe.image} alt={recipe.imageAlt} className="h-full w-full object-cover max-[900px]:object-cover  max-[900px]:aspect-square" />
                  </div>
                  <div className={`${recipe.imageRight ? "order-1 max-[420px]:order-2" : "order-2"} px-[2px]`}>
                    <h3 className={styles.blockHeading}>Ingredients</h3>
                    <p className={styles.blockText}>{recipe.ingredients.join("\n")}</p>
                    <h3 className={`${styles.blockHeading} mt-[40px]!`}>Method</h3>
                    <ol className={styles.methodList}>
                      {recipe.method.map((step, index) => (
                        <li key={`${recipe.title}-step-${index}`}>
                          <span>{index + 1}. </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <p className={styles.suitable}>{recipe.suitable}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-[60px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={`${styles.relatedText} max-[900px]:text-center! max-[900px]:text-[17px]! max-[900px]:mt-[30px]!`}>Some more articles you might enjoy...</p>
          </div>
        
        </article>
        <div className="px-5 max-[900px]:px-2 mb-[80px]!">
        <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
