import { ArticleRecipeCarousel } from "@/components/SharedCarousels/ArticleRecipeCarousel";
import { FallbackImage } from "@/components/UiPrimitives/FallbackImage";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { travellingAllergiesBooks } from "@/data/travelling-with-children-with-food-allergies-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Travelling with Children with Food Allergies | Nutrition | Annabel Karmel",
  description:
    "Allergy UK's Holly Shaw shares tips for travelling abroad with children who have food allergies — planning, medication, and eating out safely.",
};

const articlePath = "/articles/travelling-with-children-with-food-allergies";
const relatedArticles = getRelatedArticles("/travelling-with-children-with-food-allergies");

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  allergies: "/articles/cows-milk-allergy/hero.jpg",
} as const;

export default function TravellingWithChildrenWithFoodAllergiesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto">
            <p className={styles.leadText}>
              Travelling abroad to a holiday destination can be stressful for a family if a child has an allergy. Allergy
              UK&apos;s Holly Shaw says that forward planning will help reduce the stress of travelling with children with
              food allergies.
            </p>
            <p className={styles.bodyText}>
              Some careful thought and forward planning can help to reduce anxiety for both you and your child and help
              ensure that your holiday is enjoyable. The details and level of planning will depend on your child and their
              allergy and there will be other factors to consider including multiple allergies, the mode of transport, the
              destination and the duration of both the journey and the holiday.
            </p>
            <p className={styles.bodyText}>
              If your child has a food allergy it is a good idea to inform your holiday provider(s) at the time of enquiry
              and before booking. This will give you an opportunity to ask questions on suitability of location, ability to
              accommodate dietary requirements, proximity to medical help etc. – all the things you need to know in
              advance.
            </p>

            <section>
              <h2 className={styles.sectionHeading}>Be Prepared</h2>
              <FallbackImage
                src={`${articlePath}/be-prepared.jpg`}
                fallbackSrc={`${articlePath}/be-prepared.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Be prepared when travelling with children with food allergies"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                Some children have co-existing allergic conditions, for example asthma and a food allergy, which may
                require multiple medications. Remember to review medication supplies well in advance as you may need to
                see a GP or Pharmacist for additional supplies. Anticipate some &lsquo;what if&rsquo;s&rsquo;, for example,
                luggage going missing or the need to use a frequent or higher dose of medication, such as antihistamines
                or asthma inhalers, during the holiday. Planning how much medication to take and how to carry will be an
                important part of your holiday risk minimisation plan.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>Check Meds</h2>
              <FallbackImage
                src={`${articlePath}/check-meds.jpg`}
                fallbackSrc={`${articlePath}/check-meds.jpg`}
                finalFallbackSrc={imageFallbacks.allergies}
                alt="Check medications before travelling with children with food allergies"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                Before your holiday check medications to make sure that they are all in date and check devices for asthma
                (spacers/asthma inhalers) to make sure they are in good working order. It&apos;s a good idea to keep
                medication in its original packing so it is clearly identifiable to others and the product and dosage
                information can be referred to easily.
              </p>
              <p className={styles.bodyText}>
                It is really important to make sure that allergy medication is accessible at all times during the holiday
                journey, particularly if the journey involves various stages. Have a designated place that is communicated
                to all family members and carry medication, including adrenaline auto injectors, in your hand luggage so
                that it is easily accessible in flight (don&apos;t store it in the overhead locker). And remember that the
                luggage hold of an aircraft is not a suitable place for medication. Medication and devices can be damaged
                if not handled carefully, and should not be exposed to extreme temperatures.
              </p>
              <p className={styles.bodyText}>
                If your child has been prescribed an adrenaline auto injector, for example an Epi-Pen or other device
                containing the emergency medicine adrenaline, it is a good idea to take a copy of his or her Allergy Action
                Plan which provides a clear set of written instructions on their individual allergy, the signs and symptoms
                of an allergic reaction and the medication required. An Allergy Action Plan should always have been
                completed by a GP or allergy specialist when an adrenaline auto injector is prescribed.
              </p>
            </section>

            <section>
              <h2 className={styles.sectionHeading}>Eating Out on Holiday</h2>
              <FallbackImage
                src={`${articlePath}/eating-out.jpg`}
                fallbackSrc={`${articlePath}/eating-out.jpg`}
                finalFallbackSrc={imageFallbacks.hero}
                alt="Eating out on holiday with children with food allergies"
                className={styles.sectionImage}
              />
              <p className={styles.bodyText}>
                This can cause real anxiety. But here are some simple strategies that can help to ensure that this is a safe
                and enjoyable part of a holiday.
              </p>
              <ul className={styles.bulletList}>
                <li>
                  Communicate clearly your child&apos;s food allergy and check with the food provider that they are able to
                  accommodate this
                </li>
                <li>
                  Make sure that your child&apos;s allergy is communicated not only to the service staff but also to the
                  person preparing or cooking the food
                </li>
                <li>
                  A very useful tool in non-English speaking countries is a translation card (easy to carry, credit card
                  size) that translates the food(s) to which your child is allergic into the local language so that you can
                  communicate these to restaurant waiting staff.
                </li>
                <li>
                  Allergy UK provides translation cards in over 30 languages, covering 70 allergens. Details are on the
                  website at{" "}
                  <a
                    href="https://www.allergyuk.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLink}
                  >
                    allergyuk.org
                  </a>
                  . For advice on travelling with an infant requiring specialist formula feeds because of cow&apos;s milk
                  allergy, see Allergy UK&apos;s Factsheet on Travelling with an allergic infant. Visit{" "}
                  <a
                    href="https://www.allergyuk.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLink}
                  >
                    allergyuk.org
                  </a>{" "}
                  or call the Helpline on{" "}
                  <a href="tel:01322619898" className={styles.inlineLink}>
                    01322 619898
                  </a>
                </li>
              </ul>
            </section>
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
