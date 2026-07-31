import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Go to Guide: Handling Leftovers Safely | Annabel Karmel',
  description:
    'Practical tips for cooling, storing, freezing and reheating leftovers safely when weaning, including rice and baby-friendly portions.',
};

const relatedArticles = getRelatedArticles(
  '/go-guide-handling-leftovers-safely',
);

const IMG = {
  cool: '/articles/go-guide-handling-leftovers-safely/cool-leftovers.jpg',
  freeze: '/articles/go-guide-handling-leftovers-safely/freezing.png',
  reheatCold: '/articles/go-guide-handling-leftovers-safely/reheat-cold.jpg',
  reheatOnce: '/articles/go-guide-handling-leftovers-safely/reheat-once.jpg',
  rice: '/articles/go-guide-handling-leftovers-safely/rice.png',
} as const;

const alt = 'Handling Leftovers Safely by Annabel Karmel';

export default function GoGuideHandlingLeftoversSafelyPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[24px] md:px-[14px] md:pt-[32px]">
          {/* <h1 className={styles.title}>Go to Guide: Handling Leftovers Safely</h1> */}

          <div className="mt-[28px] md:mt-[36px]">
            <p className={styles.intro}>
              Anyone on the weaning journey will appreciate all of the meal
              planning and prep work that goes into each and every meal
              (parenting is exhausting isn&apos;t it?!) and none of us want to
              see a meal we&apos;ve prepared go to waste! But as babies have
              small tummies and ever-changing appetites, this can leave us
              wondering what we can do with their leftovers…
            </p>
            <p className={styles.intro}>
              In the UK, it&apos;s estimated that 25% of food wasted at home is
              due to cooking, preparing or serving too much food
              <a href="#fn-1" className={styles.link}>
                [1]
              </a>{' '}
              so knowing how to use leftovers and following this guide will make
              all the difference to help you start reducing your own family
              wastage! However, it&apos;s important to know how to handle
              leftovers safely, particularly with little ones in the house as
              babies and young children don&apos;t have the same immune system
              as us adults.
            </p>
            <p id="fn-1" className={styles.footnote}>
              [1] WRAP, Food Surplus and Waste in the UK – Key Facts, January
              2020
            </p>
          </div>

          <h2 className={styles.sectionHeading}>Cool Leftovers Quickly</h2>
          <div className={styles.imageWrap}>
            <img src={IMG.cool} alt={alt} width={1049} height={1049} />
          </div>
          <p className={styles.body}>
            The most important thing to remember when handling leftovers is to
            cool them quickly!
          </p>
          <p className={styles.body}>
            Regardless of what you have cooked, it&apos;s important to make sure
            you cool hot foods <strong>as quickly as possible</strong>, ideally
            within an hour and a half as you want the food to be cold{' '}
            <strong>within 2 hours</strong> of cooking.
          </p>

          <h2 className={styles.sectionHeading}>
            To freeze… or not to freeze?!
          </h2>
          <div className={styles.imageWrap}>
            <img src={IMG.freeze} alt={alt} width={1033} height={724} />
          </div>
          <p className={styles.body}>
            The good news is, providing you haven&apos;t already reheated the
            meal from another day, you can keep your leftovers for another day
            and freeze almost{' '}
            <span className={styles.emphasisUnderline}>anything</span>!
          </p>
          <p className={styles.body}>
            <strong>
              Use any leftovers kept in the fridge within 2 days (1 day for rice
              dishes).
            </strong>{' '}
            Remember that the fridge will slow down the growth of bacteria
            whilst the freezer acts as a &quot;pause&quot; button on food so if
            you don&apos;t think you&apos;re going to use your leftovers in this
            time, pop them in the freezer as soon as possible!
          </p>
          <p className={styles.body}>
            Just make sure you don&apos;t keep leftovers on the side longer than
            2 hours!
          </p>

          <h2 className={styles.sectionHeading}>
            Do you always need to reheat leftovers?
          </h2>
          <div className={styles.imageWrap}>
            <img src={IMG.reheatCold} alt={alt} width={1035} height={1035} />
          </div>
          <p className={styles.body}>
            No! Providing you have cooled your leftovers safely and kept them in
            the fridge, it is absolutely fine to eat your leftovers cold
            straight from the fridge….
          </p>
          <p className={styles.body}>
            However, if you like your leftovers warm, it&apos;s important that
            you reheat until piping hot throughout. Don&apos;t be tempted to
            reheat to a lower temperature to avoid having to wait for the food
            to cool down. Once heated, allow to cool a bit before giving to your
            little one!
          </p>

          <h2 className={styles.sectionHeading}>Only Reheat Leftovers Once</h2>
          <div className={styles.imageWrap}>
            <img src={IMG.reheatOnce} alt={alt} width={1063} height={1062} />
          </div>
          <p className={styles.body}>
            Remember that you can <strong>only reheat leftovers once</strong>!
          </p>
          <p className={styles.body}>
            But… it <strong>is</strong> safe to freeze the leftovers of a cooked
            meal that used previously frozen raw meat. It&apos;s important to
            remember here that you aren&apos;t &apos;re-freezing&apos; the meat
            as it has been cooked in between.
          </p>
          <p className={styles.body}>
            And remember to always freeze leftovers in baby-friendly portions to
            make it easier to only use what you need when defrosting, as once
            you have already reheated your leftovers you won&apos;t be able to
            reheat again.
          </p>

          <h2 className={styles.sectionHeading}>What about leftover rice?</h2>
          <div className={styles.imageWrap}>
            <img src={IMG.rice} alt={alt} width={1095} height={1095} />
          </div>
          <p className={styles.body}>
            Rice is a high-risk product so if you&apos;re keeping leftover rice
            it&apos;s important you know how to handle it safely.
          </p>
          <p className={styles.body}>
            This is because rice contains a spore forming bacteria which can
            survive the heat of cooking. If rice is left at room temperature for
            too long, then the bacteria can multiply rapidly and produce toxins;
            which will <span className={styles.emphasisUnderline}>not</span> be
            killed by further heating.
          </p>
          <p className={styles.body}>
            So, how quickly you cool rice after cooking is critical in ensuring
            that your leftover rice will be safe to use. Always aim to cool as
            quickly as possible, but always within an hour and a half. You can
            help cool rice down quickly by;
          </p>
          <ul className={styles.list}>
            <li>Stirring regularly</li>
            <li>
              Divide into smaller portions, or spread out over a larger surface
              area (for example, spread rice onto a plate vs a bowl)
            </li>
            <li>Using a homemade &apos;ice bath&apos;</li>
            <li>
              Running under cold water (this is the quickest method to cool rice
              if you&apos;ve not added anything to it!)
            </li>
          </ul>
          <p className={styles.body}>
            Once your rice has cooled down, either pop it in the fridge and use
            within 24 hours or pop it in the freezer to use at a later date!
          </p>

          <p className={styles.body}>
            Hopefully this blog on Handling Leftovers Safely has given you some
            tips to help you use your leftovers confidently and safely, reducing
            your food wastage. In a world where a third of all food produced
            globally goes to waste, with the average UK household wasting an
            equivalent of 8 meals a week
            <a href="#fn-1" className={styles.link}>
              [1]
            </a>
            , anything we can do to reduce our wastage is a win-win all round!
          </p>
          <p className={styles.footnote}>
            [1] [1] WRAP, Food Surplus and Waste in the UK – Key Facts, January
            2020
          </p>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
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
