import { WeaningKitchenEssentialsAccordion } from '@/components/ArticleScreen/WeaningKitchenEssentialsAccordion';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title:
    'Weaning Equipment – Getting your kitchen ready for weaning | Annabel Karmel',
  description:
    'Organise your fridge safely, plan baby meals with confidence, and stock practical weaning kitchen essentials with food-safety focused tips.',
};

const relatedArticles = getRelatedArticles(
  '/weaning-equipment-getting-kitchen-ready-weaning',
);

const kitchenEssentials = [
  {
    title: '1. Food probe',
    text: "I consider a food probe a must-have for any kitchen. You can't tell from the outside whether food is cooked, so a food probe eliminates the guesswork whilst also helping to prevent overcooking - it's a win-win!",
  },
  {
    title: '2. Colour coded equipment',
    text: 'Choosing colour coded chopping boards is the simplest and easiest way to reduce the risk of cross contamination between raw and ready to eat foods.',
  },
  {
    title: '3. Freezer labels ',
    text: "Ever pulled a random container of food out of the freezer having no idea what it is or how long it's been in there?! No, me neither....... I'm a huge fan of batch cooking with a little one at home so keeping track of what is in your freezer is a must!",
  },
  {
    title: '4. Portion pots ',
    text: 'Babies have small appetites so being able to portion their food is a must! Remember, when grabbing food from the freezer you can only reheat food once so having small portions will help make sure you are only reheating as much as you need and reducing your food wastage.',
  },
  {
    title: '5. Antibacterial cleaner',
    text: 'Make sure you have a decent cleaner to help keep your kitchen counter clean before cooking and after handling high risk foods such as raw meat and poultry',
  },
  {
    title: '6. A selection of cloths and tea towels',
    text: "It's best to make sure you have enough cloths and tea towels so you can change these daily. If you can, I would always recommend that when cleaning up after preparing raw foods such as raw meat, poultry and soiled vegetables, that you use a paper towel squirted with anti-bacterial spray. This will help make sure that you don't pick up food poisoning germs and spread them around the kitchen.",
  },
  {
    title: '7. Airtight containers ',
    text: 'These containers are great for storing dry food items as well as leftovers in the fridge. By keeping moisture out, airtight containers help keep food fresher and safer for longer.',
  },
  {
    title: '8. Food cover ',
    text: "A mesh food cover is a must have for any kitchen to make sure those pesky flies don't land on your food - whether you're dining alfresco or cooling your leftovers.",
  },
  {
    title: '9. Fridge thermometer ',
    text: 'If your fridge has a built-in thermometer, you might not need one of these but if not, then it would be worth investing in a fridge thermometer to make sure your fridge is running below 5°C and the best part is, you can usually pick one of these up for less than £5!',
  },
  {
    title: '10. Colander ',
    text: "Okay so you probably do already have one of these but don't forget that you'll need to wash all fruit and veg before giving it to baby! Did you know? Even Norovirus (the most common cause of gastroenteritis) can be found on foods such as lettuce and raspberries?[2]",
  },
];

export default function WeaningEquipmentKitchenReadyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full mt-[30px] max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.bodyNoTop}>
            Beginning your weaning journey with your baby is such an exciting
            time for so many reasons but it can also be a bit overwhelming with
            so much to think about and prepare for.
          </p>
          <p className={styles.body}>
            Get ready to wean by getting organised in the kitchen, it will make
            your life so much easier... and I'm not just talking about the
            dreaded Tupperware cupboard! In this article I have put together
            your weaning equipment essentials, as well as a few tips to help you
            get ready to wean and make sure your kitchen is as prepped as
            possible! This will help make sure the food you serve your little
            ones is safe, allowing you to relax and enjoy the weaning process!
          </p>

          <h2 className={styles.sectionTitle}>How to organise your fridge</h2>

          <div className="mt-[18px] grid grid-cols-1 gap-[22px] md:grid-cols-2 md:items-start">
            <img
              src="/articles/weaning-equipment-getting-kitchen-ready-weaning/organise-fridge.jpg"
              alt="How to organise your fridge"
              width={550}
              height={550}
              className="w-full max-w-[550px] justify-self-center md:justify-self-start"
            />
            <p className={styles.bodyNoTop}>
              How to get ready to wean? First things first, start with
              organising your fridge. Knowing how to store food once you get it
              home from the supermarket and organise your fridge correctly will
              help you avoid food poisoning by reducing the risk of cross
              contamination between raw and ready to eat foods as well as
              helping you to reduce food wastage.
            </p>
          </div>

          <p className={styles.didYouKnow}>
            Did you know? The average household with children could save around
            £60 per month by reducing their food waste and saving food that
            could have been eaten from being thrown away?!
            <a href="#_ftn1">[1]</a>
          </p>

          <h3 className={styles.subSectionTitle}>
            So, how exactly should you organise your fridge and what else do you
            need to know to help keep the food in your fridge safer for longer?
          </h3>
          <ul className={styles.bulletList}>
            <li>
              Most importantly, check the temperature of your fridge. To reduce
              the risk of food poisoning, make sure your fridge is running
              between 1-5°C. If your fridge doesn't have a built-in thermometer,
              then you can check this using a fridge thermometer or a food
              probe.
            </li>
            <li>
              Organise your fridge to make sure you store raw meat and fish
              separately from ready to eat foods. The best place to store raw
              meat and raw fish is the bottom shelf - not only does this prevent
              cross contamination of juices dripping onto other foods below, but
              is also the coldest part of the fridge
            </li>
            <li>
              Keep cooked and ready to eat foods higher up, saving the doors for
              condiments, jams and juices as the doors are most at risk of
              temperature fluctuations
            </li>
            <li>
              It's best to store eggs in the fridge for safety and freshness as
              this ensures eggs are stored at a constant temperature below 20°C.
            </li>
            <li>
              First in, first out - when returning from the supermarket, put new
              foods at the back so using older products first will come
              naturally!
            </li>
            <li>
              Don't forget to also keep an eye on packs in the fridge that have
              been opened! Opening a product with a 'use by' date (more on these
              next) such as ham or milk, will change the shelf life and usually
              means it will need to be used within the next few days, or popped
              in the freezer.
            </li>
          </ul>

          <h2 className={styles.sectionTitle}>
            Plan ahead when preparing your baby&apos;s meals
          </h2>
          <img
            src="/articles/weaning-equipment-getting-kitchen-ready-weaning/plan-ahead.jpg"
            alt="Plan ahead meal prep board"
            width={550}
            height={552}
            className="mx-auto mt-[20px] w-full  max-w-[550px]!"
          />
          <p className={styles.body}>
            Planning ahead the meals you want to cook for baby (and yourself!)
            for the next couple of days will help you decide what foods you can
            keep in the fridge, and which foods to freeze!
          </p>
          <p className={styles.body}>
            The good news is that it is perfectly safe to cook or freeze food
            right up until (and including) the 'use by' date. So, if you're not
            going to use something before it's 'use by' date, either pop it in
            the freezer or cook it and use the leftovers within the next 2 days.
          </p>
          <p className={styles.body}>
            Don&apos;t be put off freezing your foods as this has no impact on
            being able to freeze the leftovers.
          </p>
          <p className={styles.didYouKnow}>
            <span className="not-italic">Did you know?</span> Even if you use
            previously frozen raw meat when cooking, you can still portion and
            freeze the cooked leftovers to reheat another day?!
          </p>
          <p className={styles.body}>
            It&apos;s important when planning your meals to be aware of the
            difference between &apos;use by&apos; dates and &apos;best
            before&apos; dates. Put simply, &apos;use by&apos; dates are there
            for your safety and mustn&apos;t be ignored whereas, &apos;best
            before&apos; dates are about quality. Whilst food is safe to eat
            past its &apos;best before&apos; date (but might not taste as good),
            food past its &apos;use by&apos; date is not safe to eat especially
            as you often can&apos;t tell if a food is unsafe by its appearance,
            smell or taste, so it&apos;s not worth the risk; particularly when
            there are little ones involved.
          </p>

          <h2 className={styles.sectionTitle}>
            Kitchen essentials for weaning your baby
          </h2>
          <img
            src="/articles/weaning-equipment-getting-kitchen-ready-weaning/kitchen-essentials.jpg"
            alt="Top 10 kitchen essentials list"
            width={550}
            height={550}
            className="mx-auto mt-[20px] w-full   max-w-[550px]"
          />
          <p className={styles.body}>
            Get ready to wean by making sure you have all the kitchen
            essentials.
          </p>
          <p className={styles.body}>
            When you start out on your weaning journey, there are so many
            weaning &apos;essentials&apos; covering everything from choosing the
            right highchair, spoons, bibs, plates (and so much more...) but
            don&apos;t forget to stock up your kitchen with essential items that
            will help make your food prep easier and safer.
          </p>
          <p className={`${styles.body} mb-[60px]!`}>
            I&apos;ve put together a list of my top 10 weaning kitchen
            essentials to help make sure the food you serve is safe, that little
            bit easier!
          </p>

          <WeaningKitchenEssentialsAccordion items={kitchenEssentials} />

          <div className={styles.footnotes}>
            <p>
              <a id="_ftn1" href="#_ftnref1" className={styles.refLink}>
                [1]
              </a>{' '}
              WRAP,{' '}
              <em>&apos;Food surplus and waste in the UK - key facts&apos;</em>{' '}
              (2020)
            </p>
            <p className="mt-[14px]">
              <a id="_ftn2" href="#_ftnref2" className={styles.refLink}>
                [2]
              </a>{' '}
              Food Standards Agency,{' '}
              <em>
                &apos;Assessing the contribution made by the food chain to the
                burden of UK-acquired norovirus infection&apos;
              </em>{' '}
              (2019)
            </p>
          </div>

          <p className={styles.authorLabel}>ARTICLE WRITTEN BY JENNA BROWN</p>

          <div className={styles.authorIntro}>
            <img
              src="/articles/weaning-equipment-getting-kitchen-ready-weaning/jenna-brown.jpg"
              alt="Jenna Brown portrait"
              width={245}
              height={328}
              className={styles.authorPhoto}
            />
            <p className={styles.bodyNoTop}>
              Jenna is a fully qualified Environmental Health Practitioner
              specialising in food safety and public health.
            </p>
            <p className={`${styles.body} ${styles.authorBodyPara} mt-[41px]!`}>
              She obtained a first-class Batchelor (BSc) degree in Environmental
              Health and has since qualified as an Environmental Health
              Practitioner with the Chartered Institute of Environmental Health
              (CIEH). Over the past 12 years she has worked in both the public
              and private sector advising businesses on all things food safety
              and public health.
            </p>
            <p className={`${styles.body} ${styles.authorBodyPara} mt-[40px]!`}>
              Since becoming a Mum to her 2-year-old little girl Mia, she
              understands first-hand how much things change when you have a
              little one to think about too! She has always been passionate
              about food safety and her mission as Food Safety Mum is to help
              give parents confidence when cooking at home or when eating out
              and about!
            </p>
          </div>

          <div className={styles.authorFollowRow}>
            <img
              src="/articles/weaning-equipment-getting-kitchen-ready-weaning/food-safety-mum.jpg"
              alt="Food Safety Mum logo"
              width={288}
              height={108}
              className={styles.foodSafetyLogo}
            />
            <p className={styles.followText}>
              For lots more food safety advice, follow Jenna on Instagram{' '}
              <a
                href="https://www.instagram.com/foodsafetymum/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.followLink}
              >
                @Foodsafetymum
              </a>
            </p>
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
