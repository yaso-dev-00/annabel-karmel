import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/what-to-do-when-your-baby-is-sick");

export default function WhatToDoWhenBabySickPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <p className={`${styles.body} mt-[8px]`}>
            We live in a funny world where we offer parenting classes to teach you how to deliver a placenta, but we
            don't teach you what to do when your baby ill. It is quite frankly astounding when you think about things
            that most mums I meet have been instructed what baby massage is but not what constitutes a fever. Knowing
            what to do when your baby is poorly is crucial - knowing a few basics really helps.
          </p>
          <p className={`${styles.body} mt-[24px]`}>
            It is natural and common for babies to get ill with simple illnesses. They are little, they've never come
            across all the germs before and their immune systems need to learn to cope with all these nasties that are
            flying around. This is even more true post-2020.
          </p>
          <p className={`${styles.body} mt-[24px]`}>
            Some babies seem to get more infections than others. This is simply a spectrum of normal: the same way
            some babies will walk at 11months and others at 18months.
          </p>
          <p className={`${styles.body} mt-[24px]`}>
            I am often asked by parents if it is normal for their baby to get minor illnesses so often. This is not an
            easy question to answer, and really it takes a proper consultation with a doctor to decide. If a baby is
            in nursery I would say one cold or virus a month is pretty much normal. The clues to look for that this is
            fine are:
          </p>

          <ul className={`${styles.bulletList} ${styles.bulletListWide}`}>
            <li className={styles.bulletItemSm}>He recovers easily from them</li>
            <li className={styles.bulletItemSm}>He's well in between</li>
            <li className={styles.bulletItemSm}>He's feeding, growing and developing normally</li>
            <li className={styles.bulletItemSm}>He's just getting bog standard snotty type ones</li>
            <li className={styles.bulletItemSm}>Instinct tells you he is fine</li>
          </ul>

          <h2 className={`${styles.sectionHeadingIntro} mt-[30px]`}>
            What is important when they're poorly (and what's not)
          </h2>
          <p className={`${styles.body} mt-[12px]`}>
            This is not a definitive list of every sign that a baby could be unwell, just the things I know concern
            parents:
          </p>

          <div className={`${styles.tableWrap} mt-[18px]`}>
            <table className={`${styles.table} scrollbar-hide`}>
              <thead>
                <tr>
                  <th className={styles.th}>What is important when your baby is unwell:</th>
                  <th className={styles.th}>What is less important:</th>
                </tr>
              </thead>
              <tbody className="scrollbar-hide">
                {[
                  ["Fever", "Appetite for solids"],
                  ["Any rash", "Snot colour"],
                  ["Playing/alertness", "The exact number on the thermometer"],
                  ["Fluids in and out", "Being tired"],
                  ["Vomiting", ""],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className={styles.td}>&middot; {row[0]}</td>
                    <td className={styles.td}>{row[1] ? `· ${row[1]}` : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={`${styles.body} mt-[24px]`}>
            The best way to tell a baby has a fever is by you feeling them. Thermometers are the second best way.
          </p>
          <p className={`${styles.body} mt-[20px]`}>
            The whole story comes from looking at all of him: feeding, happiness rating, activity levels. I always
            tell my patients <em>"look at the baby not the temperature".</em>
          </p>
          <p className={`${styles.body} mt-[20px]`}>
            The best way really to tell if your baby has a fever if to feel him yourself. If he feels hot and looks
            red, if his forehead, chest or back feels hot, that is a good way to tell. You are used to touching him
            and you'll easily spot the difference. If you are feeling more comfortable with a thermometer, measuring a
            temperature above 38 is a temperature. All children under 6 months with a fever either measured on a
            thermometer or by your hand, should go to the doctor for a consult. You can safely bring a temperature
            down with medicine such as paracetamol or ibuprofen suspension: both of these drugs reduce fever and ease
            pain in babies.
          </p>

          <h2 className={`${styles.sectionHeading} mt-[32px]`}>Hydration</h2>
          <img
            src="/articles/what-to-do-when-your-baby-is-sick/shutterstock_1089455099-scaled-optimized.jpg"
            alt="Baby hydration"
            className={styles.media}
          />
          <p className={`${styles.body} mt-[16px]`}>
            No matter whether baby has a cold or anything which involves a temperature, drinking is the most crucial
            thing. It takes hours, not days, for babies to get dehydrated. Having a fever, vomiting or having
            diarrhoea uses up water and that all needs to be replaced.
          </p>
          <p className={`${styles.body} mt-[16px]`}>
            For babies who still only drink milk, the milk and cool, boiled water are essential. If baby is already
            weaned and drinking diluted juice as well as milk offer that. Whatever drink he wants, let him have. Work
            out how much baby normally drinks and half it. If he drops below your 50% level, you must seek advice from
            your doc.
          </p>
          <p className={`${styles.body} mt-[16px]`}>
            The best way to tell if baby is hydrated is weeing. Gauge this on the number of wet nappies he normally
            has and if it is around the same or a bit less then he's fine. Dry nappies for more than half a day
            indicate dehydration. Dry lips, dry mouth and no tears are also good ways to indicate he's dehydrated.
          </p>

          <h2 className={`${styles.sectionHeading} mt-[32px]`}>Rash</h2>
          <img
            src="/articles/what-to-do-when-your-baby-is-sick/shutterstock_732808213-scaled-optimized.jpg"
            alt="Baby rash guidance"
            className={styles.media}
          />
          <p className={`${styles.body} mt-[16px]`}>
            I could list for you all the rashes I see in babies under one and it would be an entire book.
          </p>
          <p className={`${styles.body} mt-[16px]`}>
            If your baby is unwell, particularly if he is hot, a rash serves <strong>not</strong> as a signal for you
            to try and diagnose it, but simply for you to head to the doctor. We don't expect you to tell the
            difference between roseola and heat rash. Rashes scare parents and that's completely understandable because
            of the fear of meningitis.{" "}
            <strong>The rash of meningitis does NOT disappear when you press it with a glass. This is a 999 call.</strong>
          </p>

          <h2 className={`${styles.sectionHeading} mt-[32px]`}>He won't eat</h2>
          <img
            src="/articles/what-to-do-when-your-baby-is-sick/shutterstock_2039363063-scaled-optimized.jpg"
            alt="Baby not eating"
            className={styles.media}
          />
          <p className={`${styles.body} mt-[16px]`}>
            No matter how unwell a baby is, even with the most minor of colds, they don't eat their solids. This
            shouldn't alarm you or concern you. It is a sign something is amiss but it is no more sinister than that.
            It is certainly not a sign they are desperately unwell, as it happens even with the mildest of colds.
            Still offer him food as normal, perhaps just his favourite. If he eats carrots or yoghurt every day for a
            few days it doesn't really matter while he's unwell.
          </p>

          <h2 className={`${styles.sectionHeading} mt-[32px]`}>Snot, snot and more snot</h2>
          <img
            src="/articles/what-to-do-when-your-baby-is-sick/shutterstock_1471475831-scaled-optimized.jpg"
            alt="Baby with runny nose"
            className={styles.media}
          />
          <p className={`${styles.body} mt-[16px]`}>
            Snot is as normal a part of parenting as nappies or milk. Babies get snotty a lot but no-one has a great
            answer as to what to do about it.
          </p>
          <p className={`${styles.body} mt-[16px]`}>
            Let me bust a well-known snot-myth: green snot does not mean baby needs an antibiotic. This is an
            urban-myth that is not true. Green snot just means he has, well, green snot. It's probably an infection
            yes, but is most likely to be a virus that needs no special treatment.
          </p>
          <p className={`${styles.body} mt-[16px]`}>Some snot-busting ideas.</p>
          <ul className={styles.bulletListTight}>
            <li className={styles.bulletItem}>
              Humidify his room: cheaply with a wet towel on a warm radiator. Or you can buy a humidifier. Moistening
              the air makes snot looser and easier to dribble away
            </li>
            <li className={styles.bulletItem}>
              Tilt the cot slightly: if he sleeps ever so slightly upright, snot can dribble out his nose to clear his
              airways
            </li>
            <li className={styles.bulletItem}>Feed little and often as congestion can stop him taking a good feed</li>
            <li className={styles.bulletItem}>
              Baby vapour rubs can help loosen hard congested mucous from his little nose.
            </li>
          </ul>
          <p className={`${styles.body} mt-[16px]`}>
            As yet we have no medicine you can give babies that miraculously gets rid of this gunk. Believe me, if we
            did, I'd buy shares.
          </p>

          <p className={`${styles.attribution} mt-[26px]`}>
            <strong>This is an excerpt from Keep Calm, The New Mum's Manual by Dr Ellie Cannon</strong>
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
