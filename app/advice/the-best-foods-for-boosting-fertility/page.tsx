import { FallbackImage } from "@/components/UiPrimitives/FallbackImage";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import {
  boostingFertilityImages,
  boostingFertilityRelatedArticles,
  ribbonBoxLinks,
  type BoostingFertilityImageKey,
} from "@/data/boosting-fertility-page";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Best Foods for Boosting Fertility | Annabel Karmel",
  description:
    "Nutrition tips for trying to conceive — avocados, berries, whole fat dairy, bananas, citrus fruits, and quinoa to support fertility.",
};

function ArticleImage({
  imageKey,
  alt,
  className = styles.sectionImage,
}: {
  imageKey: BoostingFertilityImageKey;
  alt: string;
  className?: string;
}) {
  const image = boostingFertilityImages[imageKey];
  return (
    <FallbackImage
      src={image.src}
      fallbackSrc={image.fallback}
      finalFallbackSrc={image.final}
      alt={alt}
      className={className}
    />
  );
}

export default function BoostingFertilityPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto ">
            <p className={styles.authorLine}>
            
              <Link href="https://www.theribbonbox.com/" className={styles.authorLink} target="_blank" rel="noreferrer">
              By The Ribbon Box
              </Link>
            </p>

            <p className={styles.bodyText}>
              Nutrition during pregnancy comes with many dos and don&apos;ts, but how should you eat when trying to
              conceive? Sometimes boosting fertility takes more than paying attention to your menstrual cycle, and
              requires monitoring bodily functions and overall health too. As with all body systems, the reproductive
              system benefits from a healthy lifestyle, which is why good nutrition is key to enhancing your fertility.
              Here are the best foods to boost fertility.
            </p>

            <ArticleImage imageKey="avocados" alt="Avocados on a purple background" />

            <h2 className={styles.sectionHeading}>Avocados</h2>
            <p className={styles.bodyText}>
              Avocados are important before, during and after pregnancy. Studies show that avocados contain many nutrients
              important to prenatal, natal and neonatal health — such as Vitamin A, B6, B12, D, folate, iodine, and iron,
              among many others. Avocados also help your body absorb nutrients more effectively, so you should definitely
              consider incorporating the super fruit into your diet.
            </p>

            <h2 className={styles.sectionHeading}>Berries</h2>
            <p className={styles.bodyText}>
              Blueberries, cranberries and raspberries are high in folate, vitamin C, and fibre. They&apos;re also rich in
              antioxidants and anti-inflammatory phytonutrients — both of which help reduce damage to reproductive cells
              that are caused by environmental toxins and free radicals in the body.
            </p>

            <ArticleImage imageKey="berries" alt="Blueberries and mint leaves on a lavender background" />
            <ArticleImage imageKey="dairy" alt="Milk bottle with peonies and an egg" />

            <h2 className={styles.sectionHeading}>Whole Fat Dairy</h2>
            <p className={styles.bodyText}>
              Fat-free and low-fat dairy products have been marketed as healthier substitutes for whole fat dairy,
              however this is simply not the case. It is possible that avoiding whole fat can be detrimental to the health
              of some individuals, including those who want to boost their fertility. Greek yogurt, in particular, is a
              superfood that contains a lot of other nutrients, such as protein and calcium. Bodies need fat in order to
              improve fertility, and whole fat provides fat-soluble vitamins like Vitamin A, E, D, and K. Vitamin D is
              especially helpful as it helps mature ovary follicles, regulate menstrual cycles, and balance sex hormones.
            </p>

            <h2 className={styles.sectionHeading}>Bananas</h2>
            <p className={styles.bodyText}>
              Bananas are loaded with Vitamin B6, which helps regulate menstrual cycles and improve sperm and egg quality.
              They&apos;re an excellent source of fibre as well. Bananas also help maintain a healthy weight, which is key
              for conception as obesity can make it more difficult to conceive.
            </p>

            <ArticleImage imageKey="banana" alt="Partially peeled banana on a pink background" />
            <ArticleImage imageKey="citrus" alt="Lemon slices on a pink background" />

            <h2 className={styles.sectionHeading}>Citrus Fruits</h2>
            <p className={styles.bodyText}>
              Citrus fruits are great sources of Vitamin C, which helps facilitate the release of eggs from the ovaries. But
              they&apos;re also packed with folate, a B vitamin that helps regulate ovulation and create a healthy
              environment for eggs. Grapefruits and oranges, in particular, contain putrescine, a polyamine connected to
              potentially improving egg and semen health and quality.
            </p>

            <h2 className={styles.sectionHeading}>Quinoa</h2>
            <p className={styles.bodyText}>
              Quinoa has the ability to control blood sugar levels and weight due to its high fibre content. Too much
              fluctuation in insulin and blood sugar levels can lead to diabetes and insulin resistance, which can
              negatively affect fertility. By keeping your blood sugar levels and weight regulated, you&apos;ll also keep
              your hormones balanced – making quinoa a must have when trying to get pregnant!
            </p>

            <ArticleImage imageKey="quinoa" alt="Quinoa bowl with vegetables and avocado" />

            <section className={styles.ribbonBox} aria-label="The Ribbon Box">
              <ArticleImage imageKey="ribbonBoxLogo" alt="The Ribbon Box" className={styles.ribbonLogo} />
              <p className={styles.ribbonText}>
                The Ribbon Box guides and connects a likeminded community, from the highs and lows of pre-conception,
                through pregnancy and parenthood. Everything FHH does it rooted in a place of experience: from shared
                stories, useful giveaways and offers to daily expert advice and events.
              </p>
              <p className={styles.ribbonText}>
                For trying to conceive support,{" "}
                <Link href={ribbonBoxLinks.ttc} className={styles.inlineLink} target="_blank" rel="noreferrer">
                  follow us here
                </Link>
                , and for parenting support,{" "}
                <Link href={ribbonBoxLinks.parenting} className={styles.inlineLink} target="_blank" rel="noreferrer">
                  follow us here
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={boostingFertilityRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
