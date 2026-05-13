import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import type { ReactNode } from "react";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/top-10-tip-to-reduce-food-waste");

const intro: ReactNode[] = [
  <>
    Food waste is a real problem & together with my friends at{" "}
    <strong className="text-[#000080]  ">
      <a href="https://lovebakerstreet.com/" target="_blank" rel="noreferrer">
        Baker Street
      </a>
    </strong>{" "}
    we&apos;re passionate about doing something about it!
  </>,
  "Reducing food waste helps save money, as well as the planet. So much waste comes from our homes, in the UK alone we throw out 6.6 million tonnes of household food waste each year - three-quarters of which could have been eaten!",
  "According to some research reducing food waste can help save the average family of four around GBP730 each year (or GBP60 each month.) With the cost-of-living crisis surging on, there's no time like the present to take the steps to reduce waste, cut costs and help the environment...as well as our bank accounts!",
];

type Tip = {
  title: string;
  image: string;
  paragraphs: string[];
  bullets?: ReactNode[];
};

const tips: Tip[] = [
  {
    title: "1. Bready Steady Go!",
    image: "/articles/top-10-tip-to-reduce-food-waste/shutterstock_1518048209-optimized.jpg",
    paragraphs: [
      "Bread is a well-loved household staple for good reason, so why not make it last? By storing it in the freezer you can keep it fresher for longer. You can even use frozen bread to make sandwiches - don't worry by the time you sit down to eat, it will have defrosted and you'll be ready to munch and lunch!",
      "As well as freezing bread, why not put stale bread to good and - not to mention - delicious use? Turn old loaves into tasty breadcrumbs to coat chicken strips or crispy, crunchy croutons. Simply cut up the bread into cubes, spread on a baking sheet and drizzle with oil They are ready to eat in just ten minutes and will transform any meal!",
    ],
  },
  {
    title: "2. Make your own",
    image: "/articles/top-10-tip-to-reduce-food-waste/sauce-optimized.png",
    paragraphs: [
      "You can use up pantry classics to make your own sauces, stocks, and vinaigrettes. Whipping up a homemade sauce with a tin of chopped tomatoes is not only delicious but resourceful. Simply add garlic, onions and dried herbs and you've got yourself an authentic, tasty sauce without the supermarket price-tag. Plus, you know exactly what's in it, and can rest assured there's no added sugar, fat or preservatives.",
      "Another great hack is to make your own stock using organic waste that would have otherwise gone into the compost heap. Anything from root veg peelings, carrot tops, even onion skins, mushroom stalks, and herb stems, can be boiled down with water and a bay leaf to make the most delicious stock.",
      "Another food-efficient hack is to freeze fresh herbs in an ice cube tray with water or olive oil before they get the chance to wilt. Easy-to-use, accessible, and delicious, you can simply pop into soups or sauces for an immediate flavour punch.",
    ],
  },
  {
    title: "3. Get the right temperature",
    image: "/articles/top-10-tip-to-reduce-food-waste/Shutterstock_130458590-optimized.jpg",
    paragraphs: [
      "Simple yet effective, by ensuring your fridge is at the right temperature you'll avoid a lot of food wastage. Your fridge should be between 0-5 degrees. If it's warmer than this it runs the risk of your food going off, especially uncooked meat and milk.",
    ],
  },
  {
    title: "4. Preparation is Key",
    image: "/articles/top-10-tip-to-reduce-food-waste/shutterstock_1518048209-optimized.jpg",
    paragraphs: [
      "Before you head to the shops, make a list. Note down what you already have in the fridge and cupboards, so you don't double up on ingredients. If you can, try and plan your recipes or meals for the week (starting with recipes that will make the most of those ingredients you've already got to use up) so you know exactly what items to head for.",
      "And remember - stick to your list - those impulse buys and little 'extras' soon add up! Meal planning will help you get organised and you'll start the week feeling more relaxed, plus, getting prepped will pay off as you'll waste less and save money - win win.",
    ],
  },
  {
    title: "5. Go Frozen",
    image: "/articles/top-10-tip-to-reduce-food-waste/Shutterstock_1443256970-scaled-optimized.jpg",
    paragraphs: [
      "Did you know that frozen food can reduce household food waste by as much as 47%?",
      "Frozen fruit and veg are often cheaper and more nutritious as they're picked and harvested at their peak with all that goodness locked in. I like to keep bags of different varieties in my freezer so that the family benefit from a range of nutrients. Think berries, mango, spinach, peas, avocado chunks, and even fillets of fish. You're less likely to waste food this way too.",
      "Another food-efficient hack is to freeze fresh herbs in an ice cube tray with olive oil before they get the chance to wilt. Easy-to-use, accessible, and delicious, you can simply pop into soups or sauces for an immediate flavour punch.",
    ],
  },
  {
    title: "6. Understand labelling",
    image: "/articles/top-10-tip-to-reduce-food-waste/2-Organise-fridge-web-optimized.jpg",
    paragraphs: [
      "Unfortunately, a lot of food goes to waste due to simple misunderstanding of labelling. Many don't understand exactly how Use by and Best Before dates work. Labels are advisory, merely a guidance not a law. Use by dates are safety dates whereas Best Before dates relate to the quality of the food. It's perfectly safe to eat food past its Best Before Date.",
      "A good way to ensure fresher produce gets eaten first is to put the newest products at the back and the older ones towards the front of the fridge.",
      "Also, by understanding how to store produce you'll avoid unnecessary waste. For example, many don't know that root vegetables should be stored in a cool dark place, not the fridge. Whilst fruits like bananas, avocados, tomatoes, and peaches produce ethylene gas as they ripen, meaning they should be stored separately as they can catalyse decay in other produce.",
    ],
  },
  {
    title: "7. Leave it to leftovers",
    image: "/articles/top-10-tip-to-reduce-food-waste/banana-optimized.png",
    paragraphs: [
      "We too readily bin perfectly good ingredients which, with a little bit of love, can be transformed into a glorious thing. Sometimes it's easy to overlook what you already have in pursuit of a completely different meal, which is where it pays to be creative in the kitchen!",
    ],
    bullets: [
      <>
        A blender is your best friend when it comes to making the most of your fruit and veg leftovers, and smoothies
        and soups will be your go-to. <strong className="italic hover:text-[#e98c9a]"><a href="https://www.annabelkarmel.com/recipes/carrot-cheese-muffins/" target="_blank" rel="noreferrer"> Savoury muffins </a></strong> and{" "}
        <strong className="italic hover:text-[#e98c9a]"><a href="https://www.annabelkarmel.com/recipes/potato-spinach-sweet-pepper-pea-frittata/" target="_blank" rel="noreferrer"> frittatas </a></strong> are also a fantastic base for using up any veg you've got left
        at the end of the week.
      </>,
      <>
        Overripe bananas (the more brown spots the better!) make the best{" "}
        <strong className="italic hover:text-[#e98c9a]"><a href="https://www.annabelkarmel.com/recipes/banana-carrot-seed-bread/" target="_blank" rel="noreferrer"> Banana Bread </a></strong>
      </>,
      "Transform stale bread into breadcrumbs for meatballs or coating mini croquettes and homemade fish goujons.",
    ],
  },
  {
    title: "8. Keep it seasonal",
    image: "/articles/top-10-tip-to-reduce-food-waste/Shutterstock_1495668200-scaled-optimized.jpg",
    paragraphs: [
      "Incorporating cheap, healthy products such as seasonal fruit and veg, pulses and lentils etc is a good way to up the nutritional factor and reduce waste on a budget. Keep an eye out on what's seasonal to keep costs down, introduce variety to your diet, and help the environment.",
      "Buy from farmer's markets and go to pick-your-own if you have one nearby, check the country of origin on packing and pick from the 'imperfect fruit and veg' bin at your supermarket if they have one. By knowing what grows when, you can start looking out for seasonal produce that is not only fresh and tasty but cheaper due to being grown under the correct conditions as nature intended.",
    ],
  },
  {
    title: "9. Grow your own",
    image: "/articles/top-10-tip-to-reduce-food-waste/Shutterstock_633563996-scaled-optimized.jpg",
    paragraphs: [
      "Growing your own is an effective (and fun) way to keep costs at bay - some research has shown that planting vegetables from one just packet of seeds could save you around GBP150 a year! Brussel sprouts, aubergines, and courgettes are among the most cost-effective veggies to grow, for example one courgette plant can produce 64 courgettes per year!",
      "By growing your own you'll also ensure you're eating seasonally and organically and avoiding pesky pesticides.",
      "You can also grow your herbs too so that you never have to dig out wilted, browning herbs from the back of your fridge again!",
    ],
  },
  {
    title: "10. Repurpose scraps",
    image: "/articles/top-10-tip-to-reduce-food-waste/hidden-veg-smoothie-optimized.png",
    paragraphs: [
      "Natural produce can serve many purposes beyond what you usually consider. Lemon and white vinegar combined not only smells delicious but has antibacterial properties, making for a miraculous (and cheap) natural cleaning product.",
      "And why be so quick to through away your coffee grinds after your morning coffee? Save them and store them in the fridge to make delicious espresso brownies.",
      "As we all know, fruit and veg is unfortunately the first produce to go off, but instead of discarding it when it's starting to look a bit sorry, why not blend into a delicious and nutritious smoothie or shake?",
      "A little bit of creativity goes a long way, so let your creative juices flow and repurpose produce however you like!",
    ],
  },
];

