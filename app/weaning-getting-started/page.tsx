import { EggQuestionsAccordion, type EggQuestionItem } from "@/components/egg-questions-accordion";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { introductionToFingerFoodsRelatedArticles } from "@/data/introduction-to-finger-foods-page";
import styles from "./page.module.css";

const accordionItems: EggQuestionItem[] = [
  {
    title: "Annabel's top tips for starting to wean",
    paragraphs: [
      "Babies sometimes find the process of weaning a little clinical and miss the comfort of sucking milk. When offering your baby her very first taste or two you may find it easier to hold her on your lap so that she feels loved and secure.",
      "Babies are unable to lick food off a spoon with their tongues, so choose a small shallow plastic weaning spoon so she can take some food with her lips",
      "When babies feed from the breast or a bottle they instinctively push their tongue forwards – this is called the tongue thrust reflex. Your baby needs to learn to swallow solids and not push her tongue forwards. If she can't get on with a spoon, dip a clean finger into the puree and let her suck your finger for a few mouthfuls",
      "You don't need to sterilise your baby's spoons or bowls, simply wash them in a dishwasher. After all, your baby puts everything in reach into her mouth and none of these are sterilised. However it's important to sterilise your baby's bottles and teats as warm milk is the perfect breeding ground for bacteria.",
      "You will find that your baby will let you know how much she needs to eat; some foods such as carbohydrates will fill her more quickly than fresh fruit and vegetables; when she appears to be full, or resists your attempts to feed her, it's time to stop.",
    ],
  },
  {
    title: "Best first foods",
    paragraphs: [
      "First foods should be simple and easy to digest and unlikely to provoke an allergic reaction. Start with single ingredients with a nice soft texture; root vegetables and ripe fruits are popular as they are naturally sweet and can be easily pureed to a smooth texture. Mixing them with a little breast or formula milk can ease the transition.",
    ],
  },
  {
    title: "Foods to avoid",
    subsections: [
      {
        heading: "Salt",
        body: "Don't add salt to your baby's food and don't use stock cubes or gravy, as they're often high in salt. Remember this when you're cooking for the family, if you plan to give the same food to your baby.",
      },
      {
        heading: "Sugar",
        body: "Your baby doesn't need sugar. By avoiding sugary snacks and drinks (including fruit juice and other fruit drinks), you'll help to prevent tooth decay. Use mashed banana or other fruits, breast milk or formula milk to sweeten food, if needed.",
      },
      {
        heading: "Honey",
        body: "Occasionally, honey contains bacteria that can produce toxins in a baby's intestines, leading to infant botulism which is a very serious illness. It's best not to give your child honey until they're one year old. Honey is a sugar, so avoiding it will also help to prevent tooth decay.",
      },
      {
        heading: "Nuts",
        body: "Whole nuts, including peanuts, shouldn't be given to children under five, as they can choke on them. As long as there's no history of food allergies or other allergies in your family, you can give your baby peanuts once they're six months old, as long as they're crushed or ground into peanut butter.",
      },
      {
        heading: "'Low-fat' foods",
        body: "Fat is an important source of calories and some vitamins for babies and young children. It's better for babies and young children under two to have full-fat milk, yoghurt and cheese, rather than low-fat varieties.",
      },
      {
        heading: "Shark, swordfish and marlin",
        body: "Don't give your baby shark, swordfish or marlin. The amount of mercury in these fish can affect a baby's growing nervous system.",
      },
      {
        heading: "Raw shellfish",
        body: "Raw shellfish can increase the risk of food poisoning, so it's best not to give it to babies.",
      },
      {
        heading: "Raw and undercooked eggs",
        body: "Eggs can be given to babies over six months old, but make sure they're cooked until both the white and yolk are solid.",
      },
    ],
  },
  {
    title: "Reactions",
    paragraphs: [
      "If your baby makes a fuss and won't eat, try to stay relaxed. If you and baby get anxious you'll be feeding off each other's frustrations, and that has the potential to suck all the fun from the foodie experience.",
      "If things are not going according to plan, perhaps wait a few days before you try again, or prepare a runnier puree that is easy for baby to swallow.",
      "Letting baby taste food from your (clean) finger can help spoon suspicious babies.",
    ],
  },
];

export default function WeaningGettingStartedPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            Some mums feel sad that weaning signals the end of the teeny tiny baby stage, but weaning offers a real
            opportunity to bond – and it&apos;s a bit of an adventure too!
          </p>
          <p className={styles.bodyText}>
            It can help to establish a routine and have meals around the same time each day. To begin with, give just one
            feed a day, around midday, and gradually increase to breakfast, lunch and dinner.
          </p>
          <p className={styles.bodyText}>
            When you start, it can be a good idea to give baby a little milk before the solids to stop frustrations
            arising if he is very hungry and struggling to get to grips with the new skills required to satisfy his
            appetite. Always introduce new foods at the beginning of the day so that if there is going to be a reaction
            it is less likely to occur in the middle of the night.
          </p>

          <EggQuestionsAccordion items={accordionItems} />

          <div className="mt-[90px] text-center">
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
