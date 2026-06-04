import { ArticleRecipeCarousel } from "@/components/article-recipe-carousel";
import { FallbackImage } from "@/components/fallback-image";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { eczemaAllergiesBooks } from "@/data/is-eczema-linked-to-food-allergies-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Is eczema linked to food allergies? | Nutrition & Allergies | Annabel Karmel",
  description:
    "Eczema and food allergies — symptoms, triggers, treatments including emollients, corticosteroids and wet wraps, plus Allergy UK support.",
};

const articlePath = "/articles/is-eczema-linked-to-food-allergies";
const relatedArticles = getRelatedArticles("/is-eczema-linked-to-food-allergies");

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  allergies: "/articles/breastfeeding-and-food-allergies/hero.jpg",
} as const;

export default function IsEczemaLinkedToFoodAllergiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto overflow-hidden">
            <p className={styles.bodyText}>
              Many parents want to know is eczema linked to food allergies?
            </p>
            <p className={styles.bodyText}>
              Eczema, also known as &lsquo;atopic eczema&rsquo; or &lsquo;atopic dermatitis&rsquo;, is a skin condition
              causing inflammation and intense irritation. Eczema symptoms tend to be caused by dry skin. Scratching is
              hard to avoid since the main distressing symptom of eczema is unbearable itching but once the skin gets
              broken and cracked, infections can set in, causing even more discomfort.
            </p>
            <p className={styles.bodyText}>
              This skin condition can affect any age range and it is thought to be caused by a defect in the skin barrier
              that makes it more susceptible to inflammation and allows allergens and bacteria to make contact with the
              immune system. Eczema can affect quality of life significantly and may also affect sleep patterns. Whilst
              this can make you irritable and frustrated, good management can help alleviate these problems. This skin
              condition is well understood and dermatologists (skin doctors) have developed effective skin treatment
              regimens to control and manage the symptoms. It can take some time to find the most suitable therapy for
              each individual, often causing embarrassment and daily frustration with the symptoms in the meantime. Many
              people do not understand that eczema is neither infectious nor contagious.
            </p>
            <p className={styles.bodyText}>
              Generally, GPs can diagnose eczema and differentiate whether it is eczema or another skin condition.
              Seasons of the year (for example, in winter), or even emotional responses (such as stress), may cause
              eczema to worsen. However, a large number of eczema sufferers are not able to link a cause to their
              symptoms. It is essential that any known triggers are avoided and sometimes keeping a &lsquo;trigger
              symptom&rsquo; diary at home may help you to realise what might be causing flares.
            </p>

            <h2 className={styles.sectionHeading}>Treatments</h2>
            <p className={styles.bodyText}>
              Eczema can be treated in a number of ways, emollients, wet wraps, topical steroid creams and calcineurin
              inhibitors can all be used.
            </p>

            <h3 className={styles.subHeading}>Emollient Lotions</h3>
            <p className={styles.bodyText}>
              Emollient lotions and creams are prescribed for eczema and dry skin, and are, in their simplest form,
              mixtures of oil and water. Some emollients may also contain slight amounts of antibacterial chemicals (to
              avoid infection in broken skin), or steroids (to reduce inflammation). Emollient products range in their
              consistency, from being runny lotions to thick creams, and while they can be a very cooling and soothing
              treatment for eczema, the stickiness of the thicker products can sometimes make them a source of annoyance.
              It is important to find a product that is suitable for you.
            </p>

            <section className="overflow-hidden">
              <h3 className={styles.subHeading}>Corticosteroids</h3>
              <FallbackImage
                src={`${articlePath}/eczema-diagram.jpg`}
                fallbackSrc={`${articlePath}/eczema-diagram.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Typical localization of eczema on the skin of the child"
                className={styles.floatImageRight}
              />
              <p className={styles.bodyText}>
                It is sometimes necessary to apply topical corticosteroids (e.g. hydrocortisone), as these reduce
                inflammation in the skin. Many people worry when steroids are mentioned as a treatment option because of
                stories they may have heard in the media, particularly related to anabolic steroid abuse in sports. These,
                however, are not the same steroids that are used as medical treatments and, when used as directed by a
                physician, steroids have an important role to play in treating a range of ailments, including eczema.
                Topical steroids are safe to use but it is important to always follow the instructions provided, making
                sure you understand which areas you apply the cream to and exactly how much. If you have any questions,
                then ask your doctor or nurse for further advice and information.
              </p>
            </section>

            <h3 className={styles.subHeading}>Wet Wraps</h3>
            <p className={styles.bodyText}>
              Sometimes, special pyjama-like garments (known as &lsquo;wet wraps&rsquo;) that are used for children, may
              also help certain areas of the body that have not responded to the usual topical application of emollients
              and steroids. Wet wraps can also be useful if you suffer from itch at night and cannot sleep, allowing you
              to have a better quality of sleep during times when the eczema is particularly bad. There are various ways
              of applying these garments and your nurse or doctor will be able to demonstrate the best way of application.
            </p>

            <p className={`${styles.bodyText} ${styles.helplineText}`}>
              If you would like further information on managing eczema symptoms call the Allergy UK Helpline on{" "}
              <a href="tel:01322619898" className={styles.inlineLink}>
                01322 619 898
              </a>
              , we are open Monday – Friday, 9am – 5pm or go to{" "}
              <a
                href="https://www.allergyuk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                www.allergyuk.org
              </a>
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
