import type { Metadata } from "next";

import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { LegalPageContent } from "@/components/LegalScreen/LegalPageContent";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
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
