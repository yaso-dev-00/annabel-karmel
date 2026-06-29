import type { Metadata } from "next";

import { PlantPoweredBitesProductPageContent } from "@/components/plant-powered-bites-product-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { burgersPageData } from "@/data/burgers-page";

export const metadata: Metadata = {
  title: "Meat-free Mini Burgers | Annabel Karmel",
  description:
    "See them rollin' to the dinner table with Annabel's plant-powered mini burgers – big on veggie goodness and approved by kids!",
};

export default function BurgersPage() {
  return (
    <>
      <SiteHeader />
      <PlantPoweredBitesProductPageContent data={burgersPageData} />
      <SiteFooter />
    </>
  );
}
