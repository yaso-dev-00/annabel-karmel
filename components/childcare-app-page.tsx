import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { ChildcareExpertCarousel, ChildcareRecipeCarousel } from "@/components/childcare-app-carousels";
import { EmpowerFormSelect } from "@/components/empower-form-select";
import { InstagramShareSection } from "@/components/instagram-share-section";
import {
  MarketingArrowIcon,
  MarketingCheckIcon,
  MarketingCtaButton,
  MarketingWaveDivider,
} from "@/components/marketing/marketing-primitives";
import {
  childcareAssets,
  childcareAwards,
  childcareCompanySizeOptions,
  childcareEssentialTools,
  childcareForm,
  childcareFormHelpOptions,
  childcareHero,
  childcareHowItWorksSteps,
  childcareProfessionals,
  childcareQuote,
  childcareRecipeHighlights,
  childcareStats,
  childcareWeaning,
} from "@/data/childcare-app-page";
import { childcareImageSizes } from "@/data/childcare-image-sizes";
import styles from "./childcare-app-page.module.css";

function FillImage({
  src,
  alt,
  wrapperClassName,
  imageClassName,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  wrapperClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={wrapperClassName} aria-hidden={alt === "" ? true : undefined}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imageClassName}
        draggable={false}
      />
    </div>
  );
}

function SplitSection({
  title,
  body,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  cta,
  children,
  contentClassName = "",
  imageClassName = "",
  imageSizes,
}: {
  title: string;
  body?: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
  cta?: ReactNode;
  children?: ReactNode;
  contentClassName?: string;
  imageClassName?: string;
  imageSizes?: string;
}) {
  return (
    <section className={styles.splitSection}>
      <div className={`${styles.sectionShell} ${reverse ? styles.splitGridReverse : ""} ${styles.splitGrid}`}>
        <div className={styles.splitMedia}>
          <Image
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes={imageSizes ?? childcareImageSizes.splitColumn}
            className={`${styles.splitMediaImage} ${imageClassName}`}
          />
        </div>
        <div className={`${styles.splitContent} ${contentClassName}`}>
          <h2 className={styles.splitHeading}>{title}</h2>
          {body ? <p className={styles.body18}>{body}</p> : null}
          {children}
          {cta}
        </div>
      </div>
    </section>
  );
}

