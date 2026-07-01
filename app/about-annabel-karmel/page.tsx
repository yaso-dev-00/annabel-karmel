import type { Metadata } from "next";

import { AboutAnnabelKarmelPageContent } from "@/components/about-annabel-karmel-page";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About Annabel Karmel | Annabel Karmel",
  description:
    "Learn about Annabel Karmel MBE, the UK's no. 1 children's cookery author, her award-winning recipe app, cookbooks, and family food ranges.",
};

export default function AboutAnnabelKarmelPage() {
  return (
    <>
      <SiteHeader />
      <AboutAnnabelKarmelPageContent />
      <div className="mt-[50px]">
      <InstagramShareSection />
      </div>
      <SiteFooter />
    </>
  );
}
