import Image from "next/image";
import Link from "next/link";

import { aboutAnnabelKarmelPage } from "@/data/about-annabel-karmel-page";
import styles from "./about-annabel-karmel-page.module.css";

type BodyBlock =
  | { type: "text"; text: string }
  | { type: "html"; html: string };

type Section = (typeof aboutAnnabelKarmelPage.sections)[number];

function SectionAwards({ awards }: { awards: string[] }) {
  return (
    <div className={styles.awards}>
      {awards.map((src) => (
        <img key={src} src={src} alt="" className={styles.awardLogo} />
      ))}
    </div>
  );
}

function BodyBlocks({ blocks }: { blocks: BodyBlock[] }) {
  return (
    <>
      {blocks.map((block, index) =>
        block.type === "html" ? (
          <p
            key={index}
            className={styles.sectionBody}
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        ) : (
          <p key={index} className={styles.sectionBody}>
            {block.text}
          </p>
        ),
      )}
    </>
  );
}

function FeatureImage({
  src,
  alt,
  href,
  cover = false,
}: {
  src: string;
  alt: string;
  href?: string;
  cover?: boolean;
}) {
  const image = cover ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      className={styles.featureImageCover}
    />
  ) : (
    <Image src={src} alt={alt} width={1024} height={1024} className={styles.featureImage} />
  );

  if (!href) {
    return <div className={styles.featureImageWrap}>{image}</div>;
  }

  return (
    <div className={styles.featureImageWrap}>
      <Link href={href} className={styles.featureImageLink}>
        {image}
      </Link>
    </div>
  );
}

function SplitTealSection({ section }: { section: Section }) {
  if (section.layout !== "split-teal") return null;

  const blocks: BodyBlock[] = section.body.map((item) =>
    typeof item === "string" ? { type: "text", text: item } : item,
  );

  return (
    <section
      className={`${styles.splitSection} ${styles.splitTeal} ${
        section.reverseMobile ? styles.splitReverseMobile : ""
      }`}
    >
      <div className={styles.splitInner}>
        <div className={styles.splitCopy}>
          <h2 className={styles.sectionHeading}>{section.heading}</h2>
          <BodyBlocks blocks={blocks} />
          {section.awards ? <SectionAwards awards={section.awards} /> : null}
          {section.cta ? (
            <Link href={section.cta.href} className={styles.ctaTeal}>
              {section.cta.label}
            </Link>
          ) : null}
          {section.ctas ? (
            <div className={styles.ctaStack}>
              {section.ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={`${styles.ctaTeal} ${styles.ctaTealSentence}`}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.splitMedia}>
          <FeatureImage
            src={section.image!}
            alt={section.imageAlt ?? ""}
            href={section.imageHref}
            cover
          />
        </div>
      </div>
    </section>
  );
}

function SplitAppSection({ section }: { section: Section }) {
  if (section.layout !== "split-app") return null;

  const blocks: BodyBlock[] = section.body.map((text) => ({ type: "text", text }));

  return (
    <section className={`${styles.splitSection} ${styles.splitApp}`}>
      <div className={styles.splitInner}>
        <div className={`${styles.splitMedia} ${styles.splitAppMedia}`}>
          <FeatureImage
            src={section.image!}
            alt={section.imageAlt ?? ""}
            href={section.imageHref}
            cover
          />
        </div>
        <div className={`${styles.splitCopy} ${styles.splitAppCopy}`}>
          <h2 className={styles.sectionHeading}>{section.heading}</h2>
          <BodyBlocks blocks={blocks} />
          {section.awards ? <SectionAwards awards={section.awards} /> : null}
          {section.cta ? (
            <Link href={section.cta.href} className={styles.ctaTeal}>
              {section.cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CenteredSection({ section }: { section: Section }) {
  if (section.layout !== "centered") return null;

  return (
    <section className={styles.centeredSection}>
      <div className={styles.centeredInner}>
        <h2 className={styles.sectionHeading}>{section.heading}</h2>
        {section.body.map((paragraph) => (
          <p key={paragraph} className={styles.sectionBody}>
            {paragraph}
          </p>
        ))}
        {section.cta ? (
          <Link href={section.cta.href} className={styles.ctaGrey}>
            {section.cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function PartnershipsSection({ section }: { section: Section }) {
  if (section.layout !== "partnerships") return null;

  return (
    <section className={styles.partnershipsSection}>
      <div className={styles.partnershipsInner}>
        <h2 className={styles.sectionHeading}>{section.heading}</h2>
        {section.mobileImage ? (
          <img src={section.mobileImage} alt="" className={styles.partnershipMobileImage} />
        ) : null}
        <div className={styles.partnershipGrid}>
          {section.images?.map((src) => (
            <img key={src} src={src} alt="" className={styles.partnershipImage} />
          ))}
        </div>
        {section.body.map((paragraph) => (
          <p key={paragraph} className={styles.sectionBody}>
            {paragraph}
          </p>
        ))}
        {section.cta ? (
          <Link href={section.cta.href} className={styles.ctaGrey}>
            {section.cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function AboutSection({ section }: { section: Section }) {
  switch (section.layout) {
    case "split-teal":
      return <SplitTealSection section={section} />;
    case "split-app":
      return <SplitAppSection section={section} />;
    case "centered":
      return <CenteredSection section={section} />;
    case "partnerships":
      return <PartnershipsSection section={section} />;
    default:
      return null;
  }
}

export function AboutAnnabelKarmelPageContent() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroShell}>
          <h1 className={styles.heroHeading}>{aboutAnnabelKarmelPage.heroHeading}</h1>
          <Image
            src={aboutAnnabelKarmelPage.heroImage}
            alt="Annabel Karmel"
            width={1536}
            height={1016}
            priority
            className={styles.heroImage}
          />
          {aboutAnnabelKarmelPage.intro.map((paragraph) => (
            <p key={paragraph} className={styles.introBody}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <div className={styles.sections}>
        {aboutAnnabelKarmelPage.sections.map((section) => (
          <AboutSection key={section.id} section={section} />
        ))}
      </div>

      <section className={styles.partnerLogosSection}>
        <div className={styles.partnerLogosShell}>
          <img
            src={aboutAnnabelKarmelPage.partnerLogosImage}
            alt="Annabel Karmel brand partners"
            className={styles.partnerLogosImage}
          />
        </div>
      </section>
    </main>
  );
}
