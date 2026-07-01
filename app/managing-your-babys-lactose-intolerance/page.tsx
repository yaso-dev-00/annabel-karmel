import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { FallbackImage } from "@/components/UiPrimitives/FallbackImage";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { lactoseIntoleranceBooks } from "@/data/managing-your-babys-lactose-intolerance-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Lactose Intolerance | Nutrition & Allergies | Annabel Karmel",
  description:
    "Managing your baby's lactose intolerance — symptoms, breastfeeding, lactose-free formula, weaning, and when babies grow out of it.",
};

const articlePath = "/articles/managing-your-babys-lactose-intolerance";
const relatedArticles = getRelatedArticles("/managing-your-babys-lactose-intolerance");

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  allergies: "/articles/cows-milk-allergy/hero.jpg",
} as const;

export default function ManagingYourBabysLactoseIntolerancePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              Lactose intolerance is when the digestive enzyme lactase is missing and so the carbohydrate or sugar in
              milk called lactose can&apos;t be digested. Primary lactose intolerance stays with your baby for life and is
              a genetic deficiency, but this is very rare in the Western world and is more often seen in Asia. More
              commonly, secondary lactose intolerance sometimes occurs after a nasty tummy bug, but your baby will tend to
              recover within about 6 weeks. There is also a type of lactose intolerance that we see in very young babies
              with colic. This usually lasts around 2 – 4 months or so.
            </p>

            <section>
              <h2 className={styles.sectionHeading}>What is lactose?</h2>
              <FallbackImage
                src={`${articlePath}/what-is-lactose.jpg`}
                fallbackSrc={`${articlePath}/what-is-lactose.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Baby bottle with formula and milk"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                Lactose is the name given to the natural carbohydrate or sugar found in milk. It&apos;s present in both
                breast milk and most infant formulas.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>What are the symptoms of lactose intolerance?</h2>
              <FallbackImage
                src={`${articlePath}/symptoms.jpg`}
                fallbackSrc={`${articlePath}/symptoms.jpg`}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Mother comforting baby with bottle"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                The symptoms of lactose intolerance will always involve your baby&apos;s digestive system and can include
                your little one experiencing diarrhoea, wind, bloating and sometimes nappy rash. Lactose intolerant babies
                often cry a lot and are uncomfortable which is why it&apos;s sometimes linked with colic. It&apos;s important
                to note that if your baby has mucus or blood in their poo too then it&apos;s not a lactose intolerance and you
                should see your GP.
              </p>
              <p className={styles.bodyText}>
                Lactose intolerance is diagnosed by a doctor taking a detailed history and testing your baby&apos;s poo for
                acid. Hydrogen breath tests that measure the amount of hydrogen your baby breathes out can also be done but
                it can be quite difficult to get young babies to do this effectively, so this test tends to be reserved for
                older children and adults.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>Can I still breastfeed?</h2>
              <FallbackImage
                src={`${articlePath}/breastfeeding.jpg`}
                fallbackSrc={`${articlePath}/breastfeeding.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Mother breastfeeding her baby"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                Breastmilk is very high in lactose but interestingly lactose intolerance is rare in breastfed babies.
                Cutting lactose out of your own diet won&apos;t make a difference as your digestive system absorbs this
                completely before breast milk is produced.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>Which infant formula will I need?</h2>
              <FallbackImage
                src={`${articlePath}/infant-formula.jpg`}
                fallbackSrc={`${articlePath}/infant-formula.jpg`}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Infant formula and baby bottle"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                Lactose free formula is available which taste very similar to a standard formula, just ever so slightly
                sweeter. There are two brands available to choose from – Aptamil Lactose-Free and SMA LF Lactose-Free which
                can both be bought from chemists and supermarkets.
              </p>
              <p className={styles.bodyText}>
                Lactose-free infant formula still contains cow&apos;s milk protein and therefore is unsuitable if you suspect
                your baby has a{" "}
                <Link href="/cows-milk-allergy" className={styles.inlineLink}>
                  milk allergy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>Weaning and lactose intolerance</h2>
              <FallbackImage
                src={`${articlePath}/weaning.jpg`}
                fallbackSrc={`${articlePath}/weaning.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Baby eating broccoli during weaning"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                At the start of weaning, you don&apos;t need to do anything differently. The usual vegetables and fruits are
                perfect for weaning a baby with lactose intolerance. As time goes on (and provided your baby is over 6
                months) progress to adding in starchy carbohydrate foods such as bread, rice, pasta, cereals and grains and
                proteins such as eggs, meat, fish, beans, lentils and other pulses, so that your baby has a varied diet
                consisting of three meals a day by 6 ½ – 7 months of age.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>How strict do I need to be?</h2>
              <FallbackImage
                src={`${articlePath}/how-strict.jpg`}
                fallbackSrc={`${articlePath}/how-strict.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Cheese sauce and dairy foods for babies with lactose intolerance"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                You only need to avoid food high in lactose which is found in milk and foods made from milk like custard or
                ice cream. Hard cheeses, butter and yoghurt are milk products that are naturally low in lactose and are often
                well tolerated by babies who have lactose intolerance. Softer cheeses such as feta, mozzarella and spreadable
                cheeses contain a little more lactose but it is still relatively low.
              </p>
              <p className={styles.bodyText}>
                You may also find that your baby can tolerate a certain amount of lactose-containing foods but has a
                threshold that they can&apos;t exceed before their symptoms return.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>What about plant-based milks?</h2>
              <FallbackImage
                src={`${articlePath}/plant-based-milks.jpg`}
                fallbackSrc={`${articlePath}/plant-based-milks.jpg`}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Plant-based milk bottles with almonds and seeds"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                Shop bought plant-based milks such as almond milk, oat milk and hemp milk can be used in cooking but are a
                poor source of nutrition and so shouldn&apos;t replace breastmilk or formula. If you do use these then look for
                ones enriched with added calcium.
              </p>
              <p className={styles.bodyText}>
                Rice milk is not suitable for children under 5 due to the naturally occurring high levels of inorganic
                arsenic.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>Will my baby get enough nutrition?</h2>
              <FallbackImage
                src={`${articlePath}/nutrition.jpg`}
                fallbackSrc={`${articlePath}/nutrition.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Baby food purees in colourful cups"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                Yes, provided you still offer low lactose dairy foods and lactose-free infant formula. If you find that you
                are having to cut out other food groups seek the help of a dietitian. Your health visitor or GP can refer you
                to an NHS one or you can find a private practice one{" "}
                <a
                  href="https://freelancedietitians.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inlineLink}
                >
                  here
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>Will my baby grow out of their lactose intolerance?</h2>
              <FallbackImage
                src={`${articlePath}/grow-out.jpg`}
                fallbackSrc={`${articlePath}/grow-out.jpg`}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Mother feeding baby in high chair"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                It&apos;s very likely yes and most likely it will be gone by 7-9 months of age. It&apos;s easy to test by
                reintroducing a small amount of milk into their diet and seeing if their diarrhoea, wind and bloating
                returns. It&apos;s quite safe to do this at home. If the symptoms do come back then go back to following a
                lactose-free diet and try again in a month or so. If your baby is still lactose intolerant by her first
                birthday, do seek the advice of a registered dietitian.
              </p>
            </section>

            <p className={styles.footerBlock}>
              <strong>
                For more information, consultations and advice you can contact Sarah via her website at{" "}
                <a
                  href="http://www.childrensnutrition.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inlineLink}
                >
                  childrensnutrition.co.uk
                </a>
              </strong>
            </p>

            <p className={styles.footerBlock}>
              <strong>
                Further Reading – See related articles on{" "}
                <Link href="/most-common-food-allergies-in-babies" className={styles.inlineLink}>
                  Food Allergies in babies
                </Link>
              </strong>
            </p>
          </div>

       

          <div className="mt-[90px] text-center md:mt-[90px]">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
