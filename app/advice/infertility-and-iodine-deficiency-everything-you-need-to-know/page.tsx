import { FallbackImage } from "@/components/fallback-image";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  infertilityIodineImages,
  infertilityIodineRelatedArticles,
  ribbonBoxLinks,
} from "@/data/infertility-iodine-page";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Infertility and Iodine Deficiency: Everything You Need to Know | Annabel Karmel",
  description:
    "Annette for The Ribbon Box explains how iodine supports conception, the halogen family, and practical steps to address iodine deficiency for fertility.",
};


function ArticleImage({
  image,
  alt,
  className,
}: {
  image: (typeof infertilityIodineImages)[keyof typeof infertilityIodineImages];
  alt: string;
  className?: string;
}) {
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

export default function InfertilityIodineDeficiencyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto max-w-[1200px]">
            <h3 className={styles.kicker}>Iodine boosts fertility and helps with conception</h3>
            <p className={styles.bodyText}>
              Iodine is a little-known supplement that supports conception and can help improve fertility levels. Get
              Pregnant Plan&apos;s Annette is a certified functional nutritionist with over 30 years of experience. Here
              she explains everything we need to know about the relationship between iodine deficiency and fertility…
            </p>
            <p className={styles.authorLine}>By Annette for The Ribbon Box</p>

            <p className={styles.bodyText}>
              Under normal circumstances getting pregnant is no easy feat but iodine deficiency makes it virtually
              impossible. Iodine is (or should be) abundant in the endometrium, thyroid and ovaries.
            </p>
            <p className={styles.bodyText}>
              Imagine baby-making as an epic party – it requires the right people there. The same applies with making a
              healthy baby, you need the right nutrients in attendance. And iodine is a crucial nutrient that is often in
              short supply – without it, there will be no baby.
            </p>

            <h3 className={styles.sectionHeading}>The Halogen Family</h3>
            <p className={styles.bodyText}>
              Iodine is like Marilyn in the Muenster family – beautiful and normal in a family of monsters. And just like
              Marilyn, iodine loves her family even when they maltreat her, follow her everywhere and try to steal her
              spotlight.
            </p>
            <p className={styles.bodyText}>
              All of your body&apos;s sensors have iodine receptors that can bind to iodine or another member of the
              halogen family; bromide, chlorine and fluoride. Iodine is necessary as it helps the binding process which
              boosts fertility. Iodine&apos;s family (bromide, chlorine and fluoride) like to kick iodine out of the way
              so they can bind to these receptors. But they are more like leaches and don&apos;t have any life-giving
              properties.
            </p>
            <p className={styles.bodyText}>
              The good news is you can get iodine to attend your party. The bad news is you will have to put up with her
              unfavorable family because they go wherever she goes and are nothing but trouble.
            </p>
            <p className={styles.pullQuote}>
              To make a healthy baby, you need the right nutrients and iodine is one of those nutrients that is often in
              short supply.
            </p>

            <h3 className={styles.sectionHeading}>Flouride</h3>
            <p className={styles.bodyText}>
              Flouride is found in water, toothpaste and tea. Filtering water and using fluoride-free toothpaste can limit
              the damage done by fluoride.
            </p>
            <ArticleImage
              image={infertilityIodineImages.toothpaste}
              alt="Toothbrush with toothpaste"
              className={styles.sectionImage}
            />

            <h3 className={styles.sectionHeading}>Chlorine</h3>
            <p className={styles.bodyText}>
              Chlorine is found in water, swimming pools, perchlorate and Splenda, aka sucralose. Perchlorate is used in
              rocket fuel and has contaminated much ground water. The best way to limit chlorine is to drink and bathe in
              filtered water and avoid lettuce grown in southwestern states in the fall and winter as these crops tend to
              have high levels of perchlorate, even if they are organic. Use real sugar or honey if you can instead of
              Splenda.
            </p>
            <div className={styles.imageStack}>
              <ArticleImage
                image={infertilityIodineImages.chlorinePool}
                alt="Swimming pool with inflatable ring"
                className={styles.sectionImage}
              />
              <ArticleImage
                image={infertilityIodineImages.bromideExtinguisher}
                alt="Fire extinguisher on a tiled wall"
                className={styles.sectionImage}
              />
            </div>

            <h3 className={styles.sectionHeading}>Bromide</h3>
            <p className={styles.bodyText}>
              Bromide is found in fire retardant clothing and mattresses, furniture, computers, cars, baked goods made
              with brominated flour and some beverages. Bromide is not easily avoided but we can reign bromide in by
              avoiding baked goods made with brominated flour and beverages made with brominated vegetable oil.
            </p>
            <p className={styles.bodyText}>
              Once you&apos;ve corralled bromide, chlorine and fluoride, you want to make sure iodine has the spotlight.
              Iodine needs to dance with all the guests (in other words bind to the iodine receptors) as that is the only
              way to undo all the damage caused by her destructive family. The more iodine dances, the less you&apos;ll
              see of her family on the dance floor – which is exactly what we want!
            </p>
            <p className={styles.bodyText}>
              Iodine helps fertility success but there are other must-have guests we need at the party to improve the
              chances of fertility (ie thyroid hormones and reproductive hormones like progesterone, estrogen and
              testosterone). The hormones have an amazing dance routine that leaves other guests speechless when they
              perform in sync. But you have to keep your eye on estrogen because she does like to hog all of the attention
              for herself!
            </p>
            <p className={styles.bodyText}>
              Estrogen has multiple personalities: estrone, estradiol and estriol, and needs the right balance of her
              personalities to dance in sync, which she can only do with the help of iodine. Iodine helps the body
              metabolize estrogen to its safer form, estriol.
            </p>
            <p className={styles.bodyText}>
              When estrogen is metabolized to estrone and estradiol over estriol, it can cause things like fibroids,
              endometriosis, polycystic ovarian syndrome and cancer which is obviously not good for overall health and
              will subsequently make baby-making much more difficult.
            </p>
            <p className={styles.bodyText}>
              Progesterone has a spotlight breakout to perform during the hormone dance, but she tends to be a bit shy and
              prone to stage fright. Iodine helps boost her confidence and give her the Dutch courage to perform.
            </p>
            <p className={styles.bodyText}>
              The thyroid hormones must do their part in the dance too as they are critical for ovulation, and iodine is a
              main component. For an epic baby-creation party, you have to get iodine on the dance floor busting moves with
              everyone.
            </p>
            <ArticleImage
              image={infertilityIodineImages.supplements}
              alt="Yellow supplement capsules"
              className={styles.sectionImage}
            />
            <p className={styles.bodyText}>
              If you&apos;re worried about how iodine deficiency impacts fertility, fortunately, iodine deficiency is
              easily fixable. All you need is a test to determine your level of deficiency and then to take an iodine
              supplement if necessary. The best tests are an iodine urine spot test which is ideal if you aren&apos;t
              currently taking iodine. If you currently take iodine, you&apos;ll need to take a 24-hour iodine loading test
              where you take 50mg of iodine and collect your urine for 24 hours.
            </p>
            <p className={styles.bodyText}>
              I highly recommend working with an iodine-knowledgeable practitioner when supplementing with iodine as there
              are additional nutrients that need to be taken in unison with the iodine to prevent toxicity – and you may
              need support with detoxing.
            </p>
            <p className={styles.bodyText}>
              It is also very important when taking iodine to get plenty of salt in the diet. Even if you don&apos;t take
              iodine, you need adequate salt to make a healthy baby as it helps to detox the bromide. I recommend
              unprocessed sea salt like Real Salt, Celtic Sea Salt or Himalayan salt. While in terms of foods, seaweed and
              seafood are the best dietary sources of iodine. You can also add Maine Coast Kelp Flakes to food to boost
              iodine levels. However, to correct major deficiencies and improve fertility success you will need to take
              supplements.
            </p>
            <ArticleImage
              image={infertilityIodineImages.pregnancyCouple}
              alt="Pregnant person with partner's hands on their belly"
              className={styles.sectionImage}
            />

            <section className={styles.ribbonBox} aria-label="The Ribbon Box">
              <ArticleImage
                image={infertilityIodineImages.ribbonBoxLogo}
                alt="The Ribbon Box"
                className={styles.ribbonLogo}
              />
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

          <div className="mt-[56px] text-center md:mt-[90px]">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={infertilityIodineRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
