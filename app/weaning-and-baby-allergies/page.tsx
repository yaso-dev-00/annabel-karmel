import { ArticleRecipeCarousel } from '@/components/SharedCarousels/ArticleRecipeCarousel';
import { FallbackImage } from '@/components/UiPrimitives/FallbackImage';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { weaningBabyAllergiesBooks } from '@/data/weaning-and-baby-allergies-page';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Weaning and baby allergies | Nutrition & Allergies | Annabel Karmel',
  description:
    'Professor Adam Fox shares expert advice on weaning with food allergies — introducing allergens safely and what to watch for.',
};

const articlePath = '/articles/weaning-and-baby-allergies';
const relatedArticles = getRelatedArticles('/weaning-and-baby-allergies');

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  allergies: '/articles/introducing-allergenic-foods/hero.jpg',
} as const;

type FoodLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

const fruitLinks: FoodLinkItem[] = [
  { label: 'apple', href: '/recipes/apple-puree-2' },
  { label: 'banana', href: '/recipes/banana-puree' },
  { label: 'avocado', href: '/recipes/avocado-puree' },
];

const vegetableLinks: FoodLinkItem[] = [
  { label: 'carrots', href: '/recipes/carrot-pea-puree' },
  { label: 'butternut squash', href: '/recipes/butternut-squash-parsnip' },
  {
    label: 'sweet potato',
    href: 'https://www.annabelkarmel.com/recipes/baked-sweet-potato-puree/',
    external: true,
  },
];

