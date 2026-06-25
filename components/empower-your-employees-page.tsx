import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { InstagramShareSection } from "@/components/instagram-share-section";
import { EmpowerExpertCarousel, EmpowerRecipeCarousel } from "@/components/empower-carousels";
import { EmpowerFormSelect } from "@/components/empower-form-select";
import {
  empowerAssets,
  empowerAwards,
  empowerCompanySizeOptions,
  empowerEssentialTools,
  empowerFormHelpOptions,
  empowerHowItWorksSteps,
  empowerParentSupportPoints,
  empowerStats,
} from "@/data/empower-your-employees-page";
import { empowerImageSizes } from "@/data/empower-image-sizes";
import styles from "./empower-your-employees-page.module.css";

const WAVE_PATH =
  "M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z";

function WaveDivider({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={position === "top" ? styles.waveShapeTop : styles.waveShapeBottom}
      aria-hidden="true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path className={styles.waveFill} d={WAVE_PATH} />
      </svg>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="h-[35px] w-[35px] shrink-0" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M30 9L13.5 25.5L6 18" stroke="#494747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ stroke = "#6E9CA5" }: { stroke?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none" aria-hidden="true">
      <rect width="41" height="41" rx="16" fill="white" />
      <path d="M13 20.5H27" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 13.5L27 20.5L20 27.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmpowerButton({
  href,
  label,
  variant = "teal",
  block = false,
}: {
  href: string;
  label: string;
  variant?: "teal" | "pink";
  block?: boolean;
}) {
  const stroke = variant === "pink" ? "#B34769" : "#6E9CA5";
  return (
    <a
      href={href}
      className={`${styles.ctaButton} ${variant === "pink" ? styles.ctaButtonPink : ""} ${block ? styles.ctaButtonBlock : ""}`}
    >
      <span>{label}</span>
      <ArrowIcon stroke={stroke} />
    </a>
  );
}

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
            sizes={imageSizes ?? empowerImageSizes.splitColumn}
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

export function EmpowerYourEmployeesPageContent() {
  // const heroCardStyle = {
  //   "--hero-bg": `url(${empowerAssets.heroDesktop})`,
  // } as CSSProperties;

  const formStyle = {
    "--form-bg": `url(${empowerAssets.formBg})`,
  } as CSSProperties;

  return (
    <main className={styles.page}>
      <section className={styles.heroShell} aria-labelledby="empower-hero-heading">
        <div
          className={`${styles.sectionShell} px-0 md:px-5 ${styles.heroCard}`}
          
        >
          <FillImage
            src={empowerAssets.heroDesktop}
            alt=""
            wrapperClassName={styles.heroDesktopImage}
            imageClassName={styles.heroDesktopImageEl}
            sizes={empowerImageSizes.heroDesktop}
            priority
          />
          <div className={styles.heroCopy}>
            <h1 id="empower-hero-heading" className={styles.heroHeading}>
              Empower your employees with Annabel Karmel&apos;s essential recipe app
            </h1>
            <div className={styles.sectionCta}>
            <EmpowerButton href="#request-a-demo" label="Request a demo" />
            </div>
          </div>
          <div className={styles.heroImageWrap}>
            <Image
              src={empowerAssets.heroMobile}
              alt="Hand holding the Annabel Karmel baby and toddler recipe app"
              width={empowerAssets.heroMobileWidth}
              height={empowerAssets.heroMobileHeight}
              className={styles.heroImage}
              priority
              sizes={empowerImageSizes.heroMobile}
            />
          </div>
        </div>
      </section>

      <section className={styles.awardsSection} aria-label="Awards and recognition">
        <div className={styles.awardsGrid}>
          {empowerAwards.map((award) => (
            <Image
              key={award.src}
              src={award.src}
              alt={award.alt}
              width={award.width}
              height={award.height}
              className={styles.awardsLogo}
              sizes={empowerImageSizes.awards}
            />
          ))}
        </div>
      </section>

      <SplitSection
        title="Happy, healthy families are better for business"
        body="Provide your employees with unlimited access to Annabel Karmel's award-winning recipe app – the essential mealtime tool. It's not just a perk. It's the ultimate wellness benefit that will inspire healthy eating habits to last a lifetime."
        image={empowerAssets.happyFamilies}
        imageAlt="Mother and child enjoying a meal together"
        imageWidth={empowerAssets.happyFamiliesWidth}
        imageHeight={empowerAssets.happyFamiliesHeight}
        cta={
          <div className={styles.sectionCta}>
            <EmpowerButton href="#request-a-demo" label="Learn more" block />
          </div>
        }
      />

      <section className={styles.childcareSection} aria-labelledby="empower-childcare-heading">
        <div className={styles.childcareCard}>
          <FillImage
            src={empowerAssets.childcareProvider}
            alt=""
            wrapperClassName={styles.childcareCardBg}
            imageClassName={styles.childcareCardBgImage}
            sizes={empowerImageSizes.fullWidthCard}
          />
          <div className={styles.childcareCardContent}>
          <h2 id="empower-childcare-heading" className={styles.splitHeading}>
            Are you a nanny agency or childcare provider?
          </h2>
          <p className={styles.body18}>
            Discover how Annabel Karmel&apos;s expert recipe app can provide everyday support to your caregivers.
          </p>
          <div className={styles.sectionCta}>
          <EmpowerButton
            href="https://www.annabelkarmel.com/annabel-karmels-app-for-childcare/"
            label="Learn more"
            variant="pink"
          />
          </div>
          </div>
        </div>
      </section>

      <section className={styles.vectorSection} aria-labelledby="empower-tools-heading">
        <FillImage
          src={empowerAssets.vectorBg}
          alt=""
          wrapperClassName={styles.vectorSectionBg}
          imageClassName={styles.vectorSectionBgImage}
          sizes={empowerImageSizes.sectionBackground}
        />
        <SplitSection
          title="Essential tools for simple, healthy mealtimes"
          image={empowerAssets.essentialTools}
          imageAlt="Parent using the Annabel Karmel app at mealtimes"
          imageWidth={empowerAssets.essentialToolsWidth}
          imageHeight={empowerAssets.essentialToolsHeight}
          contentClassName={styles.toolsContent}
          imageClassName={styles.toolsImage}
          cta={
            <div className={styles.sectionCta}>
              <EmpowerButton href="#request-a-demo" label="Request a demo" block />
            </div>
          }
        >
          <ul className={`m-0 w-full list-none p-0 ${styles.body22List}`}>
            {empowerEssentialTools.map((item) => (
              <li key={item} className="flex items-start gap-2 py-2">
                <CheckIcon />
                <span className={styles.body22}>{item}</span>
              </li>
            ))}
          </ul>
        </SplitSection>
      </section>

      <section className={styles.recipesSection} aria-labelledby="empower-recipes-heading">
        <h2 id="empower-recipes-heading" className={`${styles.displayHeading} ${styles.recipesHeading}`}>
          Recipes that grow with your family
        </h2>
        <EmpowerRecipeCarousel />
      </section>

      <section className={styles.expertSection} aria-labelledby="empower-expert-heading">
        <h2 id="empower-expert-heading" className={`${styles.displayHeading} ${styles.expertHeading}`}>
          Expert support with real benefits
        </h2>
        <div className={styles.expertCarouselWrap}>
          <EmpowerExpertCarousel />
        </div>
        <div className={styles.sectionCta}>
          <EmpowerButton href="#request-a-demo" label="Find out more" block />
        </div>
      </section>

      <section className={styles.parentSection} aria-labelledby="empower-parent-heading">
        <div className={`${styles.sectionShell} ${styles.parentPanel} pl-[0px]! md:pl-[30px]! pb-0! pr-0! `}>
          <div className={styles.parentGrid}>
            <div className={styles.parentContent}>
              <h2 id="empower-parent-heading" className={styles.splitHeading}>
                Supporting parent employees with babies
              </h2>
              <p className={styles.body18}>
                Annabel Karmel&apos;s app is the leading resource for safe and easy weaning, making it an ideal resource
                for your employees with infants, and those on maternity and paternity leave.
              </p>
              <ul className={`m-0 w-full list-none p-0 ${styles.parentList}`}>
                {empowerParentSupportPoints.map((item) => (
                  <li key={item} className="flex items-start gap-[10px] py-2">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.sectionCta}>
              <EmpowerButton href="#request-a-demo" label="Find out more" block /></div>
            </div>
            <div className={styles.parentImage}>
              <Image
                src={empowerAssets.supportingParents}
                alt=""
                fill
                sizes={empowerImageSizes.splitColumn}
                className={styles.parentImageEl}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.statsSection} aria-labelledby="empower-stats-heading">
        <WaveDivider position="top" />
        <h2 id="empower-stats-heading" className={`${styles.displayHeading} ${styles.statsHeading}`}>
          How the app is encouraging healthier eating habits
        </h2>
        <div className={styles.statsGrid}>
          {empowerStats.map((stat) => (
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
                sizes={empowerImageSizes.statIcon}
              />
              <p className={styles.statValue} style={{ color: stat.valueColor }}>
                {stat.value}
              </p>
              <p className={styles.statLabel}>{stat.label}</p>
            </article>
          ))}
        </div>
        <p className={styles.statsFootnote}>*Active app users</p>
        <WaveDivider position="bottom" />
      </section>

      <section className={styles.howSection} aria-labelledby="empower-how-heading">
        <div className={styles.howGrid}>
          <div className={styles.howImage}>
            <Image
              src={empowerAssets.howItWorks}
              alt=""
              fill
              sizes={empowerImageSizes.splitColumn}
              className={styles.howImageEl}
              draggable={false}
            />
          </div>
          <div className={styles.howContent}>
            <h2 id="empower-how-heading" className={styles.splitHeading}>
              How it works
            </h2>
            <p className={styles.howIntro}>Getting started is easy!</p>
            <ol className={styles.stepList}>
              {empowerHowItWorksSteps.map((step) => (
                <li key={step.text} className={styles.stepItem}>
                  <div className={styles.stepBody}>
                    <span className={styles.stepNumber} aria-hidden="true">
                      <Image
                        src={step.number}
                        alt=""
                        width={step.numberWidth}
                        height={step.numberHeight}
                        sizes={empowerImageSizes.stepNumber}
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
              <EmpowerButton href="#request-a-demo" label="Request a demo" block />
            </div>
          </div>
        </div>
      </section>

      <section
        id="request-a-demo"
        className={styles.formSection}
        style={formStyle}
        aria-labelledby="empower-form-heading"
      >
        <div className={styles.formCard}>
          <h2 id="empower-form-heading" className={styles.formHeading}>
            Complete this form to request a demo and learn more about how Annabel Karmel&apos;s expert recipe app can
            support your employees
          </h2>
          <form className={styles.formGrid} action="#request-a-demo">
            <EmpowerFormSelect
              name="help"
              options={empowerFormHelpOptions}
              placeholder="How can we help?"
              required
              ariaLabel="How can we help?"
            />

            <div className={styles.formGridTwo}>
              <input className={styles.formField} type="text" name="company" placeholder="Company name*" required />
              <EmpowerFormSelect
                name="company_size"
                options={empowerCompanySizeOptions}
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
                <ArrowIcon />
              </button>
            </div>
          </form>
        </div>
        <WaveDivider position="bottom" />
      </section>
   <div className={styles.instagramWrap}>
      <InstagramShareSection  />
      </div>
    </main>
  );
}
