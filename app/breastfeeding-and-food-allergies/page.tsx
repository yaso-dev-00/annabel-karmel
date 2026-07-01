import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { breastfeedingAllergiesBooks } from "@/data/breastfeeding-and-food-allergies-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Breastfeeding and food allergies | Nutrition & Allergies | Annabel Karmel",
  description:
    "Professor Adam Fox on the benefits of breastfeeding for allergy prevention, and what to know about your diet when breastfeeding.",
};

const relatedArticles = getRelatedArticles("/breastfeeding-and-food-allergies");

export default function BreastfeedingAndFoodAllergiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.bodyText}>
              Apprehensive about breastfeeding and food allergies? Can breastfeeding your baby help stop allergies in
              their tracks? Consultant Paediatric Allergist{" "}
              <Link href="/allergies-with-professor-adam-fox" className={styles.inlineLink}>
                Professor Adam Fox
              </Link>{" "}
              talks to us about the all-important
              benefits of breastfeeding during those first six months.
            </p>

            <h2 className={styles.sectionHeading}>The benefits of breastfeeding</h2>
            <p className={styles.bodyText}>
              There are a number of reasons to breastfeed and this is widely accepted as the best thing you can do for
              your baby if you are able to. The first milk your breasts produce is called Colostrum, which is rich in
              antibodies and can help protect against the bacteria and viruses encountered outside the womb. At birth, a
              baby&apos;s immune system is still immature and not developed fully so Colostrum helps to provide a barrier
              inside your baby&apos;s intestine to protect it. Babies also depend heavily on antibodies obtained from their
              mothers while in the womb and their digestive systems are not quite ready for substances other than their
              mothers&apos; milk.
            </p>
            <p className={styles.bodyText}>
              Breastfeeding can also help to reduce the risk of allergies as breastfed babies are exposed to fewer
              allergens in the first months of life as they are only experiencing the foods their mother eats, available
              via her milk.
            </p>
            <p className={styles.bodyText}>
              The incidence of cow&apos;s milk allergies appears to be higher in babies who are fed formula milk based on
              cow&apos;s milk or soya instead of breast milk. Every family is different but those with a history of food
              allergy, hay fever, eczema or asthma, are at higher risk and should try to exclusively breastfeed for the
              first six months.
            </p>

            <h2 className={styles.sectionHeading}>Your diet when breastfeeding</h2>
            <p className={styles.bodyText}>
              Although it has hugely important nutritional benefits, exclusively breastfeeding does not mean that your
              child will have no risk of developing allergies. Babies can develop allergies to during the early part of
              infancy and the baby having eczema seems to increase this risk significantly. If one or both parents have
              allergies, it makes it more likely that your baby will too.
            </p>
            <p className={styles.bodyText}>
              If your baby is allergic to certain foods such as soy, milk, wheat or egg, these may pass from your diet
              into the breastmilk and cause symptoms in the baby. If your baby has an allergy to a certain food, it might
              not always present an immediate or obvious reaction and there can instead be a more delayed reaction, such as
              eczema worsening or tummy symptoms such as reflux, colic or diarrhoea, for example. Some breastfeeding
              mothers will notice an obvious difference in their baby&apos;s behaviour and/or health when they eat certain
              foods making it more clear that your baby is showing allergic tendencies. Cow&apos;s milk is the most{" "}
              <span className={styles.emphasis}>common</span> problem food but some babies will react to other foods.
            </p>
            <p className={styles.bodyText}>
              The good news is that there isn&apos;t a list of &lsquo;high risk&rsquo; foods to avoid if you are
              breastfeeding. There is no evidence that avoiding specific foods during either pregnancy or breastfeeding has
              any effect on the chance of your baby having food allergies so there is no need to exclude anything.
              Previous advice to avoid peanuts was withdrawn in 2009. If you are concerned your baby may be reacting to
              something you are eating, then it would be worth discussing this with your GP or health visitor before
              removing it from your diet. Any changes in diet or food restrictions are only recommended for breastfed
              babies who have developed symptoms.
            </p>
          </div>

          <ArticleRecipeCarousel
            items={breastfeedingAllergiesBooks}
            className="mt-[50px] md:mt-[70px]"
            perDesktopView={4}
            loop
          />

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
