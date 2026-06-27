import type { Metadata } from "next";

import { ChildcareAppPageContent } from "@/components/childcare-app-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
