import type { Metadata } from "next";

import { InstagramShareSection } from "@/components/instagram-share-section";
import { LegalPageContent } from "@/components/legal-page-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cookiePolicyPage } from "@/data/footer-pages/cookie-policy";

export const metadata: Metadata = {
  title: "Cookie Policy | Annabel Karmel",
  description: "Read how Annabel Karmel uses cookies on this website.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <SiteHeader />
      <LegalPageContent title={cookiePolicyPage.title} html={cookiePolicyPage.html} />
      <InstagramShareSection />
      <SiteFooter />
    </>
  );
}
