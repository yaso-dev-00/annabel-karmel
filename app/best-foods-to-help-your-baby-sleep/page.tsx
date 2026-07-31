import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/best-foods-to-help-your-baby-sleep',
);

const NANIT_URL = 'https://nanituk.co.uk/';
const NANIT_NEXT_NAP_URL =
  'https://www.nanit.com/blogs/parent-confidently/nextnap-baby-nap-schedule-predictor';
const RECIPES_APP_URL = 'https://annabelkaremel.onelink.me/MP0T/y7jrx92n';

export default function BestFoodsSleepPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[14px] pb-[54px] pt-[30px]">
          <h1 className={`${styles.title} m-0 text-center text-[42px]!`}>
            The Best Foods to Help Your Baby Sleep
          </h1>
          <p
            className={`${styles.partner} mb-[26px] mt-[30px]! text-center text-[16px]!`}
          >
            In partnership with <a href={NANIT_URL}>Nanit</a>
          </p>

          <p className={`${styles.lead} mb-4 mt-20!`}>
            We all know that a good night&apos;s sleep is golden – for babies{' '}
            <em>and</em> for parents! But did you know that certain foods can
            help set the stage for more restful nights?
          </p>
          <p className={`${styles.lead} mb-4 mt-9!`}>
            I&apos;ve spent over three decades supporting families with
            delicious, nutritious recipes and easy-to-follow advice, and now,
            together with Dr. Natalie Barnett, VP of Clinical Research at{' '}
            <a href={NANIT_URL}>Nanit</a>, we&apos;re here to help set the whole
            family up for a good night&apos;s sleep.
          </p>
          <p className={`${styles.lead} mb-4 mt-9!`}>
            While there&apos;s no magic food that guarantees 12 hours straight
            (oh, if only!), including the right nutrients in your baby&apos;s
            diet - especially that last meal of the day - can gently support
            better sleep.
          </p>
          <p
            className={`${styles.leadStrong} mb-3 mt-9! text-[#3a3a3a]! text-[22px]!`}
          >
            Here are my top sleep-friendly foods and tips to help settle your
            little one at bedtime.
          </p>

          <div className="my-[22px] mb-[30px] mt-15!">
            <img
              src="/articles/best-foods-to-help-your-baby-sleep/hero.png"
              alt="Sleeping baby"
            />
          </div>

          <h2 className={`${styles.sectionHeading} mb-[14px]`}>
            1. Bananas - nature&apos;s bedtime snack
          </h2>
          <p className={`${styles.bodyText} mb-[100px]`}>
            Bananas are rich in magnesium and potassium - both natural muscle
            relaxants. They also contain tryptophan, which the body uses to make
            serotonin and melatonin, the hormones that promote sleep. A mashed
            banana with a little full-fat Greek yoghurt makes a perfect
            pre-bedtime pud.
          </p>

          <h2 className={`${styles.sectionHeading} mb-[14px]`}>
            2. Oats - a gentle source of melatonin
          </h2>
          <p className={`${styles.bodyText} mb-[44px]`}>
            Oats aren&apos;t just for breakfast! They contain melatonin and
            complex carbs that help more tryptophan get into baby&apos;s brain.
            A warm bowl of porridge can offer some comfort for babies from 6
            months. Add spoonful fruit puree and nut butter for added flavour
            and nutrition.
          </p>
          <div className="my-[22px]  mb-[100px]">
            <img
              src="/articles/best-foods-to-help-your-baby-sleep/purple-porridge.png"
              alt="Purple porridge"
            />
          </div>

          <h2 className={`${styles.sectionHeading} mb-[14px]`}>
            3. Turkey or chicken - tryptophan boosters
          </h2>
          <p className={`${styles.bodyText} mb-[100px]`}>
            From 6 months, not only is turkey or chicken is a great source of
            protein, it also contains tryptophan, which the body converts to
            calming serotonin. Pair with sweet potato for a simple,
            sleep-friendly supper. Or for those babies having finger foods, try
            making your own mini turkey balls or burgers served with sweet
            potato wedges.
          </p>

          <h2 className={`${styles.sectionHeading} mb-[14px]`}>
            4. Sweet potatoes - slow-release energy
          </h2>
          <p className={`${styles.bodyText} mb-[44px]`}>
            A brilliant choice for baby&apos;s dinner, sweet potatoes are packed
            with beta-carotene and provide a gentle, steady release of energy
            through the night - ideal for avoiding hunger-induced wake-ups.
            Simply mash, blend into veggie-rich purees or serve as steamed or
            roasted wedges.
          </p>
          <div className="my-[22px] mb-[100px]">
            <img
              src="/articles/best-foods-to-help-your-baby-sleep/sweet-potato.png"
              alt="Sweet potato wedges"
            />
          </div>

          <h2 className={`${styles.sectionHeading} mb-[14px]`}>
            5. Dairy - calming calcium
          </h2>
          <p className={`${styles.bodyText} mb-[100px]`}>
            Full-fat dairy products like cheese or plain yoghurt contain
            calcium, which helps the brain use tryptophan to make melatonin. A
            few teaspoons of plain or Greek yoghurt after dinner can hit just
            the (sleepy) spot!
          </p>

          <h2 className={`${styles.sectionHeading} mb-[14px]`}>
            6. Cherries - a natural source of melatonin
          </h2>
          <p className={`${styles.bodyText} mb-[100px]`}>
            This fruit is a natural source of melatonin. Blend fresh cherries
            (or you can get frozen if they aren&apos;t in season) and stir into
            porridge or yoghurt to offer a gentle sleep aid.
          </p>

          <h2 className={`${styles.sectionHeading} mb-[14px]`}>
            7. Salmon - brilliant brain food
          </h2>
          <p className={`${styles.bodyText} mb-[44px]`}>
            Salmon is one of the best sources of the long-chain omega-3 fatty
            acids EPA and DHA. Not only do these essential fatty acids play a
            critical role in your baby&apos;s brain and visual development, but
            research has found that DHA also increases serotonin levels which
            could help your baby to nod-off naturally.
          </p>
          <div className="my-[22px] mb-[100px]">
            <img
              src="/articles/best-foods-to-help-your-baby-sleep/salmon.png"
              alt="Salmon baby meal"
            />
          </div>

          <h2 className={`${styles.sectionHeading} mb-[14px]`}>
            8. Leafy greens - power-packed tryptophan
          </h2>
          <p className={`${styles.bodyText} mb-[44px] mb-[100px]`}>
            We all know the importance of including those power-packed leafy
            green veggies in our little one&apos;s diets. The bonus is that dark
            leafy greens such as spinach are also high in tryptophan and
            magnesium which plays a role in calming the nervous system and
            regulating sleep.
          </p>

          <div className="mb-7 mt-[30px] bg-[#f0e4e4] px-[14px] pb-[14px] pt-14! md:pb-[10px]!">
            <h2 className={`${styles.sectionHeading} mb-[14px]`}>
              What to avoid
            </h2>
            <p className={`${styles.bodyText} mb-[44px]`}>
              Avoid giving baby a big meal too close to starting the bedtime
              routine. Babies have tiny tummies, and a big meal will cause their
              metabolic rate and body temperature to increase which will make it
              harder for them to drift off. Aim to offer their dinner 1 ½ – 2
              hours before bedtime to give them the chance to fully digest their
              food.
            </p>
            <p className={`${styles.bodyText} mb-[44px]`}>
              Avoid sugar and stimulating snacks too close to bed - even natural
              sugars can be energising close to sleep time.
            </p>
          </div>

          <div className="p-2 md:p-6 ">
            <h2
              className={`${styles.tipsTitle} mb-5 text-center text-[#3a3a3a]!  text-[40px]! md:text-[42px]!`}
            >
              Top sleep tips from Natalie Barnett, VP of Clinical Research at
              Nanit
            </h2>
          </div>

          <h3
            className={`${styles.subTitle} mb-6! text-[#3a3a3a]! text-[40px]! md:text-[42px]!`}
          >
            Pre-weaning babies
          </h3>
          <p className={`${styles.bodyText} mb-[35px]!`}>
            <strong>Time the last feed well</strong>
            <br />
            Offer a full milk feed <strong>
              15–30 minutes before bedtime
            </strong>{' '}
            so baby settles with a full tummy – with enough time to reduce
            spit-up or discomfort.
          </p>
          <p className={`${styles.bodyText} mb-[60px]!`}>
            <strong>
              Don&apos;t let feeding be the only way to fall asleep
            </strong>
            <br />
            Feeding is soothing, but if baby <em>always</em> falls asleep on the
            bottle/breast, they may struggle to resettle at night. From around 3
            months, try adding a short wind-down (song or quick story) and put
            them down drowsy but awake.
          </p>
          <div className="my-[22px] mb-[60px]">
            <img
              src="/articles/best-foods-to-help-your-baby-sleep/sleeping-baby-2.png"
              alt="Baby drinking milk"
            />
          </div>

          <h3
            className={`${styles.subTitle} mb-6! text-[#3a3a3a]! text-[40px]! md:text-[42px]!`}
          >
            Weaning babies
          </h3>
          <p className={`${styles.bodyText} mb-[35px]!`}>
            <strong>Keep meals and milk on a steady schedule</strong>
            <br />
            Regular milk feeds and mealtimes help set baby&apos;s body clock and
            support better nights. Consistency is key – tools like{' '}
            <a href={NANIT_NEXT_NAP_URL}>Nanit&apos;s Next Nap</a> can help keep
            the day on track.
          </p>
          <p className={`${styles.bodyText} mb-[35px]!`}>
            <strong>Watch for tummy trouble</strong>
            <br />
            Gas, reflux or sensitivities can interrupt sleep. If baby seems
            uncomfortable, speak to your GP - and remember, night waking
            isn&apos;t always hunger.
          </p>
          <p className={`${styles.bodyText} mb-[35px]!`}>
            <strong>Night waking isn&apos;t always about food</strong>
            <br />
            From around 4-6 months, many babies wake out of habit or for
            comfort. Respond gently, and if it&apos;s right for your baby,
            gradually reduce night feeds to encourage longer stretches of sleep.
          </p>
          <p className={`${styles.bodyText} mt-[14px]`}>
            Every baby is different. Sleep patterns shift with age, teething,
            growth spurts, and changes in routine. But nourishing your little
            one with the right foods can gently support their natural rhythms -
            and give you both a better shot at restful nights.
          </p>
          <p
            className={`${styles.closingItalic} mt-[35px]! text-[21px]! text-center!  `}
          >
            <em>
              For more sleep-friendly recipes and expert advice, explore the{' '}
              <a href={RECIPES_APP_URL}>Annabel Karmel Recipes App</a>. And
              check out <a href={NANIT_URL}>Nanit</a> for smart tools like{' '}
              <a href={NANIT_NEXT_NAP_URL}>Next Nap</a> to help track routines
              and support better sleep.
            </em>
          </p>

          <section className="relative left-1/2 right-1/2 mt-[100px] flex w-screen -translate-x-1/2 flex-col items-center px-2 md:px-4">
            <h1
              className={`${styles.relatedTitle} text-[#3a3a3a]! text-[42px]! font-[430]`}
            >
              Related Articles
            </h1>
            <p
              className={`${styles.relatedIntro} mb-[14px]  mt-[20px]! text-[#3a3a3a]! text-[17px]! md:text-[22px]! text-center!`}
            >
              Some more articles you might enjoy...
            </p>
            <RelatedArticlesCarousel items={relatedArticles} />
          </section>
        </article>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