function LinkedFoodList({ items }: { items: FoodLinkItem[] }) {
  return items.map((item, index) => (
    <span key={item.href}>
      {index > 0 && (index === items.length - 1 ? ' and ' : ', ')}
      <Link
        href={item.href}
        className={styles.foodLink}
        {...(item.external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {item.label}
      </Link>
    </span>
  ));
}

export default function WeaningAndBabyAllergiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              Entering into the wonderful world of weaning can be daunting at
              the best of times, let alone when you&apos;re also worried about
              your baby&apos;s food allergies. Here Consultant Paediatric
              Allergist{' '}
              <Link
                href="/allergies-with-professor-adam-fox"
                className={styles.inlineLink}
              >
                Professor Adam Fox
              </Link>{' '}
              shares his expert advice to help get you started; from how to
              safely go about introducing new foods, to highlighting those which
              most commonly cause an allergy – he&apos;s got it covered.
            </p>

            <h2 className={styles.sectionHeading}>Before you get started</h2>
            <p className={styles.bodyText}>
              The actual incidence of{' '}
              <strong>food allergy in babies is small – about 5-6%</strong> with
              many babies growing out of allergies like cow&apos;s milk or egg
              allergy by the age of 2 or 3.
            </p>
            <p className={styles.bodyText}>
              Food allergies are more common among babies and children from
              families with a history of allergy and babies who suffer from
              eczema are at a particularly high risk of suffering from food
              allergies. Babies who develop severe eczema before the age of
              three months are at very high risk, so you need to be particularly
              cautious and should discuss this with your doctor.
            </p>
            <p className={styles.bodyText}>
              Avoiding particular foods during pregnancy or breastfeeding does
              not seem to make any difference in the changes of your baby having
              allergies.{' '}
              <strong>
                The best thing you can do is aim to breastfeed, exclusively for
                4-6 months.
              </strong>
            </p>
            <p className={styles.bodyText}>
              If your baby is at high risk e.g. has bad eczema, then it would be
              sensible to get allergy testing done just before weaning to help
              guide the safe introduction of common allergenic foods such as
              milk, egg and peanut.
            </p>

            <h2 className={styles.sectionHeading}>Foods to consider</h2>
            <p className={styles.bodyText}>
              The most common cause of the immediate type of food allergy is{' '}
              <strong>egg, milk, nuts, fish, sesame and shellfish.</strong>{' '}
              Wheat, kiwi and soy are also important allergens. With delayed
              allergies, milk and soy are the most common causes. It is worth
              being aware of these common top allergic foods when you are
              weaning your baby and introducing them to new foods.
            </p>

            <section className="overflow-hidden">
              <h2 className={styles.sectionHeading}>Introducing new foods</h2>
              <FallbackImage
                src={`${articlePath}/introducing-foods.jpg`}
                fallbackSrc={`${articlePath}/introducing-foods-sm.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Baby weaning food containers with avocado"
                className={styles.floatImageRight}
              />
              <p className={styles.bodyText}>
                First foods should be simple, easy to digest, and unlikely to
                provoke an allergic reaction.
              </p>
              <p className={styles.bodyText}>
                Start with a single ingredient, ideally a fruit or vegetable.
                Fruits such as <LinkedFoodList items={fruitLinks} /> are a good
                place to start. Root vegetables like{' '}
                <LinkedFoodList items={vegetableLinks} /> are very popular first
                foods; they have a naturally sweet flavour and can easily be
                puréed to a smooth texture.{' '}
                <strong>
                  As a tip, try mixing them with a little breast or formula milk
                  to ease the transition.
                </strong>
              </p>
              <p className={styles.bodyText}>
                <strong>
                  The new advice is not to withhold foods like eggs, milk and
                  peanut from six months as giving these foods can actually help
                  to reduce the risk of allergy developing in babies.
                </strong>{' '}
                The best thing you can do is to introduce new foods one by one.
                As reactions usually happen very soon after exposure, you
                don&apos;t need to wait a huge amount of time between trying new
                food, just go at your baby&apos;s own pace.
              </p>
              <p className={styles.bodyText}>
                It is important{' '}
                <strong>
                  not to delay the introduction of allergenic foods
                </strong>{' '}
                as this may increase the chance of allergy developing. In fact,
                there is now excellent evidence to suggest that early{' '}
                <strong>introduction of egg and peanut, from 17 weeks</strong>{' '}
                can reduce the risk of allergy.
              </p>
              <p className={styles.bodyText}>
                This was initially based on an observation that in some
                countries such as Israel, for example, where peanut is used in a
                snack called Bamba given to infants. This early weaning with
                peanut seemed to relate to the level of peanut allergy being
                very low, even among high-risk children. In 2015, doctors at St
                Thomas&apos; Hospital in London were able to show that children
                at high risk of peanut allergy (they had eczema or egg allergy)
                who ate products containing peanuts between the ages of 4 and 11
                months, and regularly thereafter, had a 70% reduced risk of
                developing an allergy to peanuts compared with children who ate
                them for the first time when they were older. This research has
                even led to a change in weaning guidance in the USA.
              </p>
            </section>

            <section className="overflow-hidden">
              <FallbackImage
                src={`${articlePath}/sweet-potato.jpg`}
                fallbackSrc={`${articlePath}/sweet-potato-sm.jpg`}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Sweet potato puree in a bowl"
                className={styles.floatImageLeft}
              />

              <h2 className={styles.sectionHeading}>
                Allergy – immediate and delayed
              </h2>
              <p className={styles.bodyText}>
                <strong>There are two sorts of allergy:</strong>
              </p>
              <p className={styles.bodyText}>
                <strong>Immediate allergies</strong> can cause a rash, swelling
                and hives within minutes of the food being eaten, usually around
                the mouth.
              </p>
              <p className={styles.bodyText}>
                <strong>Delayed allergies</strong> can cause your baby to have
                eczema, reflux, colic or diarrhoea.
              </p>
              <p className={styles.bodyText}>
                If you are concerned about either of these, you should always
                consult your GP.
              </p>
            </section>

            <section className="overflow-hidden">
              <h2 className={styles.sectionHeading}>Testing for allergies</h2>
              <FallbackImage
                src={`${articlePath}/allergy-testing.jpg`}
                fallbackSrc={`${articlePath}/allergy-testing-sm.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Allergy skin prick test"
                className={styles.floatImageRight}
              />
              <p className={styles.bodyText}>
                <strong>
                  Introducing foods one by one is the best way to get started
                  with weaning
                </strong>
                , however, if there is a high risk of allergy e.g. eczema, then
                it may make sense to get your baby allergy tested before you do
                this but do not allow this to delay weaning progressing. This
                could involve either a skin prick test or a blood test.
              </p>
            </section>
          </div>

          <ArticleRecipeCarousel
            items={weaningBabyAllergiesBooks}
            className="mt-[50px] md:mt-[70px]"
            perDesktopView={4}
            loop
          />

          <div className="mt-[90px] text-center md:mt-[90px]">
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
