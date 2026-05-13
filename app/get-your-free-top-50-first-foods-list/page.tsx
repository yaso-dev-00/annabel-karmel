import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/get-your-free-top-50-first-foods-list");

export default function FirstFoodsListPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[14px] pb-[56px] pt-[18px]">
          <div className="my-[8px] mb-[60px]">
            <img src="/articles/get-your-free-top-50-first-foods-list/top-collage.png" alt="Top 50 First Foods collage" />
          </div>
<p  className={`${styles.title} hover:text-[#e98c9a]! cursor-pointer`}>
<a href="https://pdflink.to/annabel-karmel-pampers-top-50-first-foods-checklist/">Here is your FREE Top 50 First Foods Checklist</a>

</p>
             <p className={styles.partner}>
            <span className={styles.partnerWrap}>
              <strong>In partnership with</strong>
              <img src="/articles/get-your-free-top-50-first-foods-list/pampers-logo.png" alt="Pampers" />
            </span>
          </p>

          <p className={styles.lead}>
            We&apos;ve teamed up with <a className={styles.partnerLinkText} href="https://www.pampers.co.uk/">Pampers</a> to help little food explorers
            #GetToGrips with 50 of the most nutritious foods around.
          </p>
          <p className={styles.lead}>
            This is your FREE checklist to help you try and tick off a raft of new tastes and textures with your baby
            - whether you are pureeing or offering finger foods.
          </p>

          {/* <div className={styles.goBanner}>LET&apos;S GO &gt;</div> */}

          <div className="my-[4px] mb-[32px] mt-[70px] w-full flex justify-center">
            <img src="/articles/get-your-free-top-50-first-foods-list/checklist-spread.png" alt="Top 50 checklist" />
          </div>

          <section className="my-[10px] mb-[32px] bg-[#f1dcd4] px-[16px] pb-[10px] pt-[20px]">
            <div className="grid grid-cols-2 items-center gap-[16px] max-[900px]:grid-cols-1">
              <div>
                <h2 className={styles.didTitle}>Did you know?</h2>
                <p className={styles.didBody}>
                  The start of weaning provides the ultimate &apos;flavour window&apos; where babies are more likely to
                  accept new foods. The more variety you provide, the more they can adjust and accept those flavours.
                </p>
              </div>
              <img
                src="/articles/get-your-free-top-50-first-foods-list/did-you-know-baby.png"
                alt="Baby trying first foods"
                className={`${styles.didImage} max-[900px]:mt-[40px]!`}
              />
            </div>
          </section>

          <h2 className={styles.mushyTitle}>For all those mushy, squishy moments...</h2>
          <p className={styles.mushyText}>
            As little ones have fun getting to grips with a world of food, pair with{" "}
            <a className={styles.partnerLinkText} href="https://www.pampers.co.uk/">Pampers</a> Harmonie Aqua Baby Wipes which are safe and gentle to use
            even on the most delicate skin.
          </p>

          <div className="mx-auto mt-[50px]! w-full max-w-[1024px]">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/articles/get-your-free-top-50-first-foods-list/mobile-786x1024-optimized-mobile.webp"
              />
              <img src="/articles/get-your-free-top-50-first-foods-list/pampers-aqua.png" alt="Pampers Aqua wipes" />
            </picture>
          </div>

          <div className="my-[18px] mb-[8px] flex flex-wrap max-[900px]:flex-col items-center justify-center gap-[22px]">
            <a className={styles.socialLink} href="https://www.pampers.co.uk/">
              pampers.co.uk
            </a>
            <a className={styles.socialLink} href="https://www.instagram.com/pampersuk_ire/">
              <img src="/articles/get-your-free-top-50-first-foods-list/instagram.png" alt="Instagram" />
              @pampersuk_ire
            </a>
            <a className={styles.socialLink} href="https://www.facebook.com/PampersUKIre">
              <img src="/articles/get-your-free-top-50-first-foods-list/facebook.png" alt="Facebook" />
              @pampersUKIre
            </a>
          </div>

          <div className="mt-[100px]! text-center mb-10">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={`${styles.relatedText} max-[900px]:text-[17px]!`}>Some more articles you might enjoy...</p>
          </div>
          <RelatedArticlesCarousel items={relatedArticles} />
        </article>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
