import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Top tips for thinning baby purees | Annabel Karmel',
  description:
    "Guidance on thinning baby purees with formula, breast milk, water, or cow's milk, including safe storage and freezing tips.",
};

const relatedArticles = getRelatedArticles('/top-tips-thinning-baby-purees-2');

const formulaGuidelines = [
  "Before adding to food, make up formula fresh – don't use leftover milk from a previous feed",
  'Make sure any leftovers are cooled quickly and put into the fridge or freezer as soon as possible; ideally within an hour and half but no more than 2 hours',
  'Ensure you follow the shelf life guidance in the table below',
];

const tableFooter =
  'All leftovers must only be reheated once and any defrosted purees must be used within 24 hours';

function GuidelinesTable({
  rows,
}: {
  rows: { label: string; fridge: string; freezing: string; freezer: string }[];
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.guidelinesTable}>
        <thead>
          <tr>
            <th />
            <th>Shelf life in the fridge</th>
            <th>Suitable for freezing</th>
            <th>Shelf life in the freezer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className={styles.labelCell}>{row.label}</td>
              <td>{row.fridge}</td>
              <td>{row.freezing}</td>
              <td>{row.freezer}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className={styles.tableFooter}>
              {tableFooter}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function MythSection({
  children,
  followUp,
}: {
  children: ReactNode;
  followUp?: ReactNode;
}) {
  return (
    <div className={styles.mythSection}>
      <div className={styles.mythRow}>
        <img
          src="/articles/top-tips-thinning-baby-purees-2/myth-busting.jpg"
          alt="Myth busting with Annabel Karmel"
          width={144}
          height={143}
          className={styles.mythImage}
        />
        <div className={`${styles.mythContent} self-end`}>{children}</div>
      </div>
      {followUp ? <div className={styles.mythFollowUp}>{followUp}</div> : null}
    </div>
  );
}

export default function TopTipsThinningBabyPureesPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[30px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={`${styles.body} mt-0!`}>
            As you start preparing those first few purees for your baby, you are
            likely to find that you need some extra liquid to help loosen the
            consistency.
          </p>
          <p className={styles.body}>
            There are so many options available when thinning purees for babies
            over 6 months and rest assured you can use anything from tap water,
            cow&apos;s milk or plant-based milks as well as a splash of your
            baby&apos;s usual breast milk or formula milk; which will not only
            help loosen the consistency but also adds a familiar taste.
          </p>
          <p className={styles.bodyBold}>
            Whatever you choose to thin your baby&apos;s puree, there are a
            couple of things you might need to keep in mind if you want to keep
            the puree for another day…
          </p>

          <h2 className={styles.sectionTitle}>
            Thinning baby purees with formula milk
          </h2>

          <MythSection
            followUp={
              <>
                {formulaGuidelines.map((item) => (
                  <p key={item} className={styles.plainGuidelineItem}>
                    {item}
                  </p>
                ))}
              </>
            }
          >
            <p className={styles.mythText}>
              Whilst you shouldn&apos;t keep leftover bottles of formula milk,
              it{' '}
              <strong>
                <u className={styles.emphasisUnderline}>IS</u>
              </strong>{' '}
              perfectly fine to use freshly prepared formula milk as an
              ingredient within a meal or puree that you wish to keep and reheat
              another day! Just make sure that if you choose to use formula milk
              to thin your baby&apos;s puree, you follow these simple guidelines
              to make sure the leftovers are safe:
            </p>
          </MythSection>
          <GuidelinesTable
            rows={[
              {
                label: 'Purees made with formula milk',
                fridge: '1 day',
                freezing: 'Yes',
                freezer: '3 months',
              },
            ]}
          />

          <h2 className={styles.sectionTitle}>
            Thinning baby purees with expressed breast milk
          </h2>
          <p className={`${styles.body} mt-[20px]!`}>
            Breast milk is great for your baby for so many reasons, its ideal
            for thinning baby purees too, especially in the early days of
            weaning!
          </p>
          <p className={styles.body}>You can either….</p>
          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              Add fresh breast milk – this is the best option if you&apos;re
              adding to the puree when cooking as it means you can keep the
              leftovers in the fridge or freezer
            </li>
            <li className={styles.bulletItem}>
              Add a small ice cube of frozen, or a splash of defrosted
              breastmilk – the most important thing to remember here is that
              breastmilk <strong>must never be refrozen.</strong> So, if
              you&apos;re using previously frozen breast milk, it&apos;s best to
              add just a splash to the portion you are serving so you don&apos;t
              end up wasting more than you need to
            </li>
          </ul>
          <GuidelinesTable
            rows={[
              {
                label:
                  'Thinning baby purees using freshly expressed breast milk',
                fridge: '2 days',
                freezing: 'Yes',
                freezer: '3 months',
              },
              {
                label:
                  'Thinning baby purees using previously frozen breast milk',
                fridge: 'Dispose of leftovers',
                freezing: 'No',
                freezer: 'N/A',
              },
            ]}
          />

          <h2 className={styles.sectionTitle}>
            Thinning baby purees using water or cow&apos;s milk / plant-based
            milk
          </h2>
          <MythSection>
            <p className={styles.mythText}>
              You can also thin baby purees using cow&apos;s milk or plant-based
              milk. Using cow&apos;s milk or plant based milk in cooking is
              absolutely fine for babies over 6 months. Just don&apos;t
              substitute their usual milk (breast milk or formula) for any of
              these varieties until they are at least 1 year old.
            </p>
          </MythSection>

          <h3 className={styles.subHeading}>
            Does the water need to be boiled?
          </h3>
          <p className={styles.body}>
            No. Tap water is fine for babies over 6 months – although if you
            can, make use of the water you used to cook your veggies in as this
            will also help to sneak in an extra splash of nutrients that leached
            from the vegetables as they were cooked.
          </p>
          <p className={styles.body}>
            Here&apos;s a quick summary of the guidelines…
          </p>
          <GuidelinesTable
            rows={[
              {
                label:
                  "Thinning baby purees with cow's milk or plant-based milk",
                fridge: '2 days',
                freezing: 'Yes',
                freezer: '3 months',
              },
              {
                label: 'Purees without additions',
                fridge: '2 days',
                freezing: 'Yes',
                freezer: '3 months',
              },
            ]}
          />

          <p className={styles.body}>
            See our next article for more advice on{' '}
            <a
              href="/go-guide-preparing-freezing-reheating-foods-baby-2"
              className={styles.link}
            >
              preparing, reheating and freezing food for baby
            </a>
            .
          </p>

          <div className="mt-[70px] text-center">
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
