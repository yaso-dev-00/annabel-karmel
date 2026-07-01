import type { Metadata } from "next";

import { RecipeAppPageContent } from "@/components/MarketingScreen/RecipeAppPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";

export const metadata: Metadata = {
  title: "The No.1 Baby & Toddler Recipe App | Annabel Karmel",
  description:
    "Join 100,000+ families using Annabel Karmel's multi award-winning baby & toddler recipe app. 1500+ recipes, meal planners, weaning support and a 7-day free trial.",
};

export default function RecipeAppPage() {
  return (
    <>
      <SiteHeader />
      <RecipeAppPageContent />
      <SiteFooter />
    </>
  );
}
