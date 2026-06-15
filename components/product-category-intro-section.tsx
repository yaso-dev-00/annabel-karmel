import type { CSSProperties, ReactNode } from "react";

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
  const mobileBg = introBgMobile ?? introBg;

  return (
    <section
      className={`${shared.fullBleed} ${shared.introSection} ${theme === "light" ? shared.introSectionLight : shared.introSectionDark} ${className}`}
      style={
        {
          "--intro-bg-desktop": `url("${introBg}")`,
          "--intro-bg-mobile": `url("${mobileBg}")`,
        } as CSSProperties
      }
      aria-labelledby={id}
    >
      <div className={`${shared.inner} pt-10 md:pt-0`}>
        <h1 id={id} className={`${shared.introHeading} text-[32px] sm:text-[40px]`}>
          {heading}
        </h1>
        <p
          className={`${shared.pequena} mx-auto mt-8 max-w-[860px] text-center text-[22px] leading-normal md:mt-10 md:text-[30px]`}
        >
          {body}
        </p>
        <div className="relative mt-8 md:mt-10">
          <img
            src={signatureSrc}
            alt={signatureAlt}
            className="mx-auto mb-6 block h-auto w-[min(240px,65%)] md:mb-9 md:w-[min(277px,70%)]"
          />
          {footer}
        </div>
      </div>
    </section>
  );
}
