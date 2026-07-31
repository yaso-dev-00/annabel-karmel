import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  DevelopmentMilestonesAccordion,
  type DevelopmentAccordionItem,
} from '@/components/ArticleScreen/DevelopmentMilestonesAccordion';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/development-milestones-toddlers-expect',
);

type MilestoneSection = {
  title: string;
  image: string;
  imageAlt: string;
  accordion: DevelopmentAccordionItem[];
};

const milestoneSections: MilestoneSection[] = [
  {
    title: 'Development Milestones - 1 years old',
    image:
      '/articles/development-milestones-toddlers-expect/milestone-1-year.png',
    imageAlt: '1 year old development milestones by Annabel Karmel',
    accordion: [
      {
        title: 'Social and Emotional',
        defaultOpen: true,
        points: [
          'Is shy or nervous with strangers',
          'Cries when mum or dad leaves',
          'Has favourite things and people',
          'Shows fear in some situations',
          'Hands you a book when they wants to hear a story',
          'Repeats sounds or actions to get attention',
          'Puts out arm or leg to help with dressing',
          'Plays games such as “peek-a-boo” and “pat-a-cake”',
        ],
      },
      {
        title: 'Language/Communication',
        points: [
          'Responds to simple spoken requests',
          'Uses simple gestures, like shaking head “no” or waving “bye-bye”',
          'Makes sounds with changes in tone (sounds more like speech)',
          'Says “mama” and “dada” and exclamations like “uh-oh!”',
          'Tries to say words you say',
        ],
      },
      {
        title: 'Cognitive (learning, thinking, problem-solving)',
        points: [
          'Explores things in different ways, like shaking, banging, throwing',
          'Finds hidden things easily',
          'Looks at the right picture or thing when it’s named',
          'Copies gestures',
          'Starts to use things correctly; for example, drinks from a cup, brushes hair',
          'Bangs two things together',
          'Puts things in a container, takes things out of a container',
          'Lets things go without help',
          'Pokes with index (pointer) finger',
          'Follows simple directions like “pick up the toy”',
        ],
      },
      {
        title: 'Movement/Physical Development',
        points: [
          'Gets to a sitting position without help',
          'Pulls up to stand, walks holding on to furniture (“cruising”)',
          'May take a few steps without holding on',
          'May stand alone',
        ],
      },
    ],
  },
  {
    title: 'Development Milestones - 2 years old',
    image:
      '/articles/development-milestones-toddlers-expect/milestone-2-year.png',
    imageAlt: '2 year old development milestones by Annabel Karmel',
    accordion: [
      {
        title: 'Social and Emotional',
        points: [
          'Copies others, especially adults and older children',
          'Gets excited when with other children',
          'Shows more and more independence',
          'Shows defiant behaviour (doing what he has been told not to)',
          'Plays mainly beside other children, but is beginning to include other children, such as in chase games',
        ],
      },
      {
        title: 'Language/Communication',
        points: [
          'Points to things or pictures when they are named',
          'Knows names of familiar people and body parts',
          'Says sentences with 2 to 4 words',
          'Follows simple instructions',
          'Repeats words overheard in conversation',
          'Points to things in a book',
        ],
      },
      {
        title: 'Cognitive (learning, thinking, problem-solving)',
        points: [
          'Begins to sort shapes and colours',
          'Finds things even when hidden under two or three covers',
          'Completes sentences and rhymes in familiar books',
          'Plays simple make-believe games Builds towers of 4 or more blocks',
          'Might use one hand more than the other',
          'Follows two-step instructions such as “Pick up your shoes and put them in the closet.”',
          'Names items in a picture book such as a cat, bird, or dog',
        ],
      },
      {
        title: 'Movement/Physical Development',
        points: [
          'Stands on tiptoe',
          'Kicks a ball',
          'Begins to run',
          'Climbs onto and down from furniture without help',
          'Walks up and down stairs holding on',
          'Throws ball overhand',
          'Makes or copies straight lines and circles',
        ],
      },
    ],
  },
  {
    title: 'Development Milestones - 3 years old',
    image:
      '/articles/development-milestones-toddlers-expect/milestone-3-year.jpg',
    imageAlt: '3 year old development milestones by Annabel Karmel',
    accordion: [
      {
        title: 'Social and Emotional',
        points: [
          'Copies adults and friends',
          'Shows affection for friends without prompting',
          'Takes turns in games',
          'Shows concern for crying friend',
          'Understands the idea of “mine” and “his” or “hers”',
          'Shows a wide range of emotions',
          'Separates easily from mum and dad',
          'May get upset with major changes in routine',
          'Dresses and undresses self',
        ],
      },
      {
        title: 'Language/Communication',
        points: [
          'Follows instructions with 2 or 3 steps',
          'Can name most familiar things',
          'Understands words like “in,” “on,” and “under”',
          'Says first name, age, and sex',
          'Names a friend',
          'Says words like “I,” “me,” “we,” and “you” and some plurals (cars, dogs, cats)',
          'Talks well enough for strangers to understand most of the time',
          'Carries on a conversation using 2 to 3 sentences',
        ],
      },
      {
        title: 'Cognitive (learning, thinking, problem-solving)',
        points: [
          'Can work toys with buttons, levers, and moving parts',
          'Plays make-believe with dolls, animals, and people',
          'Does puzzles with 3 or 4 pieces',
          'Understands what “two” means',
          'Copies a circle with pencil or crayon',
          'Turns book pages one at a time',
          'Builds towers of more than 6 blocks',
          'Screws and unscrews jar lids or turns door handle',
        ],
      },
      {
        title: 'Movement/Physical Development',
        points: [
          'Climbs well',
          'Runs easily',
          'Pedals a tricycle (3-wheel bike)',
          'Walks up and down stairs, one foot on each step',
        ],
      },
    ],
  },
  {
    title: 'Development Milestones - 4 years old',
    image:
      '/articles/development-milestones-toddlers-expect/milestone-4-year.jpg',
    imageAlt: '4 year old development milestones by Annabel Karmel',
    accordion: [
      {
        title: 'Social and Emotional',
        defaultOpen: true,
        points: [
          'Enjoys doing new things',
          'Plays “Mum” and “Dad”',
          'Is more and more creative with make-believe play',
          'Would rather play with other children than by himself',
          'Cooperates with other children',
          'Often can’t tell what’s real and what’s make-believe',
          'Talks about what she likes and what she is interested',
        ],
      },
      {
        title: 'Accordion #2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
      },
      {
        title: 'Language/Communication',
        points: [
          'Knows some basic rules of grammar, such as correctly using “he” and “she”',
          'Sings a song or says a poem from memory such as the “Itsy Bitsy Spider” or the “Wheels on the Bus”',
          'Tells stories',
          'Can say first and last name',
        ],
      },
      {
        title: 'Cognitive (learning, thinking, problem-solving)',
        points: [
          'Names some colors and some numbers',
          'Understands the idea of counting',
          'Starts to understand time',
          'Remembers parts of a story',
          'Understands the idea of “same” and “different”',
          'Draws a person with 2 to 4 body parts',
          'Uses scissors',
          'Starts to copy some capital letters',
          'Plays board or card games',
          'Tells you what he thinks is going to happen next in a book',
        ],
      },
      {
        title: 'Movement/Physical Development',
        points: [
          'Hops and stands on one foot up to 2 seconds',
          'Catches a bounced ball most of the time',
          'Pours, cuts with supervision, and mashes own food',
        ],
      },
    ],
  },
  {
    title: 'Development Milestones - 5 years old',
    image:
      '/articles/development-milestones-toddlers-expect/milestone-5-year.jpg',
    imageAlt: '5 year old development milestones by Annabel Karmel',
    accordion: [
      {
        title: 'Social and Emotional',
        defaultOpen: true,
        points: [
          'Wants to please friends',
          'Wants to be like friends',
          'More likely to agree with rules',
          'Likes to sing, dance, and act',
          'Can tell what’s real and what’s make-believe',
          'Shows more independence (for example, may visit a next-door neighbour by himself, adult supervision is still needed)',
          'Is sometimes demanding and sometimes very cooperative',
        ],
      },
      {
        title: 'Language/Communication',
        points: [
          'Speaks very clearly',
          'Tells a simple story using full sentences',
          'Uses future tense; for example, “Grandma will be here.”',
          'Says name and address',
        ],
      },
      {
        title: 'Cognitive (learning, thinking, problem-solving)',
        points: [
          'Counts 10 or more things',
          'Can draw a person with at least 6 body parts',
          'Can print some letters or numbers',
          'Copies a triangle and other geometric shapes',
          'Knows about things used every day, like money and food',
        ],
      },
      {
        title: 'Movement/Physical Development',
        points: [
          'Stands on one foot for 10 seconds or longer',
          'Hops; may be able to skip',
          'Can do a somersault',
          'Uses a fork and spoon and sometimes a table knife',
          'Can use the toilet on her own',
          'Swings and climbs',
        ],
      },
    ],
  },
];

