import accordionStyles from '@/app/eggs-questions-answered/page.module.css';
import type { FoodCategoryItem } from '@/components/ArticleScreen/FoodCategoryAccordion';
import type { RelatedArticleItem } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import Link from 'next/link';
import { createElement, Fragment, type ReactNode } from 'react';

export const articleSlug = 'family-health';
export const articlePath = `/articles/${articleSlug}`;

export const familyHealthIntroParagraphs: ReactNode[] = [
  'The British Red Cross works to make first aid simple and easy to remember. Many accidents and injuries can be calmly dealt with using a little knowledge and confidence until, where necessary, help arrives.',
  createElement(
    Fragment,
    null,
    'The Red Cross walks us through five all too familiar family situations but for more information, advice, apps and course details visit ',
    createElement(
      Link,
      {
        href: 'https://www.redcross.org.uk',
        className: accordionStyles.accordionInlineLink,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      createElement('em', null, 'www.redcross.org.uk'),
    ),
    '.',
  ),
];

export const familyHealthAccordionItems: FoodCategoryItem[] = [
  {
    title: 'Choking',
    paragraphs: [
      'When a baby or child chokes they will be unable to breathe, cry, cough and may make no noise at all. The first aid steps to help a choking baby or child change according to their age.',
    ],
    subsections: [
      {
        heading: 'If a baby (0-12 months) is choking:',
        headingVariant: 'display',
        paragraphs: [],
      },
      {
        heading: '1- Give up to five back blows.',
        paragraphs: [
          'Hold the baby face down along your thigh with their head lower than their bottom. Hit them firmly on their back between the shoulder blades.',
        ],
      },
      {
        heading:
          '2- If back blows do not dislodge the object, give up to five chest thrusts.',
        paragraphs: [
          'Turn the baby over so they are facing upwards and place two fingers in the middle of their chest just below the nipples. Push sharply downwards.',
        ],
      },
      {
        heading: '3- Call 999 if the object does not dislodge.',
        paragraphs: [
          'Continue with cycles of back blows and chest thrusts, until the object dislodges, help arrives or the baby becomes unresponsive.',
        ],
      },
      {
        heading: 'If a child over one year is choking',
        headingVariant: 'display',
        paragraphs: [],
      },
      {
        heading: '1- Give up to five back blows.',
        paragraphs: [
          'Hit them firmly on their back between the shoulder blades.',
        ],
      },
      {
        heading:
          '2- If back blows do not dislodge the object, give up to five abdominal thrusts.',
        paragraphs: [
          'Hold the child around the waist and pull inwards and upwards above their belly button.',
        ],
      },
      {
        heading: '3- Call 999, if the object does not dislodge.',
        paragraphs: [
          'Continue with cycles of back blows and abdominal thrusts, until the object dislodges, help arrives or the child becomes unresponsive.',
        ],
      },
    ],
  },
  {
    title: 'Burns',
    paragraphs: [
      'Hot drinks are a common cause of scalds and burns in children, their skin is thinner and more sensitive than an adults and so burns more easily at lower temperatures.',
    ],
    subsections: [
      {
        heading: 'If a baby or child has been burnt:',
        headingVariant: 'display',
        paragraphs: [],
      },
      {
        heading:
          '1- Cool the burn under cold running water for at least ten minutes.',
        paragraphs: [],
      },
      {
        heading:
          '2- After the burn has cooled, cover it with cling film or a clean plastic bag.',
        paragraphs: [],
      },
      {
        heading: '3- Call 999 if necessary.',
        paragraphs: [
          'Always seek medical advice for a baby or child that has been burnt.',
          "If you don't have immediate access to cold running water to cool the burn, you can use milk, juice or beer – any cold liquid is better than none.",
        ],
      },
    ],
  },
  {
    title: 'Asthma attack',
    paragraphs: [
      'A baby or child having an asthma attack will wheeze and find it difficult to breathe.',
    ],
    subsections: [
      {
        heading:
          '1- Help the baby or child to sit in a comfortable position and take their medication.',
        paragraphs: [],
      },
      {
        heading: '2- Stay calm and reassure them.',
        paragraphs: [
          "If they don't have their medication or the attack becomes severe call 999.",
        ],
      },
    ],
  },
  {
    title: 'Poisoning',
    paragraphs: [
      'Harmful substances and poisons include alcohol, drugs (prescription or non-prescription drugs), chemicals (including household cleaning products) and some plants if you swallow them.',
      'If a baby or child has swallowed a harmful substance they may vomit or have abdominal pain, or you may see empty containers nearby. They may have evidence of the harmful substance around their mouth, or smell of it. Babies and children can have different reactions to harmful substances, and sometimes it may take some time for symptoms to occur.',
    ],
    subsections: [
      {
        heading: '1- Establish what they have taken, when and how much.',
        paragraphs: [
          'The emergency services will want to know this information.',
        ],
      },
      {
        heading: '2- Call 999.',
        paragraphs: [
          'The substance could be extremely harmful and the baby or child may need urgent medical attention.',
        ],
      },
    ],
  },
  {
    title: 'Febrile seizure',
    paragraphs: [
      'Febrile seizures are caused by a fever or high temperature. Babies and young children having a seizure may arch their backs, stiffen their bodies, clench their fists and twitch. They may be red faced, hot to the touch and sweaty.',
    ],
    subsections: [
      {
        heading: '1- Protect them from injury but do not restrain them.',
        paragraphs: [],
      },
      {
        heading: '2-Remove outer clothing to cool them.',
        paragraphs: [],
      },
      {
        heading:
          '3-Once the seizure has ended help them to rest on their side with their head tilted back.',
        paragraphs: [
          'If this is their first seizure or the symptoms continue seek medical advice.',
        ],
      },
    ],
  },
];

export const familyHealthRelatedArticles: RelatedArticleItem[] = [
  {
    href: '/advice/toddler-top-tips-to-healthy-food-habits',
    title: 'Toddler Top Tips to Healthy Food Habits',
    image: '/articles/toddler-top-tips-to-healthy-food-habits/hero.jpg',
  },
  {
    href: '/advice/infertility-and-iodine-deficiency-everything-you-need-to-know',
    title: 'Infertility and Iodine Deficiency: Everything You Need to Know',
    image:
      '/articles/infertility-and-iodine-deficiency-everything-you-need-to-know/hero.jpg',
  },
  {
    href: '/advice/the-best-foods-for-boosting-fertility',
    title: 'The Best Foods for Boosting Fertility',
    image: '/articles/the-best-foods-for-boosting-fertility/hero.jpg',
  },
  {
    href: '/food-allergies-your-common-questions-concerns-answered',
    title: 'Food Allergy Awareness',
    image:
      '/articles/food-allergies-your-common-questions-concerns-answered/hero.jpg',
  },
  {
    href: '/top-tips-washing-babies-hands',
    title: 'Top Tips for Washing Babies Hands',
    image: '/articles/top-tips-washing-babies-hands/wash-hands-sink.png',
  },
  {
    href: '/go-guide-handling-leftovers-safely',
    title: 'Go to Guide: Handling Leftovers Safely',
    image: '/articles/go-guide-handling-leftovers-safely/hero.jpg',
  },
  {
    href: '/top-weaning-tips',
    title: "Annabel Karmel's Top 10 Weaning Tips",
    image: '/articles/top-weaning-tips/hero.png',
  },
  {
    href: '/advice/cooking-with-kids',
    title: 'Top tips for cooking with kids',
    image: '/articles/get-kids-kitchen/hero.png',
  },
  {
    href: '/advice/gagging-vs-choking',
    title:
      'Gagging vs Choking: The differences you need to know when weaning your baby',
    image: '/articles/gagging-vs-choking/hero.jpg',
  },
  {
    href: '/advice/weaning-premature-babies',
    title: 'Weaning premature babies',
    image: '/articles/weaning-premature-babies/hero.jpg',
  },
];
