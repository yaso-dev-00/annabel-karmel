import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import {
  articlePath,
  helenClintBio,
  helenClintInstagramUrl,
  lookingAfterTeethIntro,
  lookingAfterTeethRelatedArticles,
  lookingAfterTeethSections,
  type LookingAfterTeethSection,
  type TeethTextLink,
} from "@/data/looking-after-childrens-teeth-page";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Looking after your children's teeth | Annabel Karmel",
  description:
    "Ten expert tips on looking after your children's teeth, from toothbrushing and bedtime routines to sugar swaps, dummies, and dental visits.",
};

function isTextLink(part: string | TeethTextLink): part is TeethTextLink {
  return typeof part === "object";
}

function RichParagraph({
  parts,
  className,
}: {
  parts: (string | TeethTextLink)[];
  className: string;
}) {
  return (
    <p className={className}>
      {parts.map((part, index) =>
        isTextLink(part) ? (
          <Link
            key={part.label}
            href={part.href}
            className={styles.inlineLink}
            target={part.href.startsWith("tel:") ? undefined : "_blank"}
            rel={part.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
          >
            {part.label}
          </Link>
        ) : (
          <span key={`text-${index}`}>{part}</span>
        ),
      )}
    </p>
  );
}

function SectionImage({ section }: { section: LookingAfterTeethSection }) {
  const image = (
    <img
      src={section.image}
      alt={section.imageAlt}
      width={1000}
      height={667}
      className={styles.contentImage}
      loading="lazy"
    />
  );

  if (section.imageHref) {
    return (
      <Link href={section.imageHref} className={styles.imageLink} target="_blank" rel="noopener noreferrer">
        {image}
      </Link>
    );
  }

  return image;
}

export default function LookingAfterChildrensTeethPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>{lookingAfterTeethIntro}</p>

          {lookingAfterTeethSections.map((section) => (
            <section key={section.title}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <SectionImage section={section} />
              {(section.paragraphs ?? []).map((paragraph) => (
                <p key={paragraph} className={styles.body}>
                  {paragraph}
                </p>
              ))}
              {section.bodyParts ? (
                <RichParagraph parts={section.bodyParts} className={styles.body} />
              ) : null}
              {section.footnote ? <p className={styles.footnote}>{section.footnote}</p> : null}
              {section.caption ? <p className={styles.caption}>{section.caption}</p> : null}
              {section.nhsNoteParts ? (
                <RichParagraph parts={section.nhsNoteParts} className={styles.nhsNote} />
              ) : null}
            </section>
          ))}

          <div className={styles.authorBlock}>
            <img
              src={`${articlePath}/helen-clint.jpg`}
              alt="Helen Clint"
              width={768}
              height={1024}
              className={styles.authorPhoto}
              loading="lazy"
            />
            <h3 className={styles.authorTitle}>Article written by Helen Clint</h3>
            {helenClintBio.map((paragraph) => (
              <p key={paragraph} className={styles.authorBody}>
                {paragraph}
              </p>
            ))}
            <p className={styles.authorFollow}>
              Follow Helen on Instagram{" "}
              <Link href={helenClintInstagramUrl} className={styles.inlineLink} target="_blank" rel="noopener noreferrer">
                @dentalmummy
              </Link>
            </p>
          </div>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Advice</h2>
            <p className={styles.relatedText}>This is some related post text</p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={lookingAfterTeethRelatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
