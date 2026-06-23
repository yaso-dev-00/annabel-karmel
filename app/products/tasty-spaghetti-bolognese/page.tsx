import type { Metadata } from "next";

import { TastySpaghettiBolognesePageContent } from "@/components/tasty-spaghetti-bolognese-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Tasty Spaghetti Bolognese Frozen Meal | Annabel Karmel",
  description:
    "Made with 100% British & Irish beef and packed with hidden veg – it's a slurp-worthy spag bol kids will love. Made without dairy.",
};

export default function TastySpaghettiBolognesePage() {
  return (
    <>
      <SiteHeader />
      <TastySpaghettiBolognesePageContent />
      <SiteFooter />
    </>
  );
}
