import type { Metadata } from "next";

import { ChilledMealsPageContent } from "@/components/chilled-meals-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Chilled Meals for Toddlers & Children | Annabel Karmel",
  description:
    "Delicious dinners at the speed of life. Annabel's kid-approved chilled meals are packed with goodness, low in salt, and ready in minutes.",
};

export default function ChilledMealsPage() {
  return (
    <>
      <SiteHeader />
      <ChilledMealsPageContent />
      <SiteFooter />
    </>
  );
}
