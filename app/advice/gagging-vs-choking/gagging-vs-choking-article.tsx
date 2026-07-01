import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const IMG = "/articles/gagging-vs-choking";

const chokingRiskFoods = [
  "Whole nuts – always give nuts ground or as a smooth nut butter",
  "Whole grapes, blueberries or cherry tomatoes – always serve them quartered",
  "Fruits with stones such as cherries – remove the stones and serve quartered",
  "Bony fish – check and remove all bones before offering to your baby",
  "Cook vegetables so that they are nice and soft for them to chew",
];

const chokingSteps: React.ReactNode[] = [
  "If you can see the object, try to remove it. Don't poke blindly or repeatedly or you could push it further back and make things worse.",
  "If your baby is coughing, encourage them to keep coughing, this might help to bring up what they are choking on. Don't leave them.",
  "If the coughing isn't effective (its silent or they can't breathe in properly) shout for help immediately.",
  <>
    If your baby is still conscious, but they are either not coughing or their coughing isn&apos;t effective, use{" "}
    <strong>back blows.</strong>
  </>,
];

const backBlowSteps: React.ReactNode[] = [
  "Sit down and lay you baby face down along your thighs, supporting their head with your hand.",
  "Give up to 5 sharp back blows, with the heel of one hand in the middle of the back between the shoulder blades.",
  <>
    If back blows don&apos;t relieve the choking and your baby is still conscious, give <strong>chest thrusts.</strong>
  </>,
];

const chestThrustSteps = [
  "Lay your baby face up along the length of your thighs.",
  "Find the breastbone and place 2 fingers in the middle.",
  "Give 5 sharp chest thrusts (pushes) compressing the chest by about a third.",
];

const reassessSteps: React.ReactNode[] = [
  <>
    If the object still hasn&apos;t dislodged and your child is still conscious, continue the sequence of{" "}
    <strong>back blows</strong> and <strong>chest thrusts.</strong>
  </>,
  "Call out or send for help if you're still on your own. Don't leave your child.",
  <>
    <strong>Call 999</strong> if the blockage doesn&apos;t come out after trying <strong>back blows</strong> and{" "}
    <strong>chest thrusts.</strong> Keep trying this cycle until help arrives.
  </>,
  "Even if the object has come out, get medical help. Part of the object might have been left behind, or your child might have been affected by the procedure.",
];

const unconsciousSteps = [
  "Put them on a firm flat surface and shout for help.",
  "Call 999, putting the phone on speakerphone so your hands are free.",
  "Don't leave them at any stage.",
  "Open the their mouth. If the object is clearly visible and you can grasp it easily remove it.",
  "Start CPR",
];

type GaggingVsChokingArticleProps = {
  currentHref: string;
};

