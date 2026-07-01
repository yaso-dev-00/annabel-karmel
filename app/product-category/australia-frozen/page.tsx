import type { Metadata } from "next";

import { AustraliaFrozenPageContent } from "@/components/ProductScreen/categories/AustraliaFrozenPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";

export const metadata: Metadata = {
  title: "Australia - Frozen Archives | Annabel Karmel",
  description:
    "Discover Annabel Karmel’s award-winning Little Meals in the Australian freezer aisle — expert meals packed with veggies, ready in minutes.",
};

export default function AustraliaFrozenPage() {
  return (
    <>
      <SiteHeader />
      <AustraliaFrozenPageContent />
      <SiteFooter />
    </>
  );
}
