import { EggQuestionsAccordion } from "@/components/ArticleScreen/EggQuestionsAccordion";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/eggs-questions-answered");

const accordionItems = [
  {
    title: "Can my baby eat runny eggs?",
    paragraphs: [
      "Eggs are one of the most nutritious foods available and your baby can eat them runny when you start weaning at around six months following a Government change in advice in 2017, as long as they have the British Lion mark on.",
    ],
  },
  {
    title: "Are eggs good for my baby?",
    paragraphs: [
      "Yes! Eggs are rich in protein and contain specific nutrients to support your baby's growth, including folate, vitamin D, iodine, selenium, choline and long-chain omega 3 fatty acids. So go ahead and scramble, poach and boil away.",
    ],
  },
  {
    title: "When can I start giving my baby eggs?",
    paragraphs: [
      "Eggs should be introduced early on in weaning from around six months as they are a good source of protein and contain many different vitamins and minerals essential for growth and development.",
    ],
  },
  {
    title: "What if my baby has an egg allergy?",
    paragraphs: [
      "A small number of babies are allergic to eggs, although many will outgrow this allergy in later life. Emerging research has shown that parents may reduce the risks of their baby having an egg allergy by giving them when they are weaning from six months. This introduction of eggs at this stage is said to provide the best chance of creating tolerance - when the immune system accepts the egg without reaction.",
    ],
  },
  {
    title: "Are there any added benefits to giving my baby runny eggs rather than cooked?",
    paragraphs: [
      "The nutritional value of eggs does not vary according to the cooking method. Having runny eggs back on the menu just means that there are even more ways to offer eggs to your baby such as dippy eggs with soldiers or soft poached egg on toast. Fully cooked eggs can sometimes end up a little rubbery making them harder to swallow, but lightly cooked scrambled egg or a soft-boiled egg are often far more palatable for babies.",
    ],
  },
  {
    title: "Why has the advice changed? Can I trust it?",
    paragraphs: [
      "The government's specialist safety committee produced an extensive report on UK eggs which said that the very low risk posed meant that UK eggs produced under the British Lion Code of Practice can be served raw or lightly cooked to all groups in society, including babies. This landmark report was endorsed by the Food Standards Agency to enable most people to enjoy runny or raw eggs if they wish, as long as they carry the British Lion mark.",
    ],
  },
  {
    title: "What is so safe about British Lion eggs?",
    paragraphs: [
      "The Lion scheme is very robust, with more than 700 points within its Code of Practice designed to produce the safest eggs in the world. This involves hen flock vaccination against salmonella, as well as strict hygiene rules from farm to supermarket.",
      "Eggs from other countries, or domestic eggs without the Lion mark, are still not recommended to be eaten raw or runny by vulnerable groups, according to the Food Standards Agency.",
    ],
  },
  {
    title: "How many eggs should my baby be eating in a week?",
    paragraphs: [
      "Neither the Department of Health nor the British Heart Foundation recommend a limit on the number of eggs you or your baby can eat. However, once you have introduced eggs at around 6 months, the government's Scientific Advisory Committee on Nutrition advises that eggs should then be included regularly (for example, at least once per week) in order to ensure that your baby continues to tolerate them. It is important that babies experience a varied diet with everything in moderation. The great thing about eggs is that they are incredibly versatile, so you can serve them on their own, or use them in cooking.",
    ],
  },
  {
    title: "What's the best way to cook eggs?",
    paragraphs: [
      "There are lots of different ways to cook eggs, but a great starting point is scrambled or boiled. You can also add runny egg to purees and they are ideal for baby-led weaning.",
    ],
  },
  {
    title: "My baby is really fussy, and she won't eat boiled or scrambled eggs. How can I get her to eat egg?",
    paragraphs: [
      "Try lightly scrambling with a little grated cheese. Babies love to eat with their fingers, so don't worry about the mess. Or try chopping omelette into little squares. The important thing is to keep offering egg in a variety of ways. A period of fussiness or food refusal is quite normal and this can be resolved if you expose them to eggs regularly and stay positive even if they don't eat what you've served, but play with it. After all, taste is just one of the five senses!",
    ],
  },
  {
    title: "Where should I store eggs to keep them as fresh as possible?",
    paragraphs: [
      "For optimum freshness and food safety, eggs should be kept at a constant temperature below 20°C. To avoid the typical temperature fluctuations in a domestic kitchen, we recommend that eggs are stored in their box in the fridge.",
    ],
  },
  {
    title: "Can eggs be cooked in the microwave?",
    paragraphs: [
      "If you are busy and short on time, eggs can be easily cooked in a microwave oven; however, remove them from their shells, as pressure will build up inside the shell and the egg may burst either inside the oven or on removal from the oven.",
    ],
  },
  {
    title: "How can I tell if my eggs are fresh?",
    paragraphs: [
      "All British Lion eggs have a best-before date printed on the shell as well as on the egg box to ensure freshness.",
    ],
  },
];

export default function EggsQuestionsAnsweredPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto mt-[48px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          {/* <div className="mb-[40px]">
            <img src="/articles/eggs-questions-answered/hero.jpg" alt="Eggs for babies" className="w-full" />
          </div> */}

          <p className={styles.intro}>
            <strong>
              Eggs rule. They are quick to cook and full of essential vitamins and minerals. Babies can also now eat
              them runny, as long as they are British Lion eggs, due to a change in Government advice in 2017, which
              means there are even more ways to enjoy this scrummy superfood.
            </strong>
          </p>

          <p className={`${styles.body} mt-[40px]! pb-[30px]!`}>
            But you still have some concerns over giving eggs to babies, so we've teamed up with dietitian Dr Carrie
            Ruxton to answer your questions and crack your concerns.
          </p>

          <EggQuestionsAccordion items={accordionItems} />

          <h2 className={styles.recipeHeading}>EGG-CELLENT RECIPES:</h2>
          <p className={styles.bodyNoTop}>It seems we can't find what you're looking for.</p>

          <p className={styles.infoNote}>For more information visit <a className={styles.infoNoteLink} href="https://www.egginfo.co.uk" target="_blank" rel="noopener noreferrer">www.egginfo.co.uk</a></p>

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