export function GaggingVsChokingArticle({ currentHref }: GaggingVsChokingArticleProps) {
  const relatedArticles = getRelatedArticles(currentHref);

  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.bodyFirst}>
            Introducing solid foods to your baby and starting to wean is a big milestone for parents. The process of
            slowly moving from milk feeds to trying a variety of different tastes and textures can be exciting and
            daunting at the same time. One question I am always asked by parents at the start of their weaning journey is
            &lsquo;what do I do if my baby chokes?&rsquo; alongside &lsquo;I don&apos;t want to offer my baby finger
            foods as they might choke&rsquo;.
          </p>
          <p className={styles.body}>
            It&apos;s a common misperception that gagging and choking are the same thing and they are often confused…
            but they are most definitely not the same and it&apos;s important to be able to recognise the difference
            between the two.
          </p>

          <h2 className={styles.sectionTitle}>Is gagging normal when weaning my baby?</h2>
          <img
            src={`${IMG}/gagging-baby.jpg`}
            alt="Baby with food on face holding a spoon"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <p className={styles.body}>
            Think of gagging as your baby&apos;s in-built protective mechanism against choking. Babies have highly
            sensitive gag reflexes that are triggered very close to the front of the tongue, especially at the start of
            weaning.
          </p>
          <p className={styles.body}>
            This means that your baby will often gag when they first start on solid foods and for the first few weeks of
            weaning. This might mean they simply push food out of their mouth with their tongue, or they may retch or look
            like they are about to be sick. They are rarely distressed by this and will often simply continue eating
            again straight after.
          </p>
          <p className={styles.body}>
            Gagging occurs because your baby needs to develop and mature their oral motor movements with time as they
            learn to eat. They don&apos;t yet have the control to coordinate chewing and moving food to the back of their
            mouth to swallow, so they gag to stop food going down the wrong way. It&apos;s quite clever really!
          </p>
          <p className={styles.body}>
            Therefore, don&apos;t be put off if your baby gags during the early stages of weaning. They are simply
            learning to train their oral muscles to work in a new and different way and move food from the front of their
            mouth to the back in order to swallow.
          </p>
          <p className={styles.body}>
            As your baby continues on their weaning journey and practices eating, the gag reflex will move further back
            in their mouth and they will naturally gag less.
          </p>
          <p className={styles.body}>
            It&apos;s important to note that some babies may have more pronounced gag reflexes, for example if they have
            suffered with reflux, vomiting, or had tubes for feeding for example. If you&apos;re worried about your
            baby&apos;s gag reflex always seek help from your GP who can then refer you to a specialist speech and
            language therapist.
          </p>

          <h2 className={styles.sectionTitle}>What do I do if my baby gags during feeding?</h2>
          <img
            src={`${IMG}/gagging-during-feeding.jpg`}
            alt="Parent feeding a baby in a high chair"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <p className={styles.body}>
            Firstly, try not to panic and remain calm. This is easier said than done I know, but if you recognise that
            they are gagging (and not choking) it is important to let their body naturally sort it out for itself rather
            than intervening.
          </p>
          <p className={styles.body}>
            Try waiting a few seconds, maybe count to ten slowly in your head. It is very likely they will bring the
            offending food to the front of their mouth and spit it out or start to eat it again.
          </p>
          <p className={styles.body}>
            By stepping back and allowing them to gag, you are allowing them to learn how to coordinate their muscles and
            perfect this new skill.
          </p>
          <p className={styles.body}>
            It&apos;s important to remember that you should never leave your baby alone whilst feeding and make sure that
            they are always well supported or able to sit in an upright position. This will significantly reduce the risk
            of choking as the gag reflex may not be as effective if they are leaning backwards.
          </p>

          <h2 className={styles.sectionTitle}>How do I tell the difference between gagging and choking?</h2>
          <img
            src={`${IMG}/baby-tell-difference.jpg`}
            alt="Baby during feeding"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <p className={styles.body}>
            Choking is very different to gagging. This is when your baby&apos;s airway becomes blocked. They may be
            coughing and trying to remove the offending obstacle, but they may also be unable to cry, cough or make any
            noise at all. They may be unable to breathe and you may see their lips or face turn blue.
          </p>
          <p className={styles.body}>This is a medical emergency and they will need immediate help.</p>

          <img
            src={`${IMG}/comparison-table.jpg`}
            alt="Comparison table showing the differences between gagging and choking"
            width={900}
            height={500}
            className={styles.contentImage}
          />

          <hr className={styles.divider} />

          <h2 className={styles.sectionTitle}>What foods are a choking risk for my baby?</h2>
          <img
            src={`${IMG}/choking-risk-foods.jpg`}
            alt="Baby food ingredients including vegetables and puree"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <ul className={styles.bulletList}>
            {chokingRiskFoods.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionTitle}>What do I do if my baby chokes?</h2>
          <img
            src={`${IMG}/baby-chokes.jpg`}
            alt="Baby being fed with a spoon"
            width={894}
            height={596}
            className={styles.contentImage}
          />
          <p className={styles.body}>
            The NHS website, Resuscitation Council UK &amp; the Red Cross websites all have great advice as well as step
            by step videos to teach you basic first aid and support. You may want to attend a local First Aid Course and
            your GP should be able to advise you about local courses to you.
          </p>
          <p className={styles.subheadingSans}>
            If your baby is showing signs of choking, here are some simple steps you can take as advised by the NHS.
          </p>
          <ol className={styles.numberedList}>
            {chokingSteps.map((step, index) => (
              <li key={index} className={styles.numberedItem}>
                {step}
              </li>
            ))}
          </ol>

          <h3 className={styles.subheading}>Back blows for babies under 1 years old</h3>
          <ul className={styles.bulletList}>
            {backBlowSteps.map((step, index) => (
              <li key={index} className={styles.bulletItem}>
                {step}
              </li>
            ))}
          </ul>

          <h3 className={styles.subheading}>Chest Thrusts for babies under 1 year old:</h3>
          <ul className={styles.bulletList}>
            {chestThrustSteps.map((step) => (
              <li key={step} className={styles.bulletItem}>
                {step}
              </li>
            ))}
          </ul>

          <p className={styles.subheadingSans}>
            Following back blows and chest thrusts reassess your baby or child as follows:
          </p>
          <ul className={styles.bulletList}>
            {reassessSteps.map((step, index) => (
              <li key={index} className={styles.bulletItem}>
                {step}
              </li>
            ))}
          </ul>

          <p className={styles.subheadingSans}>If your baby or becomes unconscious with choking:</p>
          <ul className={styles.bulletList}>
            {unconsciousSteps.map((step) => (
              <li key={step} className={styles.bulletItem}>
                {step}
              </li>
            ))}
          </ul>

          <hr className={styles.divider} />

          <p className={styles.summaryBlock}>
            It is important to be able to recognise the difference between gagging and choking and the different ways
            you should treat both.
          </p>
          <p className={styles.summaryBlock}>
            Remember, gagging is your baby&apos;s natural in-built protective mechanism to prevent them choking as they
            learn to feed themselves. Choking however, is when their airway is blocked, and they will need immediate help
            and First Aid.
          </p>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
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
