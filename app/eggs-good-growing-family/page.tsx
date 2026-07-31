import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles('/eggs-good-growing-family');

const articleImages = {
  vitaminD: '/articles/eggs-good-growing-family/vitamin-d.jpg',
  protein: '/articles/eggs-good-growing-family/poached-eggs-baked-beans.png',
  goodFats: '/articles/eggs-good-growing-family/lentil-egg.jpg',
  eggYolks: '/articles/eggs-good-growing-family/lentil-egg.jpg',
} as const;

export default function EggsGoodGrowingFamilyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          {/* <h1 className={`${styles.sectionHeading} mt-0! text-center`}>
            Why eggs are so good for your growing family?
          </h1> */}

          <p className={`${styles.intro} mt-[40px]!`}>
            Eggs are good for us and our little ones but what is it that makes
            them one of the best natural sources of goodness?
          </p>

          <h2 className={styles.sectionHeading}>Vital Vitamin D</h2>
          <div className="my-[22px]">
            <img
              src={articleImages.vitaminD}
              alt="Family at the beach by Annabel Karmel"
              className="h-auto w-full max-w-[900px] mx-auto"
            />
          </div>
          <p className={styles.bodyText}>
            Sunshine helps our bodies to make Vitamin D (also known as the
            &apos;sunshine vitamin&apos;). But when the sun hasn&apos;t got its
            hat on, it&apos;s easy to miss out on this essential vitamin.
          </p>
          <p className={`${styles.bodyText} mb-[50px]!`}>
            Few foods naturally contain Vitamin D. But eggs are one of the best
            natural sources, with Vitamin D in the yolk. But why does Vitamin D
            matter? Calcium and phosphorus are essential for making your bones
            grow properly and to keep them healthy. Vitamin D helps your body to
            use calcium and phosphorus effectively, and without enough of it,
            bones can become weak.
          </p>

          <h2 className={styles.sectionHeading}>Packing-in Protein</h2>
          <div className="my-[22px]">
            <img
              src={articleImages.protein}
              alt="Baked Bean & Poached Egg Pittas recipe by Annabel Karmel"
              className="h-auto w-full max-w-[900px] mx-auto"
            />
          </div>
          <p className={`${styles.bodyText} mb-[50px]!`}>
            Protein helps us grow, heal and fight off illness, and eggs
            aren&apos;t just rich in protein; they&apos;re rich in digestible,
            efficient, digestible, high-quality protein, including all the amino
            acids you need to keep healthy. And that&apos;s why we advise
            getting cracking from the start of your baby&apos;s weaning journey
            at around six months.
          </p>

          <h2 className={styles.sectionHeading}>Good Fats</h2>
          <div className="my-[22px]">
            <img
              src={articleImages.goodFats}
              alt="Lovely lentil egg puree recipe by Annabel Karmel"
              className="h-auto w-full max-w-[900px] mx-auto"
            />
          </div>
          <p className={styles.bodyText}>
            The great thing about eggs is that they&apos;re jam-packed with the
            nutrients, protein, vitamins, minerals, and fats your body needs to
            stay healthy and work properly – but relatively low in calories.
            Super-nutritious they will help fill tummies up for longer, fuelling
            their day.
          </p>
          <p className={`${styles.bodyText} mb-[50px]!`}>
            There isn&apos;t a limit on the number of eggs you or your baby or
            child can eat. However, once you have introduced eggs at around six
            months, the government&apos;s Scientific Advisory Committee on
            Nutrition advises that eggs should then be included regularly (for
            example, at least once per week) in order to ensure that your baby
            continues to tolerate them.
          </p>

          <h2 className={styles.sectionHeading}>Yummy Egg Yolks</h2>
          <div className="my-[22px]">
            <img
              src={articleImages.eggYolks}
              alt="Dippy Eggs with Sweet Potato Soldiers recipe by Annabel Karmel"
              className="h-auto w-full max-w-[900px] mx-auto"
            />
          </div>
          <p className={styles.bodyText}>
            Egg yolks contain vitamin A, vitamin B12, and vitamin B2. They help
            to keep your skin, eyes, blood, immune system, nervous system, and
            metabolism nice and healthy. They also have plenty of folates, which
            are needed for your blood and immune system and especially important
            for mums-to-be!
          </p>
          <p className={styles.bodyText}>
            Egg yolks also contain important minerals like phosphorus, iodine,
            and selenium which help to keep your body healthy, beneficial
            polyunsaturated and monounsaturated fats, and essential omega-3
            fatty acids that help to look after your heart, brain, and eyesight.
          </p>

          <p className={styles.infoHeading}>
            For more information visit{' '}
            <a
              href="https://www.egginfo.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.egginfo.co.uk
            </a>
          </p>
          <p className={styles.infoText}>
            And check out our egg recipes for weaning, baby and family{' '}
            <a
              href="https://www.annabelkarmel.com/recipe-filter/eggs/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              here.
            </a>
          </p>
          <p className={`${styles.bodyText} mb-[20px]!`}>
            Food plays an integral role in the development of your little
            one&apos;s brain. Like the body, the brain absorbs nutrients from
            the food we eat. Check out this article, as we run through our
            favourite brain foods for kids. Obviously eggs are right up there at
            the top of the list but what else makes for great brain food for
            kids.{' '}
            <a
              href="https://www.annabelkarmel.com/best-foods-for-brain-growth/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              Foods to boost your child&apos;s brainpower.
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
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
