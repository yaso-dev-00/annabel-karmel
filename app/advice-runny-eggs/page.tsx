import { EggQuestionsAccordion } from '@/components/ArticleScreen/EggQuestionsAccordion';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { introductionToFingerFoodsRelatedArticles } from '@/data/introduction-to-finger-foods-page';
import styles from './page.module.css';

const accordionItems = [
  {
    title: 'Can my baby eat runny eggs?',
    paragraphs: [
      'Eggs are one of the most nutritious foods available and your baby can eat them runny when you start weaning at around six months following a Government change in advice in 2017, as long as they have the British Lion mark on.',
    ],
  },
  {
    title: 'Are eggs good for my baby?',
    paragraphs: [
      "Yes! Eggs are rich in protein and contain specific nutrients to support your baby's growth, including folate, vitamin D, iodine, selenium, choline and long-chain omega 3 fatty acids. So go ahead and scramble, poach and boil away.",
    ],
  },
  {
    title: 'When can I start giving my baby eggs?',
    paragraphs: [
      'Eggs should be introduced early on in weaning from around six months as they are a good source of protein and contain many different vitamins and minerals essential for growth and development.',
    ],
  },
  {
    title: 'What if my baby has an egg allergy?',
    paragraphs: [
      'A small number of babies are allergic to eggs, although many will outgrow this allergy in later life. Emerging research has shown that parents may reduce the risks of their baby having an egg allergy by giving them when they are weaning from six months. This introduction of eggs at this stage is said to provide the best chance of creating tolerance – when the immune system accepts the egg without reaction.',
    ],
  },
  {
    title:
      'Are there any added benefits to giving my baby runny eggs rather than cooked?',
    paragraphs: [
      'The nutritional value of eggs does not vary according to the cooking method. Having runny eggs back on the menu just means that there are even more ways to offer eggs to your baby such as dippy eggs with soldiers or soft poached egg on toast. Fully cooked eggs can sometimes end up a little rubbery making them harder to swallow, but lightly cooked scrambled egg or a soft-boiled egg are often far more palatable for babies.',
    ],
  },
  {
    title: 'Why has the advice changed? Can I trust it?',
    paragraphs: [
      "The government's specialist safety committee produced an extensive report on UK eggs which said that the very low risk posed meant that UK eggs produced under the British Lion Code of Practice can be served raw or lightly cooked to all groups in society, including babies. This landmark report was endorsed by the Food Standards Agency to enable most people to enjoy runny or raw eggs if they wish, as long as they carry the British Lion mark.",
    ],
  },
];

export default function AdviceRunnyEggsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full mt-[40px] max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            Eggs rule. They are quick to cook and full of essential vitamins and
            minerals. Babies can also now eat them runny, as long as they are
            British Lion eggs, due to a change in Government advice in 2017,
            which means there are even more ways to enjoy this scrummy
            superfood.
          </p>

          <p className={styles.subheading}>
            Here dietitian Dr Carrie Ruxton answers your questions around runny
            eggs.
          </p>

          <div className="mt-[50px]">
            <EggQuestionsAccordion items={accordionItems} numbered />
          </div>
          <p className={styles.infoNote}>
            For more information visit{' '}
            <a
              href="https://www.egginfo.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoNoteLink}
            >
              www.egginfo.co.uk
            </a>
          </p>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel
            items={introductionToFingerFoodsRelatedArticles}
          />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
