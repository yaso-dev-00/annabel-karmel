import type { Metadata } from "next";

import { PlantPoweredBitesPageContent } from "@/components/ProductScreen/categories/PlantPoweredBitesPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";

export const metadata: Metadata = {
  title: "Plant-Powered Bites for Kids | Annabel Karmel",
  description:
    "Make mealtimes easier with Annabel's NEW plant-powered bites — perfectly sized for little hands and packed with up to 50% veggies.",
};

export default function PlantPoweredBitesPage() {
  return (
    <>
      <SiteHeader />
      <PlantPoweredBitesPageContent />
      <SiteFooter />
    </>
  );
}
