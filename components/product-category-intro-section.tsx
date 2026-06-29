import Image from "next/image";
import type { ReactNode } from "react";

import { SectionBackgroundImage } from "@/components/section-background-image";
import shared from "./product-category-shared.module.css";

export type ProductCategoryIntroSectionProps = {
  id: string;
  heading: string;
  body: string;
  signatureSrc: string;
  signatureAlt?: string;
  introBg: string;
  introBgMobile?: string;
  /** Text colour theme — light uses dark green copy on pale bg; dark uses white copy. */
  theme?: "light" | "dark";
  footer?: ReactNode;
  className?: string;
};

export function ProductCategoryIntroSection({
  id,
  heading,
  body,
  signatureSrc,
  signatureAlt = "Annabel Karmel",
  introBg,
  introBgMobile,
  theme = "light",
  footer,
  className = "",
}: ProductCategoryIntroSectionProps) {
  const isSignatureSvg = signatureSrc.endsWith(".svg");

  return (
    <section
      className={`${shared.fullBleed} ${shared.introSection} ${theme === "light" ? shared.introSectionLight : shared.introSectionDark} ${className}`}
      aria-labelledby={id}
    >
      <SectionBackgroundImage
        desktopSrc={introBg}
        mobileSrc={introBgMobile ?? introBg}
        priority
        unoptimized={true}
      
      />
      <div className={`${shared.sectionContent} ${shared.inner} pt-10 md:pt-0`}>
        <h1 id={id} className={`${shared.introHeading} text-[32px] sm:text-[40px]`}>
          {heading}
        </h1>
        <p
          className={`${shared.pequena} mx-auto mt-8 max-w-[860px] text-center text-[22px] leading-normal md:mt-10 md:text-[30px]`}
        >
          {body}
        </p>
        <div className="relative mt-8 md:mt-10">
          <Image
            src={signatureSrc}
            alt={signatureAlt}
            width={277}
            height={80}
            unoptimized={isSignatureSvg}
            className="mx-auto mb-6 block h-auto w-[min(240px,65%)] md:mb-9 md:w-[min(277px,70%)]"
          />
          {footer}
        </div>
      </div>
    </section>
  );
}
