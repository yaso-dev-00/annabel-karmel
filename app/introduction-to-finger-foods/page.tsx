import { ArticleRecipeCarousel } from "@/components/article-recipe-carousel";

import { InstagramShareSection } from "@/components/instagram-share-section";

import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";

import { SiteFooter } from "@/components/site-footer";

import { SiteHeader } from "@/components/site-header";

import {

  introductionToFingerFoodsContentImage,

  introductionToFingerFoodsRecipes,

  introductionToFingerFoodsRelatedArticles,

} from "@/data/introduction-to-finger-foods-page";

import styles from "./page.module.css";



export default function IntroductionToFingerFoodsPage() {

  return (

    <>

      <SiteHeader />

      <main className="overflow-x-hidden bg-white">

        <article className="mx-auto w-full max-w-[1150px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">

          <p className={styles.intro}>

            Quite often babies are determined to feed themselves before they have the hand-eye coordination required to

            use a spoon. And let&apos;s face it, most of the food in the early stages is going to miss their mouths –

            but practice makes perfect!

          </p>



          <div className="my-[28px]">
{/* 
            <img

              src={introductionToFingerFoodsContentImage}

              alt="Top tips on baby-led weaning"

              className="mx-auto h-auto w-full max-w-[900px]"

            /> */}

          </div>



          <h2 className={styles.sectionTitle}>How to introduce finger foods?</h2>

          <p className={styles.bodyText}>

            When most babies start to wean they have few, if any, teeth, so it&apos;s a good idea to start{" "}

            <a href="/baby-finger-foods" className={styles.link}>

              with soft finger foods

            </a>{" "}

            such as soft ripe fruits like bananas, steamed vegetables, cooked pasta and toast. Soft finger foods are much

            less of a choking hazard than hard foods. But as your baby gets older, you can start to move on to harder

            foods such as oat cakes, raw vegetables, dried fruits, pieces of chicken and fish, wafer thin meat rolled in

            to cigar shapes, mini sandwiches and much more.

          </p>

          <p className={styles.bodyText}>

            This style of weaning is called Baby-Led Weaning and you can find out all about it{" "}

            <a

              href="https://www.annabelkarmel.com/baby-led-weaning/"

              target="_blank"

              rel="noopener noreferrer"

              className={styles.link}

            >

              here…

            </a>

          </p>

<div className="mt-[70px]">

          <ArticleRecipeCarousel

            items={introductionToFingerFoodsRecipes}

            className="mt-[40px]"

            perDesktopView={5}

          />
</div>


          <div className="mt-[70px] text-center">

            <h2 className={styles.relatedTitle}>Related Articles</h2>

            <p className={styles.relatedText}>Some more articles you might enjoy...</p>

          </div>

        </article>



        <div className="mb-[90px] px-[8px] md:px-[14px]">

          <RelatedArticlesCarousel items={introductionToFingerFoodsRelatedArticles} />

        </div>

        <InstagramShareSection />

      </main>

      <SiteFooter />

    </>

  );

}

