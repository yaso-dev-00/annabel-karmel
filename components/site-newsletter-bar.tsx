"use client";

import { useEffect, useState } from "react";
import { NEWSLETTER_BAR_STORAGE_KEY, newsletterBarContent } from "@/data/promo-banners";

function NewsletterMailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="2.25"
        y="3.25"
        width="19.5"
        height="17.5"
        rx="2.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 8.25 12 14.25 20.5 8.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type SiteNewsletterBarProps = {
  onOpenModal?: () => void;
};

export function SiteNewsletterBar({ onOpenModal }: SiteNewsletterBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(NEWSLETTER_BAR_STORAGE_KEY) === "true";
    setIsVisible(!dismissed);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.newsletterBar = isVisible ? "visible" : "hidden";
    return () => {
      delete document.documentElement.dataset.newsletterBar;
    };
  }, [isVisible]);

  const dismiss = () => {
    window.localStorage.setItem(NEWSLETTER_BAR_STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="site-newsletter-bar bg-[#E9C6CE] border-b border-[#e2cfd3]">
      <div className="container relative flex min-h-[var(--site-newsletter-bar-height)] items-center justify-center px-4 py-[0.55rem] pr-11 max-md:px-9 max-md:pr-10">
        <button
          type="button"
          className="site-promo-text site-newsletter-bar-trigger hidden text-center md:block"
          onClick={onOpenModal}
        >
          {newsletterBarContent.desktopText}
        </button>
        <button
          type="button"
          className="site-promo-text site-newsletter-bar-trigger mb-0 flex items-center justify-center gap-1.5 text-sm md:hidden"
          onClick={onOpenModal}
        >
          <span>{newsletterBarContent.mobileText}</span>
          <NewsletterMailIcon className="h-[15px] w-[19px] shrink-0 text-[#3a3a3a]" />
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center border-0 bg-transparent p-0 cursor-pointer"
          aria-label="Close newsletter banner"
          onClick={dismiss}
        >
          <img src={newsletterBarContent.closeIconUrl} alt="" aria-hidden width={14} height={14} className="h-3.5 w-3.5 object-contain" />
        </button>
      </div>
    </div>
  );
}