export function ChildcareAppPageContent() {
  const formStyle = {
    "--form-bg": `url(${childcareAssets.formBg})`,
  } as CSSProperties;

  const oneStopStyle = {
    "--one-stop-wave-bg": `url(${childcareAssets.oneStopWaveBg})`,
  } as CSSProperties;

  const weaningStyle = {
    "--weaning-frame-bg": `url(${childcareAssets.weaningFrameBg})`,
  } as CSSProperties;

  const quoteStyle = {
    "--quote-vector-bg": `url(${childcareAssets.quoteVectorBg})`,
  } as CSSProperties;

  return (
    <main className={styles.page}>
      <section className={styles.heroShell} aria-labelledby="childcare-hero-heading">
        <div className={`${styles.sectionShell} px-0 md:px-5 ${styles.heroCard}`}>
          <FillImage
            src={childcareAssets.heroDesktop}
            alt=""
            wrapperClassName={styles.heroDesktopImage}
            imageClassName={styles.heroDesktopImageEl}
            sizes={childcareImageSizes.heroDesktop}
            priority
          />
          <div className={styles.heroCopy}>
            <h1 id="childcare-hero-heading" className={styles.heroHeading}>
              {childcareHero.title}
            </h1>
            <div className={styles.sectionCta}>
              <MarketingCtaButton href={childcareHero.ctaHref} label={childcareHero.ctaLabel} />
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <Image
              src={childcareAssets.heroMobile}
              alt="Hand holding the Annabel Karmel app for childcare"
              width={childcareAssets.heroMobileWidth}
              height={childcareAssets.heroMobileHeight}
              className={styles.heroImage}
              priority
              sizes={childcareImageSizes.heroMobile}
            />
          </div>
        </div>
      </section>

      <section className={styles.awardsSection} aria-label="Awards and recognition">
        <div className={styles.awardsGrid}>
          {childcareAwards.map((award) => (
            <Image
              key={award.src}
              src={award.src}
              alt={award.alt}
              width={award.width}
              height={award.height}
              className={styles.awardsLogo}
              sizes={childcareImageSizes.awards}
            />
          ))}
        </div>
      </section>

      <SplitSection
        title={childcareProfessionals.title}
        body={childcareProfessionals.body}
        image={childcareAssets.happyFamilies}
        imageAlt="Mother and child enjoying a meal together"
        imageWidth={childcareAssets.happyFamiliesWidth}
        imageHeight={childcareAssets.happyFamiliesHeight}
        cta={
          <div className={styles.sectionCta}>
            <MarketingCtaButton href="#request-a-demo" label={childcareProfessionals.ctaLabel} block />
          </div>
        }
      />

      <section
        className={styles.pinkWaveSection}
        style={oneStopStyle}
        aria-labelledby="childcare-tools-heading"
      >
        <SplitSection
          title={childcareEssentialTools.title}
          image={childcareAssets.essentialTools}
          imageAlt="Caregiver using the Annabel Karmel app at mealtimes"
          imageWidth={childcareAssets.essentialToolsWidth}
          imageHeight={childcareAssets.essentialToolsHeight}
          reverse
          contentClassName={styles.toolsContent}
          imageClassName={styles.toolsImage}
          cta={
            <div className={styles.sectionCta}>
              <MarketingCtaButton
                href="#request-a-demo"
                label={childcareEssentialTools.ctaLabel}
                variant="pink"
                block
              />
            </div>
          }
        >
          <ul className={`m-0 w-full list-none p-0 ${styles.body22List}`}>
            {childcareEssentialTools.items.map((item) => (
              <li key={item} className="flex items-start gap-2 py-2">
                <MarketingCheckIcon />
                <span className={styles.body22}>{item}</span>
              </li>
            ))}
          </ul>
        </SplitSection>
      </section>

      <section className={styles.recipesSection} aria-labelledby="childcare-recipes-heading">
        <h2 id="childcare-recipes-heading" className={`${styles.displayHeading} ${styles.recipesHeading}`}>
          Recipes that grow with your family
        </h2>
        <ChildcareRecipeCarousel />
      </section>

      <section className={styles.splitSection} aria-labelledby="childcare-highlights-heading">
        <div className={`${styles.sectionShell} ${styles.splitGrid}`}>
          <div className={styles.splitMedia}>
            <Image
              src={childcareAssets.supportingParents}
              alt="Child enjoying a meal"
              width={childcareAssets.supportingParentsWidth}
              height={childcareAssets.supportingParentsHeight}
              sizes={childcareImageSizes.splitColumn}
              className={styles.splitMediaImage}
            />
          </div>
          <div className={`${styles.splitContent} ${styles.highlightsContent}`}>
            <h2 id="childcare-highlights-heading" className="sr-only">
              Recipe app highlights
            </h2>
            {childcareRecipeHighlights.map((item) => (
              <div key={item.title} className={styles.highlightBlock}>
                <h3 className={`${styles.highlightBlockTitle} ${styles.body22}`}>{item.title}</h3>
                <p className={styles.body18}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.weaningSection}
        style={weaningStyle}
        aria-labelledby="childcare-weaning-heading"
      >
        <div className={styles.sectionShell}>
          <div className={styles.weaningIntroDesktop}>
            <h2 className={styles.weaningTitle}>{childcareWeaning.desktopTitle}</h2>
            <p className={styles.weaningBody}>{childcareWeaning.desktopBody}</p>
          </div>
          <div className={styles.weaningIntroMobile}>
            <h2 id="childcare-weaning-heading" className={styles.weaningTitle}>
              {childcareWeaning.mobileTitle}
            </h2>
            <p className={styles.weaningBody}>{childcareWeaning.mobileBody}</p>
          </div>
          <div className={styles.weaningCards}>
            {childcareWeaning.cards.map((card) => (
              <article key={card.title} className={styles.weaningCard}>
                <h3 className={styles.weaningCardTitle}>{card.title}</h3>
                <p className={styles.weaningCardBody}>{card.body}</p>
                <div className={styles.weaningCardImageWrap}>
                  <Image
                    src={card.image}
                    alt=""
                    width={card.imageWidth}
                    height={card.imageHeight}
                    sizes="(max-width: 767px) 300px, 200px"
                    unoptimized
                    className={styles.weaningCardImage}
                    draggable={false}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.expertSection} aria-labelledby="childcare-expert-heading">
        <h2 id="childcare-expert-heading" className={`${styles.displayHeading} ${styles.expertHeading}`}>
          Empowering your nannies and childcare professionals
        </h2>
        <div className={styles.expertCarouselWrap}>
          <ChildcareExpertCarousel />
        </div>
        <div className={`${styles.sectionCta} mt-[20px]! md:mt-[30px]!`}>
          <MarketingCtaButton href="#request-a-demo" label="Find out more" block />
        </div>
      </section>

      <section
        className={styles.statsSection}
        style={oneStopStyle}
        aria-labelledby="childcare-stats-heading"
      >
        <h2 id="childcare-stats-heading" className={`${styles.displayHeading} ${styles.statsHeading}`}>
          How the app is encouraging healthier eating habits
        </h2>
        <div className={styles.statsGrid}>
          {childcareStats.map((stat) => (
            <article
              key={stat.label}
              className={`${styles.statCard} ${stat.centerOnMobile ? styles.statCardCenterMobile : ""}`}
            >
              <Image
                src={stat.icon}
                alt=""
                width={stat.iconWidth}
                height={stat.iconHeight}
                className={styles.statIcon}
                sizes={childcareImageSizes.statIcon}
              />
              <p className={styles.statValue} style={{ color: stat.valueColor }}>
                {stat.value}
              </p>
              <p className={styles.statLabel}>{stat.label}</p>
            </article>
          ))}
        </div>
        <p className={styles.statsFootnote}>*Active app users</p>
      </section>

      <section className={styles.quoteSection} aria-labelledby="childcare-quote-heading">
        <div className={styles.sectionShell}>
          <div className={styles.quoteCard} style={quoteStyle}>
            <div className={styles.quoteGrid}>
              <div className={styles.quoteCopy}>
                <svg className={styles.quoteIcon} viewBox="0 0 512 512" aria-hidden="true">
                  <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
                </svg>
                <h2 id="childcare-quote-heading" className="sr-only">
                  Annabel Karmel quote
                </h2>
                <p className={styles.quoteText}>{childcareQuote.text}</p>
                <p className={styles.quoteAuthor}>{childcareQuote.author}</p>
              </div>
              <div className={styles.quoteImageWrap}>
                <Image
                  src={childcareAssets.quoteAnnabel}
                  alt=""
                  width={childcareAssets.quoteAnnabelWidth}
                  height={childcareAssets.quoteAnnabelHeight}
                  sizes={childcareImageSizes.quoteImage}
                  className={styles.quoteImage}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.howSection} aria-labelledby="childcare-how-heading">
        <div className={styles.howGrid}>
          <div className={styles.howImage}>
            <Image
              src={childcareAssets.howItWorks}
              alt=""
              fill
              sizes={childcareImageSizes.splitColumn}
              className={styles.howImageEl}
              draggable={false}
            />
          </div>
          <div className={styles.howContent}>
            <h2 id="childcare-how-heading" className={styles.splitHeading}>
              How it works
            </h2>
            <p className={styles.howIntro}>Getting started is easy!</p>
            <ol className={styles.stepList}>
              {childcareHowItWorksSteps.map((step) => (
                <li key={step.text} className={styles.stepItem}>
                  <div className={styles.stepBody}>
                    <span className={styles.stepNumber} aria-hidden="true">
                      <Image
                        src={step.number}
                        alt=""
                        width={step.numberWidth}
                        height={step.numberHeight}
                        sizes={childcareImageSizes.stepNumber}
                        className={styles.stepNumberImg}
                        draggable={false}
                      />
                    </span>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className={styles.howCta}>
              <MarketingCtaButton href="#request-a-demo" label="Request a demo" block />
            </div>
          </div>
        </div>
      </section>

      <section
        id="request-a-demo"
        className={styles.formSection}
        style={formStyle}
        aria-labelledby="childcare-form-heading"
      >
        <div className={styles.formCard}>
          <h2 id="childcare-form-heading" className={styles.formHeading}>
            {childcareForm.title}
          </h2>
          <form className={styles.formGrid} action="#request-a-demo">
            <EmpowerFormSelect
              name="help"
              options={childcareFormHelpOptions}
              placeholder="How can we help?"
              required
              ariaLabel="How can we help?"
            />

            <div className={styles.formGridTwo}>
              <input className={styles.formField} type="text" name="company" placeholder="Company name*" required />
              <EmpowerFormSelect
                name="company_size"
                options={childcareCompanySizeOptions}
                placeholder="Company size*"
                required
                ariaLabel="Company size"
              />
            </div>

            <div className={styles.formGridTwo}>
              <input className={styles.formField} type="text" name="first_name" placeholder="First name*" required />
              <input className={styles.formField} type="text" name="last_name" placeholder="Last name*" required />
            </div>

            <input className={styles.formField} type="text" name="job_title" placeholder="Job title*" required />

            <div className={styles.formGridTwo}>
              <input className={styles.formField} type="email" name="email" placeholder="Business email*" required />
              <input className={styles.formField} type="tel" name="phone" placeholder="Contact number" />
            </div>

            <textarea className={styles.formTextarea} name="message" placeholder="Message..." rows={4} />

            <p className={styles.formDisclaimer}>
              By submitting this form, you agree that we may use the data you provide to contact you with information
              related to your request/submission and Annabel Karmel&apos;s products and marketing. You can unsubscribe from
              these communications at any time by clicking the unsubscribe link in the email. Your data will be used
              subject to Annabel Karmel&apos;s privacy policy.
            </p>

            <div className={`${styles.formActions} ${styles.sectionCta}`}>
              <button type="submit" className={`${styles.ctaButton} ${styles.formSubmit}`}>
                <span>Submit</span>
                <MarketingArrowIcon />
              </button>
            </div>
          </form>
        </div>
        <MarketingWaveDivider position="bottom" />
      </section>

      <div className={styles.instagramWrap}>
        <InstagramShareSection />
      </div>
    </main>
  );
}
