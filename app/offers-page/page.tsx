import type { Metadata } from "next";

import { OffersPageContent } from "@/components/offers-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Offers Page | Annabel Karmel",
  description:
    "Find Annabel Karmel's expert chilled and frozen meal ranges on offer this week at major UK supermarkets.",
};

export default function OffersPage() {
  return (
    <>
      <SiteHeader />
      <OffersPageContent />
      <SiteFooter />
    </>
  );
}
