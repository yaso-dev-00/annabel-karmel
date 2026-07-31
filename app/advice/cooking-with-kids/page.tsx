import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import {
  bookPromo,
  cookingWithKidsIntro,
  cookingWithKidsLead,
  cookingWithKidsRelatedArticles,
  cookingWithKidsSections,
  foodSchoolParagraphs,
  type CookingSection,
  type CookingTextLink,
} from '@/data/cooking-with-kids-page';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

function isTextLink(part: string | CookingTextLink): part is CookingTextLink {
  return typeof part === 'object';
}

function SectionBody({ section }: { section: CookingSection }) {
  if (section.bodyParts) {
    return (
      <p className={styles.body}>
        {section.bodyParts.map((part, index) =>
          isTextLink(part) ? (
            <Link
              key={part.label}
              href={part.href}
              className={styles.inlineLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part.label}
            </Link>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </p>
    );
  }
  return (
    <>
      {(section.paragraphs ?? []).map((paragraph) => (
        <p key={paragraph} className={styles.body}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

export const metadata: Metadata = {
  title: "Cooking with Kids | What's cooking kids? | Annabel Karmel",
  description:
    "From the most eager of eaters to the faddiest of little foodies, children of all ages can benefit from cooking in the kitchen. Discover Annabel's top tips for cooking with kids.",
};

export default function CookingWithKidsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px]">
          <p className={styles.lead}>{cookingWithKidsLead}</p>

          {cookingWithKidsIntro.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}

          {cookingWithKidsSections.map((section) => (
            <section key={section.title}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <img
                src={section.image}
                alt={section.imageAlt}
                width={1000}
                height={667}
                className={styles.contentImage}
                loading="lazy"
              />
              {/* <p className={styles.imageCaption}>{section.imageCaption}</p> */}
              <SectionBody section={section} />
            </section>
          ))}

          <section>
            <h2 className={styles.sectionTitle}>Food school</h2>
            {foodSchoolParagraphs.map((paragraph) => (
              <p key={paragraph} className={`${styles.body} mt-[20px]!`}>
                {paragraph}
              </p>
            ))}
          </section>

          <div className={styles.bookPromo}>
            <img
              src={bookPromo.image}
              alt={bookPromo.imageAlt}
              width={480}
              height={600}
              className={styles.bookCover}
              loading="lazy"
            />
            <div className={styles.bookText}>
              {bookPromo.paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.bookBody}>
                  {index === 0 ? (
                    <>
                      {"Annabel's brand new "}
                      <Link
                        href={bookPromo.bookHref}
                        className={styles.bookLink}
                      >
                        <strong>{bookPromo.bookTitle}</strong>
                      </Link>
                      {
                        ' is packed full of advice, top tips and over 100 simple and delicious recipes which the whole family can enjoy together – from 15 minute meals to healthy fast food favourites, cooking with the kids, lunchbox snacks and more.'
                      }
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={cookingWithKidsRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
