import { ArticleRecipeCarousel } from "@/components/article-recipe-carousel";
import { FallbackImage } from "@/components/fallback-image";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allergiesFindingSupportBooks } from "@/data/allergies-finding-support-page";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Allergies: finding support | Nutrition & Allergies | Annabel Karmel",
  description:
    "Finding support for your child's food allergies — Allergy UK helpline, factsheets, GP support, and allergy management plans.",
};

const articlePath = "/articles/allergies-finding-support";
const relatedArticles = getRelatedArticles("/allergies-finding-support");

const imageFallbacks = {
  hero: `${articlePath}/hero.jpg`,
  managing: "/articles/managing-my-childs-food-allergy/shopping.jpg",
} as const;

export default function AllergiesFindingSupportPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <div className="mx-auto overflow-hidden">
            <p className={styles.bodyText}>
              Finding support for your child or for yourself can be quite challenging but there is support out there for
              the allergic community, including the services available from Allergy UK. It offers a dedicated Helpline
              with staff knowledgeable across the breadth of allergy and free downloadable factsheets from its website (
              <a
                href="https://www.allergyuk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                www.allergyuk.org
              </a>
              ) where you can find all the information you need.
            </p>
            <p className={styles.bodyText}>
              It is also important to get support from your GP practice to ensure you or your child feel confident and
              in control. Your GP will be the first person you need to go to, to ensure that the next steps you take,
              once a diagnosis has been made, are the right steps for you.
            </p>

            <section className="overflow-hidden">
              <h2 className={styles.sectionHeading}>Supporting your Child&apos;s Food Allergy</h2>
              <FallbackImage
                src={`${articlePath}/managing-allergy.jpg`}
                fallbackSrc={`${articlePath}/managing-allergy.jpg`}
                finalFallbackSrc={imageFallbacks.managing}
                alt="Managing your child's allergy"
                className={styles.floatImageRight}
              />
              <p className={styles.bodyText}>
                At the centre of the team managing your child&apos;s allergy are you and your child. Your roles are vital
                in not only keeping up treatments, but also keeping track of how well symptoms are being controlled.
                Thinking ahead, and taking responsibility with your child for managing their allergies, will improve a
                child&apos;s quality of life and also help them develop coping mechanisms and find ways of minimising
                symptoms.
              </p>
              <p className={styles.bodyText}>
                While you and your child are in charge of maintaining treatments and managing your child&apos;s allergy,
                this does not mean that you are on your own in dealing with your child&apos;s health needs. We now
                understand much more about allergy, and once referred and diagnosed you can get access to many people
                within the Healthcare profession to help and support you. Sometimes you may need to bring to your
                doctor&apos;s attention additional concerns that you have, or request to see additional specialists.
              </p>
              <p className={styles.bodyText}>
                People outside of the Healthcare profession are often eager to offer support and help when they know a
                child is suffering from a medical condition. Sometimes though, this means providing them with enough
                information so that they understand the difficulties and problems that these diseases cause. There may
                be many different people involved in your child&apos;s life, who might need more information about
                allergy and how to help if your child has an allergic reaction. They may be a relative, childminder,
                teacher, school nurse, friend, dinner lady or even a bus escort, in fact, anyone who is responsible for
                your child&apos;s care at any time during the day.
              </p>
            </section>

            <h3 className={styles.subHeading}>Allergy UK Helpline</h3>
            <p className={styles.bodyText}>
              This is where Allergy UK can help; by contacting our{" "}
              <Link href="https://www.allergyuk.org/get-help" className={styles.inlineLink}>
                Helpline
              </Link>
              , we can advise you on providing the right information so that they know how to help your child. It may be
              that one or more of these people needs to administer medication or help your child avoid the problem
              allergen(s). Allergy UK has a number of leaflets and Factsheets available with details about specific
              allergies and other useful information which you can give to others to help explain about your child&apos;s
              condition.
            </p>
            <p className={styles.bodyText}>
              It is vital that your child knows who to tell if they feel unwell and if they think they may be having an
              allergic reaction, but it is just as important that the person they tell knows what to do. It is therefore
              useful to have an <span className={styles.boldPhrase}>Allergy Management Plan</span> for your child that
              can be left with anyone caring for them so that they can refer to it if your child has an allergic reaction.
            </p>

            <p className={`${styles.bodyText} ${styles.helplineText}`}>
              If you think you need advice on who to turn to if you suspect you or your child is suffering from an allergy,
              please contact the Allergy UK Helpline on{" "}
              <a href="tel:01322619898" className={styles.inlineLink}>
                01322 619898
              </a>
              , Monday – Friday, 9am – 5pm or visit the Allergy UK website{" "}
              <a
                href="https://www.allergyuk.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                www.allergyuk.org
              </a>{" "}
              and use our &lsquo;live chat&rsquo; feature.
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
