import { BalancedTrimestersAccordion } from "@/components/ArticleScreen/BalancedTrimestersAccordion";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/balanced-diet-throughout-trimesters");
const articlePath = "/articles/balanced-diet-throughout-trimesters";

const trimesterItems = [
  {
    title: "First trimester",
    paragraphs: [
      "Strictly speaking no additional calories needed yet but you still need to optimum eat - but that doesn't mean necessarily eating for two.",
      "Folate rich foods are the goal in the first trimester; opt for fortified cereals, oranges or orange juice, spinach leaf salad, asparagus with dips and wholemeal bread.",
      "Eggs and cheese are not just good sources of protein, they are also good choices for Vitamin A, which will help you ward off infection and aid the development of your baby's organs.",
      "Avoid raw or undercooked eggs, and mould-ripened or soft blue-veined cheeses.",
      {
        segments: [
          "Check out ",
          { label: "What to avoid here.", href: "https://www.annabelkarmel.com/foods-avoid-pregnancy/" },
        ],
      },
    ],
  },
  {
    title: "Second trimester",
    paragraphs: [
      "It's all about bones! You and your baby need calcium rich foods, and Vitamin D to help you absorb them. Your baby is developing teeth and bones and you need to ensure your calcium stores are stocked for both of you for the duration of your pregnancy. You may have been advised to take a Vitamin D supplement to ensure you are getting the recommended dosage.",
      "Sardines on toast are an excellent bone-boosting snack in your second trimester; the edible soft bones in the fish are crammed full of calcium as well as omega-3 fatty acids and iron (making them great for eye and brain development as well as bones).",
      "Dairy is the default calcium choice with milk based drinks and yoghurt being obvious choices. Low fat options are not necessarily lower in calcium and may be good options if you are putting on excessive pregnancy weight. Almond milk or soya are good alternatives if you have a non-dairy diet.",
      "As well as milk, your other magic 'M' to remember is magnesium which helps convert food to energy. Pumpkin or sunflower seeds and baked potatoes are easy ways to get your fill, and flavoursome too!",
    ],
  },
  {
    title: "Third trimester",
    paragraphs: [
      "This is where you get to eat more! 200 calories a day, and some additional B vitamins and vitamin C too.",
      "Vitamin C can be lost in the cooking process so raw or lightly steamed veggies are best; you might want to try carrot, celery or red pepper crudites dipped in salsa, guacamole or hummus. Tomatoes, strawberries, kiwi and citrus fruits are also great choices. Vitamin C helps your placenta to develop and work properly, aids the absorption of iron, keeps your immune system tip top and protects against cell damage.",
      "B-group vitamins are found in fortified cereals, pork (thiamine), ham, green veg, brown rice, granary toast and beans; shedding new light on the old favourite beans on toast!",
      "Staying hydrated throughout pregnancy is as important as staying well fed, particularly in the third trimester when constipation can become a problem. Keeping your fluid intake up can help keep things moving along. Plenty of fibre rich wholegrains, fruit and veg will all help too.",
    ],
  },
  {
    title: "Snacks",
    paragraphs: [
      "Snacking is a diet downfall; when you are hungry empty calorie treats become tempting no matter how good your intentions. Here are a few quick and easy snack ideas guaranteed to fill you up with all the right ingredients. They are so tasty you won't even realise that they are nice but not naughty!",
    ],
  },
  {
    title: "Prep ahead",
    paragraphs: [
      "It's a good idea to make several meals in small dishes and freeze them so that you have something nutritious and delicious when you come home with your baby, after all it is vital that you look after you so that you can look after baby!",
    ],
  },
];

export default function BalancedDietThroughoutTrimestersPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
         
          <BalancedTrimestersAccordion items={trimesterItems} />

    
          <div className="mt-[90px] text-center">
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
