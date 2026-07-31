import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/go-guide-preparing-freezing-reheating-foods-baby-2',
);

const cleanTips = [
  {
    label: 'Wash your hands',
    text: 'always wash your hands thoroughly before preparing any food, and particularly after handling raw meat',
  },
  {
    label: 'Clean work surfaces',
    text: "disinfect food preparation surfaces using a clean dishcloth before starting any food prep. If you can, use a paper towel squirted with antibacterial spray to clean surfaces after preparing raw meat and poultry as this will help to make sure that you don't pick up food poisoning germs and spread them around the kitchen",
  },
  {
    label: 'Clean utensils',
    text: 'make sure equipment is clean before you start using it and if you can, opt for colour coded equipment to reduce the risk of cross contamination between raw and ready to eat foods. Never prepare ready to eat food such as salad on a board that was previously used to prepare raw meat',
  },
  {
    label: 'Wash fruit and veg',
    text: "they might be low risk foods, but bacteria can also be found on fruit and veggies too so don't forget to wash these thoroughly under cold running water before serving to baby. If you're using frozen veggies in baby's food, make sure that these are cooked according to the back of pack information before serving to your baby.",
  },
  {
    label: "Don't be tempted to wash raw chicken!",
    text: "washing your chicken will not 'wash off' the bacteria (only cooking will make it safe to eat!). If you wash chicken, instead you are more likely to cause food poisoning by inadvertently spreading more bacteria around the kitchen.",
  },
];

const cookingChecks = [
  'Use a food probe - checking the temperature of the thickest part of meat is the most accurate way (and the way I would recommend) to check food is cooked, whilst also making sure it is not overcooked! If using a probe, make sure the probe is clean and the meat has a core temperature of 75C for at least 30 seconds.',
  'Cut into the thickest part of the meat to make sure there is no pink meat visible',
  'The meat must be steaming hot throughout',
  'Meat juices run clear',
];

const reheatMethods = ['On the hob', 'In the microwave'];

export default function GoGuidePreparingFreezingReheatingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={`${styles.intro} mt-[20px]!`}>
            There&apos;s no doubt that there are so many exciting things to
            think about when you begin your weaning journey with your little
            one; choosing a highchair, shopping for snazzy bibs, debating which
            cup and cutlery is best and deciding what amazing tastes to expose
            your baby to first… but it&apos;s important not to forget that
            amongst all of this, any food you serve needs to be safe! Babies and
            young children don&apos;t have the same immune system as us adults
            (or even older children) so food safety is essential. We need to
            make sure we&apos;re extra careful with their little tummies!
          </p>
          <p className={styles.intro}>
            <strong>
              It is estimated that there are{' '}
              <a
                href="https://www.food.gov.uk/sites/default/files/media/document/foodborne-disease-estimates-for-the-united-kingdom-in-2018_0.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                2.4 million cases of food-borne illness in the UK every year
              </a>
            </strong>{' '}
            but it&apos;s not just restaurants that cause food poisoning –
            cooking at home can also make you (or your family) sick. The good
            news is that there are so many things you can do whilst preparing
            food to prevent this happening. Below, we give our top tips for baby
            food safety.
          </p>

          <h2 className={styles.sectionHeading}>Keep it clean</h2>
          <div className="my-[22px]">
            <img
              src="/articles/go-guide-preparing-freezing-reheating-foods-baby-2/keep-clean.jpg"
              alt="Cleaning baby food with Annabel Karmel"
              className="h-auto w-full max-w-[1000px] mx-auto"
            />
          </div>
          <p className={styles.bodyText}>
            When it comes to food safety, keeping clean is so important. In
            reality, this doesn&apos;t mean having a &apos;spotless&apos;
            kitchen but instead, a clean environment where you prepare food,
            with clean hands, using clean equipment! Here are some top tips to
            help you organise your kitchen and help you safely prepare meals for
            your baby and the rest of the family:
          </p>
          <ul className={styles.bulletList}>
            {cleanTips.map((tip) => (
              <li key={tip.label} className={styles.bulletItem}>
                <strong className={styles.bulletItemStrong}>{tip.label}</strong>{' '}
                – {tip.text}
              </li>
            ))}
          </ul>

          <h2 className={styles.sectionHeading}>
            Food Safety – Cooking food for your baby checklist!
          </h2>
          <div className="my-[22px]">
            <img
              src="/articles/go-guide-preparing-freezing-reheating-foods-baby-2/cottage-pie.png"
              alt="Cottage Pie recipe by Annabel Karmel"
              className="h-auto w-full max-w-[1000px] mx-auto"
            />
          </div>
          <p className={styles.bodyText}>
            Cooking veggies by steaming, boiling or roasting is pretty
            straightforward, but those first tastes don&apos;t last for long and
            you&apos;ll soon be branching out to more exciting foods for your
            baby to try, many of which may include meat or fish. Regardless of
            how you serve meat to your little one, it&apos;s important to make
            sure that it is thoroughly cooked.
          </p>
          <p className={styles.bodyText}>
            Remember – just because it&apos;s cooked on the outside,
            doesn&apos;t mean it&apos;s cooked on the inside! Here&apos;s how
            you can check that meat is safe for your baby to eat…
          </p>
          <ul className={styles.bulletList}>
            {cookingChecks.map((item) => (
              <li key={item} className={styles.bulletItem}>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            If you find your baby puree needs thinning after cooking, check out
            Jenna&apos;s article{' '}
            <a href="/top-tips-thinning-baby-purees-2" className={styles.link}>
              Top tips for thinning baby purees
            </a>
          </p>

          <h2 className={styles.sectionHeading}>Cool foods quickly</h2>
          <div className="my-[22px]">
            <img
              src="/articles/go-guide-preparing-freezing-reheating-foods-baby-2/cool-foods.png"
              alt="Baby food purees cooling on a rack"
              className="h-auto w-full max-w-[1000px] mx-auto"
            />
          </div>
          <p className={styles.bodyText}>
            I am a huge fan of keeping leftovers to use as an easy meal another
            day! After cooking, make sure you cool any leftovers and pop into
            the fridge or freezer as soon as possible. Never allow food to sit
            out on the side for more than 2 hours after cooking.
          </p>
          <p className={`${styles.bodyText} mb-[20px]!`}>
            Be aware that simply putting your hot food in the fridge may not be
            enough to make sure it is cooled down quickly and safely. There are
            lots of things you can do to help speed up the cooling of food, such
            as dividing into smaller portions, using an ice bath or stirring
            regularly.
          </p>

          <h2 className={styles.sectionHeading}>
            Keep leftovers for another day
          </h2>
          <div className="my-[22px]">
            <img
              src="/articles/go-guide-preparing-freezing-reheating-foods-baby-2/leftovers.png"
              alt="Storing leftovers Annabel Karmel"
              className="h-auto w-full max-w-[1000px] mx-auto"
            />
          </div>
          <p className={styles.bodyText}>
            Whatever your situation, whether you have children or not… reheating
            leftovers is always a good idea! As a rule of thumb, leftover food
            can be kept in the fridge and used within 2 days (1 day for rice)
            but if you want longer than this, then pop your leftovers in the
            freezer.
          </p>
          <p className={`${styles.bodyText} mb-[20px]!`}>
            Even if you used raw meat or veg which was previously frozen, once
            cooked you can freeze the leftovers. Freezing &quot;pauses&quot; the
            growth of bacteria, locks in nutrients, prevents spoilage and
            ultimately helps reduce wastage!
          </p>

          <h2 className={styles.sectionHeading}>Defrosting baby purees</h2>
          <div className="my-[22px]">
            <img
              src="/articles/go-guide-preparing-freezing-reheating-foods-baby-2/frozen-purees.png"
              alt="Frozen Purees Annabel Karmel"
              className="h-auto w-full max-w-[1000px] mx-auto"
            />
          </div>
          <p className={`${styles.bodyText} mb-[20px]!`}>
            If defrosting baby purees, the best way to do this would be
            overnight in the fridge and use within 24 hours. But, did you know
            that you can cook baby purees from frozen?!
          </p>

          <h2 className={styles.sectionHeading}>Reheating baby purees</h2>
          <div className="my-[22px]">
            <img
              src="/articles/go-guide-preparing-freezing-reheating-foods-baby-2/reheating.png"
              alt="Reheating baby purees Annabel Karmel"
              className="h-auto w-full max-w-[1000px] mx-auto"
            />
          </div>
          <p className={styles.bodyText}>
            Baby purees are often best served at room temperature, but
            don&apos;t be tempted to partially reheat food for your baby to
            avoid having to wait for it to cool. Unless served cold straight
            from the fridge, baby purees should always be reheated until piping
            hot, which means steaming throughout, to kill off bacteria.
          </p>
          <p className={styles.bodyText}>
            The best ways to reheat baby purees are:
          </p>
          <ul className={styles.bulletList}>
            {reheatMethods.map((method) => (
              <li key={method} className={styles.bulletItem}>
                {method}
              </li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            If cooking a portion of baby puree from frozen, make sure you
            increase the cooking time and stir regularly (every 20 – 30 seconds)
            to ensure there are no hidden hot spots and that the puree is evenly
            heated so it is piping hot throughout.
          </p>
          <p className={styles.bodyText}>
            Remember that foods can only be reheated once so make sure you
            divide your puree into baby friendly portions before storing in the
            fridge or freezer!
          </p>
          <p className={styles.bodyText}>
            We hope these tips and tricks have helped you become more confident
            when it comes to food safety for your little ones!
          </p>

          <div className={styles.authorBlock}>
            <p className={styles.authorText}>
              Jenna is a fully qualified Environmental Health Practitioner
              specialising in food safety and public health.
            </p>
            <p className={styles.authorText}>
              She obtained a first-class Batchelor (BSc) degree in Environmental
              Health and has since qualified as an Environmental Health
              Practitioner with the Chartered Institute of Environmental Health
              (CIEH). Over the past 12 years she has worked in both the public
              and private sector advising businesses on all things food safety
              and public health.
            </p>
            <p className={styles.authorText}>
              Since becoming a Mum to her 2-year-old little girl Mia, she
              understands first-hand how much things change when you have a
              little one to think about too! She has always been passionate
              about food safety and her mission as Food Safety Mum is to help
              give parents confidence when cooking at home or when eating out
              and about!
            </p>
            <div className={styles.authorFooter}>
              <img
                src="/articles/go-guide-preparing-freezing-reheating-foods-baby-2/food-safety-mum.jpg"
                alt="The Food Safety Mum"
                className={styles.authorLogo}
              />
              <p className={styles.authorCta}>
                For lots more food safety advice, follow Jenna on Instagram
                <br />
              </p>
              <p className={styles.authorCta}>
                <a
                  href="https://www.instagram.com/foodsafetymum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  @Foodsafetymum
                </a>
              </p>
            </div>
          </div>

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
