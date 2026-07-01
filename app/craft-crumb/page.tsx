import type { Metadata } from "next";

import { CraftCrumbPageContent } from "@/components/MarketingScreen/CraftCrumbPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";

export const metadata: Metadata = {
  title: "Craft & Crumb | Annabel Karmel",
  description:
    "Annabel Karmel's collaboration with Craft & Crumb brings fun bake and craft kits for little bakers — now available at Tesco.",
};

export default function CraftCrumbPage() {
  return (
    <>
      <SiteHeader />
      <CraftCrumbPageContent />
      <SiteFooter />
    </>
  );
}
