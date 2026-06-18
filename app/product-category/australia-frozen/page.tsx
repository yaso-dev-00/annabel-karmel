import type { Metadata } from "next";

import { AustraliaFrozenPageContent } from "@/components/australia-frozen-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
