import {
  FoodCategoryAccordion,
  type FoodCategoryItem,
} from '@/components/ArticleScreen/FoodCategoryAccordion';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/everything-you-need-to-know-about-strep-a',
);

const accordionItems: FoodCategoryItem[] = [
  {
    title: 'WHAT IS STREP A',
    paragraphs: [
      'Strep A is bacteria found in the throat and skin that causes different infections.',
      'Some of the illnesses caused by Strep A are Scarlet Fever, tonsilitis, impetigo and invasive Group A Strep.',
      'Most people will have a mild, non-invasive form of it and have no idea or suffer any symptoms.',
    ],
  },
  {
    title: 'THE SYMPTOMS OF INVASIVE STREP A',
    listItems: [
      'Sore throat',
      'Rash',
      'Muscle aches',
      'High temperature (five days of a temperature over 38)',
      'Changes to breathing',
      'Swollen glands',
      'Extreme shivering',
      'Drowsiness',
      'Cold to the touch',
      'Mottled skin',
    ],
  },
  {
    title: 'HOW IS IT SPREAD?',
    paragraphs: [
      'Step A is spread through close contact i.e coughs, sneezes, physical contact, and shared drinking and eating utensils.',
      'There are sometimes outbreaks in places of close contact like schools and nursing homes.',
    ],
  },
  {
    title: 'WHAT ARE THE RISKS?',
    paragraphs: [
      'Most cases are mild. However, there is a risk of developing more invasive illnesses such as Scarlet Fever, tonsilitis, impetigo and invasive Group A Strep (where bacteria invades the body for example the blood or the lungs.)',
    ],
  },
  {
    title: 'WHAT SHOULD YOU DO?',
    paragraphs: [
      'If you suspect your little one has invasive Strep A then immediately call 999 or take your child to A&E.',
      'Step A is treated by antibiotics.',
    ],
  },
];

export default function StrepAPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.body}>
            Parents are understandably worried about Group A strep considering
            the recent devastating cases in the UK. Whilst the bacterial
            infection has always existed, we seem to have an alarmingly high
            number of cases for this time of year. However, NHS GP, The Mail on
            Sunday health columnist{' '}
            <strong>
              <em>
                <u className={styles.doctorName}>Dr Ellie Cannon</u>
              </em>
            </strong>{' '}
            has reassured parents that severe cases are incredibly rare and that
            we haven&apos;t yet surpassed the amount we&apos;d expect in a
            normal year. The concern is not necessarily how many cases, but
            rather the timing of them happening before the peak of winter.
          </p>

          <p className={styles.bodySpacing}>
            There are a host of explanations for why this could be happening
            including reduced immunity in children due to social distancing and
            changes in weather, however Dr Ellie reassures that most children
            who have Group A strep will develop a mild version of the illness,
            less likely the invasive kind. You can find out more about her
            parental advice in her new book Keep Calm The New Mum&apos;s Manual.
          </p>

          <p className={styles.callout}>
            Here&apos;s everything you need to know about the invasive Group A
            strep and what to look out for:
          </p>

          <div className="mt-[40px]">
            <FoodCategoryAccordion items={accordionItems} />
          </div>

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
