import type { Metadata } from "next";

import { CraftCrumbPageContent } from "@/components/craft-crumb-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
