import type { Metadata } from "next";

import { PlantPoweredBitesProductPageContent } from "@/components/ProductScreen/detail/PlantPoweredBitesProductPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
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