export default function DevelopmentMilestonesToddlersExpectPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white overflow-hidden">
        <article className="mx-auto w-full mt-[50px]! max-w-[1200px] px-[8px] pb-[14px] pt-[24px] md:px-[14px] md:pt-[34px]">
          <div className="space-y-[24px]">
            <p className={styles.lead}>
              Skills such as taking the first step, smiling for the first time,
              and waving &ldquo;bye-bye&rdquo; are called developmental
              milestones. Development milestones are things most children can do
              by a certain age. Children reach milestones in how they play,
              learn, speak, behave, and move (like crawling, walking, or
              jumping).
            </p>
            <p className={`${styles.body} font-semibold`}>
              Keep reading to find out which development milestones your little
              ones should be reaching starting from 1 year all the way to 5
              years old.
            </p>
          </div>

          <div className="mt-[40px] space-y-[48px]">
            {milestoneSections.map((section) => (
              <section key={section.title}>
                <h2 className={styles.milestoneTitle}>{section.title}</h2>
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  className="mx-auto mt-[30px] w-full max-w-[650px]"
                />
                <div className="mt-[60px]!">
                  <DevelopmentMilestonesAccordion items={section.accordion} />
                </div>
              </section>
            ))}
          </div>

          <section className="mt-[28px]">
            <p className={styles.body}>
              For more information, see our articles on{' '}
              <a
                href="https://www.annabelkarmel.com/advice/walking/"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                walking
              </a>
              ,{' '}
              <a
                href="https://www.annabelkarmel.com/advice/talking/"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                talking
              </a>{' '}
              and{' '}
              <a
                href="https://www.annabelkarmel.com/advice/behaviour/"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                understanding toddler behaviour
              </a>
              .
            </p>

            <h2 className={`${styles.milestoneTitle} mt-[40px]`}>
              Learning through play with Edx Education
            </h2>
            <img
              src="/articles/development-milestones-toddlers-expect/edx-learning.jpg"
              alt="Learning through play with Edx Education"
              className="mx-auto mt-[30px] w-[300px] max-w-full"
            />
            <p className={`${styles.body} mt-[16px]`}>
              From early childhood active play and art &amp; craft accessories,
              to maths and classroom resources, Edx Education&apos;s innovative
              toys and resources provide children a fun and engaging way to
              learn.
            </p>
            <div className="w-full flex justify-center">
              <a
                href="http://www.amazon.co.uk/edxeducation"
                target="_blank"
                rel="noreferrer"
                className="mt-[30px] inline-flex"
              >
                <img
                  src="/articles/development-milestones-toddlers-expect/edx-button.png"
                  alt="Shop Edx Education’s toys here"
                  className="w-[390px] max-w-full"
                />
              </a>
            </div>

            <p
              className={`${styles.body} mt-[30px]! flex items-center gap-[10px]`}
            >
              <a
                href="https://www.instagram.com/edxeducation/"
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
              >
                <img
                  src="/articles/development-milestones-toddlers-expect/instagram-icon.jpg"
                  alt="YumYum Instagram Link"
                  className="h-[50px] w-[50px]"
                />
              </a>
              <a
                href="https://www.instagram.com/edxeducation/"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                Follow Edx Education on Instagram
              </a>
            </p>
          </section>

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