export default function Top10TipsReduceFoodWastePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[15px]! pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          {intro.map((paragraph, index) => (
            <p key={`intro-${index}`} className={`${styles.intro} text-center`}>
              {paragraph}
            </p>
          ))}
          <p className={`${styles.intro} mt-[30px]! text-center italic `}> Take a look at <strong className="text-[#000080]"> <a href="https://lovebakerstreet.com/blog/creative-leftover-recipes-to-tackle-food-waste/?utm_source=blog+&utm_medium=hub+page&utm_campaign=food+waste+&utm_id=Annabel+Karmel+" target="_blank" rel="noreferrer">Baker Street's creative leftover recipes</a></strong> to help you and your family tackle food waste at home.
         </p>
          <p className={`${styles.intro} mt-[30px]!  text-center `}> Here are our top ten tips to help you minimise food wastage at home...</p>

          <div className="mt-[70px]! space-y-[40px]">
            {tips.map((tip, index) => (
              <section key={tip.title}>
                <h2 className="font-(--font-display) text-[40px] text-[#3a3a3a] leading-[1.1] font-[700]! text-center md:text-left ">{tip.title}</h2>
                <img src={tip.image} alt={tip.title} className="mt-[40px] md:max-w-[820px] mx-auto w-full" />

                {tip.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={`${styles.cardExcerpt} mt-[40px]!`}>
                    {paragraph}
                  </p>
                ))}

                {tip.bullets ? (
                  <ul className="mt-[40px] md:max-w-[1100px] mx-auto list-disc pl-[28px]">
                    {tip.bullets.map((bullet, bulletIndex) => (
                      <li key={`${tip.title}-bullet-${bulletIndex}`} className={`${styles.cardExcerpt} text-[16px]! text-center md:text-left  md:text-[20px]! mt-[10px]!`}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {index === 2 ? (
                  <img
                    src="/articles/top-10-tip-to-reduce-food-waste/Baker-Street-leaderboard-optimized.jpg"
                    alt="Baker Street leftovers banner"
                    className="mt-[40px] w-full md:max-w-[750px] mx-auto"
                  />
                ) : null}
              </section>
            ))}
          </div>

          <p className={`${styles.cardExcerpt} mt-[100px]! text-center leading-[1.42]! `}>
            Follow Baker Street on <strong className="text-[#000080]">Instagram</strong>, <strong className="text-[#000080]">Facebook</strong> & <strong className="text-[#000080]">TikTok</strong> for
            more ways to use their cleverly packed range of products that last longer to help you and your family
            tackle food waste.
          </p>

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
