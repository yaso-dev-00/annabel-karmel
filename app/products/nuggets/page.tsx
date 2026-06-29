import type { Metadata } from "next";

import { PlantPoweredBitesProductPageContent } from "@/components/plant-powered-bites-product-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { nuggetsPageData } from "@/data/nuggets-page";

export const metadata: Metadata = {
  title: "Meat-free Chicken Style Nuggets | Annabel Karmel",
  description:
    "Expect spontaneous happy dances at the table with Annabel's plant-powered nuggets – ready from frozen in just 5 minutes!",
};

export default function NuggetsPage() {
  return (
    <>
      <SiteHeader />
      <PlantPoweredBitesProductPageContent data={nuggetsPageData} />
      <SiteFooter />
    </>
  );
}
