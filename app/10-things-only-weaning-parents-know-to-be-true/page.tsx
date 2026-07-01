import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "10 things only weaning parents know to be true | Annabel Karmel",
  description:
    "Annabel Karmel office parents share what they wish they had known before starting weaning — from mess and teething to gagging, salt, and unsolicited advice.",
};

const relatedArticles = getRelatedArticles("/10-things-only-weaning-parents-know-to-be-true");

const IMG = "/articles/10-things-only-weaning-parents-know-to-be-true";

const BIBETTA_BIBS_URL = "https://www.bibetta.com/collections/annabel-karmel-baby-feeding-bibs/";
const RED_CROSS_BABY_CHILD_FIRST_AID_URL =
  "https://www.redcross.org.uk/first-aid/learn-first-aid-for-babies-and-children";

type Section = {
  title: string;
  image: string;
  imageAlt: string;
  body: ReactNode;
};

const sections: Section[] = [
  {
    title: "1. The phrase “Don’t play with your food” loses all meaning",
    image: `${IMG}/item-01.jpg`,
    imageAlt: "Baby exploring finger foods during weaning",
    body: (
      <>
        Whether you&apos;re going down the baby-led weaning or traditional weaning route it&apos;s time to start
        playing! As grown-ups, we know that it&apos;s probably not acceptable to squish our entire hand into a bowl of
        mashed potato because it looks like it would feel nice. We also don&apos;t put brand new iPhones in our mouths,
        as babies do with their toys, to find out what they are. But when babies are faced with something new they tend
        to use all their senses to explore their fascinating new find. Food shouldn&apos;t be any different. Let your
        little ones play, engage, and enjoy their food (although maybe not in that lovely new outfit you just got them!).
      </>
    ),
  },
  {
    title: "2. You have never known mess like this",
    image: `${IMG}/item-02.jpg`,
    imageAlt: "Baby mealtime mess during weaning",
    body: (
      <>
        Who knew a tiny baby with a tiny bowl of food could cause so much destruction! They are coated in pasta sauce;
        it&apos;s in their hair, their faces are smothered, it somehow got on the dog who&apos;s trying to eat up the
        mess on the floor (which is actually quite helpful!), and once you&apos;ve managed to clean it all up you&apos;ve
        somehow found even more in their nappy! Prevention is definitely better than the cure in this case. Start by
        laying down a shower curtain or splash mat under the high chair to protect your floors, invest in a good bib,{" "}
        <a href={BIBETTA_BIBS_URL} className={styles.link} target="_blank" rel="noopener noreferrer">
          the ones with sleeves
        </a>{" "}
        can spare an outfit, and think about the crockery you use — suction pads and non-slip mats can make a big
        difference. And don&apos;t start cleaning until the meal&apos;s over — it&apos;s a battle you won&apos;t win!
      </>
    ),
  },
  {
    title: "3. You might have to tell a few white lies",
    image: `${IMG}/item-03.jpg`,
    imageAlt: "Weaning — what I wish I had known",
    body: (
      <>
        If you&apos;re trying to move away from breastfeeding you may find yourself telling a little lie here and there
        — &quot;The milk&apos;s all gone&quot; seems to be a common one!
      </>
    ),
  },
  {
    title: "4. Teething can make things a whole lot harder!",
    image: `${IMG}/item-04.jpg`,
    imageAlt: "Weaning and teething",
    body: (
      <>
        Most babies will cut their first tooth between 4 and 12 months. The pain can disrupt your new routine and your
        little one may lose interest in eating. But food can actually help when it comes to weaning. Cold foods, such as
        pieces of cucumber that have been cooled down in the freezer can soothe the gums, whilst hard foods such as{" "}
        <a href="/introduction-to-finger-foods" className={styles.link}>
          finger foods like breadsticks
        </a>{" "}
        can help relieve the pressure when your little one bites down hard.
      </>
    ),
  },
  {
    title: "5. The contents of a nappy are really interesting",
    image: `${IMG}/item-05.jpg`,
    imageAlt: "Weaning and poo",
    body: (
      <>
        No one wants to be the parent who talks about poo all the time, but things just got interesting down there!
        It&apos;s happening less frequently, the consistency is completely different and now you&apos;ve found a whole
        piece of broccoli! Don&apos;t panic, undigested food is quite normal. Most babies don&apos;t have very many, if
        any, teeth when they start weaning and so they don&apos;t chew their food.
      </>
    ),
  },
  {
    title: "6. It can be an emotional time",
    image: `${IMG}/item-06.jpg`,
    imageAlt: "Parent and baby during weaning",
    body: (
      <>
        Weaning can be a complicated time. If your baby has lost interest in breastfeeding and is looking to food you
        may feel rejected — even though you know it&apos;s not personal! It can also cause hormonal changes that seem to
        come along with everything to do with pregnancy and babies! A change of routine and diet can be confusing for
        everyone at first and may mean that sleep schedules are affected. Try to stay positive and reach out to friends
        and family for support.
      </>
    ),
  },
  {
    title: "7. You used to cook with so much salt",
    image: `${IMG}/item-07.jpg`,
    imageAlt: "Cooking without salt for baby",
    body: (
      <>
        It&apos;s only when you become conscious of not giving salt to babies and start cooking without it that you
        realise just how much you used to use! There&apos;ll likely be a few head scratching moments when you can&apos;t
        figure out what&apos;s missing from your sauce or work out why that avocado doesn&apos;t taste as good as usual
        before you realise it&apos;s the salt. Salt isn&apos;t great for any of us but it&apos;s really not good for
        babies — be careful with stock cubes and gravy powders too as these often have a high salt content.
      </>
    ),
  },
  {
    title: "8. You’ve got a bit more freedom",
    image: `${IMG}/item-08.jpg`,
    imageAlt: "More freedom when weaning",
    body: (
      <>
        If you&apos;ve been breastfeeding, this may be the first time in a few years that you don&apos;t have to think
        as much about how the effects of what you eat (and drink!) can directly impact your baby. No one&apos;s saying
        wash down an entire cake with two bottles of wine, but it can be a relief to some mums to be eating for one
        again. If you&apos;ve been bottle feeding you may also find a greater sense of freedom as you can grab a pouch
        of baby food or some baby-led weaning staples and head out the door without wondering where and when you&apos;ll
        be able to warm a bottle. You may feel that you&apos;re more comfortable leaving your little one with friends and
        family as others can take on more feeding responsibilities.
      </>
    ),
  },
  {
    title: "9. Gagging and choking are two very different things!",
    image: `${IMG}/item-09.jpg`,
    imageAlt: "Baby weaning and self-feeding",
    body: (
      <>
        Solid foods can be daunting, but they&apos;re usually more daunting for parents than they are for babies.
        Whether it&apos;s a toy, their own fist, or a finger of toast, it&apos;s going in their mouth and it may cause
        them to gag. The first time it happens, you may panic, but by the 20th time you&apos;ll start to realise it&apos;s
        not so bad! Make sure you always supervise your baby when you&apos;re feeding them and avoid foods with a high
        choking risk, such as whole grapes, berries, and nuts.{" "}
        <a
          href={RED_CROSS_BABY_CHILD_FIRST_AID_URL}
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Baby first aid courses
        </a>{" "}
        can be really valuable at putting your mind at ease and preparing you for if the worst happens.
      </>
    ),
  },
  {
    title: "10. Everyone has an opinion",
    image: `${IMG}/item-10.jpg`,
    imageAlt: "Opinions on weaning",
    body: (
      <>
        As with a lot of aspects of motherhood, everyone has an opinion on weaning. From the obvious suspects (your mother
        never did it like that and you turned out fine!) to the man sat next to you on the bus you&apos;ll be hearing
        conflicting and often unsolicited feedback on your feeding left, right and centre. There is no one-size-fits-all
        approach to weaning, it varies between households and even between siblings. What&apos;s important is that you
        and your baby are happy and healthy. Read up on{" "}
        <a href="/weaning-getting-started" className={styles.link}>
          traditional weaning
        </a>{" "}
        and{" "}
        <a href="/baby-led-weaning" className={styles.link}>
          baby-led weaning
        </a>{" "}
        from trusted sources so that you feel confident in your choices. And don&apos;t worry about changing your mind or
        your plans, life with a baby is never predictable.
      </>
    ),
  },
];

export default function TenThingsWeaningParentsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            You&apos;ve just perfected milk feeds (you can literally do them with your eyes closed!) but now it&apos;s
            all change once again as you enter the world of weaning! Whether you&apos;ve made a conscious choice to start
            or one day your little one grabbed your lunch off your plate, it&apos;s time to get prepared for your weaning
            journey. We asked the mums and dads in the Annabel Karmel offices what they wish they had known before they
            started weaning and here&apos;s what they said.
          </p>

          {sections.map((section) => (
            <section key={section.title}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <div className={styles.imageWrap}>
                <img src={section.image} alt={section.imageAlt} width={1024} height={683} />
              </div>
              <p className={styles.body}>{section.body}</p>
            </section>
          ))}

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
