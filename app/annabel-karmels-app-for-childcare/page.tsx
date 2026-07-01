import type { Metadata } from "next";

import { ChildcareAppPageContent } from "@/components/MarketingScreen/ChildcareAppPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";

export const metadata: Metadata = {
  title: "Annabel Karmel’s App for Childcare | Annabel Karmel",
  description:
    "Equip your childcare team with Annabel Karmel’s #1 recipe app — 1500+ recipes, meal planners, weaning support and allergy tools for every age and stage.",
};

export default function ChildcareAppPage() {
  return (
    <>
      <SiteHeader />
      <ChildcareAppPageContent />
      <SiteFooter />
    </>
  );
}
