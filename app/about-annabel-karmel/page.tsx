import type { Metadata } from "next";

import { AboutAnnabelKarmelPageContent } from "@/components/FooterPagesScreen/AboutAnnabelKarmelPage";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";

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
