import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/your-guide-to-supporting-babys-gut-health',
);

export default function GutHealthPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[15px] pb-[14px] pt-[22px] md:pt-[30px]">
          <h1 className={`${styles.title} text-center`}>
            Your guide to supporting baby&apos;s gut health
          </h1>
          <p className={`${styles.partner} mt-[20px]! text-center`}>
            In partnership with{' '}
            <a
              className="hover:text-[#e98c9a]!"
              href="https://www.pampers.co.uk/"
            >
              Pampers
            </a>
          </p>

          <p className={`${styles.bodyText} mt-[60px]!`}>
            A healthy gut is essential for your baby&apos;s growth and
            development. In fact, a baby&apos;s gut is often referred to as
            their &apos;second brain&apos;. This is because the gut and brain
            communicate with each other to support baby. As part of my
            #BabyNutrition series with{' '}
            <a
              className="hover:text-[#e98c9a]!"
              href="https://www.pampers.co.uk/"
            >
              Pampers
            </a>{' '}
            to keep healthy babies on the move, this article explores good
            prebiotic foods to promote the growth of friendly gut bacteria.
          </p>
          <p className={`${styles.bodyText}  mb-[60px]!`}>
            Baby&apos;s gut has a big job to do! It is responsible for absorbing
            nutrients from the food they eat, which helps support their growing
            bodies. And a balanced gut microbiome is vital for immune system
            function. In fact, around 70% of the immune system is in the gut.
            This is where prebiotics come into play.
          </p>

          <img
            src="/articles/your-guide-to-supporting-babys-gut-health/hero.jpg"
            alt="Peanut butter and banana roll-ups"
            className="w-full"
          />

          <h2 className={`${styles.sectionTitle} mt-[34px]`}>
            What are prebiotics?
          </h2>
          <p className={`${styles.bodyText} mt-[20px]!`}>
            Prebiotics promote the growth of our friendly bacteria already
            naturally present in the gut by acting as their food source.
          </p>
          <p className={`${styles.bodyText}`}>
            These healthy bacteria, known as probiotics, are essential for a
            well-functioning digestive system and a strong immune system
            response. Prebiotics act as food for these good bacteria, helping
            them thrive.
          </p>
          <p className={`${styles.bodyText}`}>
            In these early years, a baby&apos;s gut microbiome is rapidly
            developing, which is why supporting this growth is so important. The
            introduction of prebiotics into your baby&apos;s diet can help
            establish a foundation for healthy digestion and immunity that can
            benefit them for years to come.
          </p>

          <h2
            className={`${styles.sectionTitle} mt-[40px] max-[900px]:text-[41px]!`}
          >
            The role of prebiotics in your baby&apos;s health
          </h2>
          <p className={`${styles.bodyText} `}>
            <strong className={styles.strong}>
              1. Support digestive health
            </strong>
            <br />A well-balanced gut microbiome promotes better digestion.
            Prebiotics can help babies break down and absorb nutrients from
            their food more efficiently, which is especially important as they
            transition from milk to solids. This can also reduce the likelihood
            of digestive discomfort, such as constipation or bloating.
          </p>
          <p className={`${styles.bodyText} `}>
            <strong className={styles.strong}>2. Boost immunity</strong>
            <br />A strong gut is directly linked to a healthy immune system.
            This is essential for fighting off infections. Prebiotics encourage
            the growth of beneficial bacteria that support the gut&apos;s immune
            functions, helping to protect your baby from common illnesses.
          </p>
          <p className={`${styles.bodyText} `}>
            <strong className={styles.strong}>
              3. Improve gut flora balance
            </strong>
            <br />A baby&apos;s gut microbiome is heavily influenced by their
            diet and environment. By adding prebiotics to their meals, you help
            establish a balance between beneficial and harmful bacteria, which
            is essential for healthy gut flora.
          </p>

          <h2 className={`${styles.sectionTitle} mt-[40px]`}>
            Signs your baby may benefit from prebiotics
          </h2>
          <p className={`${styles.bodyText} `}>
            Here are some signs that may indicate that your baby could benefit
            from extra support in their gut health.
          </p>
          <p className={`${styles.bodyText} `}>
            <strong className={styles.strong}>Constipation</strong>: If your
            baby is struggling with constipation and all blocked up, prebiotics
            can help by softening stools and improving digestion.
          </p>
          <p className={`${styles.bodyText} `}>
            <strong className={styles.strong}>Frequent colic or gas</strong>:
            Prebiotics help balance gut bacteria, which may alleviate discomfort
            caused by excessive gas or colic.
          </p>
          <p className={`${styles.bodyText} `}>
            <strong className={styles.strong}>Frequent illness</strong>: A
            weakened immune system can make babies more susceptible to
            infections. Prebiotics can support the gut and, in turn, boost
            immunity.
          </p>

          <img
            src="/articles/your-guide-to-supporting-babys-gut-health/pampers-gut-health-optimized.jpg"
            alt="Pampers gut health"
            className="mt-[60px] w-full"
          />

          <h2 className={`${styles.sectionTitle} mt-[34px]`}>
            What foods can support baby&apos;s gut health?
          </h2>
          <p className={`${styles.bodyText}`}>
            Once you&apos;ve begun introducing solids, at whichever texture you
            feel most comfortable, including foods such as oats, bananas, pieces
            of whole wheat toast and soft-cooked asparagus can help your baby
            grow healthy gut bacteria.
          </p>

          <section className="mt-[60px] bg-[#f6f1eb] px-[10px] py-[10px]">
            <div className="grid grid-cols-2 items-center gap-[8px] max-[900px]:grid-cols-1">
              <div className="py-[28px]">
                <h2
                  className={`${styles.sectionTitle} mt-0 max-[900px]:text-[41px]!`}
                >
                  12 gut-friendly foods
                </h2>
                <p
                  className={`${styles.bodyText} ${styles.pr30}  max-[900px]:pr-[3px]! max-[900px]:mt-[22px]!`}
                >
                  For most babies and children, a balanced and varied diet is
                  the most important aspect of promoting diverse gut bacteria.
                </p>
                <p
                  className={`${styles.bodyText} ${styles.pr30} max-[900px]:pr-[0px]!  md:pr-[30px]!`}
                >
                  Here are my top 12 prebiotic foods to support baby&apos;s gut
                  health:
                </p>
              </div>
              <img
                src="/articles/your-guide-to-supporting-babys-gut-health/12-gut-friendly-foods.jpg"
                alt="12 gut friendly foods"
                className="w-full"
              />
            </div>
          </section>

          <section
            className={`${styles.section} mt-[40px]! pt-[30px] max-[900px]:px-[10px]!  `}
            style={{ backgroundColor: '#F7E4F4' }}
          >
            <h2 className={`${styles.sectionTitle} mt-[20px]! text-center`}>
              Protecting baby&apos;s skin during weaning
            </h2>
            <p className={`${styles.bodyText} mt-[20px]! text-center`}>
              A well-balanced gut microbiome helps with digestion and regular
              bowl movements. And I&apos;ve been working with{' '}
              <a
                className="hover:text-[#e98c9a]!"
                href="https://www.pampers.co.uk/"
              >
                Pampers
              </a>{' '}
              on learning about the benefits of using{' '}
              <a
                className="hover:text-[#e98c9a]!"
                href="https://www.pampers.co.uk/products/pampers-premium-protection-nappies"
              >
                Premium Protection Nappies
              </a>{' '}
              together with{' '}
              <a
                className="hover:text-[#e98c9a]!"
                href="https://www.pampers.co.uk/products/pampers-aqua-baby-wipes-plastic-free"
              >
                Harmonie Aqua Baby Wipes
              </a>{' '}
              to help protect healthy skin.
            </p>
            <div className="mt-[60px] grid grid-cols-2 px-[20px] gap-[20px] max-[900px]:grid-cols-1">
              <a href="https://www.pampers.co.uk/products/pampers-premium-protection-nappies">
                <img
                  src="/articles/your-guide-to-supporting-babys-gut-health/pampers-premium-protection.png"
                  alt="Pampers Premium Protection nappies"
                  className="w-full"
                />
              </a>
              <a href="https://www.pampers.co.uk/products/pampers-aqua-baby-wipes-plastic-free">
                <img
                  src="/articles/your-guide-to-supporting-babys-gut-health/pampers-aqua-wipes.png"
                  alt="Pampers Harmonie Aqua Baby Wipes"
                  className="w-full"
                />
              </a>
            </div>
            <p className={`${styles.note} text-center`}>
              *Remember to bin your wipes and not to flush them.
            </p>
          </section>

          <div className="mt-[60px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>
        <div className="mb-[80px]! px-[15px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
