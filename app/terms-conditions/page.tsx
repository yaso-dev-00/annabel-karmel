import type { Metadata } from "next";

import { InstagramShareSection } from "@/components/instagram-share-section";
import { LegalPageContent } from "@/components/legal-page-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { termsConditionsPage } from "@/data/footer-pages/terms-conditions";

export const metadata: Metadata = {
  title: "Terms & Conditions | Annabel Karmel",
  description: "Read Annabel Karmel's website and app terms and conditions.",
};

export default function TermsConditionsPage() {
  return (
    <>
      <SiteHeader />
      <LegalPageContent title={termsConditionsPage.title} html={termsConditionsPage.html} />
      <InstagramShareSection />
      <SiteFooter />
    </>
  );
}
