import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Top Tips for Washing Babies Hands | Annabel Karmel",
  description:
    "Practical handwashing advice for babies and toddlers, including what to use at home and when out and about.",
};

const relatedArticles = getRelatedArticles("/top-tips-washing-babies-hands");

const toddlerTips: { id: string; content: React.ReactNode }[] = [
  {
    id: "step-stool",
    content: "Get a step stool so they can reach the sink themselves",
  },
  {
    id: "independence",
    content:
      "Give them independence - Anyone with a toddler will know how much they LOVE a sense of independence and the feeling of being able to do something for themselves! It's of course always best to supervise them to make sure they wash their hands properly but let them do the main work themselves.",
  },
  {
    id: "communicate",
    content:
      "Always communicate with them to tell them it's time to wash their hands and why (for example.... it's dinner time!)",
  },
  {
    id: "sing",
    content: (
      <>
        Sing a song with them whilst they wash their hands. Hands should be washed for 20 seconds which is enough time to
        sing &lsquo;Happy Birthday&rsquo; <u className="underline">twice</u>, but you could always sing along to a nursery
        rhyme or any other song your child loves to make sure they stay at the sink long enough! If you&apos;re stuck for
        song ideas… check out the collaboration between the World Health Organisation and Peppa Pig{" "}
        <a
          href="https://youtu.be/zAnSkaPgviY"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          here
        </a>
      </>
    ),
  },
  {
    id: "body-paint",
    content:
      "Teach them the importance of washing their hands using body paint or glitter every so often so that they have a visual aid of how they need to wash their hands for them to be clean",
  },
];

export default function TopTipsWashingBabiesHandsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto mt-[18px] w-full max-w-[1200px] px-[10px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.bodyNoTop}>
            Anyone who has begun weaning their little one can sympathise it gets MESSY! But what about cleaning your baby{" "}
            <strong>before</strong> mealtimes?
          </p>
          <p className={styles.body}>
            We should always wash our own hands before eating and babies&apos; hands are no different... especially once
            they are old enough to start eating, crawling and getting into all sorts of mischief! Hand washing is the
            simplest, yet most effective way to stop the spread of bacteria and therefore keep our babies safe and
            protected from illnesses.
          </p>
          <p className={styles.body}>
            For some tips on washing your baby&apos;s hands; including the logistics and what to use on baby&apos;s skin,
            I&apos;ve answered some of the common hand washing questions below....
          </p>

          <h2 className={styles.sectionTitle}>How should you wash your baby&apos;s hands?</h2>
          <img
            src="/articles/top-tips-washing-babies-hands/wash-hands-sink.png"
            alt="Washing a baby's hands under running water"
            width={1200}
            height={800}
            className="mx-auto mt-[20px] block h-auto w-full "
          />
          <p className={styles.body}>
            One of the most straightforward ways to wash your baby&apos;s hands is of course to hold your baby over the
            sink, position them on your knee and wash their hands with soap and water as you would your own (being careful
            not to press little one&apos;s tummy into the sink whilst doing so).
          </p>
          <p className={styles.body}>
            However, if the logistics of doing this isn&apos;t for you (especially when your baby is little), then you can
            also apply soap to their hands using a dampened soapy washcloth instead, using another cloth dampened with
            just water to wipe away the soap.
          </p>
          <p className={styles.body}>
            Remember you can also put the bowl of soapy water in front of baby or toddler and use a cloth to make sure
            you get in between all of their fingers, again using a damp cloth after washing to clean off the soapy
            residue.
          </p>
          <p className={styles.body}>Just make sure when you&apos;re drying their hands, the towel is clean and dry.</p>

          <h2 className={styles.sectionTitle}>What to wash their hands with?</h2>
          <p className={styles.bodyNoTop}>Soap and water are always best to wash hands with... regardless of age!</p>
          <p className={styles.body}>
            However, if you&apos;re worried that your regular kitchen soap might be a little too harsh for your baby&apos;s
            delicate skin, then you can always use some of their body wash instead when they are little! Truth is....
            anything &lsquo;soapy&rsquo; will do the job when it comes to handwashing providing hands are washed
            thoroughly! <a id="_ftnref1" href="#_ftn1">[1]</a>
          </p>

          <h2 className={styles.sectionTitle}>What about when out and about?</h2>
          <p className={styles.bodyNoTop}>When out and about, always stick to using soap and water whenever and wherever you can.</p>
          <p className={styles.body}>
            However, if there is no soap and water available, hand sanitiser may be used if there is no alternative but
            make sure you rub it in until completely dry. Just be aware that hand sanitisers do not work as well as soap
            and water<a id="_ftnref2" href="#_ftn2">[2]</a>, particularly against germs such as
            Norovirus<a id="_ftnref3" href="#_ftn3">[3]</a> or if hands are physically dirty or greasy, so you may want
            to wipe your little ones&apos; hands with a damp wipe first.
          </p>

          <h2 className={styles.sectionTitle}>What about toddlers?</h2>
          <img
            src="/articles/top-tips-washing-babies-hands/wash-hands-toddler.png"
            alt="Toddler learning hand washing with parent support"
            width={1200}
            height={800}
            className="mx-auto mt-[20px] block h-auto w-full"
          />
          <p className={styles.body}>
            It is really important to embed a good hand washing routine as early on in life as possible. As your baby
            progresses into a toddler, it&apos;s important to change your hand washing technique as they grow, keeping it
            fun whilst giving them lots of praise and encouragement! Here&apos;s some ideas how you can start getting your
            toddler involved in washing their hands and help them to understand that it&apos;s an important part of their
            daily routine...
          </p>

          <ul className={styles.bulletList}>
            {toddlerTips.map((tip) => (
              <li key={tip.id} className={styles.bulletItem}>
                {tip.content}
              </li>
            ))}
          </ul>

          <p className={styles.body}>
            .. And don&apos;t forget to also wash your hands at the same time! Not only will this help keep everyone safe,
            but seeing you lead by example will be a great learning tool for your little one from any age.
          </p>

          <div className={styles.footnotes}>
            <p>
              <a id="_ftn1" href="#_ftnref1" className={styles.refLink}>
                [1]
              </a>{" "}
              Holchem, In Safe Hands, 2018
            </p>
            <p>
              <a id="_ftn2" href="#_ftnref2" className={styles.refLink}>
                [2]
              </a>{" "}
              CDC,{" "}
              <a
                href="https://www.cdc.gov/handwashing/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Handwashing: Clean Hands Save Lives
              </a>
              ,{" "}
              <a
                href="https://www.cdc.gov/handwashing/show-me-the-science-hand-sanitizer.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                https://www.cdc.gov/handwashing/show-me-the-science-hand-sanitizer.html
              </a>
              , 2020
            </p>
            <p>
              <a id="_ftn3" href="#_ftnref3" className={styles.refLink}>
                [3]
              </a>{" "}
              CDC, Preventing Norovirus,{" "}
              <a
                href="https://www.cdc.gov/norovirus/about/prevention.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                https://www.cdc.gov/norovirus/about/prevention.html
              </a>
              , 2019
            </p>
          </div>

          <div className={styles.authorIntro}>
            <img
              src="/articles/top-tips-washing-babies-hands/jenna-brown.jpg"
              alt="Jenna Brown portrait"
              width={245}
              height={328}
              className={styles.authorPhoto}
            />
            <p className={styles.bodyNoTop}>
              Jenna is a fully qualified Environmental Health Practitioner specialising in food safety and public health.
            </p>
            <p className={`${styles.body} ${styles.authorBodyPara}`}>
              She obtained a first-class Batchelor (BSc) degree in Environmental Health and has since qualified as an
              Environmental Health Practitioner with the Chartered Institute of Environmental Health (CIEH). Over the past
              12 years she has worked in both the public and private sector advising businesses on all things food safety
              and public health.
            </p>
            <p className={`${styles.body} ${styles.authorBodyPara}`}>
              Since becoming a Mum to her 2-year-old little girl Mia, she understands first-hand how much things change
              when you have a little one to think about too! She has always been passionate about food safety and her
              mission as Food Safety Mum is to help give parents confidence when cooking at home or when eating out and
              about!
            </p>
          </div>

          <div className={styles.authorFollowRow}>
            <img
              src="/articles/top-tips-washing-babies-hands/food-safety-mum.jpg"
              alt="The Food Safety Mum logo"
              width={288}
              height={108}
              className={styles.foodSafetyLogo}
            />
            <div className={styles.followText}>
             <p> For lots more food safety advice, follow Jenna on Instagram{" "}</p>
              <a
                href="https://www.instagram.com/foodsafetymum/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.followLink}
              >
                @Foodsafetymum
              </a>
            </div>
          </div>

          <div className="mt-[85px] text-center">
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
