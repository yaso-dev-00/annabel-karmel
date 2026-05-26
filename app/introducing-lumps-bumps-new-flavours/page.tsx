import { FoodCategoryAccordion } from "@/components/food-category-accordion";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/introducing-lumps-bumps-new-flavours");

const foodCategories = [
  {
    title: "RED MEAT",
    image: {
      src: "/articles/introducing-lumps-bumps-new-flavours/red-meat.jpg",
      alt: "introducing texture and flavour annabel karmel",
    },
    paragraphs: [
      "Iron is important for your baby's brain development, especially from six months when the iron inherited from mum starts to run out. A baby's brain triples in size in the first year and an iron deficiency can have a profound effect on learning in later life, despite this iron deficiencies are surprisingly common. Red meat is the best and most easily absorbed source.",
      "Cooked lean beef and root vegetable casseroles are a great source of iron, you can add herbs and fruits like dried apricot or apple then puree it into a smooth consistency.",
      "Often it is the texture rather than the taste of meat that babies object to. Cooked lean minced meat is a great option as it can be easily whizzed in a blender for a few seconds to make it easier for your baby to swallow.",
      "Slow cooked casseroles ensure that the meat is lovely and tender and mixing in mashed potato, carrot toppings or pasta shapes can all help the red-meat medicine go down.",
    ],
  },
  {
    title: "FISH",
    image: {
      src: "/articles/introducing-lumps-bumps-new-flavours/fish.jpg",
      alt: "Crunchy salmon fish cakes by Annabel Karmel",
    },
    paragraphs: [
      "You can introduce fish from 6 months. White fish such as plaice, cod, haddock and sole are good first fish as they have a mild flavour and are easily digestible. Fish in your baby's diet is so important; healthy fats contained in oily fish encourage growth as well as the development of your baby's brain, nervous system and vision. Oily fish such as salmon is a great source of Omega 3 fats.",
      "Fish doesn't have to be bland or boring – check out some of my tried and tested favourites!",
    ],
  },
  {
    title: "CHICKEN",
    image: {
      src: "/articles/introducing-lumps-bumps-new-flavours/chicken.png",
      alt: "Chicken curry by Annabel Karmel",
    },
    paragraphs: [
      "Chicken has a mild flavour and it so versatile. You can combine it with root vegetables, such as carrot or sweet potato, to give it a smooth texture, or add fruit such as apple to give it a slightly sweet taste.",
      "The brown meat of the chicken contains more iron and zinc than the breast, so save this for your baby. If you make a roast for the family, you could mix some of the roast chicken with cooked vegetables and some stock (watching out for the salt content in your stock) or a fruit puree.",
    ],
  },
  {
    title: "VEGETARIAN",
    image: {
      src: "/articles/introducing-lumps-bumps-new-flavours/vegetarian.png",
      alt: "Curried lentil puree by Annabel Karmel",
    },
    paragraphs: [
      "Bringing up your baby on a vegetarian diet is fine as long as it is carefully balanced.",
      "First foods are usually made up of fruit, vegetables and baby rice, but once first tastes have been accepted, it's important to introduce foods that are rich in protein – this would usually be meat and fish. However for vegetarian babies at this stage, you should start to introduce foods such as lentils, tofu or beans, dairy products, eggs, green leafy vegetables (such as broccoli, spinach) and fortified breakfast cereals. If you are going to bring your baby up on a vegetarian diet it's important to introduce foods like cheese and eggs from 6 months as these are nutrient dense foods.",
      "Unlike adults, a bulky high fibre diet is unsuitable for babies and young children as it is too low in calories and essential nutrients and hinders the absorption of iron.",
      "Meat provides some of the best and most easily absorbed sources of iron, therefore it's important to make sure that you include vegetarian sources of iron in your baby's diet. Lentils are a good source of iron and lentil purees are delicious and very popular with babies. Combine red lentils with onion, carrot, celery, sweet potato, tomatoes and cheese. In order for babies to absorb iron, you need to combine non-meat sources of iron such as lentils with vitamin C. So, give your baby vitamin C rich fruits such as strawberries in the same meal.",
    ],
  },
  {
    title: "FRUIT & VEG, EGGS & MORE",
    image: {
      src: "/articles/introducing-lumps-bumps-new-flavours/fruit-veg.jpg",
      alt: "Baby bolognese by Annabel Karmel",
    },
    paragraphs: [
      "Your baby should now be able to tolerate most fruits, and both fresh and dried fruits make a great snack.",
      "Vitamin C boosts iron absorption, so it's important to include citrus or berry fruits in your baby's diet – but give them in small quantities to start with and combine them with other fruits like apple, pear or peach.",
      "All vegetables are now on the menu, but if certain flavours – such as spinach or broccoli – are too strong, try mixing them with a cheese sauce or with sweet root vegetables. Combinations of fruit and veg, such as my Avocado, Pea and Tomato puree make for great balanced meals.",
      "Eggs are an excellent source of protein and also contain iron and zinc. Introduce them carefully at six months and cook well. Eggs are extremely versatile too, try well cooked scrambled eggs or mini omelettes.",
    ],
  },
];

export default function IntroducingLumpsBumpsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={`${styles.intro} mt-[20px]!`}>
            It&apos;s a good idea to progress from purees after a short while, not just because life has more to offer
            than things that can be sucked through a straw, but because chewing helps develop the same muscles needed for
            speech. Gradually introduce thicker purees, as well as mashed, grated and chopped food. Tiny pasta shapes are
            a great way to thicken things up. It&apos;s surprising what gums can get through so don&apos;t think you need
            to wait for a set of teeth to appear.
          </p>

          <div className="mt-[28px]">
            <FoodCategoryAccordion items={foodCategories} defaultOpenTitle="RED MEAT" />
          </div>

          <h2 className={styles.recipeHeading}>Recipes to start introducing texture:</h2>
          <p className={styles.bodyNoTop}>It seems we can&apos;t find what you&apos;re looking for.</p>

          <div className="mt-[70px] text-center">
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
