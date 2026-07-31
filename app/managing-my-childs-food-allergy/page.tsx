import { ArticleRecipeCarousel } from '@/components/SharedCarousels/ArticleRecipeCarousel';
import { FallbackImage } from '@/components/UiPrimitives/FallbackImage';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { managingAllergyBooks } from '@/data/managing-my-childs-food-allergy-page';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Managing my child's food allergy | Nutrition | Annabel Karmel",
  description:
    "Professor Adam Fox shares tips for managing your child's food allergy when shopping, eating out, and at parties.",
};

const articlePath = '/articles/managing-my-childs-food-allergy';
const relatedArticles = getRelatedArticles('/managing-my-childs-food-allergy');

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  allergies: '/articles/introducing-allergenic-foods/hero.jpg',
} as const;

const crossContaminationBullets = [
  'May contain x',
  'Made on equipment that also processes x',
  'Made in a factory that also handles x',
];

export default function ManagingMyChildsFoodAllergyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              From the weekly food shop to those all-important kids&apos;
              parties, managing your child&apos;s food allergy can be stressful
              for both you and your child. You worry about their safety, but you
              don&apos;t want them to miss out and they don&apos;t want to feel
              excluded.
            </p>
            <p className={styles.bodyText}>
              Here, Consultant Paediatric Allergist{' '}
              <Link
                href="/allergies-with-professor-adam-fox"
                className={styles.inlineLink}
              >
                Professor Adam Fox
              </Link>{' '}
              provides top tips for managing your child&apos;s food allergy when
              out and about.
            </p>

            <section className="overflow-hidden">
              <h2 className={styles.sectionHeading}>
                Any tips for managing my child&apos;s food allergy when
                shopping?
              </h2>
              <FallbackImage
                src={`${articlePath}/shopping.jpg`}
                fallbackSrc={`${articlePath}/shopping-sm.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Managing my child's food allergy when shopping"
                className={styles.floatImageRight}
              />
              <p className={styles.bodyText}>
                Food businesses that supply prepacked foods are required to
                emphasise any of the 14 specific allergens in the ingredients
                list of prepacked food.
              </p>
              <p className={styles.bodyText}>
                These must be emphasised on the label if they are used as
                ingredients in pre-packaged food. Businesses can choose what
                method they want to use to emphasise these allergens, for
                example, by listing them in bold, italics, highlighted or
                underlined, to help identify them.
              </p>
              <p className={styles.bodyText}>
                Regulations also state that information about allergenic
                ingredients is to be located in a single place, i.e. the
                ingredients list on prepacked food. This means that the
                voluntary use of the previous types of allergy boxes (such as:
                &lsquo;Contains nuts&rsquo;) that provide a short cut to
                allergen ingredients information also given in the ingredients
                list, is no longer allowed. The use of voluntary precautionary
                allergen labeling such as &lsquo;may contain&rsquo;, to indicate
                the risk of unintentional presence of allergens in a portion of
                food, is still permitted and has not been affected by this
                regulation.
              </p>
              <p className={styles.bodyText}>
                Previously, loose foods (that can be bought without packaging)
                for example in supermarkets, delis, cafes, and restaurants;
                didn&apos;t have to provide information you need about food
                allergens. However, since 13 December 2014, information on any
                of the 14 allergens used as ingredients should be provided for
                these foods.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>
                Should I be concerned about cross-contamination?
              </h2>
              <p className={styles.bodyText}>
                Sometimes traces of allergens can get into products
                unintentionally during the manufacturing process or during
                transport or storage.
              </p>
              <p className={styles.bodyText}>
                It is important to understand that different manufacturers can
                choose to use different phrases to warn of allergen
                cross-contamination risks, such as:
              </p>
              <ul className={styles.bulletList}>
                {crossContaminationBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={styles.bodyText}>
                These different phrases describe how the risk arises, but are
                not indicative of the severity of the risk. For this reason,
                none of these warnings should be read as being more or less
                serious than another phrase.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>
                How do I manage my child&apos;s allergy when eating out?
              </h2>
              <p className={styles.bodyText}>
                For food businesses that provide non-prepacked food, such as
                retailers, restaurants, takeaways, bakeries and institutional
                caterers (e.g. nurseries, schools, workplace canteens, etc.),
                there is a requirement to provide information on allergenic
                ingredients.
              </p>
              <p className={styles.bodyText}>
                However, where possible, try to plan ahead before eating out.
                Most restaurants now have online menus with clear allergen
                labeling so you can check in advance. Always let restaurant or
                hotel staff know about the food allergy in advance or upon
                arrival. Make it clear that it&apos;s necessary to avoid any
                dishes that may contain that food. Ask them if they can provide
                a separate dish, free from allergic food. Explain the risks and
                if you are uncertain don&apos;t be afraid to ask.
              </p>
              <p className={styles.bodyText}>
                Be particularly careful at salad bars and buffets where food can
                be easily cross-contaminated.
              </p>
            </section>

            <section className="overflow-hidden">
              <h2 className={styles.sectionHeading}>
                How do I manage my child&apos;s allergy when they go to
                kid&apos;s parties?
              </h2>
              <FallbackImage
                src={`${articlePath}/parties.jpg`}
                fallbackSrc={`${articlePath}/parties-sm.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Children at a party with a dog"
                className={styles.floatImageLeft}
              />
              <p className={styles.bodyText}>
                If your child has an allergy and is going to a friend&apos;s
                birthday party or celebration, it&apos;s always worth packing
                some party food in case the food being served isn&apos;t
                suitable.
              </p>
              <p className={styles.bodyText}>
                For example, if they have an egg allergy, have a batch of
                cupcakes in the freezer and simply defrost one or two for them
                to take along. Cakes generally keep well for up to a month and
                they work best if you use silicone cupcake cases rather than
                paper cases when freezing.
              </p>
              <p className={styles.bodyText}>
                Whilst you don&apos;t want your child to feel singled out at a
                party, their safety is the most important thing. You could also
                ask the parent in advance what type of birthday cake or party
                spread they are preparing, so you can pack a few similar items.
              </p>
              <p className={styles.bodyText}>
                Even if you&apos;ve advised the parent or organisation hosting
                the party about your child&apos;s food allergy, you should
                provide them with your contact number. If you&apos;re
                particularly concerned, hang out at the venue or somewhere close
                by. So in the unlikely case they do come into contact with a
                portion of food they shouldn&apos;t, you can be on hand with
                their treatment plan. It can be overwhelming for parents whose
                children don&apos;t have allergies to think about dealing with
                an allergic reaction or administering an EpiPen.
              </p>
              <p className={styles.bodyText}>
                Bringing our own food as well as taking sensible precautions
                such as always carrying medication means that your child
                won&apos;t miss out on those all-important social occasions –
                after all, their party schedule is often busier than mum and
                dads!
              </p>
              <p className={styles.bodyText}>
                For more advice, click on{' '}
                <Link
                  href="/allergies-finding-support"
                  className={styles.boldLink}
                >
                  finding support
                </Link>
                .
              </p>
            </section>
          </div>

          <ArticleRecipeCarousel
            items={managingAllergyBooks}
            className="mt-[50px] md:mt-[70px]"
            perDesktopView={4}
            loop
          />

          <div className=" text-center mt-[90px]">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
