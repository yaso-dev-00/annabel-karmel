import type { Metadata } from "next";

import { InstagramShareSection } from "@/components/instagram-share-section";
import { LegalPageContent } from "@/components/legal-page-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { privacyPolicyPage } from "@/data/footer-pages/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Annabel Karmel",
  description: "Read Annabel Karmel's website and app privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <LegalPageContent title={privacyPolicyPage.title} html={privacyPolicyPage.html} />
      <InstagramShareSection />
      <SiteFooter />
    </>
  );
}
